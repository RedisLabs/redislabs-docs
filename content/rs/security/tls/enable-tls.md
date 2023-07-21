---
Title: Enable TLS
linkTitle: Enable TLS
description: Shows how to enable TLS.
weight: 40
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/administering/designing-production/security/tls-configuration", 
"/rs/administering/designing-production/security/client-connections"]
---

You can use TLS authentication for one or more of the following types of communication:

- Communication from clients (applications) to your database
- Communication from your database to other clusters for replication using [Replica Of]({{<relref "/rs/databases/import-export/replica-of/">}})
- Communication to and from your database to other clusters for synchronization using [Active-Active]({{<relref "/rs/databases/active-active/_index.md">}})

## Enable TLS for client connections {#client}

To enable TLS for client connections:

1. From your database's **Security** tab, select **Edit**.

1. In the **Secure connections (via TLS - Transport Layer Security)** section, select **Mutual TLS authentication**.

    {{<image filename="images/rs/screenshots/databases/security-mtls-clients.png"  alt="Mutual TLS authentication configuration.">}}{{</image>}}

1. For **Communication scope**, select **Replica Of source database and clients**.

1. For each client certificate, select **+ Add certificate**, paste or upload the client certificate, then select **Done**.

    If your database uses Replica Of or Active-Active replication, you also need to add the syncer certificates for the participating clusters. See [Enable TLS for Replica Of cluster connections](#enable-tls-for-replica-of-cluster-connections) or [Enable TLS for Active-Active cluster connections](#enable-tls-for-active-active-cluster-connections) for instructions.

1. You can configure **Additional certificate validations** to further limit connections to clients with valid certificates.

    Additional certificate validations occur only when loading a [certificate chain](https://en.wikipedia.org/wiki/Chain_of_trust#Computer_security) that includes the [root certificate](https://en.wikipedia.org/wiki/Root_certificate) and intermediate [CA](https://en.wikipedia.org/wiki/Certificate_authority) certificate but does not include a leaf (end-entity) certificate. If you include a leaf certificate, mutual client authentication skips any additional certificate validations.

    1. Select a certificate validation option.

        | Validation option | Description |
        |-------------------|-------------|
        | _No validation_ | Authenticates clients with valid certificates. No additional validations are enforced. |
        | _By Subject Alternative Name_ | A client certificate is valid only if its Common Name (CN) matches an entry in the list of valid subjects. Ignores other [`Subject`](https://datatracker.ietf.org/doc/html/rfc5280#section-4.1.2.6) attributes. |
        | _By full Subject Name_ | A client certificate is valid only if its [`Subject`](https://datatracker.ietf.org/doc/html/rfc5280#section-4.1.2.6) attributes match an entry in the list of valid subjects. |

    1. If you selected **No validation**, you can skip this step. Otherwise, select **+ Add validation** to create a new entry and then enter valid [`Subject`](https://datatracker.ietf.org/doc/html/rfc5280#section-4.1.2.6) attributes for your client certificates. All `Subject` attributes are case-sensitive.

        | Subject attribute<br />(case-sensitive) | Description |
        |-------------------|-------------|
        | _Common Name (CN)_ | Name of the client authenticated by the certificate (_required_) |
        | _Organization (O)_ | The client's organization or company name |
        | <nobr>_Organizational Unit (OU)_</nobr> | Name of the unit or department within the organization |
        | _Locality (L)_ | The organization's city |
        | _State / Province (ST)_ | The organization's state or province |
        | _Country (C)_ | 2-letter code that represents the organization's country |

        You can only enter a single value for each field, except for the _Organizational Unit (OU)_ field. If your client certificate has a `Subject` with multiple  _Organizational Unit (OU)_ values, enter a comma-separated list of values with each value enclosed in quotation marks (for example `"unit1","unit2"`).

        **Breaking change:** If you use the [REST API]({{<relref "/rs/references/rest-api">}}) instead of the admin console to configure additional certificate validations, note that `authorized_names` is deprecated as of Redis Enterprise v6.4.2. Use `authorized_subjects` instead. See the [BDB object reference]({{<relref "/rs/references/rest-api/objects/bdb">}}) for more details.

1. Select **Save**.

1. _(Optional)_ By default, Redis Enterprise Software validates client certificate expiration dates.  You can use `rladmin` to turn off this behavior.

    ```sh
    rladmin tune db < db:id | name > mtls_allow_outdated_certs enabled
    ```

## Enable TLS for Active-Active cluster connections

To enable TLS for Active-Active cluster connections:

1. If you are using the new admin console, switch to the legacy admin console.

1. [Retrieve syncer certificates.](#retrieve-syncer-certificates)

1. [Configure TLS certificates for Active-Active.](#configure-tls-certificates-for-active-active)

1. [Configure TLS on all participating clusters.](#configure-tls-on-all-participating-clusters)

{{< note >}}
You cannot enable or turn off TLS after the Active-Active database is created, but you can change the TLS configuration.
{{< /note >}}

### Retrieve syncer certificates

For each participating cluster, copy the syncer certificate from the **general** settings tab.

![general-settings-syncer-cert](/images/rs/general-settings-syncer-cert.png "general-settings-syncer-cert")

### Configure TLS certificates for Active-Active

1. During database creation (see [Create an Active-Active Geo-Replicated Database]({{<relref "/rs/databases/active-active/create.md" >}}), select **Edit** from the **configuration** tab.
1. Enable **TLS**.
    - **Enforce client authentication** is selected by default. If you clear this option, you will still enforce encryption, but TLS client authentication will be deactivated.
1. Select **Require TLS for CRDB communication only** from the dropdown menu.
    ![crdb-tls-all](/images/rs/crdb-tls-all.png "crdb-tls-all")
1. Select **Add** ![Add](/images/rs/icon_add.png#no-click "Add")
1. Paste a syncer certificate into the text box.
    ![database-tls-replica-certs](/images/rs/database-tls-replica-certs.png "Database TLS Configuration")
1. Save the syncer certificate. ![icon_save](/images/rs/icon_save.png#no-click "Save")
1. Repeat this process, adding the syncer certificate for each participating cluster.
1. Optional: If also you want to require TLS for client connections, select **Require TLS for All Communications** from the dropdown and add client certificates as well.
1. Select **Update** at the bottom of the screen to save your configuration.

### Configure TLS on all participating clusters

Repeat this process on all participating clusters.

To enforce TLS authentication, Active-Active databases require syncer certificates for each cluster connection. If every participating cluster doesn't have a syncer certificate for every other participating cluster, synchronization will fail.

## Enable TLS for Replica Of cluster connections

To enable TLS for Replica Of cluster connections:

1. For each cluster hosting a replica:

    1. Go to **Cluster > Security > Certificates**.

    1. Expand the **Replica Of and Active-Active authentication (Syncer certificate)** section.

        {{<image filename="images/rs/screenshots/cluster/security-syncer-cert.png"  alt="Syncer certificate for Replica Of and Active-Active authentication.">}}{{</image>}}
    
    1. Download or copy the syncer certificate.

1. From the **Security** tab of the Replica Of source database, select **Edit**.

1. In the **Secure connections (via TLS - Transport Layer Security)** section, select **Mutual TLS authentication**.

    {{<image filename="images/rs/screenshots/databases/security-tls-replica-of.png"  alt="Replica Of TLS authentication configuration.">}}{{</image>}}

1. For **Communication scope**, select **Replica Of source database**.

1. Select **+ Add certificate**, paste or upload the syncer certificate, then select **Done**.

    Repeat this process, adding the syncer certificate for each cluster hosting a replica of this database.

1. _(Optional)_ If you also want to require TLS for client connections, change **Communication scope** to **Replica Of source database and clients** and add client certificates.

1. Select **Save**.
