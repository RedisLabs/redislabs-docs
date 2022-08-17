---
Title: Transport Layer Security (TLS)
description: Enable TLS to encrypt data communications between applications and Redis databases.
weight: 20
alwaysopen: false
categories: ["RC"]
aliases: /rc/administration/security/securing-redis-cloud-connections
---

Transport Layer Security (TLS) uses encryption to secure [network communication](https://en.wikipedia.org/wiki/Transport_Layer_Security).  

Redis Cloud Fixed, Flexible, and Annual subscriptions can use TLS to encrypt data communications between applications and Redis databases.

## Use TLS with Redis Cloud

TLS is not enabled by default. Redis recommends to enable TLS if you are connecting over a public endpoint. Enabling TLS does have an impact on performance, therefore if you connect over a private endpoint such as with VPC peering, you should consider your needs for security vs. performance.

When you enable TLS, you also need to decide whether to enable client authentication (also known as "mutual authentication"), which requires that all database clients present a valid client certificate for authentication.

Client authentication is not required by Redis Cloud; however, it is strongly recommended.

### Enable TLS

To enable TLS for a Redis Cloud database:

1. Select **Databases** from the [admin console](https://app.redislabs.com/) menu and then select your database from the list.

2. From the database's **Configuration** screen, select the **Edit database** button:

    {{<image filename="images/rc/button-database-edit.png" width="140px" alt="The Edit database button lets you change selected database properties." >}}{{< /image >}}

3. In the **Security** section, use the **Transport layer security (TLS)** toggle to enable TLS:

    {{<image filename="images/rc/database-details-configuration-tab-security-tls-toggle.png" width="200px" alt="Use the Transport Layer Security toggle to enable TLS." >}}{{< /image >}}

4. Decide whether you want to enforce client authentication:

    - If you only want clients that present a valid certificate to be able to connect, continue to the next step.
    
    - If you do not want to require client authentication, skip to the final step to apply your changes.

5. To require client authentication, select the **TLS client authentication** checkbox.

6. Next, either provide an [X.509 certificate](https://en.wikipedia.org/wiki/X.509) containing a public key for your client or select 
**Generate certificate** to create one:

    {{<image filename="images/rc/database-details-configuration-tab-security-tls-client-auth-certificate.png" width="300px" alt="Provide or generate a certificate for TLS client authentication." >}}{{< /image >}}

    If you generate your certificate using the admin console, then a download will begin containing the following files:

    - `redis_user.crt` – the certificate's public key.

    - `redis_user_private.key` – the certificate's private key.

8. To apply your changes and enable TLS, select the **Save database** button:

    {{<image filename="images/rc/button-database-save.png" width="140px" alt="Use the Save database button to save database changes." >}}{{< /image >}}

{{<note>}}
Once you've enabled TLS, all client connections to your database must use TLS. Unencrypted connections
will no longer be permitted.
{{</note>}}

## Connect over TLS

To connect to a Redis Cloud database over TLS, you will need:

* A Redis client that supports TLS
* The Redis Cloud CA certificate

### Certificates

If you don't have the Redis Cloud CA certificate, you can download it from the admin
console:

1. Select **Account Settings** from the admin console menu and then go to the **Security** section.

1. For **Redis Cloud certificate authority**, select the **Download** button to download the certificate:

    {{<image filename="images/rc/button-account-settings-security-ca-download.png" width="140px" alt="Use the Download button to download the Redis Cloud CA certificate." >}}{{< /image >}}

The download contains a file called `redis_ca.pem`. If you inspect this PEM bundle using the keytool command below, you will see it contains five public CA certificates:
```sh
keytool -printcert -file ./redis_ca.pem | grep "Owner:"
```
   
- self-signed Redis Cloud Fixed plan Root CA (deprecated but still in use)

- self-signed Redis Cloud Flexible plan Root CA + Intermediate CA (deprecated but still in use)

- publicly trusted GlobalSign Root CA + Intermediate CA

You can add `redis_ca.pem` to the trust store or pass it directly to a Redis client.

If you decided to require client authentication, you also need the public (`redis_user.crt`) and private (`redis_user_private.key`) client keys. See
[Enable TLS](#enable-tls) for details.

### Connect with the Redis CLI

Here's how to use the [Redis CLI]({{<relref "/rs/references/cli-utilities/redis-cli">}}) to connect to a TLS-enabled Redis Cloud database.

#### Without client authentication

If you're not requiring client authentication, then you need to provide the host, port, and the Redis Cloud CA certificate:

```sh
redis-cli -h redis.123.cloud.rlrcp.com -p 16257 --tls
    --cacert redis_ca.pem
```

#### With client authentication

If you've enabled client authentication, then you also need to provide your client's private and public keys:

```sh
redis-cli -h redis.123.cloud.rlrcp.com -p 16257 --tls --cacert redis_ca.pem
    --cert redis_user.crt --key redis_user_private.key
```

Endpoint and port details are available from the **Databases** list or the database's **Configuration** screen.
