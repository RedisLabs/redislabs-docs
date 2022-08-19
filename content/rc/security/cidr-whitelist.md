---
Title: Configure CIDR allow list
linkTitle: CIDR allow list
description: The CIDR allow list permits traffic between a range of IP addresses and the Redis Cloud VPC.
weight: 30
alwaysopen: false
categories: ["RC"]
aliases: 
---

The [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) [allow list](https://en.wikipedia.org/wiki/Whitelist) lets you restrict traffic to your Redis Cloud database. When you configure an allow list, only the [IP addresses](https://en.wikipedia.org/wiki/IP_address) defined in the list can connect to the database. Traffic from all other IP addresses is blocked.

## Database allow list

You can configure your database's CIDR allow list to restrict client connections to a specific range of IP addresses.

### Define CIDR allow list

To define the CIDR allow list for a database:

1. Select **Databases** from the [admin console](https://app.redislabs.com/) menu and then select your database from the list.

1. From the database's **Configuration** screen, select the **Edit database** button:

    {{<image filename="images/rc/button-database-edit.png" width="140px" alt="The Edit database button lets you change selected database properties." >}}{{< /image >}}

1. In the **Security** section, turn on the **CIDR allow list** toggle:

    {{<image filename="images/rc/database-details-configuration-tab-security-cidr-allowlist-toggle.png" width="140px" alt="Turn on the CIDR allow list toggle." >}}{{< /image >}}

1. Enter the first IP address (in CIDR format) you want to allow in the text box and then select the check mark to add it to the allow list:

    {{<image filename="images/rc/database-details-configuration-tab-security-cidr-allowlist-add-first-ip.png" width="300px" alt="Add the first IP address to the CIDR allow list." >}}{{< /image >}}
   
1. To allow additional IP addresses:

    1. Select the **Add CIDR** button:

        {{<image filename="images/rc/button-database-config-security-add-cidr.png" width="140px" alt="Add another IP address to the CIDR allow list." >}}{{< /image >}}

    1. Enter the new IP address in the text box and then select the check mark to add it to the allow list:

        {{<image filename="images/rc/database-details-configuration-tab-security-cidr-allowlist-add-more-ips.png" width="300px" alt="Add a new IP address to the CIDR allow list." >}}{{< /image >}}

1. Select the **Save database** button to apply your changes:

    {{<image filename="images/rc/button-database-save.png" width="140px" alt="Use the Save database button to save database changes." >}}{{< /image >}}

## Subscription allow list

If you use a [self-managed, external cloud account]({{<relref "/rc/cloud-integrations">}}) to host your Redis Cloud deployment, you can configure a subscription-wide allow list
to restrict traffic to all databases associated with the subscription.

The subscription CIDR allow list defines a range of IP addresses and [AWS security groups](https://docs.aws.amazon.com/managedservices/latest/userguide/about-security-groups.html) that control inbound and outbound traffic to the Redis Cloud [VPC](https://en.wikipedia.org/wiki/Virtual_private_cloud). When you add security groups to the allow list, you can also use the same security groups to manage access to your application.

### Allow IP address or security group

To add IP addresses or [AWS security groups](https://docs.aws.amazon.com/managedservices/latest/userguide/about-security-groups.html) to a subscription's allow list:

1. From the [admin console](https://app.redislabs.com/) menu, select **Subscriptions** and then select your subscription from the list.

1. Select the **Connectivity** tab and then select **Allow List**.

1. If the allow list is empty, select the **Add allow list** button:

    {{<image filename="images/rc/button-subscription-connectivity-add-allow-list.png" width="140px" alt="Add allow list button." >}}{{< /image >}}

1. Select an entry **Type** from the list:

    {{<image filename="images/rc/subscription-connectivity-allow-list-type-dropdown.png" width="350px" alt="Select the type of entry to add to the allow list from the Type list." >}}{{< /image >}}

1. In the **Value** box, enter either:

    - An IP address in CIDR format

    - The AWS security group ID

1. Select the check mark to add the entry to the allow list:

    {{<image filename="images/rc/icon-check-mark.png" width="40px" alt="Select the Submit entry button to add the entry to the allow list." >}}{{< /image >}}

1. To allow additional IP addresses or security groups:

    1. Select the **Add entry** button:

        {{<image filename="images/rc/icon-allow-list-add-entry.png" width="40px" alt="Select the Add entry button to add another entry to the allow list." >}}{{< /image >}}

    1. Then select the new entry's **Type**, enter the **Value**, and select the check mark to add it to the allow list:

        {{<image filename="images/rc/subscription-connectivity-allow-list-add-entry.png" width="350px" alt="Define the new entry and select the Submit entry button to add it to the allow list." >}}{{< /image >}}

1. Select the **Apply all changes** button to apply the allow list updates:

    {{<image filename="images/rc/button-subscription-connectivity-allow-list-apply-all-changes.png" width="140px" alt="Use the Apply all changes button to apply all updates to the allow list." >}}{{< /image >}}
