1. In the web browser on the host machine, go to [https://localhost:8443/new](https://localhost:8443/new) to see
the new Redis Enterprise Software Cluster Manager UI.

    To use the legacy UI for this quickstart instead, see the [6.4 version of the quickstarts](https://docs.redis.com/6.4/rs/installing-upgrading/quickstarts/).

    {{< note >}}
- If your browser displays a certificate error, you can safely proceed.
- If the server does not show the login screen, try again after a few minutes.

    {{< /note >}}

1. Select **Create new cluster**.

    {{<image filename="images/rs/screenshots/cluster/setup/create-cluster.png" alt="When you first install Redis Enterprise Software, you need to set up a cluster." >}}{{</image>}}

1. Enter an email and password for the administrator account, then select **Next** to proceed to cluster setup.

    {{<image filename="images/rs/screenshots/cluster/setup/admin-credentials.png" alt="Set the credentials for your admin user." >}}{{</image>}}

    You can also use these credentials to connect to the [REST API]({{<relref "/rs/references/rest-api">}}).

1. Enter your cluster license key if you have one. Otherwise, a trial version is installed.

    {{<image filename="images/rs/screenshots/cluster/setup/cluster-license-key.png" alt="Enter your cluster license key if you have one." >}}{{</image>}}

1. In the **Configuration** section, enter a cluster FQDN such as `cluster.local`, then select **Next**.

    {{<image filename="images/rs/screenshots/cluster/setup/config-cluster.png" alt="Configure the cluster FQDN." >}}{{</image>}}

    {{< warning >}}
If the FQDN is `cluster.local`, you cannot configure DNS. You cannot change the FQDN after cluster creation.
    {{< /warning >}}

1. On the node setup screen, select **Create cluster**.

1. Select **OK** to acknowledge the replacement of the HTTPS TLS certificate on the node.  If you receive a browser warning, you can proceed safely.
