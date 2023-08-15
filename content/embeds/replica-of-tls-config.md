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