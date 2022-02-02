---
Title: Delete database
linkTitle: Delete database
description:
weight: 30
alwaysopen: false
categories: ["RC"]
aliases: /rc/administration/setup-and-editing/delete-databases/
        /rv/administration/setup_and_editing/deleting-database/
---

To delete a database, use the **Delete** button.  It's located in the **Danger zone** section of the database's **Configuration** tab.

Databases must be empty before they can be deleted.  Deleted databases cannot be recovered.  (We recommend [making a backup]({{< relref "rc/databases/back-up-data.md" >}}), just in case.)  

This command requires the account owner role.

## Step-by-step

1. Sign in to the Redis Cloud [admin portal](https://app.redislabs.com/new/). 

1. If you have more than one subscription, select the target subscription from the list.  This displays the **Databases** tab for the selected subscription.

    {{<image filename="images/rc/subscription-flexible-databases-tab-pending.png" alt="The Databases tab summarizes databases created for a given subscription." >}}{{< /image >}}

1.  Select the database from the list.  The **Configuration** tab is selected by default.

    {{<image filename="images/rc/database-details-configuration-tab-general-flexible.png" width="75%" alt="The Configuration tab of the Database details screen." >}}{{< /image >}}

1.  Scroll to the **Danger zone**.

    {{<image filename="images/rc/database-details-configuration-tab-danger-flexible.png" width="75%" alt="The Configuration tab of the Database details screen." >}}{{< /image >}}

1.  Select the **Delete** button.

    {{<image filename="images/rc/button-danger-zone-delete.png" alt="The Delete button is located in the Danger zone section of the database Configuration tab." >}}{{< /image >}}

1. When the **Delete database** dialog appears, use the **Delete database** button to confirm your choice.

    {{<image filename="images/rc/button-database-delete.png" alt="The Delete button is located in the Danger zone section of the database Configuration tab." >}}{{< /image >}}

When the operation completes, the database and its data are deleted.
