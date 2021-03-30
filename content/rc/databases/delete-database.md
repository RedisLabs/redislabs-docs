---
Title: Deleting a Database
description:
weight: 70
alwaysopen: false
categories: ["RC"]
aliases: /rc/administration/setup-and-editing/delete-databases/
        /rv/administration/setup_and_editing/deleting-database/
---
Deleting a database is just as easy as creating one.
Make sure that you are truly done with the database,
because after you delete the database it cannot be recovered (except from your backups).

{{< note >}}
- Only users that are defined as Owners on the Redis Cloud account can delete a database.
- We recommend that you create a backup of your database before deleting it.
{{< /note >}}

## Deleting a database

1. Go to the **Databases** page from the Redis Cloud menu.
1. Click on the database you wish to delete from the list of your databases.
1. Click on the trash can icon next to **View Database**.
1. Click **Delete** to confirm that you want to delete the database.
    The database and all of its data and configurations is now deleted.
