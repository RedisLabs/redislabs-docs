---
title: Update TLS certificates
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/administering/cluster-operations/updating-certificates",
"/rs/administering/cluster-operations/updating-certificates/",
"/rs/administering/cluster-operations/updating-certificates.md"]
---

Redis Enterprise Software uses self-signed certificates out-of-the-box to make sure that the product is secure by default.
The self-signed certificates are used to establish encryption-in-transit for the following traffic:

- Management admin console (CM) - The certificate for connections to the management admin console
- REST API - The certificate for REST API calls
- Proxy - The certificate for connections between clients and database endpoints
- Syncer - The certificate for Active-Active and Replica Of synchronization between clusters
- Metrics exporter - The certificate to export metrics to Prometheus

These self-signed certificates are generated on the first node of each Redis Enterprise Software installation and are copied to all other nodes added to the cluster.

When you use the default self-signed certificates and you connect to the admin console over a web browser, you'll seen an untrusted connection notification.

Depending on your browser, you can allow the connection for each session or add an exception to trust the certificate for all future sessions.

{{< warning >}}
When you update the certificates, the new certificate replaces the same certificates on all nodes in the cluster.
{{< /warning >}}

## How to update TLS certificates

You can use either the rladmin command-line interface (CLI) or the REST API to update the certificates.

### Using the CLI

To replace certificates using the rladmin CLI, run:

```sh
 rladmin cluster certificate set <cert-name> certificate_file <cert-file-name>.pem key_file <key-file-name>.pem
```

Where:

- cert-name - The name of certificate you want to replace:
  - For management UI: `cm`
  - For REST API: `api`
  - For database endpoint: `proxy`
  - For syncer: `syncer`
  - For metrics exporter: `metrics_exporter`
- cert-file-name - The name of your certificate file
- key-file-name - The name of your key file

For example, to replace the cm certificate with the private key "key.pem" and the certificate file "cluster.pem":

```sh
rladmin cluster certificate set cm certificate_file cluster.pem key_file key.pem
```
The following sections describe how to update proxy and syncer certificates for Active-Active and Active-Passive (Replica Of) databases.

### Using the REST API

To replace a certificate using the REST API, run:

```sh
curl -k -X PUT -u "<username>:<password>" -H "Content-Type: application/json" -d '{ "name": "<cert_name>", "key": "<key>", "certificate": "<cert>" }' https://<cluster_address>:9443/v1/cluster/update_cert
```

Where:

- cert_name - The name of the certificate to replace:
  - For management admin console: `cm`
  - For REST API: `api`
  - For database endpoint: `proxy`
  - For syncer: `syncer`
  - For metrics exporter: `metrics_exporter`
- key - The contents of the \*\_key.pem file

    {{< tip >}}

  The key file contains `\n` end of line characters (EOL) that you cannot paste into the API call.
  You can use `sed -z 's/\n/\\\n/g'` to escape the EOL characters.
  {{< /tip >}}

- cert - The contents of the \*\_cert.pem file

The new certificates are used the next time the clients connect to the database.

Read bellow about updating your proxy and syncer certificates for Active-Active and Actice-Passive (Replica Of) Redis databases.

When you upgrade Redis Enterprise Software, the upgrade process copies the certificates that are on the first upgraded node to all of the nodes in the cluster.

### Update proxy certificates for Active-Active databases

To update proxy certificate on clusters running Active-Active databases:

- **Step 1:** Use `rladmin` or the REST API to update proxy certificates on a single cluster, multiple clusters, or all participating clusters.
- **Step 2:** Use the [`crdb-cli`]({{< relref "rs/references/crdb-cli-reference.md" >}}) utility to update Active-Active database configuration from the command-line. Run the following command once for each Active-Active database residing on the modified clusters.

```text
crdb-cli crdb update --crdb-guid <CRDB-GUID> --force
```

{{<note>}}
- Perform Step 2 as quickly as possible after performing Step 1.  Connections using the previous certificate are rejected after applying the new certificate.  Until both steps are performed, recovery of the database sync cannot be established .
- Do not run any other `crdb-cli crdb update` operations between the two steps.
{{</note>}}

### Update proxy certificates for Active-Passive databases

To update proxy certificate on clusters running Active-Passive (Replica Of) databases:

- **Step 1:**  Use `rladmin` or the REST API to update proxy certificate on the source database cluster.
- **Step 2:** From the admin console, update the destination database (_replica_) configuration with the [new certificate]({{<relref "rs/administering/creating-databases/create-active-passive#configuring-tls-for-replica-of-traffic-on-the-destination-database">}}).

{{<note>}}
- Perform Step 2 as quickly as possible after performing Step 1.  Connections using the previous certificate are rejected after applying the new certificate.  Until both steps are performed, recovery of the database sync cannot be established .
{{</note>}}

### Update syncer certificates for Active-Active databases

To update your syncer certificate on cluster/s running Active-Active databases follow these steps:

- **Step 1:** Update your syncer certificate on one or more of the participating clusters using the `rladmin` command, REST API, or admin console. You can update a single cluster, multiple clusters, or all participating clusters.
- **Step 2:** Update the Active-Active database configuration from the command-line with the [`crdb-cli`]({{< relref "rs/references/crdb-cli-reference.md" >}}) utility. Run this command once for each Active-Active database that resides on the modified clusters.

```text
crdb-cli crdb update --crdb-guid <CRDB-GUID> --force
```

{{<note>}}
- It is required that you run step 2 shortly as possible after step 1, since between the two steps new syncer connections that use the ‘old’ certificate will get rejected by the cluster that has been updated with the new certificate (in step 1).
- Do not run any other `crdb-cli crdb update` operations between the two steps.
- **Known limitation**: Updating syncer certificate on versions prior to 6.0.20-81 will restart the proxy and syncer connections. We recommend you schedule the certificate replacement carefully.
{{</note>}}
