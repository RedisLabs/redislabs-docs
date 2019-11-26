---
Title: Deleting Redis Cloud Essentials Databases
description:
weight: $weight
alwaysopen: false
categories: ["RC Essentials"]
---
Deleting a database is just as easy as creating one. Make sure that you
are truly done with the database as once you delete the database, it
cannot be recovered (except from your backups).

Note: Only users defined as Owners on the team can delete a database.

### Steps

1. Navigate to the "Databases" page from the Redis Cloud Essentials menu
1. Click on the database you want to delete from the list of your
    databases.
1. Click on the trash can icon next to "View Database."
1. Confirm that you want to delete your database. If so, click "Delete."
1. In Databases you see that the database with all
    of its data and configurations is now deleted.

Note: It is considered best practice that you [create a
backup]({{< relref "/rc/administration/configuration/backups.md" >}}) of your
database before deleting it.
