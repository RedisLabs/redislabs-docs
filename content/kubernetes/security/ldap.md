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

Redis Enterprise Software supports LDAP authentication and authorization through [role-based access controls]({{<relref "/rs/security/access-control/">}}) (RBAC). You can map LDAP groups to {[Redis Enterprise roles]({{<relref "/rs/security/access-control/create-roles.md">}}) to control access to your database and the [admin console]({{<relref "/rs/security/admin-console-security/">}}). For more details on how LDAP works with Redis Enterprise, see [LDAP authentication]({{<relref "/rs/security/access-control/ldap/">}}).

Redis Enterprise for Kubernetes supports enabling and configuring LDAP authentication using the RedisEnterpriseCluster (REC) custom resource. Currently, the Redis Enterprise cluster (REC) only supports configuration related to the LDAP server, such as server addresses, connection details, credentials, and query configuration.

To [map LDAP groups to Redis Enterprise access control roles]({{<relref "/rs/security/access-control/ldap/enable-role-based-ldap.md">}}), you'll need to use the Redis Enterprise [API]({{<relref "/rs/references/rest-api/requests/ldap_mappings/">}}) or [admin console]({{<relref "/rs/security/access-control/ldap/enable-role-based-ldap.md">}}).

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

### Bind credentials

For LDAP servers that require authentication for client queries, the bind credentials can be stored in a secret and referenced in the `RedisEnterpriseCluster` custom resource.

1. Create a secret to store the bind credentials.
    
    ```sh
    kubectl -n <my-rec-namespace> create secret generic ldap-bind-credentials \
        --from-literal=dn='<cn=admin,dc=example,dc=org>' \
        --from-literal=password=<adminpassword>
    ```
    The secret must:
    - reside within the same namespace as the `RedisEnterpriseCluster` custom resource
    - include a `dn` key with the Distinguish Name of the user performing the query
    - include a `password` key with the bind password

    Replace the `<placeholders>` in the command above with your own values.

1. Reference the secret name in the `.spec.ldap.bindCredentialsSecretName` field of the `RedisEnterpriseCluster` custom resource.

    ```yaml
    spec:
      ldap:
        bindCredentialsSecretName: ldap-bind-credentials
    ```

### LDAPS or STARTTLS protocols

In addition to plain LDAP protocol, Redis Enterprise Software also supports LDAPS and STARTTLS protocols for secure communication with the LDAP server.

Edit the `spec.protocol` field in the `RedisEnterpriseCluster` custom resource:

#### Enable `LDAPS`

  ```yaml
      spec:
        protocol: LDAPS
  ```

  Default port is 636 if left unspecified.

#### Enable `STARTTLS`

  ```yaml
      spec:
        protocol: STARTTLS
  ```

  Default port is 389 if left unspecified.

### CA certificate

To use a custom CA certificate for validating the LDAP server certificate, store the CA certificate in a secret and reference the secret in the `RedisEnterpriseCluster` custom resource.

1. Create a secret to hold the CA certificate.

    ```sh
    kubectl -n <my-rec-namespace> create secret generic ldap-ca-certificate --from-file=cert=cacert.pem
    ```

    The secret must:
    - reside within the same namespace as the `RedisEnterpriseCluster` custom resource
    - include a `cert` key with a PEM-encoded CA certificate

    Replace the `<placeholders>` in the command above with your own values.

1. Reference the secret name in the `spec.ldap.caCertificateSecretName` field of the `RedisEnterpriseCluster` custom resource.

    ```yaml
    spec:
      ldap:
        caCertificateSecretName: ldap-ca-certificate
    ```

### Client certificates

To use an LDAP client certificate, store the certificate in a secret and reference the secret in the `RedisEnterpriseCluster` custom resource.

1. Create a secret to hold the client certificate.

    ```sh
    kubectl -n <my-rec-namespace> create secret generic ldap-client-certificate \
      --from-literal=name=ldap_client \
      --from-file=certificate=cert.pem \
      --from-file=key=key.pem
    ```

    The secret must:
    - reside within the same namespace as the `RedisEnterpriseCluster` custom resource
    - include a `certificate` key for the public key
    - include a `key` key for the private key
    - include a `name` key explicitly set to `ldap_client`

    Replace the `<placeholders>` in the command above with your own values.

1. Reference the secret name in the `.spec.certificates.ldapClientCertificateSecretName` field of the `RedisEnterpriseCluster` custom resource.

    ```yaml
    spec:
      certificates:
        ldapClientCertificateSecretName: ldap-client-certificate
    ```

## Known limitations

Redis Enterprise Software can't resolve DNS names with a `.local` suffix.
  If your LDAP server is in the same Kubernetes cluster and exposed via a Service object, **Avoid** addresses such as `openldap.openldap.svc.cluster.local`. Instead, **use short-form addresses such as `openldap.openldap.svc`**.