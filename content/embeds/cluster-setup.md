1. In the web browser on the host machine, go to https://localhost:8443 to see
the Redis Enterprise Software web console.

    {{< note >}}
- Depending on your browser, you may see a certificate error. You can safely
continue to the web console.
- If the server does not show the login screen, try again after a few minutes.

    {{< /note >}}

1. Click **Setup** to start the node configuration steps.

    ![Redis Enterprise Software Setup](/images/rs/getstarted-setup.png)

1. In the **Node Configuration** settings, enter a cluster FQDN such as `cluster.local`.
Then click **Next** button.

    ![Redis Enterprise Software node configuration](/images/rs/getstarted-nodeconfig.png)

1. Enter your license key, if you have one. If not, click the **Next** button to use the trial version.

1. Enter an email and password for the admin account for the web console.

    ![Redis Enterprise Software admin credentials](/images/rs/getstarted-admincredentials.png)

    These credentials are also used for connections to the REST API.

1. Click **OK** to confirm that you are aware of the replacement of the HTTPS SSL/TLS
certificate on the node, and proceed through the browser warning.
