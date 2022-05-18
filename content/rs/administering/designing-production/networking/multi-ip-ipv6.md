---
Title: Multi-IP and IPv6
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software (RS) supports server/instances/VMs with
multiple IP addresses, as well as IPv6 addresses.

RS related traffic can be logically and physically divided into internal
traffic and external traffic:

- "Internal traffic" refers to internal cluster communications, such
    as communications between the nodes for cluster management purposes.
- "External traffic" refers to communications between the clients and
    the databases, as well as connections to the management UI in the
    browser.

When only one IP address exists on a machine that serves as an RS node,
it is used for both internal and external traffic.

When more than one IP address exists on an RS node:

- One of the IPv4 addresses is used for internal traffic
- Other IP addresses may only be used for external traffic

As part of the node configuration process, if the machine has multiple
IP addresses, you are required to assign one of the machine's IPv4
addresses for internal traffic use, and assign one or more IPv4/IPv6
addresses for external traffic.

If at a later stage you would like to update the IP address allocation,
run the relevant commands in [`rladmin` command-line interface
(CLI)]({{<relref "/rs/references/cli-utilities/rladmin">}}).

If you need to update the internal IP address in the OS, you must remove
that node from the RS cluster, make the IP change, and then add the node
back into the cluster.

When manually configuring an internal address for a node, make sure the
address is valid and bound to an active interface on the node. Failure
to do so prevents the node from coming back online and rejoining the
cluster.

When configuring external addresses, it is possible to list external
addresses that are not bound to an active interface, but are otherwise
mapped or configured to route traffic to the node (AWS Elastic IPs, a
load balancer VIP and so on).

rladmin node address commands syntax:
node addr set
node external_addr set
node external_addr \[ add \| remove \]

Where:

- addr - the internal address (can be used only when the node is
    offline)
- external_addr - external addresses

{{< note >}}
While [joining a new node to a
cluster]({{< relref "/rs/administering/adding-node.md" >}})
during the node bootstrap process,
when prompted to provide an IP of an existing node in the cluster,
if you use the node's IP, provide the node's internal IP address.
{{< /note >}}
