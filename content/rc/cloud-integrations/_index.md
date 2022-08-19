---
Title: Manage cloud integrations
LinkTitle: Cloud integrations
description: Describes how to integrate Redis Enterprise Cloud subscriptions into existing cloud provider services, whether existing subscriptions or through vendor marketplaces.
weight: 40
alwaysopen: false
categories: ["RC"]
aliases: /rv/how-to/view-edit-cloud-account/
         /rv/how-to/creating-cloud-account/
         /rc/how-to/creating-cloud-account/
         /rc/how-to/view-edit-cloud-account/
         /rc/how-to/view-edit-cloud-account.md
         /rc/cloud-accounts/
         /rc/cloud-accounts.md
---

By default, Redis Enterprise Cloud subscriptions are hosted in cloud vendor accounts owned and managed by Redis, Inc.

To integrate Redis Enterprise Cloud into an existing cloud vendor account, you can:

- Designate an existing AWS subscription as an [AWS cloud account]({{<relref "/rc/cloud-integrations/aws-cloud-accounts/">}}) for your Redis Cloud subscription.

- Subscribe to Redis Enterprise Cloud through [AWS Marketplace]({{<relref "/rc/cloud-integrations/aws-marketplace/">}}).

- Subscribe to Redis Enterprise Cloud through GCP Marketplace.

When you subscribe to Redis Enterprise Cloud through a cloud vendor marketplace, billing is handled through the marketplace.

## Marketplace billing considerations

Cloud vendor marketplaces provide a convenient way to handle multiple subscription fees.  However, this also means that billing issues impact multiple subscriptions, including Redis Enterprise Cloud.

When billing details change, you should verify that each service is operating normally and reflects the updated billing details.  Otherwise, you might experience unexpected consequences, such as data loss or subscription removal.

For best results, we recommend:

- Backing up all data _before_ updating billing details.

- Verifying that all accounts operate normally after updating billing details, especially after updating payment methods.

- Making sure that billing alerts are sent to actively monitored accounts.

## Update marketplace billing details

To change billing details for an AWS marketplace subscription, we recommend creating a second subscription using the updated billing details and then migrating your existing data to the new subscription. 

If you're using GCP, you can migrate a GCP project to a new billing account without creating a new subscription.  To do so:

1. Create a second project and associate with it your new billing account.
2. With your second project, purchase Redis Enterprise via the GCP Marketplace.
3. Activate the service by signing in to Redis Enterprise console using your original SSO credentials.
4. Change the billing account for your original project to the new billing account.
5. (Optional) Remove your second project.