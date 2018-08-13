Deleting a Database in Redis Enterprise VPC (RV)
================================================

Deleting a database is just as easy as creating one. Make sure that you
are truly done with the database, as once you delete the database it
cannot be recovered (except from your backups).

**Note**: only users that are defined as Owners on the RV account can
delete a database.

Steps:

1.  Navigate to the **Databases** page from the RV menu
2.  Click on the database you wish to delete from the list of your
    databases.
3.  Click on the trash can icon next to "View Database."
4.  A window will pop up asking if you really want to delete your
    database. Click "Delete."
5.  You will be taken back to the main **Databases** page. The database,
    all of its data, and configurations is now deleted.

**Note**: It is considered best practice that you create a backup of
your database before deleting it.
