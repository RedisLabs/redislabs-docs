---
Title: Manage Redis Enterprise cluster (REC) certificates
linkTitle: Manage REC certificates
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

Create the [secret](https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-kubectl/) with the required fields shown below.

    ```sh
    kubectl create secret generic <secret-name> \
      --from-file=certificate=</PATH/TO/certificate.pem> \
      --from-file=key=</PATH/TO/key.pem> \
      --from-literal=name=<proxy | api | cm | syncer | metrics_exporter>
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

### Update certificates through the API

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

- [Update certificates]({{<relref "/rs/security/certificates/updating-certificates">}})
- [Install your own certificates]({{<relref "/rs/security/certificates/create-certificates">}})
- [Glossary/Transport Layer Security (TLS)]({{< relref "/glossary#letter-t">}})
