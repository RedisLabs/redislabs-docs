---
Title: Changing Redis Cloud Plans
description:
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rc/administration/setup-and-editing/changing-subscription-plan/
        /rc/administration/setup-and-editing/changing-subscription-plan/
---
You can change your subscription plan at any time.

To do so:

1. From the Redis Cloud menu, choose **Subscriptions**.  

    ![Select **Subscriptions** from the Redis Cloud menu](/images/rc/subscription-menu-select.png)

1.  Select the subscription you want to change.

    ![Select the target subscription from the list](/images/rc/subscription-list-select.png)

1.  Select the **Change Description** button to list the available options.

    ![The **Change subscription** button appears below the list of subscriptions.](/images/rc/subscription-change-button.png)


1.  The first option you can change is type, which indicates whether the plan supports replication or data-persistence.  

    Your current selection is highlighted.

    ![The current plan type is selected.](/images/rc/subscription-type-cache.png)

    To change this setting, select your preferred value.

1.  Available memory sizes are displayed, along with prices.  

    To change the memory size, choose your preferred value.

    If you are upgrading a free plan, you need to select or add a payment method.

1.  When finished, select the Update button.

Before reducing memory the memory size of a subscription, verify that your data fits in the new size; otherwise, the update fails.

Subscription updates happen in the background.  Changes may take several minutes to complete.  

If the **Change Subscription** button is disabled, it usually means earlier updates are still deploying.

Refresh the page after a few moments.  If the problem persists, contact support.

    ![The **Change Subscription** button is disabled during update deployment.](/images/rc/subscription-change-button.png)
