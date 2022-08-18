---
Title: Configure CIDR allow list
linkTitle: CIDR allow list
description:
weight: 30
alwaysopen: false
categories: ["RC"]
aliases: 
---

If you are deploying Redis Cloud on your own infrastructure, you can configure your deployment to permit traffic between a specific set of IP addresses.  The list of allowed addresses is called the _CIDR allow list_.

The CIDR allow list defines a range of IP addresses and AWS security groups that control inbound
and outbound traffic to the Redis Cloud VPC. When you manage the CIDR allow list with security groups you
can easily use the same security groups to manage access to your application.

## Define CIDR allow list

To define the CIDR allow list:

1. Select **Databases** from the [admin console](https://app.redislabs.com/) menu and then select your database from the list.

1. From the database's **Configuration** screen, select the **Edit database** button:

    {{<image filename="images/rc/button-database-edit.png" width="140px" alt="The Edit database button lets you change selected database properties." >}}{{< /image >}}

1. In the **Security** section, turn on the **CIDR allow list** toggle:

    {{<image filename="images/rc/database-details-configuration-tab-security-cidr-allowlist-toggle.png" width="140px" alt="CIDR allow list toggle." >}}{{< /image >}}

1. If there are no CIDR allow list entries yet, enter the first IP address (in CIDR format) you want to allow and then select the checkmark to add it to the allow list:

    TODO: add screenshot
   
1. To add another IP address to the CIDR allow list, select the **Add CIDR** button:

    TODO: add button

1. Select the **Save database** button to apply your changes:

    {{<image filename="images/rc/button-database-save.png" width="140px" alt="Use the Save database button to save database changes." >}}{{< /image >}}
