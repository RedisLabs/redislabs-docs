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

- Use the admin console:

    1. Go to **Cluster > Security > Preferences**, then select **Edit**.

    1. In the **Password** section, turn on **Expiration**.

    1. Enter the number of days before passwords expire.

    1. Select **Save**.

- Use the `cluster` endpoint of the REST API

    ``` REST
    PUT https://[host][:port]/v1/cluster
    {"password_expiration_duration":<number_of_days>}
    ```

## Deactivate password expiration

To deactivate password expiration:

- Use the admin console:

    1. Go to **Cluster > Security > Preferences**, then select **Edit**.

    1. In the **Password** section, turn off **Expiration**.

    1. Select **Save**.

- Use the `cluster` REST API endpoint to set `password_expiration_duration` to `0` (zero).
