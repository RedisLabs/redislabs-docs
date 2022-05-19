---
Title: Cluster Name, Email Service, Time Zone, and License
description:
weight: 10
alwaysopen: false
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
You can view and set various cluster settings in the **Settings > General** page.

## Entering a cluster key

After purchasing a cluster key and if your account has the "Admin" role,
you can enter the key in the Cluster Key field, either during initial\
cluster creation or at any time afterward. The key defines various
cluster settings, such as the maximum number of shards you can have in
the cluster. For more detailed information see [Cluster License
Keys]({{< relref "/rs/clusters/configure/license-keys.md" >}}).

## Viewing the maximum number of allowed shards

The maximum number of allowed shards, which is determined by the Cluster
Key, appears in the **Max number of shards** field.

## Viewing the cluster name

The cluster name appears in the **Cluster name** field. This gives a
common name that your team or Redis support can refer to. It is
especially helpful if you have multiple clusters.

## Setting your time zone

You can set your time zone in the **Timezone** field. This is
recommended in order to make sure that the date, time fields, and log
entries are shown in your preferred time zone.

## Configuring email server settings

To enable receiving alerts by email, fill in the details for your email
server in the email server settings section and select the requested
connection security method: TLS/SSL, STARTTLS, or None. Upon completing
to fill-in all details, it is advisable to verify the specified settings
by clicking **Test Mail**.
