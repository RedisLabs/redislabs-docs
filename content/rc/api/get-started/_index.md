---
Title: Get started with the REST API
linkTitle: Get started
description: Describes how Redis Cloud REST API uses keys to authenticate and authorize access.
weight: 10
alwaysopen: true
categories: ["RC"]
aliases: /rv/api/concepts/authentication-and-authorization/
         /rc/api/concepts/authentication-and-authorization/
         /rc/api/concepts/authentication-and-authorization.md         
         /rc/api/get-started/
         /rc/api/get-started/_index.md
---

To use the Redis Enterprise Cloud REST API, you need to:

- Enable the API
- Create an account key
- Create a secret keys

{{< note >}}
The Redis Cloud REST API is available only with Flexible or Annual subscriptions.  It is not supported for Fixed or Free subscriptions.
{{< /note >}}

To use the keys to authenticate and authorize your request, include the keys with the request headers:

| Key name    | HTTP Header name   |Description                                            |
| ----------- | -------------------| ----------------------------------------------------- |
| Account key | `x-api-key`        | Account-level key assigned to all users of an account |
| Secret key  | `x-api-secret-key` | Personal key associated with a specific user and possibly limited to certain IP ranges                      |

## Enable the API

The API is disabled all on all accounts by default. You must first [enable the API]({{< relref "/rc/api/get-started/enable-the-api.md" >}}) before you can use it.

## Account key

The account key identifies your specific account when you perform an API request.

{{< note >}}
An account key is an account-level secret. Do not share this key with anyone not authorized to use the account.
{{< /note >}}

You create the account key once when enabling API access.

If you need to change or delete your account key, please [contact Redis Labs support](https://redislabs.com/company/support/).

## Secret key

The secret key is a personal key that belongs to a specific user having the **owner** role.

{{< note >}}
The secret key is a personal secret. Do not share this key.
{{< /note >}}

A user can [generate multiple secret keys]({{< relref "/rc/api/get-started/manage-api-keys.md" >}})
for themselves or for any other users defined as owners within the same account.

Every secret key has a name. You can use this name to identify which user made a specific API request.

For example, when you [audit create, update, and delete requests]({{< relref "/rc/api/examples/audit-system-logs.md" >}}) in the system log, you can easily see which secret key was used for each request.

## Authentication using API keys

You must authenticate using the **account key** and **secret key** on every API request.

You provide these keys as [HTTP request headers]({{< relref "/rc/api/get-started/use-rest-api.md#using-the-curl-http-client" >}}).

## Authenticate a request

An API request will successfully authenticate if the following conditions are met:

1. Both the **account key** and **secret key** are valid and properly defined in the HTTP request headers.
1. The secret key is associated with the same account as the account key.
1. The request originates from a valid source IP. This requirement holds when you have [defined sourced IP limitations]({{< relref "/rc/api/get-started/manage-api-keys.md#add-a-new-allowed-subnet" >}}) for your secret key.

## More info

To learn more, see:

- [Managing API Keys]({{< relref "/rc/api/get-started/manage-api-keys.md" >}})
- [Use the API]({{< relref "/rc/api/get-started/use-rest-api.md" >}})
