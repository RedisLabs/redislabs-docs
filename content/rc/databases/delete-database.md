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

1. Sign in to the [Redis Cloud console](https://app.redislabs.com/).

1. If you have more than one subscription, select the target subscription from the list.  This displays the **Databases** tab for the selected subscription.

    {{<image filename="images/rc/subscription-flexible-databases-tab-update.png" alt="The Databases tab summarizes databases created for a given subscription." >}}{{< /image >}}

1.  Select the database from the list.  The **Configuration** tab is selected by default.

    {{<image filename="images/rc/database-details-configuration-tab-general-flexible.png" alt="The Configuration tab of the Database details screen." >}}{{< /image >}}

1.  Scroll to the **Danger zone**.

    {{<image filename="images/rc/database-details-configuration-tab-danger-flexible.png" width="75%" alt="The Danger Zone of the Database details screen." >}}{{< /image >}}

1.  Select the **Delete** button.

    {{<image filename="images/rc/button-danger-zone-delete.png" alt="The Delete button is located in the Danger zone section of the database Configuration tab." >}}{{< /image >}}

1. When the **Delete database** confirmation dialog appears, if this is the last database in the subscription, you will have an option to delete the subscription at the same time.

    {{<image filename="images/rc/database-delete-last-dialog.png" alt="A different delete database confirmation dialog asks you to consider deleting the subscription as well.">}}{{< /image >}}

    - Checking the box deletes both the database and the subscription.
    
    - Unchecking the box deletes the database but keeps the subscription.

    {{< note >}}
You will continue to be charged for your subscription until you delete it, even if there are no databases in your subscription.
    {{< /note >}}

1. To confirm your choice, use the **Delete database** button or the **Delete both** button if the delete subscription checkbox is checked.

    {{<image filename="images/rc/button-database-delete.png" alt="The Delete database button is located in the Danger zone section of the database Configuration tab." >}}{{< /image >}} {{<image filename="images/rc/button-both-delete.png" alt="The Delete both button is located in the Danger zone section of the database Configuration tab." >}}{{< /image >}}


When the operation completes, the database and its data are deleted.
