---
Title: Flexible subscriptions with AWS Marketplace
LinkTitle: AWS Marketplace subscription
description: Shows how to subscribe to Redis Cloud using AWS Marketplace
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rc/cloud-integrations/aws-marketplace/
         /rc/cloud-integrations/aws-marketplace.md
---

You can use AWS Marketplace to subscribe to Redis Enterprise Cloud through AWS Marketplace.  This lets you provision according to your needs and pay using your AWS account.

Here's how to create a new Flexible subscription as part of your AWS Marketplace commitment.

1.  Sign in to the [AWS console](https://console.aws.amazon.com/).

1.  Search AWS Marketplace for [Redis Enterprise Cloud - Flexible plan](https://aws.amazon.com/marketplace/pp/prodview-mwscixe4ujhkq).

    {{<image filename="images/rc/aws-marketplace-rc-flexible-plan.png" alt="The Redis Enterprise Cloud - Flexible plan listing on AWS Marketplace" >}}{{< /image >}}

1.  Subscribe to Redis Enterprise Cloud - Flexible plan, locate the **Set Up Your Account button**, and then select it to begin mapping your Redis Cloud account with your AWS Marketplace account.

    {{<image filename="images/rc/aws-marketplace-account-setup-button.png" alt="Use the Set Up Your Account button after subscribing to Redis Enterprise Cloud with your AWS Marketplace account." width="50%">}}{{< /image >}}

1.  Sign in to the Redis Cloud [admin console](https://app.redislabs.com).

1.  Use the AWS Marketplace dialog to select the Redis account to be mapped to your AWS Marketplace account.

    {{<image filename="images/rc/aws-marketplace-map-account-dialog.png" alt="Use the AWS Marketplace dialog to map your Redis Cloud account to your AWS Marketplace account." width="350px">}}{{< /image >}}

1.  Use the **Map account** button to confirm your choice.

1.  Once your Redis account is mapped to your AWS Marketplace account, a message appears in the upper, left corner of the account panel.

    {{<image filename="images/rc/aws-marketplace-billing-badge.png" alt="The AWS Marketplace badge appears when your Redi Cloud accunt is mapped to an AWS Marketplace account." width="350px">}}{{< /image >}}

    In addition, AWS Marketplace is reported as the selected payment method.

At this point, you can create a new Flexible subscription using the [standard workflow]({{<relref "/rc/subscriptions/create-flexible-subscription">}}), with one important change. You don't need to enter a payment method, as it's automatically assigned to your AWS Marketplace account.

To confirm this, review the payment method associated with your subscription.

If, for whatever reason, your AWS Marketplace account is disabled or otherwise unavailable, you won't be able to use your Flexible subscription until the billing method is updated.  For help, [contact support](https://redis.com/company/support/).
