---
title: Enable OCSP stapling
linkTitle: Enable OCSP stapling
description: Use OCSP stapling to verify certificates maintained by a third-party CA and authenticate connection attempts between clients and servers.
weight: 50
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/security/ocsp-stapling"]
---

OCSP ([Online Certificate Status Protocol](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol)) lets a client or server verify the status (valid, revoked, or unknown) of a certificate maintained by a third-party [certificate authority (CA)](https://en.wikipedia.org/wiki/Certificate_authority).

When a client or server needs to check whether a certificate is still valid or has been revoked, it can send a request to the CA's OCSP server (also called an OCSP responder). The OCSP responder checks the certificate's status in the CA's [certificate revocation list](https://en.wikipedia.org/wiki/Certificate_revocation_list) and sends the status back as a signed and timestamped response.

## OCSP stapling overview

 With OCSP enabled, the Redis Enterprise server regularly polls the CA's OCSP responder for the certificate's status. After it receives the response, the server caches this status until its next polling attempt.

 When a client tries to connect to the Redis Enterprise server, they perform a [TLS handshake](https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_handshake) to authenticate the server and create a secure, encrypted connection. During the TLS handshake, [OCSP stapling](https://en.wikipedia.org/wiki/OCSP_stapling) lets the Redis Enterprise server send (or "staple") the cached certificate status to the client.

If the stapled OCSP response confirms the certificate is still valid, the TLS handshake succeeds and the client connects to the server.

The TLS handshake fails and the client blocks the connection to the server if the stapled OCSP response indicates either:

- The certificate has been revoked.

- The certificate's status is unknown. This can happen if the OCSP responder fails to send a response.

## Set up OCSP stapling

Configure and enable OCSP stapling for your Redis Enterprise cluster with the [admin console](#admin-console-method), the [REST API](#rest-api-method), or [`rladmin`](#rladmin-method).

After you enable OCSP, the server always staples the cached OCSP status. You also need to configure your client to use the stapled OCSP status.

### Admin console method

To set up OCSP stapling with the Redis Enterprise admin console:

1. Use [`rladmin`]({{<relref "/rs/references/rladmin#cluster-certificate">}}) or the [REST API]({{<relref "/rs/references/rest-api/requests/cluster/update-cert">}}) to [replace the proxy certificate]({{<relref "/rs/security/certificates/updating-certificates">}}) with a certificate signed by your third-party CA.

1. Sign in to the Redis Enterprise admin console.

1. Go to **settings > OCSP**.

1. Select the **OCSP** checkbox.

1. Select the **Test certificate** button to verify the certificate is valid. This queries the OCSP responder and caches the result.

1. Configure the following settings if you don't want to use their default values:

    | Name | Default value | Description |
    |------|---------------|-------------|
    | **Query frequency** | 3600 | The time interval in seconds between OCSP queries to the responder URI. |
    | **Response timeout** | 1 | The time interval in seconds to wait for a response before timing out. |
    | **Recovery frequency** | 60 | The time interval in seconds between retries after a failed query. |
    | **Recovery maximum tries** | 5 | The number of retries before the validation query fails and invalidates the certificate. |

1. Select the **Save** button.

### REST API method

To set up OCSP stapling with the [REST API]({{<relref "/rs/references/rest-api">}}):

1. Use the [REST API]({{<relref "/rs/references/rest-api/requests/cluster/update-cert">}}) to [replace the proxy certificate]({{<relref "/rs/security/certificates/updating-certificates#use-the-rest-api">}}) with a certificate signed by your third-party CA.

1. To configure and enable OCSP, send a `PUT` request to the `/v1/ocsp` endpoint and include an OCSP JSON object in the request body:

    ```json
    {
        "ocsp_functionality": true,
        "query_frequency": 3600,
        "response_timeout": 1,
        "recovery_frequency": 60,
        "recovery_max_tries": 5
    }
    ```

### `rladmin` method

To set up OCSP stapling with the [`rladmin`]({{<relref "/rs/references/rladmin">}}) command-line utility:

1. Use [`rladmin`]({{<relref "/rs/references/rladmin#cluster-certificate">}}) to [replace the proxy certificate]({{<relref "http://localhost:1313/rs/security/certificates/updating-certificates#use-the-cli">}}) with a certificate signed by your third-party CA.

1. Update the cluster's OCSP settings with the [`rladmin cluster ocsp config`]({{<relref "/rs/references/rladmin#cluster-ocsp-config">}}) command if you don't want to use their default values.

    For example: 

    ```sh
    rladmin cluster ocsp config recovery_frequency set 30
    ```

1. Enable OCSP with the following command:

    ```sh
    rladmin cluster ocsp config ocsp_functionality set enabled
    ```
