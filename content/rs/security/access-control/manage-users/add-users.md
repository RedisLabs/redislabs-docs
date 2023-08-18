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

1. From the **Access Control > Users** tab in the admin console, select **+ Add user**.

1. Enter the name, email, and password of the new user.

1. Assign a **Role** to the user to grant permissions for cluster management and data access.

1. Select the **Alerts** the user should receive by email:

    - **Receive alerts for databases** - The alerts that are enabled for the selected databases will be sent to the user. Choose **All databases** or **Customize** to select the individual databases to send alerts for.
    
    - **Receive cluster alerts** - The alerts that are enabled for the cluster in **Cluster > Alerts Settings** are sent to the user.

1. Select **Save**.

## More info

- [Grant admin console and REST API access for cluster management]({{<relref "/rs/security/access-control/admin-console-access">}})

- [Control database access using RBAC]({{<relref "/rs/security/access-control/database-access">}})