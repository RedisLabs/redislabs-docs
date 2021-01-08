---
Title: Configuring LDAP Authentication
description: This task describes how to configure LDAP-based authentication for a cluster on Kubernetes.
weight: 90
alwaysopen: false
categories: ["Platforms"]
aliases:
---


Throughout this tutorial we will assume there is a single namespace called ‘db'.

## LDAP Overview

At minimum, you’ll need the following information about your LDAP server:

 * The base name for where to find users (e.g., ou=users,dc=example,dc=org)
 * The filter to identify a particular user (e.g., uid=%u)
 * The bind DN for the account that can search (e.g., cn=admin,dc=example,dc=org)
 * The password for the bind DN
 * The server host and port.
 * Whether you are using SSL

In this tutorial, we will use a test server deployed on the same K8s cluster.

## Setting up an LDAP server

If you don’t already have an LDAP server, you can easily deploy one in the same K8s
cluster for testing using a [helm chart for OpenLDAP](https://hub.helm.sh/charts/stable/openldap):

1. Create a ldap-values.yaml file that contains:

   ```
   env:
     LDAP_ORGANISATION: "ACME Inc."
     LDAP_DOMAIN: "example.org"
   adminPassword: admin
   configPassword: config
   ```

1. Deploy OpenLDAP:

   ```
   helm install ldap -f ldap-values.yaml stable/openldap
   ```

1. Forward the pod to your localhost so you can configure the users. The ‘xxx’ should be replace with the actual pod hash:

   ```
   kubectl port-forward pod/ldap-openldap-xxx 3889:389
   ```

1. Create a file called users.ldif for the users Organizational Unit:

   ```
   dn: ou=users,dc=example,dc=org
   objectClass: organizationalUnit
   ou: users
   ```

1. Create a file called user.ldif for your test user:

   ```
   dn: uid=tester,ou=users,dc=example,dc=org
   objectClass: top
   objectClass: account
   objectClass: posixAccount
   cn: tester
   uid: tester
   uidNumber: 1001
   gidNumber: 1001
   homeDirectory: /home/tester
   userPassword: {SSHA}5IcQ2zo5wkCCohXHGWteDMBDbJElbChP
   ```

   The password for the user is “tester”. If you’d like to change it, you can with:

   ```
   ldappasswd  -h localhost -p 3889 -s newpassword -W -D "cn=admin,dc=example,dc=org" -x "uid=tester,ou=users,dc=example,dc=org"
   ```

1. Create the OU and user:

   ```
   ldapadd -h localhost -p 3889 -x -W -D "cn=admin,dc=example,dc=org" -f users.ldif
   ldapadd -h localhost -p 3889 -x -W -D "cn=admin,dc=example,dc=org" -f user.ldif
   ```

## Deploying a Cluster with LDAP Support

### Overview

A cluster must be configured to use an external LDAP server. This can be done via the rladmin command or via the REST API by setting the “saslauthd_ldap_conf” cluster parameter with the saslauthd configuration information. Internally, the saslauthd ademon handles LDAP-based authentication.

Once you have setup LDAP authentication, you can test connectivity via the the testsaslauthd command. You can just connect to any Redis Enterprise Node pod and then try out a username and password:

```
testsaslauthd -u tester -p tester
```

Once the saslauthd daemon can successfully authenticate users, you need to add the user to the list of allowed users in the Redis Enterprise cluster. You can do this through the administrative UI or via the REST API. **A user that is not added is not allowed to authenticate.** If you can authenticate with testsaslauthd but not via the REST API or the UI, then you need to verify the user has been added to the Redis Enterprise cluster.

If you want to automatically add your LDAP user, you can simply use the REST API. You’ll need to have access to the API somehow. In this example, the API has been port forwarded to the local host:

```
cat << EOF > add-user.json
{
    "name":"tester",
    "email":"tester@example.org",
    "role":"admin",
    "email_alerts":false,
    "auth_method":"external"
}
EOF
curl -v -k -u "demo@redislabs.com:xxx" -X POST -d @add-user.json -H "Content-Type: application/json" https://localhost:9443/v1/users
```

### Deploying a Redis Enterprise Cluster
A Redis Enterprise cluster requires no special setup other to be configured with LDAP as the configuration is outside of the scope of the Redis Enterprise CR.

You can create a simple test cluster that can be used with the examples below via this CR:

```
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: ldap
spec:
  nodes: 3
  redisEnterpriseNodeResources:
    limits:
      cpu: 1
      memory: 3Gi
    requests:
      cpu: 1
      memory: 3Gi
```

### LDAP Configuration

A new Redis Enterprise cluster does not have any LDAP configuration but is ready
to accept them. The saslauthd daemon is already running and configured to use
LDAP as a mechanism. All you need to do is to provide the cluster
with the LDAP configuration information (see [saslauthd’s configuration reference](https://github.com/cyrusimap/cyrus-sasl/blob/master/saslauthd/LDAP_SASLAUTHD)).

Using the example LDAP server we setup, a minimal set of configuration parameters for saslauthd:

```
ldap_servers: ldap://ldap-openldap.bdb.svc:389
ldap_search_base: ou=users,dc=example,dc=org
ldap_filter: (uid=%u)
ldap_bind_dn: cn=admin,dc=example,dc=org
ldap_password: admin
```

### Using rladmin to update the configuration
If this information was in a file called “ldap.conf”, you can connect to a Redis Enterprise Node pod and configure the server via:

```
rladmin cluster config saslauthd_ldap_conf ldap.conf
```

The saslauthd daemon is configured to use the file `/etc/opt/redislabs/saslauthd.conf` on each node. You cannot edit this file directly on the node. Instead, you just need a local copy of the configuration you desire and rladmin command will update the cluster configuration. The cluster will update all the node’s configuration and preserve the setting after any pod restarts.

### Using the REST API to update the configuration
Alternatively, you can post the same configuration data in a request to the REST API for the cluster. First you forward the cluster API from a pod:

```
kubectl port-forward pod/ldap-0 9443
```

Then you change the LDAP configuration with a JSON version of the ldap configuration.

```
cat << EOF > tmp.json
{"saslauthd_ldap_conf": "ldap_servers: ldap://ldap-openldap.bdb.svc:389\nldap_search_base: ou=users,dc=example,dc=org\nldap_filter: (uid=%u)\nldap_bind_dn: cn=admin,dc=example,dc=org\nldap_password: admin\n"}
EOF
curl -f -k -u "demo@redislabs.com:xxx" -X PUT -d @tmp.json -H "Content-Type: application/json" https://localhost:9443/v1/cluster
```

The key value for “saslauthd_ldap_conf” is the configuration file verbatim as it would be in the saslauthd configuration file. As such, it can be relatively tricky to get the syntax right and generating this programmatically is helpful. A little python program (make_request.py) can help:

```
import sys
import json

with open(sys.argv[2]) as data:
   d = {}
   d[sys.argv[1]] = data.read()
   print(json.dumps(d))
```

And so we can do:

```
python make_request.py saslauthd_ldap_conf ldap.conf > tmp.json
curl -f -k -u "demo@redislabs.com:xxx" -X PUT -d @tmp.json -H "Content-Type: application/json" https://localhost:9443/v1/cluster
```

### Automating LDAP Configuration

If you are automating deployments with the operator, you can automate this configuration change too with a simple K8s job.

1. Create a ConfigMap that contains the LDAP configuration:

   ```
   kubectl create configmap config-job --from-file=saslauthd_ldap_conf=ldap.conf
   ```

2. Submit this job:

   ```
   apiVersion: batch/v1
   kind: Job
   metadata:
     name: config-ldap
   spec:
     backoffLimit: 4
     template:
       spec:
         serviceAccountName: redis-enterprise-operator
         restartPolicy: Never
         containers:
           - name: config
             image: you/job-config-ldap:1
             env:
               - name: MY_NAMESPACE
                 valueFrom:
                   fieldRef:
                     fieldPath: metadata.namespace
               - name: CLUSTER_NAME
                 value: ldap
               - name: CLUSTER_USER
                 valueFrom:
                  secretKeyRef:
                    name: ldap
                    key: username
               - name: CLUSTER_PASSWORD
                 valueFrom:
                  secretKeyRef:
                    name: ldap
                    key: password
             volumeMounts:
               - name: config
                 mountPath: "/config"
                 readOnly: true
         volumes:
           - name: config
             configMap:
               name: config-job
   ```

   In the above job, the cluster name is “ldap”. You will have to change this to the name of your cluster in all three of the CLUSTER_NAME, CLUSTER_USER, and CLUSTER_PASSWORD environment variables.

This job waits for the cluster to be in the “Running” state. You can submit this job at the same time as the Redis Enterprise CR. It will wait for a period of time for the cluster to spin up and then change the configuration. This time period is tunable.

You'll need to create the docker image (i.e., in the example as "you/job-config-ldap:1")
and make it available to your K8s cluster.

You can build this docker image yourself with the following:

1. Dockerfile

   ```
   FROM python:3.8-slim

   RUN apt-get update && apt-get install -y curl
   RUN pip install kubernetes jsonpath_ng
   RUN mkdir -p /app
   COPY config.sh /app/
   COPY make_request.py /app/
   COPY waitfor.py /app/
   WORKDIR /app

   ENTRYPOINT ["/bin/sh", "/app/config.sh"]
   ```
1. config.sh

   ```
   #!/bin/sh
   CLUSTER_HOST=${CLUSTER_NAME}.${MY_NAMESPACE}.svc.cluster.local
   CLUSTER_PORT=9443
   if python waitfor.py --namespace $MY_NAMESPACE --group app.redislabs.com redisenterpriseclusters $CLUSTER_NAME "$.status.state"  --value "Running" --wait --period 30 --limit 20
   then
      python make_request.py saslauthd_ldap_conf /config/saslauthd_ldap_conf > tmp.json
      curl -f -k -u "$CLUSTER_USER:$CLUSTER_PASSWORD" -X PUT -d @tmp.json -H "Content-Type: application/json" https://${CLUSTER_HOST}:${CLUSTER_PORT}/v1/cluster
   else
      echo "Cluster is not ready within required period."
      exit 1
   fi
   ```

1. make_request.py

   ```
   import sys
   import json

   with open(sys.argv[2]) as data:
      d = {}
      d[sys.argv[1]] = data.read()
      print(json.dumps(d))
   ```

1. waitfor.py

   ```
   from kubernetes import client, config
   import argparse
   import pprint
   from jsonpath_ng import jsonpath, parse as parse_jsonpath
   import sys
   from time import sleep

   if __name__ == '__main__':

      argparser = argparse.ArgumentParser(description='k8s-waitfor')
      argparser.add_argument('--use-config',help='Use the .kubeconfig file.',action='store_true',default=False)
      argparser.add_argument('--wait',help='Wait for success',action='store_true',default=False)
      argparser.add_argument('--limit',help='The limit of interations of waiting',type=int,default=5)
      argparser.add_argument('--period',help='The period of time to wait (seconds)',type=int,default=12)
      argparser.add_argument('--verbose',help='Verbose output',action='store_true',default=False)
      argparser.add_argument('--group',help='The API group',default='app.redislabs.com')
      argparser.add_argument('--version',help='The API version',default='v1')
      argparser.add_argument('--namespace',help='The namespace',default='default')
      argparser.add_argument('--value',help='A value to compare')
      argparser.add_argument('--value-type',help='A value type',default='string',choices=['integer','float','string'])
      argparser.add_argument('--compare',help='A comparison operator',default='eq',choices=['eq','neq','gt','gte','lt','lte'])
      argparser.add_argument('--cluster',help='Check a cluster scoped object',action='store_true',default=False)
      argparser.add_argument('plural',help='The object kind')
      argparser.add_argument('name',help='The object name')
      argparser.add_argument('expr',help='The jsonpath expression')

      args = argparser.parse_args()

      expr = parse_jsonpath(args.expr)

      if args.use_config:
         config.load_kube_config()
      else:
         config.load_incluster_config()

      api = client.CustomObjectsApi()

      pp = pprint.PrettyPrinter(indent=2)


      if not args.wait:
         args.limit = 1

      iteration = 0
      count = 0

      while count==0 and iteration < args.limit:

         if args.cluster:
            # /apis/{group}/{version}/{plural}/{name}
            # group = apiextensions.k8s.io
            # version = v1
            # plural = customresourcedefinitions
            # name = redisenterpriseclusters.app.redislabs.com
            obj = api.get_cluster_custom_object(args.group,args.version,args.plural,args.name)
         else:
            #  /apis/{group}/{version}/namespaces/{namespace}/{plural}/{name}
            # e.g.
            # group = app.redislabs.com
            # version = v1
            # namespace = default
            # plural = redisenterpriseclusters
            # name = test
            obj = api.get_namespaced_custom_object(args.group,args.version,args.namespace,args.plural,args.name)

         if args.value is not None:
            if args.value_type=='integer':
               args.value = int(args.value)
            if args.value_type=='float':
               args.value = float(args.value)
         for match in expr.find(obj):
            if args.verbose:
               pp.pprint(match.value)
            if args.value is not None:
               if (args.compare=='eq' and args.value==match.value) or \
                  (args.compare=='neq' and args.value!=match.value) or \
                  (args.compare=='gt' and match.value>args.value) or \
                  (args.compare=='gte' and match.value>=args.value) or \
                  (args.compare=='lt' and match.value<args.value) or \
                  (args.compare=='lte' and match.value<=args.value):
                  count += 1
            else:
               count += 1
         if args.wait and count==0:
            if args.verbose:
               print('Waiting: {}'.format(iteration))
            sleep(args.period)

         iteration += 1

      sys.exit(0 if count>0 else 1)
   ```


### Using volumes for TLS keys and certificate files

There are four parameters for TLS that require a local file:

 * `ldap_tls_cacert_file` - a file containing the CA certificates
 * `ldap_tls_cacert_dir` - a directory containing CA certificates
 * `ldap_tls_cert` - the client certificate file
 * `ldap_tls_key` - the client private key

You can provide these files and directories using a volume mount. On the cluster specification, you can specify the extra volumes via “volumes” and the extra volume mounts via “redisEnterpriseVolumeMounts”.

One way to handle the certificate files is put them into a ConfigMap and mount the volume from it. For example, if we have a special certificate authority in a file a called “ca.crt”, we can create a ConfigMap:

```
kubectl create configmap ldap-certs --from-file=ca.crt=ca.crt
```

Then in our cluster, we add the volume and volume mount:

```
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: ldap
spec:
  nodes: 3
  redisEnterpriseNodeResources:
    limits:
      cpu: 1
      memory: 3Gi
    requests:
      cpu: 1
      memory: 3Gi
  volumes:
   - name: ldap-volume
     configMap:
       name: ldap-certs
  redisEnterpriseVolumeMounts:
   - name: ldap-volume
     mountPath: /opt/ldap
```

The result is we can use the file path “/opt/ldap/ca.crt” for the “ldap_tls_cert_file” parameter.

You can use the usual techniques to map a set of files into a directory for the “ldap_tls_cert_dir” parameter if you have multiple CA certificates:

```
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: ldap
spec:
  nodes: 3
  redisEnterpriseNodeResources:
    limits:
      cpu: 1
      memory: 3Gi
    requests:
      cpu: 1
      memory: 3Gi
  volumes:
   - name: ldap-volume
     configMap:
       name: ldap-certs
       items:
        - key: A.crt
          path: ca/A.crt
        - key: B.crt
          path: ca/B.crt
        - key: client.crt
          path: client.crt
        - key: client.key
          path: client.key
  redisEnterpriseVolumeMounts:
   - name: ldap-volume
     mountPath: /opt/ldap
```

which allows you to use:

```
ldap_tls_cacert_dir: /opt/ldap/ca
ldap_tls_cert: /opt/ldap/client.crt
ldap_tls_key: /opt/ldap/client.key
```

## Known Issues

1. The saslauthd daemon is not restarted when the configuration changes. If you have never configured LDAP, it will still work. The configuration file does not exist until you do and so it will get read.
Unfortunately, if you change the configuration and have previously tried to authenticate with an external user, the configuration will not get read again until the saslauthd daemon is restarted. There is currently no way to do that via K8s other than to restart the pods because K8s administrators don’t have access to root in the Redis Enterprise container.

   You can proceed with caution and restart the pods by running:

   ```
   kubectl rollout restart statefulset name-of-cluster
   ```

   where "name-of-cluster" is the name of the Redis Enterprise cluster in your CR.

1. For cluster-deployed LDAP servers, the suffix “cluster.local” will not resolve properly. You can remove the "cluster.local" suffix for LDAP deployments in the same K8s cluster.
