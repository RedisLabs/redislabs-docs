---
Title: Manage Redis Enterprise cluster (REC) certificates
linkTitle: Manage certificates
description: Install your own certificates to be used by the Redis Enterprise cluster's operator. 
weight: 94
alwaysopen: false
categories: ["Platforms"]
aliases: [ 
    /kubernetes/security/manage_certificates.md,
    /kubernetes/security/manage_certificates/,
]
---

By default, Redis Enterprise Software for Kubernetes generates TLS certificates for the cluster during creation. These self-signed certificates are generated on the first node of each Redis Enterprise cluster (REC) and are copied to all other nodes added to the cluster.

Below are the names of certificates used by Redis Enterprise Software and the traffic they encrypt:

- `proxy` - for connections between clients and database endpoints
- `api` - for REST API calls
- `cm` - for connections to the management admin console
- `syncer` - for Active-Active and Replica Of synchronization between Redis Enterprise clusters
- `metrics_exporter` - for exporting metrics to Prometheus

To install and use your own certificates with Kubernetes on your Redis Enterprise cluster, they need to be stored in [secrets](https://kubernetes.io/docs/concepts/configuration/secret/). The REC custom resource also needs to be configured with those secret names to read and use the certificates.

## Create a secret to hold the new certificate

1. [Create the secret config file](https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-config-file/) with the required fields shown below.

    ```yaml
    apiVersion: v1
    kind: Secret
    type: Opaque
    metadata:
      name: <secret-name>
    data:
      name: { proxy | api | cm | syncer | metrics_exporter } 
      certificate: <certificate-string>
      key:  <key-string>  
    ```

1. Apply the file to create the secret resource.
    ```bash
    kubectl apply -f <secret-name>.yaml
    ```

## Update certificates in the REC custom resource

Edit the Redis Enterprise cluster (REC) custom resource to add a `certificates` subsection under the `spec` section. You are only required to add the fields for the certificates you are installing.

```yaml
spec:
  certificates:
    apiCertificateSecretName: <apicert-secret-name>
    cmCertificateSecretName: <cmcert-secret-name>
    syncerCertificateSecretName: <syncercert-secret-name>
    metricsExporterCertificateSecretName: <metricscert-secret-name>
    proxyCertificateSecretName: <proxycert-secret-name>
```

#### Update certificates through the API

Alternatively, you can also update the REC certificates via the API:

```API
PUT /v1/cluster/update_cert
{
   "certificate": <certificate>, 
   "key": <cert-key>,
   "name": <cert-name> 
}
```

### Verify the certificate was updated

Check the operator logs and use the API to verify the certificate has been updated.

  ```api
  GET /v1/cluster/certificates
  ```

## More info

- [Updating SSL/TLS certificates]({{<relref "/rs/security/certificates/updating-certificates">}})
- [Installing your own certificates]({{<relref "/rs/security/tls#installing-your-own-certificates">}})
- [Manage TLS certificates]({{<relref "/rs/security/certificates/encryption">}})
- [Glossary/Transport Layer Security (TLS)]({{< relref "/glossary#letter-t">}})
