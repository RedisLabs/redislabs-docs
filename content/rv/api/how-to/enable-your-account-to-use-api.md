---
Title: Enable your Account to use API
description: Enabling an Account to use API using the Redis Labs web UI
weight: 10
alwaysopen: false
categories: ["RC Pro"]
---
By default, account API usage is disabled.

In order to enable an account to use API, follow these steps:

1. Login to <https://app.redislabs.com> with a user that is an Owner of an account.
1. Navigate to the "Settings" menu.
1. In the "Account" tab, locate the property "Cloud API Access Key".
1. Click the button labeled "Generate" next to the label of the property.

The generated string is the API access key, needed as a parameter in all API calls.

The access key can always be retrieved by an account owner. It should be regarded as an account level secret, not shared with persons who are not authorized members to the account.
