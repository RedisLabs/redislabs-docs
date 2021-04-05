---
Title: View flexible subscription details
description:
weight: 40
alwaysopen: false
categories: ["RC"]
linktitle: View fixed subscription
aliases: 
---
To view the details of a Flexible subscription:

1.  Use the admin console menu to select the **Subscriptions** command.  This displays the **Subscriptions** list.

1.  Select the subscription you wish to view.

    (screenshot)

Two tabs are available:

1.  The **General* tab summarizes the your subscription details, the cost estimate, and the payment method.
    
    **General details** include:
    
    | _Detail_ | _Description_ |
    |+---------|+--------------|
    | **Subscription name** | A descriptive name for the plan.  Can be changed at any time. |
    | **Runs on** | Either _RAM_ or _RAM+Flash_ |
    | **Cloud account** | (_AWS only_) Descriptive name of the associated cloud account.  Useful for organizations that manage [multiple accounts]({{<relref "/rc/how-to/view-edit-cloud-account.md">}}). |
    | **Cloud** | Describes the subscription cloud provider. |
    | **Region** | Deployment region details. | 
    | **Multi-AZ** | Indicates whether replication is deployed across multiple availability zones within the region. |
    
    The **Cost Esimate** section describes the shards required to deply the subscription based on the choices made when the subscription was created.  
    
    **Payment Method** shows the current payment details.
    
1.  The **Security** tab details current VPC peering and CIDR whitelist settings.

## Changing a flexible subscription

Because Flexible subscriptions represent deployments to dedicated hardware, very few settings can be changed.

You can change:

- The **Subscription name**

- The **Cloud account**

- Security settings, such as [VPC peerings]({{<relref "/rc/security/vpc-peering.md">}}) and the [CIDR whitelist]({{<relref "/rc/security/cidr-whitelist.md">}}).

If you need to change other settings, create a new subscription and then migrate the data.

