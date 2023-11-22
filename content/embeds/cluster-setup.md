1. In the web browser on the host machine, go to [https://localhost:8443/new](https://localhost:8443/new) to see
the new Redis Enterprise Software Cluster Manager UI. The cluster generates self-signed TLS certificates to secure the connection.  These self-signed certificates are unknown to the browser and must be accepted before you proceed.

    To use the legacy UI for this quickstart instead, see the [6.4 version of the quickstarts](https://docs.redis.com/6.4/rs/installing-upgrading/quickstarts/).

    {{< note >}}
- If the server does not show the login screen, try again after a few minutes.

    {{< /note >}}

1. Select **Create new cluster**.

    {{<image filename="images/rs/screenshots/cluster/setup/create-cluster.png" alt="When you first install Redis Enterprise Software, you need to set up a cluster." >}}{{</image>}}

2. Enter an email and password for the administrator account, then select **Next** to proceed to cluster setup.

    {{<image filename="images/rs/screenshots/cluster/setup/admin-credentials.png" alt="Set the credentials for your admin user." >}}{{</image>}}

    You can also use these credentials to connect to the [REST API]({{<relref "/rs/references/rest-api">}}).

3. Enter your cluster license key if you have one. Otherwise, a trial version is installed.

    {{<image filename="images/rs/screenshots/cluster/setup/cluster-license-key.png" alt="Enter your cluster license key if you have one." >}}{{</image>}}

4. In the **Configuration** section, enter a cluster FQDN such as `cluster.local`, then select **Next**.

    {{<image filename="images/rs/screenshots/cluster/setup/config-cluster.png" alt="Configure the cluster FQDN." >}}{{</image>}}

5. On the node setup screen, select **Create cluster** to accept the defaults.

{{<image filename="images/rs/screenshots/cluster/setup/node-settings.png" alt="Configure the node specific settings." >}}{{</image>}}

6. Select **OK** to acknowledge the replacement of the HTTPS TLS certificate on the node.  If you receive a browser warning, you can proceed safely.
