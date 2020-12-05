---
Title: API authentication and authorization
description: How the API uses keys for authenticating users and authorizing API requests
weight: 60
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/concepts/authentication-and-authorization/
---
All API operations require authentication using a pair of API keys known as the **account key** and the **secret key**.

| Key name    | HTTP Header name   | Description                                                       |
| ----------- | ------------------ | ----------------------------------------------------------------- |
| Account key | `x-api-key`        | Account-level key assigned to all users of an account |
| Secret key  | `x-api-secret-key` | Personal key associated with a specific user and possibly limited to certain IP ranges                      |

## Enabling the API

The API is disabled all on all account by default. You must first [enable the API]({{< relref "/rc/api/how-to/enable-your-account-to-use-api" >}}) before you can use it.

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

A user can [generate multiple secret keys]({{< relref "/rc/api/how-to/create-api-keys-for-your-team" >}})
for themselves or for any other users defined as owners within the same account.

Every secret key has a name. You can use this name to identify which user made a specific API request.

For example, when you [audit create, update, and delete requests]({{< relref "/rc/api/how-to/view-auditing-using-system-log" >}})
in the system log, you can easily see which secret key was used for each request.

## Authentication using API keys

You must authenticate using the **account key** and **secret key** on every API request.

You provide these keys as [HTTP request headers]({{< relref "/rc/api/how-to/using-curl#using-the-curl-http-client" >}}).

## Authenticating a request

An API request will successfully authenticate if the following conditions are met:

1. Both the **account key** and **secret key** are valid and properly defined in the HTTP request headers.
1. The secret key is associated with the same account as the account key.
1. The request originates from a valid source IP. This requirement holds when you have [defined sourced IP limitations]({{< relref "/rc/api/how-to/manage-api-keys#add-a-new-allowed-subnet" >}}) for your secret key.

## Managing and using API keys

The following articles describe how to create, manage, and use API keys for your team:

- [Creating API Keys for your team]({{< relref "/rc/api/how-to/create-api-keys-for-your-team" >}})
- [Managing API Keys]({{< relref "/rc/api/how-to/manage-api-keys" >}})
- [Using the API]({{< relref "/rc/api/how-to/using-curl" >}})
