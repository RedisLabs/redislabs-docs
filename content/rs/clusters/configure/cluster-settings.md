---
Title: Cluster settings
linktitle: Cluster settings
description: You can view and set various cluster settings such as cluster name, email service, time zone, and license.
weight: 10
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: [
        /rs/administering/cluster-operations/settings/,
        /rs/administering/cluster-operations/settings/general/,
        /rs/administering/cluster-operations/settings/license-keys/,
        /rs/administering/cluster-operations/cluster-settings.md,
        /rs/administering/cluster-operations/cluster-settings/,
        /rs/clusters/configure/cluster-settings.md,
        /rs/clusters/configure/cluster-settings/,
]
---
You can view and set various cluster settings, such as cluster name, email service, time zone, and license, on the **Cluster > Configuration** page.

## General configuration tab

### Upload cluster license key

After purchasing a cluster license and if your account has the "Admin" role,
you can upload the cluster license key, either during initial
cluster creation or at any time afterward. The license key defines various
cluster settings, such as the maximum number of shards you can have in
the cluster. For more detailed information see [Cluster license
keys]({{< relref "/rs/clusters/configure/license-keys.md" >}}).

### View max number of allowed shards

The maximum number of allowed shards, which is determined by the cluster license
key, appears in the **Max number of shards** field in the **License** section.

### View cluster name

The cluster name appears in the **Cluster name** field in the **License** section. This gives a
common name that your team or Redis support can refer to. It is
especially helpful if you have multiple clusters.

### Set time zone

You can set your time zone in the **Time zone** field. This is
recommended to make sure the date, time fields, and log
entries are shown in your preferred time zone.

## Alert settings tab

The **Alert Settings** tab lets you configure alerts that are relevant to the entire cluster, such as alerts for cluster utilization, nodes, node utilization, security, and database utilization.

You can also configure email server settings and [send alerts by email]({{<relref "/rs/clusters/monitoring#send-alerts-by-email">}}) to relevant users.

### Configure email server settings

To enable email alerts:

1. Enter your email
server details in the **Email server settings** section.

1. Select a connection security method:

    - TLS/SSL 

    - STARTTLS
    
    - None

1. Send a test email to verify your email server settings.
