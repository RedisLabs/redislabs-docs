---
Title: Configure password expiration
linkTitle: Password expiration
description: Configure password expiration to enforce expiration of a user's password after a specified number of days.
weight: 50
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

## Enable password expiration 

To enforce an expiration of a user's password after a specified number of days:

1. Use the admin console to place a checkmark next to the **Enable password expiration** preference setting

1. Use the `cluster` endpoint of the REST API

    ``` REST
    PUT https://[host][:port]/v1/cluster
    {"password_expiration_duration":<number_of_days>}
    ```

## Deactivate password expiration

To deactivate password expiration:

- Remove the checkmark next to the to the **Enable password expiration** preference setting.

    For help locating the setting, see [Password complexity rules]({{<relref "/rs/security/access-control/manage-passwords/password-complexity-rules">}}).

- Use the `cluster` REST API endpoint to set `password_expiration_duration` to `0` (zero).
