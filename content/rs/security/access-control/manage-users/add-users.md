---
Title: Add users
linkTitle: Add users
description: Add users to the cluster and assign access control roles (ACLs) to them.
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: 
---

To add a user to the cluster:

1. From the **access control** tab in the admin console, select ![Add](/images/rs/icon_add.png#no-click "Add").
1. Enter the name, email, and password of the new user and select a role to assign to the user.
1. Select **internal** for **Authentication**.
1. For **Email Alerts**, select **Edit** and then choose the alerts that the user should receive. You can select:

    - **Receive alerts for databases** - The alerts that are enabled for the selected databases will be sent to the user. You can either select **All databases**, or you can select **Customize** and select the individual databases to send alerts for.
    
    - **Receive cluster alerts** - The alerts that are enabled for the cluster in **settings > alerts** are sent to the user.

1. Select the save icon.
{{< video "/images/rs/new-user-add.mp4" "Create a new user" >}}
