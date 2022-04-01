---
title: OCSP stapling
linkTitle: OCSP stapling
description: Use OCSP stapling to verify certificates maintained by a third-party CA and authenticate connection attempts between clients and servers.
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: 
---

OCSP ([Online Certificate Status Protocol](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol)) lets a client or server verify the status (valid, revoked, or unknown) of a certificate maintained by a third-party [certificate authority (CA)](https://en.wikipedia.org/wiki/Certificate_authority).

When a client or server needs to check whether a certificate is still valid or has been revoked, it can send a request to the CA's OCSP server (also called an OCSP responder). The OCSP responder checks the certificate's status in the CA's [certificate revocation list](https://en.wikipedia.org/wiki/Certificate_revocation_list) and sends the status back as a signed and timestamped response.

## OCSP stapling overview

 With OCSP enabled, the Redis Enterprise server regularly polls the CA's OCSP responder for the certificate's status. After it receives the response, the server caches this status until its next polling attempt.

 When a client tries to connect to the Redis Enterprise server, they perform a [TLS handshake](https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_handshake) to authenticate the server and create a secure, encrypted connection. During the TLS handshake, [OCSP stapling](https://en.wikipedia.org/wiki/OCSP_stapling) lets the Redis Enterprise server send (or "staple") the cached certificate status to the client.

- If the stapled OCSP response confirms the certificate is still valid, the TLS handshake succeeds and the client connects to the server.

- If the stapled OCSP response indicates the certificate has been revoked or the status is unknown, the TLS handshake fails and the client blocks the connection to the server.

## Set up OCSP stapling

To set up OCSP stapling for your Redis Enterprise cluster:

1. Use [`rladmin`]({{<relref "/rs/references/rladmin#cluster-certificate">}}) or the [REST API]({{<relref "/rs/references/rest-api/requests/cluster/update-cert">}}) to [replace the proxy certificate]({{<relref "/rs/administering/cluster-operations/updating-certificates">}}) with a certificate signed by your third-party CA.

1. Sign into the Redis Enterprise admin console.

1. Go to **settings > OCSP**.

1. Select the **OCSP** checkbox.

1. Select the **Test certificate** button to verify the certificate is valid.

1. Configure the following settings if you don't want to use their default values:

    | Name | Default value | Description |
    |------|---------------|-------------|
    | **Query frequency** | 3600 | The time interval in seconds between OCSP queries to the responder URI. |
    | **Response frequency** | 1 | The time interval in seconds to wait for a response before timing out. |
    | **Recovery frequency** | 60 | The time interval in seconds between retries after a failed query. |
    | **Recovery maximum tries** | 5 | The number of retries before the validation query fails and invalidates the certificate. |

1. Select the **Save** button.
