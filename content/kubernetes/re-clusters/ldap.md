## LDAP support in Redis Enterprise Software

Redis Enterprise Software supports LDAP authentication and authorization for both database, API and admin console access.

LDAP queries are executed with an external LDAP server which authenticates users based on their credentials, and associate them with user groups.
These user groups are then mapped to roles within the Redis Enterprise cluster, which in turn can be associated with management roles and/or Redis ACLs.
The level of access granted to an authenticated user is then governed by the realized management roles and Redis ACLs associated with its LDAP user group.

More information can be found in the Redis Enterprise Software [LDAP documentation](https://docs.redis.com/latest/rs/security/access-control/ldap/).

## LDAP Support in Redis Enterprise Operator for Kubernetes

Redis Enterprise Operator can be used to enable LDAP authentication and authorization in Redis Enterprise Software, and provide LDAP servers configuration.

As of now, the operator supports LDAP servers related configuration, such as servers addresses and connection details, credentials, query configuration, etc.
A future release may introduce operator support for configuring LDAP mappings and roles within Redis Enterprise Software.

LDAP configuration in Kubernetes is controlled via the `.spec.ldap` field in the `RedisEnterpriseCluster` custom resource.

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

Refer to the `RedisEnterpriseCluster` [reference documentation](../redis_enterprise_cluster_api.md#ldapspec) for full details on the available fields and their meaning.

### Configuring LDAP server bind credentials

For LDAP servers that require authentication for client queries, the bind credentials can be stored in a secret and referenced in the `RedisEnterpriseCluster` custom resource.

The secret must reside within the same namespace as the `RedisEnterpriseCluster` custom resource, and include a `dn` key with the Distinguish Name of the user performing the query, and a `password` key with the bind password.

The following example command creates such a secret:

```sh
kubectl -n my-rec-namespace create secret generic ldap-bind-credentials \
    --from-literal=dn='cn=admin,dc=example,dc=org' \
    --from-literal=password=adminpassword
```

Once configured, the secret can be referenced in the `RedisEnterpriseCluster` custom resource by specifying its name via the `.spec.ldap.bindCredentialsSecretName` field:

```yaml
spec:
  ldap:
    bindCredentialsSecretName: ldap-bind-credentials
```

### Enabling secure LDAP communication

In addition to plain LDAP protocol, Redis Enterprise Software also supports LDAPS and STARTTLS protocols for secure communication with the LDAP server.

To use one of these secure protocols, set the `.spec.protocol` field to either `LDAPS` or `STARTTLS`.
Note that the default port, if unspecified, is 389 for `STARTTLS` (as well as plain `LDAP`) protocols, and 636 for `LDAPS` protocol.

### Configuring CA certificate for secure LDAP communication

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

### Configuring client certificate authentication for secure LDAP communication

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
  Instead, you may use short-form addresses such as `openldap.openldap.svc`.