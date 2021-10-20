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
- Create a user key
- Collect endpoint details

{{< note >}}
The Redis Cloud REST API is available only with Flexible or Annual subscriptions.  It is not supported for Fixed or Free subscriptions.
{{< /note >}}

To use the keys to authenticate and authorize your request, include the keys with the request headers:

| Key name         | HTTP&nbsp;header&nbsp;name   |Description                                            |
| -----------      | -------------------| ----------------------------------------------------- |
| Account&nbsp;key | `x-api-key`        | Account-level key assigned to all users of an account |
| User key       | <nobr>`x-api-secret-key`</nobr> | Personal key associated with a specific user and possibly limited to certain IP ranges                      |

## Enable the API

The API is disabled on all accounts by default. You must [enable the API]({{< relref "/rc/api/get-started/enable-the-api.md" >}}) before you can use it.

## Account key

The account key identifies your specific account when you perform an API request.  This is the account responsible for your subscription.

{{< note >}}
An account key is an account-level secret. Do not share this key with anyone not authorized to use the account.
{{< /note >}}

You create the account key once when enabling API access.

If you need to change or delete your account key, please [contact support](https://redislabs.com/company/support/).

## User key

The user key is a personal key that belongs to a specific user having the **owner** role.  You can have more than user key.

User keys can be displayed only when created.  For details, see ({{< relref "/rc/api/get-started/manage-api-keys.md" >}})

{{< note >}}
User keys are personal secrets. Do not share them.
{{< /note >}}

Individual users can have [generate multiple user keys]({{< relref "/rc/api/get-started/manage-api-keys.md" >}})
for themselves, for separate apps, or for other owners within the same account.

Every user key has a name. Use this to associate specific API requests to individual users or apps.

For example, when you [audit API requests]({{< relref "/rc/api/examples/audit-system-logs.md" >}}) in the system log, you can easily see which secret key was used for each request.

## Authentication using API keys

Every API request must use the **account key** and a **user key** to authenticate.

The keys are provided as [HTTP request headers]({{< relref "/rc/api/get-started/use-rest-api.md#using-the-curl-http-client" >}}), shown earlier.

## Authenticate a request

An API request successfully authenticates when:

1. The account and user keys are valid and properly defined in the HTTP request headers.
1. The user key is associated with the same account as the account key.
1. The request originates from a valid source IP address, as defined in a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) allow list associated with the user key.

    This requirement applies when you've [defined a CIDR allow list]({{< relref "/rc/api/get-started/manage-api-keys.md#add-a-new-allowed-subnet" >}}) for the secret key.

## More info

To learn more, see:

- [Manage API keys]({{< relref "/rc/api/get-started/manage-api-keys.md" >}})
- [Use the API]({{< relref "/rc/api/get-started/use-rest-api.md" >}})
