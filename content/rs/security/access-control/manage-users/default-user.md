---
Title: Deactivate default user
linkTitle: Deactivate default user
description: Deactivate a database's default user.
weight: 60
alwaysopen: false
categories: ["RS"]
aliases: 
---

When you provision a database, the default user will be enabled. This allows for backwards compatibility with versions of Redis before Redis 6.

To deactivate the default user:

1. Select the **configuration** tab.
1. Clear the checkbox for **Default database access**.
1. Select **Save**.

{{<note>}}
We recommend that you deactivate the default user when using ACLs with your database and backwards compatibility is not required.
{{</note>}}

![default](/images/rs/default-user.png#no-click "default")
