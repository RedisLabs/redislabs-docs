1. In the web browser on the host machine, go to [https://localhost:8443](https://localhost:8443) to see
the Redis Enterprise Software admin console.

    {{< note >}}
- If your browser displays a certificate error, you can safely proceed.
- If the server does not show the login screen, try again after a few minutes.

    {{< /note >}}

1. Choose **Setup** to begin configuring the node.

    {{<image filename="/images/rs/rs-setup-new-cluster.png" alt="When you first install Redis Enterprise Software, you need to set up a cluster." >}}{{< /image >}}

1. In the **Node Configuration** settings, enter a cluster FQDN such as `cluster.local' and then select 
**Next**.

    {{<image filename="/images/rs/rs-setup-node-config.png" alt="When you first install Redis Enterprise Software, you need to set up a cluster." >}}{{< /image >}}

1. If you have a license key, enter it and then select **Next**.

    If you do not have a license key, a trial version is installed.

1. Enter an email and password for the administrator account.

    {{<image filename="/images/rs/rs-setup-set-admin-creds.png" alt="Set the credentials for your admin user." >}}{{< /image >}}

    These credentials are also used for connections to the REST API.

1. Select **OK** to acknowledge the replacement of the HTTPS TLS certificate on the node.  If you receive a browser warning, you can proceed safely.
