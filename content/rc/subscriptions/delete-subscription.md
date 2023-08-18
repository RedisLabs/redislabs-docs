---
Title: Delete a subscription
description:
weight: 50
alwaysopen: false
categories: ["RC"]
linktitle: Delete subscription
aliases:
---

To delete a subscription:

1.  [Delete all databases]({{< relref "rc/databases/delete-database.md" >}}) from the subscription.

    The number of databases for the subscription is shown in the subscription list. You can not delete a subscription until there are zero databases in the subscription.

    {{<image filename="images/rc/subscription-list-free-no-databases.png" width="75%" alt="The number of databases is shown in the bottom, left of the subscription in the subscription list." >}}{{< /image >}}

2.  View the subscription details.  

    If you have more than one subscription, select the target subscription from the subscription list.

3.  Select the **Overview** tab.

    {{<image filename="images/rc/subscription-free-cancel-subscription.png" alt="Open the Overview tab to locate the Cencel subscription button." >}}{{< /image >}}

4.  Locate and then select the **Cancel subscription** button near the bottom, right corner of the Overview details.

    {{<image filename="images/rc/subscription-cancel-confirm-dialog.png" alt="Select the Yes, cancel button to confirm the subscription cancellation." >}}{{< /image >}}


5.  Select the **Yes, cancel** button to confirm your choice.

Once a subscription is deleted, it cannot be recovered.

We recommend [backing up your data]({{< relref "rc/databases/back-up-data.md" >}}) before removing databases or subscriptions.
