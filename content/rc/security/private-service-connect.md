---
Title: Enable Private Service Connect
linkTitle: Private Service Connect
description: Private Service Connect creates a private endpoint that allows secure connections to Redis Cloud databases without exposing your application VPC.
weight: 50
alwaysopen: false
toc: "true"
categories: ["RC"]
aliases:
---

[Private Service Connect](https://cloud.google.com/vpc/docs/private-service-connect) (PSC) creates a private endpoint that allows secure connections to Redis Cloud databases without exposing your application's [virtual private cloud](https://en.wikipedia.org/wiki/Virtual_private_cloud) (VPC). 

This feature is only available for Flexible and Annual subscriptions hosted on Google Cloud Platform (GCP).

## Considerations

You can use Private Service Connect as an alternative to [VPC peering]({{<relref "/rc/security/vpc-peering">}}), or you can enable both for your subscription.

Compared to VPC peering, Private Service Connect:

- Only exposes the private endpoint instead of the entire application VPC network.

- Allows producer (Redis Cloud VPC) and consumer (application VPC) CIDR IP addresses to overlap.
 
- Has slightly higher network latency than VPC peering due to load balancing requirements.

    {{<note>}}
Larger clusters are more likely to experience increased latency with Private Service Connect versus VPC peering.
    {{</note>}}

## Set up Private Service Connect

1. Configure Private Service Connect in the Redis Cloud admin console.

1. Create Private Service Connect endpoints in the application VPC.

1. From the Redis Cloud admin console, review and accept the Private Service Connect request.

### Configure PSC

1. Select **Subscriptions** from the Redis Cloud [admin console](https://app.redislabs.com/) menu and then select your subscription from the list.

1. Select the **Connectivity** tab and then **Private Service Connect**.

1. Select the **Create connection** button:

    {{<image filename="images/rc/button-subscription-connectivity-psc-create-connection.png" width="140px" alt="" >}}{{< /image >}}

1. Read the **Latency and impact cost** message and select **Accept and continue**:

    {{<image filename="images/rc/button-subscription-connectivity-psc-accept-continue.png" width="140px" alt="" >}}{{< /image >}}

1. For **Create connection**, enter the following **Endpoint details**:

    | Setting&nbsp;name | Description |
    |-------------------|-------------|
    | _Google Cloud project ID_ | GCP project ID |
    | _VPC name_ | Name of your Virtual Private Cloud in GCP |
    | _Subnet name_ | Name of your VPC's subnet of IP address ranges |
    | _Endpoint name_ | Prefix for the endpoint created in GCP |

1. Select **Continue**:
    
    {{<image filename="images/rc/button-subscription-connectivity-psc-continue.png" width="100px" alt="" >}}{{< /image >}}

1. In **Add connections**, select either **Bash Shell** or **PowerShell** and download or copy the provided gcloud script for later:

    {{<image filename="images/rc/button-subscription-connectivity-psc-download.png" width="40px" alt="" >}}{{< /image >}}

    {{<image filename="images/rc/button-subscription-connectivity-psc-copy.png" width="80px" alt="" >}}{{< /image >}}

1. Select **Continue**:

    {{<image filename="images/rc/button-subscription-connectivity-psc-continue.png" width="100px" alt="" >}}{{< /image >}}

### Create PSC endpoints

To create the Private Service Connect endpoints in your application's VPC:

1. Follow GCP's guide to [enable Cloud DNS](https://cloud.google.com/dns/docs/set-up-dns-records-domain-name) for your GCP project if you haven't already. Since it can take some time for the DNS changes to become active, we recommend you wait 10 minutes before continuing to the next step.

1. Use the [gcloud CLI](https://cloud.google.com/sdk/gcloud) to run the Google cloud command that you copied earlier.

### Accept PSC connection

To accept the Private Service Connect connection:

1. In the Redis Cloud admin console, return to your subscription's **Connectivity > Private Service Connect** screen.

1. Find your pending Private Service Connect connection in the list and select **Accept**:

    {{<image filename="images/rc/button-subscription-connectivity-psc-accept.png" width="100px" alt="" >}}{{< /image >}}

### Connect to database

After your Private Service Connect endpoint is active, you can connect your application to a database:

1. From your subscription's **Connectivity > Private Service Connect** tab, select the **Connect** button for the active endpoint:

    {{<image filename="images/rc/button-subscription-connectivity-psc-connect.png" width="100px" alt="" >}}{{< /image >}}

1. Select the database you want to connect to from your list of databases.

1. Copy the endpoint and use it in your application to connect to your database.


## Deactivate Private Service Connect

1. Delete the Private Service Connect endpoints from your GCP project.

1. Remove service.

## Limitations

Private Service Connect has the following limitations in Redis Cloud:

- Although Redis Cloud supports using Private Service Connect with Enterprise clustering, you cannot use the [OSS Cluster API]({{<relref "/rs/databases/configure/oss-cluster-api">}}) with Private Service Connect enabled.

- Private Service Connect is not available for clusters with Redis versions 6.2.12 and earlier. Contact [Redis support](https://redis.com/company/support) to upgrade the cluster to a compatible version or [create a new subscription]({{<relref "/rc/subscriptions/create-flexible-subscription">}}).
