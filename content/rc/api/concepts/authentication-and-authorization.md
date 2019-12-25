---
Title: Authentication and Authorization
description: How the API uses keys for authenticating users and authorizing API requests
weight: 60
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/concepts/authentication-and-authorization/
---
All API operations require authentication using a set of 2 API Keys:

| Key name    | HTTP Header name   | Description                                                       |
| ----------- | ------------------ | ----------------------------------------------------------------- |
| Account Key | `x-api-key`        | Account level key assigned to all users in the Redis Labs account |
| Secret Key  | `x-api-secret-key` | Personal key associated with a specific user                      |

## Account key

The [account key that you create]({{< relref "/rc/api/how-to/enable-your-account-to-use-api" >}}) identifies your Redis Labs account when you perform an API request.
A Redis Labs user can belong to one or more accounts, but any API operation must be performed within the scope of a specific account.

{{% note %}}
An account key is an account level secret. Do not share this key with anyone who is not authorized in the account.
{{% /note %}}

You create the account key once and you cannot change or remove it after it is created.
If you want to delete the account key or create a new account key, contact Redis Labs support.

## Secret key

The secret key is a personal key that belongs to a specific user with the **owner** role.
Only that user can perform requests with that key.

{{% note %}}
Secret key is a personal secret. Do not share the key with others.
{{% /note %}}

A user can [generate multiple secret keys]({{< relref "/rc/api/how-to/create-api-keys-for-your-team" >}})
for themselves or for other users defined as owners within the same account.
The value of the secret key is only displayed when you generate the key.

Each secret key has a name that identifies it in any operation performed using the secret key.
For example, any create, update, or delete API operation is [audited and reported]({{< relref "/rc/api/how-to/view-auditing-using-system-log" >}})
in the system log using the secret API name and the user of the API key.

## Authentication using API keys

You authenticate with the account and secret API keys on every API operation request.
You must add the key as [HTTP request headers]({{< relref "/rc/api/how-to/using-curl#using-the-curl-http-client" >}}) to each request.

## Authorization using the API keys

When you send an API operation request, make sure these requirements are met in order to pass the authorization checks:

1. Both the account and secret keys are valid and properly defined in the HTTP request headers.
1. The secret key is associated with the same account as the account key.
1. If source IP limitations is defined for the specific secret key,
    the API request must originate from an IP address that is in the [allowed source IP range]({{< relref "/rc/api/how-to/manage-api-keys#add-a-new-allowed-subnet" >}})

## Related articles

- [Create API Keys for your team]({{< relref "/rc/api/how-to/create-api-keys-for-your-team" >}})
- [Manage API Keys]({{< relref "/rc/api/how-to/manage-api-keys" >}})
- [Using the API]({{< relref "/rc/api/how-to/using-curl" >}})
