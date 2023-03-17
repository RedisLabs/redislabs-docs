---
Title: Google Cloud Marketplace team management
LinkTitle: Team management
description: Shows how to add users in a legacy version of the Google Cloud Marketplace subscription.
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: 
---

{{<banner-article bannerColor="#fff8dc">}}
This article only applies to the [Redis Enterprise Cloud](https://console.cloud.google.com/marketplace/product/endpoints/gcp.redisenterprise.com) marketplace listing. For the [Redis Enterprise Cloud Flexible - Pay as You Go](https://console.cloud.google.com/marketplace/product/redis-marketplace-isaas/redis-enterprise-cloud-flexible-plan) listing, manage your team through the [Access Management]({{<relref "/rc/cloud-integrations/gcp-marketplace/">}}) screen. See [Flexible subscriptions with Google Cloud Marketplace]({{<relref "/rc/cloud-integrations/gcp-marketplace/">}}) for more info.
{{</banner-article>}}

If you subscribed to Redis Cloud through Google Cloud Marketplace using the [Redis Enterprise Cloud](https://console.cloud.google.com/marketplace/product/endpoints/gcp.redisenterprise.com) listing, use the IAM section of the Google Cloud console to manage your team.

To grant Redis Cloud access to a Google Cloud user, select **Add** to add a member, insert the email address, and then assign the following roles to the user:
    - To designate a viewer, assign serviceusage.serviceUsageViewer & redisenterprisecloud.viewer
    - To designate an owner, assign serviceusage.serviceUsageViewer & redisenterprisecloud.admin


If these roles are not available, you can add them to your project.

1. Select **Manage Roles**.
2. Use the filter table field to locate the role. (Search for “service usage viewer” or “Redis Enterprise Cloud admin”.)
3. Select the role by placing a checkmark in the checkbox.
4. Select Create role from selection and then select Create
5. Use IAM to add a member and assign the desired role.

Users must sign into Redis Enterprise Cloud using their single sign-on credentials before they appear in the team member list.
