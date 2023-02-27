---
Title: Enable LDAP authentication
linkTitle: Enable LDAP
description: Enable LDAP authentication for Redis Enterprise for Kubernetes. 
weight: 95
alwaysopen: false
categories: ["Platforms"]
aliases: [ 
  /kubernetes/security/ldap.md,
  /kubernetes/security/ldap/,
]
---

## LDAP support for Redis Enterprise Software

Redis Enterprise Software supports LDAP authentication and authorization through [role-based access controls]({{<relref "/rs/security/access-control/">}}) (RBAC). You can map LDAP groups to {[Redis Enterprise roles]({{<relref "/rs/security/access-control/create-roles.md">}}) to control access to your database and the [admin console]({{<relref "/rs/security/admin-console-security/">}}). For more details on how LDAP works with Redis Enterprise, see [LDAP authentication](https://docs.redis.com/latest/rs/security/access-control/ldap/).

Redis Enterprise for Kubernetes supports enabling and configuring LDAP authentication using the RedisEnterpriseCluster (REC) custom resource. Currently, the Redis Enterprise cluster (REC) only supports configuration related to the LDAP servers, such as server addresses, connection details, credentials, and query configuration.

To [map LDAP groups to Redis Enterprise access control roles]({{<relref "/rs/security/access-control/ldap/enable-role-based-ldap.md">}}), you'll need to use the Redis Enterprise [API]({{<relref "/rs/references/rest-api/">}}) or [admin console]({{<relref "/rs/security/access-control/ldap/enable-role-based-ldap.md">}}).

## Enable LDAP for Redis Enterprise cluster (REC)

Use the `.spec.ldap` field in the `RedisEnterpriseCluster` custom resource to enable LDAP for Redis Enterprise cluster (REC).

The following `RedisEnterpriseCluster` example resource enables a basic LDAP configuration:

```yaml
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: rec
spec:
  nodes: 3
  ldap:
    protocol: LDAP
    servers:
    - host: openldap.openldap.svc,
      port: 389
    bindCredentialsSecretName: ldap-bind-credentials
    cacheTTLSeconds: 600
    enabledForControlPlane: true
    enabledForDataPlane: true
    authenticationQuery:
      template: cn=%u,ou=default,dc=example,dc=org
    authorizationQuery:
      attribute: memberOf
```

Refer to the `RedisEnterpriseCluster` [API reference](../redis_enterprise_cluster_api.md#ldapspec) for full details on the available fields.

### Configure LDAP server bind credentials

For LDAP servers that require authentication for client queries, the bind credentials can be stored in a secret and referenced in the `RedisEnterpriseCluster` custom resource.

1. Create a secret to store the bind credentials.
    The secret must:
    - reside within the same namespace as the `RedisEnterpriseCluster` custom resource
    - include a `dn` key with the Distinguish Name of the user performing the query
    - include a `password` key with the bind password

    ```sh
    kubectl -n <my-rec-namespace> create secret generic ldap-bind-credentials \
        --from-literal=dn='<cn=admin,dc=example,dc=org>' \
        --from-literal=password=<adminpassword>
    ```
    Replace the `<placeholders>` with your own values.

1. Reference the secret name in the `.spec.ldap.bindCredentialsSecretName` field of the `RedisEnterpriseCluster` custom resource.

    ```yaml
    spec:
      ldap:
        bindCredentialsSecretName: ldap-bind-credentials
    ```

### Enable secure LDAP communication

In addition to plain LDAP protocol, Redis Enterprise Software also supports LDAPS and STARTTLS protocols for secure communication with the LDAP server.

To use one of these secure protocols, set the `.spec.protocol` field to either `LDAPS` or `STARTTLS`.
Note that the default port, if unspecified, is 389 for `STARTTLS` (as well as plain `LDAP`) protocols, and 636 for `LDAPS` protocol.

### Configure CA certificate

To configure a custom CA certificate for validating the LDAP servers certificate, the CA certificate can be stored in a secret and referenced in the `RedisEnterpriseCluster` custom resource.

The secret must reside within the same namespace as the `RedisEnterpriseCluster` custom resource, and include a `cert` key with a PEM-encoded CA certificate.
The following example command creates such a secret:

```sh
kubectl -n my-rec-namespace create secret generic ldap-ca-certificate --from-file=cert=cacert.pem
```

Once configured, the secret can be referenced in the `RedisEnterpriseCluster` custom resource by specifying its name via the `.spec.ldap.caCertificateSecretName` field:

```yaml
spec:
  ldap:
    caCertificateSecretName: ldap-ca-certificate
```

### Configure client certificate authentication

In addition to LDAP bind authentication, the LDAP client within Redis Enterprise Software can use a client certificate to authenticate with the LDAP server.
To configure the LDAP client certificate, the certificate cna be stored in a secret and referenced in the `RedisEnterpriseCluster` custom resource.

The secret must reside within the same namespace as the `RedisEnterpriseCluster` custom resource, and include a `certificate` and `key` keys with the public and private keys respectively, as well as a `name` key explicitly set to `ldap_client`.

The following example command creates such a secret:

```sh
kubectl -n my-rec-namespace create secret generic ldap-client-certificate \
    --from-literal=name=ldap_client \
    --from-file=certificate=cert.pem \
    --from-file=key=key.pem
```

Once configured, the secret can be referenced in the `RedisEnterpriseCluster` custom resource by specifying its name via the `.spec.certificates.ldapClientCertificateSecretName` field:

```yaml
spec:
  certificates:
    ldapClientCertificateSecretName: ldap-client-certificate
```

## Caveats

- LDAP mappings configuration cannot be configured via the operator at this time.
  To configure LDAP mappings, the Redis Enterprise Software [API](https://docs.redis.com/latest/rs/references/rest-api/requests/ldap_mappings/) or [admin console](https://docs.redis.com/latest/rs/security/access-control/ldap/map-ldap-groups-to-roles/) must be used.
- Redis Enterprise Software cannot currently resolve DNS names with a `.local` suffix.
  If your LDAP server is running within the same Kubernetes cluster and exposed via a Service object, avoid specifying addresses such as `openldap.openldap.svc.cluster.local`.
  Instead, use short-form addresses such as `openldap.openldap.svc`.