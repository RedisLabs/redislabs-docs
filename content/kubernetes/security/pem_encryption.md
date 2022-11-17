---
Title: Enable PEM encryption 
linkTitle: PEM encryption
weight: 93
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /kubernetes/security/pem_encryption.md,
    /kubernetes/security/pem_encryption/,
]
---

Redis Enterprise for Kubernetes supports using PEM (privacy enhanced mail) encryption for private keys. The instructions below use Kubernetes secrets to hold the passphrase file in the `etc/opt/redislabs/secrets/pem/` directory mounted on all Redis Enterprise nodes.

## Prerequisites  

[Install the operator]({{<relref "/kubernetes/deployment/quick-start.md#install-the-operator" >}}) but do not create a Redis Enterprise cluster or database.

## Prepare the init and sidecar container scripts

This step uses an example YAML file ([`pem_config_map_example.yaml`](https://github.com/RedisLabs/redis-enterprise-operator/blob/master/PEM/pem_config_map_example.yaml)) containing two scripts (`read-write-file.py` and `secret-changed.py`).

{{<note>}} The provided script is only an example. Please use your own values and scripts for production environments.{{</note>}}

This script should automatically update the `/ect/opt/redislabs/secrets/pem/passphrase` file using the init and sidecar containers. The containers run the Python scripts to create and update the passphrase by reading it from the Kubernetes secret. The init container (`read-write-file.py`) add the passphrase to the mounted file before the RS nodes are running. The sidecar container (`secret-changed.py`) will update the passphrase if there is a change.

Edit and apply the ConfigMap YAML file (`pem_config_map_example.yaml`):

```YAML
kubectl apply -f pem_config_map_example.yaml
```

## Create the Redis Enterprise cluster spec

1. Create a Redis Enterprise cluster custom resource file with the following content and save it as `rec.yaml`.

  ```YAML
  apiVersion: app.redislabs.com/v1
  kind: RedisEnterpriseCluster
  metadata:
    name: rec
    labels:
      app: redis-enterprise
  spec:
    nodes: 3
  ```

2. Mount the TMPFS directory by adding the `redisEnterpriseVolumeMounts` and `volumes` fields to the `spec` section of the file you created.

  ```YAML
  spec:
    redisEnterpriseVolumeMounts:
      - mountPath: /etc/opt/redislabs/secrets/pem
        name: pem
    volumes:
      - emptyDir:
         medium: Memory
         sizeLimit: 64Mi
        name: pem
  ```

3. Edit the `redisEnterpriseVolumeMounts` and `volumes` fields to add values for the init container, substituting your own values.

  ```YAML
  redisEnterpriseVolumeMounts:
   - mountPath: /opt/redislabs/read-write-file.py
     name: test-script
     subPath: read-write-file.py
   - mountPath: /opt/redislabs/test-init-script-package
     name: test-init-script
  volumes:
   - emptyDir: {}
     name: test-init-script
   - name: test-script
     configMap:
        name: test-script # configMap name
        defaultMode: 511
  ```

4. Add the `redisEnterpriseAdditionalPodSpecAttributes` field under the `spec` section, substituting your own values.

  ```yaml
  redisEnterpriseAdditionalPodSpecAttributes:
    initContainers:
    - name: peminitcontainer
      env:
      - name: NAMESPACE
        valueFrom:
          fieldRef:
            fieldPath: metadata.namespace
      - name: SECRET_NAME
        value: "test-secret-pem"
      volumeMounts:
      - mountPath: /opt/redislabs/test-script/read-write-file.py
        name: test-script
        subPath: read-write-file.py
      - mountPath: /opt/redislabs/test-init-script-package
        name: test-init-script
      - mountPath: /etc/opt/redislabs/secrets/pem
        name: pem
      image: python:3.9
      imagePullPolicy: IfNotPresent
      command:
      - "/bin/bash"
      args:
      - "-c"
      - "pip3 install kubernetes==19.15.0 -t /opt/redislabs/test-init-script-package && python3 /opt/redislabs/  test-script/read-write-file.py"
      resources:
        limits:
          memory: 4Gi
          cpu: 2
        requests:
          memory: 4Gi
  ```

5. Edit the `redisEnterpriseVolumeMounts` and `volumes` sections to add values for the sidecar container.

