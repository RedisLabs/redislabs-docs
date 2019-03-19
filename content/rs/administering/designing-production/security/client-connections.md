---
Title: Securing Redis Client Connections
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/designing-production/security/client-connections/
---
If you configure it, Redis Enterprise Software (RS) can
use industry-standard encryption to protect your data in transit between
a Redis client and RS. This is commonly referred to as transport layer
security (TLS) or secure socket layer (SSL) technology. While SSL is a
common industry term, RS actually supports the more secure TLS standard,
but you will see both names used interchangeably here and in RS. Just
know that it is TLS. For more about TLS version info, please see the
bottom of this page.

To enable SSL/TLS you must configure the RS cluster nodes, the database,
and the client, as detailed below.

### Configuration of the RS nodes

By default, each cluster node has a different set of self-signed
certificates. These certificates can be replaced with your own
certificate, preferably a certificate issued by an intermediate
certificate authority (CA). For additional details, refer to [Updating
SSL/TLS
certificates]({{< relref "/rs/administering/cluster-operations/updating-certificates.md" >}}).

### Configuration of the database

To encrypt the connection to the database endpoint with SSL, enter the
contents the client certificate
to the **SSL client authentication** field.

**Note**: Once SSL/TLS encryption is enabled for the database endpoint,
the database will not accept non-SSL connections.

**Note**: SSL/TLS encryption can significantly impact database
throughput and latency.

### Adding SSL/TLS CA signed certificates to the proxy

#### Background

1. The proxy is responsible for terminating the SSL/TLS connection
1. Server certificate and key are located on
    /etc/opt/redislabs:proxy_cert.pem - server certificate
    thatproxy_key.pem - server certificate key\*any update on these
    require a proxy restart
1. Enabling of SSL/TLS is done via "ssl authentication" field in the
    UI. You are required to add a client-side certificate as a SSL/TLS
    connection is done via client certificate authentication (not just
    server side authentication).

#### Installing CA signed certificates high-level steps

1. Replace the RS server certificates on all nodes and key with the CA
    signed certificate and restart proxy

    Note: A certificate for the databases' endpoint should be assigned
    for the same domain as the cluster name. For example, for a cluster
    with the name "redislabs.com" the certificate should be for
    "redis-\*.redislabs.com".

1. Add the SSL/TLS client certificates in the UI including CA
    certificates and any intermediate certificates by chaining the
    certificate into one file (you can use a cat command to chain the
    certs).

1. On the client side make sure to import and trust the CA and
    intermediate certificates (you can chain the CA cert with
    intermediate as one file to use and import)

### Client configuration

To connect to a database configured with SSL/TLS encryption, either use
one of the Redis clients that inherently support SSL encryption, or use
any Redis client and create a secured tunnel between the client machine
and the RS nodes.

To learn which clients inherently support SSL/TLS, refer to this [blog
post](https://redislabs.com/blog/secure-redis-ssl-added-to-redsmin-and-clients).

To create a secure tunnel between the client machine and the RS nodes,
use tools that enable this functionality, such as
[spiped](http://www.tarsnap.com/spiped.html) or
[stunnel](https://www.stunnel.org/index.html). An example of how to use
stunnel is detailed below.

**Note**: For security reasons, RS supports only the TLS protocol.
Therefore, make sure that the Redis client or secured tunnel solution you
use supports TLS, preferably TLS v1.2.

When using self-signed certificates on the cluster nodes, make sure to
copy these certificates to the client machines as well, thereby enabling
the client to validate the cluster nodes.

When using a certificate issued by an intermediate certificate authority
(CA) on the cluster nodes, make sure that the CA root certificate is
installed on the client machines.

#### Example how to secure client connection with SSL/TLS using stunnel

The instructions below explain how to use stunnel for setting up a
secure tunnel between a client machine and the RS nodes when the client
is running on Ubuntu, using the default RS nodes' self-signed
certificates, and a self-signed certificate on the client machine.

1. Install stunnel version 5 or higher on the client machine. Older
    versions of stunnel do not support the TLS protocol.
2. Create a self-signed certificate on the client machine:

    1. Generate a private key by running the following commands:sudo su
        --
        openssl genrsa -out /etc/stunnel/keyclient.pem 4096
    2. Generate a client certificate by running the following
        commands:openssl req -new -x509 -key /etc/stunnel/keyclient.pem
        -out
        /etc/stunnel/cert.pem -days 1826

    When prompted, enter the appropriate configuration details for the
    certificate.

3. Copy the RS nodes certificates from all nodes to the client machine.
    The certificates are saved in a file named proxy_cert.pem, which is
    stored in /etc/opt/redislabs in each node. For additional details,
    refer to [Updating SSL/TLS
    certificates]({{< relref "/rs/administering/cluster-operations/updating-certificates.md" >}}).
4. Rename the certificate files fetched from the RS nodes as
    certsvr.pem. For example: certsvr1.pem, certsvr2.pem.
5. Create a single file for all of the server certificates on the
    client machine, by running the following command from the OS CLI.
    For example:cat /etc/stunnel/certsvr1.pem
    /etc/stunnel/certsvr2.pem \> /etc/stunnel/servercerts.pem
6. Configure stunnel for the connection to RS by using the steps below:
    1. Create a redislabs.conf file in /etc/stunnel folder.
    2. Make sure that the certificates that have been generated exist in
        the following folder: /etc/stunnel.
    3. Edit the redislabs.conf content to look as follows:cert =
        /etc/stunnel/cert.pem
        key = /etc/stunnel/keyclient.pem
        cafile = /etc/stunnel/servercerts.pem
        verify = 2
        delay = yes
        output = /tmp/stunnel.log
        pid = /tmp/stunnel.pid\[redislabs\]
        client = yes
        accept = 127.0.0.1:6379
        connect = \[database endpoint value\]Where \[database endpoint
        value\] is the database endpoint as can be retrieved from RS.

        **Note**: The value for the accept parameter is the local IP and
        port that will be used for redirecting the traffic through the
        secure tunnel to the database endpoint configured in the connect
        parameter.

7. Copy the contents of the client certificate from cert.pem and enter
    them in the **SSL Client Authentication** field, in the RS UI, of
    the database you would like to secure. When done, be sure to save
    the change.
8. Start the stunnel service by running the following command:service
    stunnel restart

    **Note**: Any change made to the stunnel configuration requires
    restarting the stunnel service.

    Check the stunnel log file to verify that the connection is working
    properly. The log file is created under the root folder within the
    configuration mentioned above.

9. Test the connection to the Redis database from the client machine.
    You can use redis-cli to run commands on the client machine, and the
    commands will be redirected from the local machine's port 6379 to
    the RS database endpoint. Note that the connection to the Redis
    database is done through the local port; do not try to connect
    directly to the database endpoint.

### TLS version information

RS fully supports TLS v1.2, but the version of TLS used depends on the
connecting Redis client. If the client supports TLS v1.2, that version
will be used. If the client does not support TLS v1.2, you may end up
using an older TLS version against RS. Therefore it is considered best
practice to stay current on your client libraries for the most up to
date security.

To set the minimum TLS version that can be used for encrypting the data
in transit between a Redis client and a Redis Enterprise cluster, use
the REST API or the following rladmin
command:

    rladmin> cluster config min_data_TLS_version [version, e.g. 1.2]

Note that if a client supports an older TLS version, the communication
will not be allowed.
