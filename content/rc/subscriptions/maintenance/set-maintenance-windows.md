---
Title: Set maintenance windows
LinkTitle: Set maintenance windows
description: Shows how to set manual maintenance windows and skip maintenance.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-3]"
categories: []
aliases: 
---

By default, Redis will maintain your Redis Cloud subscriptions and databases as needed. During maintenance, you may notice some latency when connecting to your databases. For more information about the types of maintenance and how Redis maintains your subscriptions, see [Maintenance]({{<relref "/rc/subscriptions/maintenance">}}).

You typically do not need to set a maintenance window manually as Redis will attempt to perform maintenance during low-traffic hours when possible. If you want to control when Redis performs maintenance for a Flexible subscription, you can [set manual maintenance windows](#set-manual-maintenance-windows) to ensure non-urgent maintenance will occur at set times. Or, you can [skip non-urgent maintenance temporarily](#skip-maintenance-temporarily) during busy periods.

## Set manual maintenance windows

To set manual maintenance windows for a single flexible subscription:

1. From the [admin console](https://app.redislabs.com/), select the **Subscriptions** menu and then select your subscription from the list.

1. Select the **Overview** tab.

1. In the **Maintenance Windows** panel, select **Manual**.

1. Click **Activate** to confirm your selection.

1. Enter the maintenance window time frame details.

    {{<image filename="images/rc/subscriptions-set-maintenance-window.png" alt="The set maintenance windows panel" >}}{{< /image >}}

    - Select the days that Redis can perform maintenance in the **Days** drop-down.
    - Select the time that Redis can start performing maintenance on those days in the **From** drop-down.
    - Select the amount of time that Redis can perform maintenance in the **Duration** drop-down.
    - Select **+ Time Frame** to add another time frame for maintenance.

    Redis recommends allowing maintenance on at least two different days for 8 hours on each day.

1. Click **Save**.

## Skip maintenance temporarily

To skip non-urgent maintenance temporarily for a subscription:

1. From the [admin console](https://app.redislabs.com/), select the **Subscriptions** menu and then select your subscription from the list.

1. Select the **Overview** tab.

1. In the **Maintenance Windows** panel, select **Skip the next 7 days**.

1. Click **Continue** to confirm your selection.

You will only be allowed to skip non-urgent maintenance twice in one month. 




