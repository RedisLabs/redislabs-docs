---
Title: Edit and delete databases 
description: Edit and delete databases
weight: $weight
alwaysopen: false
categories: ["RS"]
---
## Edit database configuration

You can change the configuration of a Redis Enterprise Software (RS) database, for example the number of shards or evicton policy, at any time.<!--more-->

To edit the configuration of a database:

1. Go to **Database** and select the database that you want to edit.
1. Go to **Configuration** and click **Edit** at the bottom of the page.
    The database settings appear.
1. Change the any of the [configurable database settings]({{< relref "/rs/administering/creating-databases/_index.md" >}}).

    {{< note >}}
For [Active-Active database instances](#updating-crdb-configuration), most database settings only apply to the instance that you are editing.
    {{< /note >}}

1. Click **Update**.

## Delete database

When you delete a database, the database configuration and data are deleted.<!--more-->

To delete a database in Redis Enterprise Software:

1. Click the relevant database row in the **Databases** page. The
    selected database page appears.
1. Select the **Configuration** tab.
1. Click **Delete** at the bottom of the page.
1. Confirm the deletion.