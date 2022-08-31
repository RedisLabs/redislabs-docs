---
title: Update certificates
linkTitle: Update certificates
description: Update certificates in a Redis Enterprise cluster.
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/administering/cluster-operations/updating-certificates",
"/rs/administering/cluster-operations/updating-certificates/",
"/rs/administering/cluster-operations/updating-certificates.md"]
---

{{<warning>}}
When you update the certificates, the new certificate replaces the same certificates on all nodes in the cluster.
{{</warning>}}

## How to update certificates

You can use either the `rladmin` command-line interface (CLI) or the REST API to update certificates.

The new certificates are used the next time the clients connect to the database.

When you upgrade Redis Enterprise Software, the upgrade process copies the certificates that are on the first upgraded node to all of the nodes in the cluster.

### Use the CLI

To replace certificates with the `rladmin` CLI, run:

```sh
 rladmin cluster certificate set <cert-name> certificate_file <cert-file-name>.pem key_file <key-file-name>.pem
```

Replace the following variables with your own values:

- `<cert-name>` - The name of the certificate you want to replace:
  - For the admin console: `cm`
  - For the REST API: `api`
  - For the database endpoint: `proxy`
  - For the syncer: `syncer`
  - For the metrics exporter: `metrics_exporter`
- `<cert-file-name>` - The name of your certificate file
- `<key-file-name>` - The name of your key file

For example, to replace the cm certificate with the private key "key.pem" and the certificate file "cluster.pem":

```sh
rladmin cluster certificate set cm certificate_file cluster.pem key_file key.pem
```

### Use the REST API

To replace a certificate using the REST API, use [`PUT /v1/cluster/update_cert`]({{< relref "/rs/references/rest-api/requests/cluster/update-cert#put-cluster-update_cert" >}}):

```sh
PUT https://[host][:port]/v1/cluster/update_cert
    '{ "name": "<cert_name>", "key": "<key>", "certificate": "<cert>" }'
```

Replace the following variables with your own values:

- `<cert_name>` - The name of the certificate to replace:
  - For the admin console: `cm`
  - For the REST API: `api`
  - For the database endpoint: `proxy`
  - For the syncer: `syncer`
  - For the metrics exporter: `metrics_exporter`
- `<key>` - The contents of the \*\_key.pem file

    {{< tip >}}

  The key file contains `\n` end of line characters (EOL) that you cannot paste into the API call.
  You can use `sed -z 's/\n/\\\n/g'` to escape the EOL characters.
  {{< /tip >}}

- `<cert>` - The contents of the \*\_cert.pem file

## Active-Passive database certificates

### Update proxy certificates {#update-ap-proxy-certs}

To update the proxy certificate on clusters running Active-Passive (Replica Of) databases:

- **Step 1:**  Use `rladmin` or the REST API to update the proxy certificate on the source database cluster.
- **Step 2:** From the admin console, update the destination database (_replica_) configuration with the [new certificate]({{<relref "/rs/databases/import-export/replica-of/create#configuring-tls-for-replica-of-traffic-on-the-destination-database">}}).

{{<note>}}
- Perform Step 2 as quickly as possible after performing Step 1.  Connections using the previous certificate are rejected after applying the new certificate.  Until both steps are performed, recovery of the database sync cannot be established.
{{</note>}}

## Active-Active database certificates

### Update proxy certificates {#update-aa-proxy-certs}

To update proxy certificate on clusters running Active-Active databases:

- **Step 1:** Use `rladmin` or the REST API to update proxy certificates on a single cluster, multiple clusters, or all participating clusters.
- **Step 2:** Use the [`crdb-cli`]({{<relref "/rs/references/cli-utilities/crdb-cli">}}) utility to update Active-Active database configuration from the command line. Run the following command once for each Active-Active database residing on the modified clusters:

    ```sh
    crdb-cli crdb update --crdb-guid <CRDB-GUID> --force
    ```

{{<note>}}
- Perform Step 2 as quickly as possible after performing Step 1.  Connections using the previous certificate are rejected after applying the new certificate.  Until both steps are performed, recovery of the database sync cannot be established .
- Do not run any other `crdb-cli crdb update` operations between the two steps.
{{</note>}}

### Update syncer certificates {#update-aa-syncer-certs}

To update your syncer certificate on clusters running Active-Active databases, follow these steps:

- **Step 1:** Update your syncer certificate on one or more of the participating clusters using the `rladmin` command, REST API, or admin console. You can update a single cluster, multiple clusters, or all participating clusters.
- **Step 2:** Update the Active-Active database configuration from the command line with the [`crdb-cli`]({{<relref "/rs/references/cli-utilities/crdb-cli">}}) utility. Run this command once for each Active-Active database that resides on the modified clusters:

    ```sh
    crdb-cli crdb update --crdb-guid <CRDB-GUID> --force
    ```

{{<note>}}
- Run step 2 as quickly as possible after step 1. Between the two steps, new syncer connections that use the ‘old’ certificate will get rejected by the cluster that has been updated with the new certificate (in step 1).
- Do not run any other `crdb-cli crdb update` operations between the two steps.
- **Known limitation**: Updating syncer certificate on versions prior to 6.0.20-81 will restart the proxy and syncer connections. We recommend you schedule the certificate replacement carefully.
{{</note>}}
