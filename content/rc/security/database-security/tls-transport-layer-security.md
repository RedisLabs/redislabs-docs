---
Title: Transport Layer Security (TLS)
description:
weight: 20
alwaysopen: false
categories: ["RC"]
---

Transport Layer Security (TLS), commonly called "SSL", ensures the privacy of data sent between applications and their Redis databases. TLS is available in Redis Cloud Pro and Redis Cloud Ultimate.

## Using TLS with Redis Cloud

TLS is not enabled by default for Redis Cloud databases. To use TLS, you must first enable it.

When you enable TLS, you also need to decide whether to enable client authentication. With client authentication,
all clients connecting to your database will be required to present a valid client certificate for the
connection to succeed. Although client authentication is not required by Redis Cloud, we do recommend it.

### Enabling TLS

Here's how to enable TLS for a Redis Cloud database.

1. From the admin console, navigate to the **View Database** screen for your database.

![View Database](/images/rc/view-db.png#no-click "View Database")

2. Click on the **edit** icon to enter the **Edit Database** screen. ![Add](/images/rc/icon_edit.png#no-click "Edit")

![Edit Database](/images/rc/edit-db.png#no-click "Edit Database")

3. Under the **Access Control & Security** subsection, click the **SSL Client Authentication** slider.

![SSL Client Authentication](/images/rc/ssl-client-auth.png "SSL Client Authentication")

4. Decide whether you want to require client authentication (also known as "mutual authentication"). By
enabling client authentication, only those clients that present a valid certificate will be able to connect. If
you do not want to require client authentication, skip to **step 8**.

5. To require client authentication, select **Enforce client authentication**.

![Enforce Client Authentication](/images/rc/enforce-client-auth.png "SSL Client Authentication")

6. Next, either provide an X.509 certificate containing a public key for your client, or generate one by clicking
**Generate Client Certificate**.

7. If you generate your certificate using the admin console, then a download will begin containing the following
artifacts:
   * `redislabs_user.crt` – the certificate's public key.
   * `redislabs_user_private.key` – the certificate's private key.
   * `redislabs_ca.pem` – the Redis Cloud CA certificate.

8. Click the **Update** button to apply your changes and enable TLS.

![Cancel / Update](/images/rc/cancel-update.png "Cancel / Update")


{{<note>}}
Once you've enabled TLS, all client connections to your database must use TLS. Unencrypted connections
will no longer be permitted.
{{</note>}}

## Connecting over TLS

To connect to a Redis Cloud database over TLS, you will need:

* A Redis client that supports TLS
* The Redis Cloud CA certificate

### Certificates

If you don't have the Redis Cloud CA certificate, you can download it again from the admin
console by going to **Settings** and clicking on **Pro CA**.

![Pro CA](/images/rc/pro-ca.png "Pro CA")

In addition, if you're requiring client authentication, then you'll need a public and private client key. See
[Enabling TLS](#enabling-tls) for where to get these files.

### Connecting with the Redis CLI

Here's a quick example of how to connect to your TLS-enabled Redis Cloud database using the Redis CLI.

If you're not requiring client authentication, then you only need to provide the host, port, and the the Redis Cloud CA certificate:

```sh
redis-cli -h redis.123.cloud.rlrcp.com -p 16257 --tls
    --cacert redislabs_ca.pem
```

If you've enabled client authentication, then you also need to provide your client's private and public keys:

```sh
redis-cli -h redis.123.cloud.rlrcp.com -p 16257 --tls --cacert redislabs_ca.pem
    --cert redislabs_user.crt --key redislabs_user_private.key
```
