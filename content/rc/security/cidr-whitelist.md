---
Title: Configure CIDR allow list
linkTitle: CIDR allow list
description: The CIDR allow list permits traffic between a range of IP addresses and the Redis Cloud VPC.
weight: 30
alwaysopen: false
categories: ["RC"]
aliases: 
---

If you use your own infrastructure to deploy Redis Cloud, you can configure your deployment to permit inbound and outbound traffic between a specific range of IP addresses and the Redis Cloud [VPC](https://en.wikipedia.org/wiki/Virtual_private_cloud). The list of allowed addresses is called the _CIDR allow list_.

To define the CIDR allow list:

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
