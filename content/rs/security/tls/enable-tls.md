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
- Communication from your database to other clusters for replication using [Replica Of]({{<relref "/rs/databases/import-export/replica-of.md">}})
- Communication to and from your database to other clusters for synchronization using [Active-Active]({{<relref "/rs/databases/active-active/_index.md">}})

## Enable TLS for client connections {#client}

You can enable TLS by editing the configuration of an existing database (as shown below) or by selecting **Advanced Options** when you are creating a new database.

1. Select your database from your database list and navigate to the **configuration** tab.
1. Select **Edit** at the bottom of your screen.
1. Enable **TLS**.
    - **Enforce client authentication** is selected by default. If you clear this option, you will still enforce encryption, but TLS client authentication will be deactivated.
1. Select **Advanced Options** and **Require TLS for All Communications** from the dropdown menu.
    ![database-tls-all](/images/rs/database-tls-all.png "database-tls-all")
1. Select **Add** ![Add](/images/rs/icon_add.png#no-click "Add")
1. Paste your certificate or certificate authority (CA) into the text box.
    ![database-tls-replica-certs](/images/rs/database-tls-replica-certs.png "Database TLS Configuration")
1. Save the certificate. ![icon_save](/images/rs/icon_save.png#no-click "Save")
1. Repeat for each client certificate you need to add.
    - If your database uses Replica Of or Active-Active replication, you will need to add the syncer certificates for the participating clusters. The steps for each are below.
1. Optional: To limit connections further to a subset of those with valid certificates, enforce **Subject Alternative Name** and enter authorized users separated with commas.
1. Select **Update** at the bottom of the screen to save your configuration.
1. Optional: By default, Redis Enterprise Software validates client certificate expiration dates.  You can use `rladmin` to turn off this behavior.
    ```sh
    rladmin tune db < db:id | name > mtls_allow_outdated_certs enabled
    ```

## Enable TLS for Active-Active cluster connections

{{< note >}}
You cannot enable or turn off TLS after the Active-Active database is created, but you can change the TLS configuration.
{{< /note >}}

### Retrieve syncer certificates

1. For each participating cluster, copy the syncer certificate from the **general** settings tab.
    ![general-settings-syncer-cert](/images/rs/general-settings-syncer-cert.png "general-settings-syncer-cert")

### Configure TLS certificates for Active-Active

1. During database creation (see [Create an Active-Active Geo-Replicated Database]({{<relref "content/rs/databases/active-active/create-active-active.md" >}}), select **Edit** from the **configuration** tab.
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

You can enable TLS by editing the configuration of an existing database (as shown below) or by selecting **Advanced Options** when you are creating a new database.

1. For each cluster hosting a replica, copy the syncer certificate from the **general** settings tab.
1. Select your database from your database list and navigate to the **configuration** tab.
1. Select **Edit** at the bottom of your screen.
1. Enable **TLS**.
    - **Enforce client authentication** is selected by default. If you clear this option, you will still enforce encryption, but TLS client authentication will be deactivated.
1. Under **Advanced Options**, Select **Require TLS for Replica Of Only** from the dropdown menu.
    ![database-tls-all](/images/rs/database-tls-all.png "database-tls-all")
1. Select **Add** ![Add](/images/rs/icon_add.png#no-click "Add")
1. Paste a syncer certificate into the text box.
    ![database-tls-replica-certs](/images/rs/database-tls-replica-certs.png "Database TLS Configuration")
1. Save the syncer certificate. ![icon_save](/images/rs/icon_save.png#no-click "Save")
1. Repeat this process, adding the syncer certificate for each cluster hosting a replica of this database.
1. Optional: If you also want to require TLS for client connections, select **Require TLS for All Communications** from the dropdown and add client certificates as well.
1. Select **Update** at the bottom of the screen to save your configuration.
