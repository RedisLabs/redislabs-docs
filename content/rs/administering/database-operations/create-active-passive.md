---
Title: Create an Active-Passive Geo-Replicated Database (Replica Of)
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/intercluster-replication/replica-of/
---
In Redis Enterprise, [active-passive geo-distribution]({{< relref "/rs/administering/active-passive.md" >}}) provides applications read-only access
to replicas of the data set from different geographical locations.
The Redis Enterprise implementation of active-passive replication is called Replica Of.

Redis Enterprise Software has a security mechanism in which an internal admin password is
assigned to each database. This password helps protect the database from
being used as a replica source and is required in order to define
another database as a replica target of this database.

The source databases can be located in the same Redis Enterprise
Software (RS) as the destination database, in a different RS, or they
can be Redis databases that are not part of an RS.

- When a source database is from within RS, the source URL has the
    following format:
    \[database name\]: redis://admin:\[internal database
    password\]@\[database endpoint with port\] where the internal
    database password is the password automatically assigned and
    populated by RS. In the RS management UI, when you enter the textbox
    to define a replica source from within the target database page, the
    list of existing databases is shown with the appropriate URL,
    including the internal admin password, already set up.
- When a source database is from a different RS, the source URL has
    the same exact format as indicated above (except for the
    **\[database name\]:** prefix), but in this case, the URL does not
    show up as an option in the UI. In order to configure the target
    database as a replica of a database from a different RS, you need to
    extract the source database URL, including the internal admin
    password, from the source database. This can be done in the UI from
    the source database page by clicking the **Get Replica of source
    URL** link next to the Endpoint field. In addition, you can
    regenerate the internal admin password from the same UI. If you
    regenerate the internal admin password, any existing replica
    destinations already configured stops working until you update
    them.
    - **Compression:** when a source database is located on a different
    Redis Enterprise Software cluster, there is also an option to enable
    compression of the data being replicated. For additional details,
    refer to the ["Replica of" data
    compression]({{< relref "/rs/administering/active-passive.md#data-compression-for-replica-of">}}) section.
- When a source database is external to a Redis Enterprise Software
    cluster, the source URL has the following format:
    redis://:\[redis password\]@\[hostname\]:\[port\] where the password
    is the Redis password assigned by the user, represented with URL
    encoding escape characters. If no password was defined for the
    database, the following format should be used:
    redis://hostname:port.

When multiple sources are defined there is no meaning to the order in
which they are defined or presented.

If you make changes to the definition of the sources (such as editing,
adding or deleting a source), then the synchronization process is
restarted from scratch for all the source databases.

**Note:** If you used the mDNS protocol when naming the cluster name
(FQDN), make sure that the client mDNS perquisites are met in order for the
*Replica of* feature to work. For additional details, refer to the
[Client prerequisites for
mDNS]({{< relref "/rs/installing-upgrading/configuring/mdns.md" >}}).

## Configuring TLS for Replica Of on the destination database

To enable TLS for Replica Of in the destination database:

1. Edit the 'Replica of' section of the destination Database to point
    the source Database and press the 'Enable TLS Authentication' icon:
    ![Replica-of
    Destination](/images/rs/Screen-Shot-2018-03-29-at-10.48.18-PM.png?width=1608&height=178)
    Replica-of Destination
2. From the *source cluster*, copy the "Proxy
    Certificate" (located under **settings**-\> **general**) and paste
    it as the **Source Cluster Certificate** for the destination
    Database:
    ![Replica-of Destination -
    Certificate](/images/rs/Screen-Shot-2018-03-29-at-10.49.55-PM.png?width=1596&height=626)
    Replica-of Destination - Certificate
3. Press the **Continue** button, save the certificate and **Update**
    the database changes.

## Encryption of Replica Of 

{{< embed-md "tls-configuration-procedure.md"  >}}