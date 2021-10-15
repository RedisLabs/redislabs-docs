---
Title: Manage Redis Enterprise cluster (REC) certificates
linkTitle: Manage certificates
weight: 94
alwaysopen: false
categories: ["Platforms"]
aliases: [ 
    /kubernetes/security/manage_certifcates.md,
    /kubernetes/security/manage_certifcates/,
]
---

OVERVIEW HERE
currently deploy with defaults?? Where are they stored now?

list of certificates supported and what they are used for

how certs are managed differently in k8s vs rs

LINK TO RS CERT DOCS

## Create a secret to hold the new certificate

is this done by the operator by default, or do users need to create a secret for each cert they want to update?????

## Update certificates in the REC custom resource

edit the rec spec section

```yaml
spec:
  apiCertificateSecretName: <apicert>
  cmCertificateSecretName: <cmcert>
  syncerCertificateSecretName: <syncercert>
  metricsExporterCertificateSecretName: <metricscert>
  proxyCertificateSecretName: <proxycert>
```

## Update certificates through the API

You can read the available Redis Enterprise cluster (REC) certificates with the API path `/v1/cluster/certifcates`.

To update a certificate via the API,...PUT request to /v1/cluster/update_cert with the following json structure has to be sent: `{“name”: <cert_name>, “certificate”: <certificate>, “key”: <cert_key>}`.


## Troubleshooting

### Expired certificate

How do they know it's expired? 

### Invalid secret

### Invalid certificate
