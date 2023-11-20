---
Title: Create and edit database users
LinkTitle: Create users
description: Create a database user and assign it a role.
weight: 25
alwaysopen: false
toc: "true"
headerRange: "[1-3]"
categories: []
aliases: 
---

Before you create a database user, you must [create a data access role]({{<relref "rc/security/access-control/data-access-control/create-roles">}}) to assign to that user.

## Create a user

To create a user:

1. Go to **Data Access Control** from the [Redis Cloud console](https://app.redislabs.com/#/) menu.

    {{<image filename="images/rc/data-access-control-menu.png" width="200px" alt="Menu for database access control." >}}{{< /image >}}

1. Select the **Users** tab.

    {{<image filename="images/rc/data-access-control-users-no-users.png" alt="User configuration area." >}}{{< /image >}}

2. Select `+` to create a new user

    {{<image filename="images/rc/data-access-control-users-add-or-edit.png" width="300px" alt="User add or edit." >}}{{< /image >}}

3. Enter a username.

    {{<image filename="images/rc/data-access-control-users-add.png" alt="User add username." >}}{{< /image >}}

    {{<note>}}
An error occurs if a user tries to connect to a memcached database with the username `admin`. Do not use `admin` for a username if the user will be connecting to a memcached database.
    {{</note>}}

1. Select a [**Role**]({{<relref "rc/security/access-control/data-access-control/create-roles">}}) from the list.

    {{<image filename="images/rc/data-access-control-users-add-role.png" width="300px" alt="User select role." >}}{{< /image >}}

1. Enter and confirm the user's password then select the check mark to save the user. 

    {{<image filename="images/rc/data-access-control-users-password-and-finish.png" width="300px" alt="User add password and finish." >}}{{< /image >}}


## Assign roles to existing users

To assign a data access role to an existing user:

1. Go to **Data Access Control**

    {{<image filename="images/rc/data-access-control-menu.png" width="200px" alt="Menu for database access control." >}}{{< /image >}}

1. Select the **Users** tab.

    {{<image filename="images/rc/data-access-control-users.png" alt="User configuration area." >}}{{< /image >}}

1. Point to the user and select the pencil icon when it appears.

1. Select a [**Role**]({{<relref "rc/security/access-control/data-access-control/create-roles">}}) from the list.

    {{<image filename="images/rc/data-access-control-users-add-or-edit.png" width="300px" alt="User add or edit." >}}{{< /image >}}

1. Select the check mark to assign the role to the user.

    {{<image filename="images/rc/data-access-control-users-add-role.png" width="300px" alt="User select role." >}}{{< /image >}}

1. Select the check mark to save the user. 

    {{<image filename="images/rc/data-access-control-users-password-and-finish.png" width="300px" alt="User add password and finish." >}}{{< /image >}}