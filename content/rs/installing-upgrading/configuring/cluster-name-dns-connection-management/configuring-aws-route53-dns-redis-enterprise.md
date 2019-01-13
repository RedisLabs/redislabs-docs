---
Title: Configuring AWS Route53
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/configuring/cluster-name-dns-connection-management/configuring-aws-route53-dns-redis-enterprise
---
Redis Enterprise Software (RS) requires DNS to be properly configured to
achieve high-availability (HA) and fail-over regardless of where it is
installed. Here we will discuss doing this with AWS's Route53 service
for DNS resolution.

## Prerequisites

You need to have a domain name registered. Then, either you need to have
Amazon's Route53 as the primary/master nameserver (NS) for this domain
or for a delegated zone under this domain. Finally, you need to have the
zone (either the whole domain or a sub-zone) defined in AWS Route53.

## How does Redis Enterprise Software achieve failover?

If you have a three node Redis Enterprise Software cluster. When your
application wants to connect to a RS database, it connects to any node
in this cluster using its fully qualified domain name (FQDN), for
example, node1.mycluster.enterprise.com. It needs to know the IP address
associated with this name and asks the top-level nameservers (.com) for
the list of name servers in charge of enterprise.com. Then, it asks
these name server (one after each other in case of failure) for the name
servers in charge of mycluster.enterprise.com, and finally, it asks
these name servers (one after each other in case of failure) for the IP
of node1.mycluster.enterprise.com. At the end, it connects to this IP
address. All this process is obfuscated from the application and is done
by the resolver, a system library.

Your name servers are in charge of enterprise.com. So, they are able to
give the name servers in charge of your cluster. RS embeds a name server
in each node. the nodes are in charge of the cluster zone resolution and
are able to give the IP address of any node in the cluster. When
everything is working, whichever is the top-level nameserver asked, it
gives the list of name servers for your enterprise domain, then
whichever enterprise name server is asked, it gives the list of cluster
name servers (the cluster nodes), and whichever is the node asked, it
returns the IP address of the requested node name.

If the cluster nameserver (node) asked is down, given the resolution
process, the resolver will try to ask another name server (node) from
the list and will get the requested IP address. That's the standard DNS
resolution behavior, in few words.

Now, when a cluster node dies, for whatever reason, the other nodes can
not reach it anymore and will replace the IP address associated with his
name by the IP address of another node in the cluster's name servers. It
means that the failed over IP address will never be returned anymore by
the name servers to any requested FQDN, and that two of the FQDN will
have the same IP address. Basically, it means that whichever node FQDN
your application is asking to resolve, it will always get the IP address
of one node in the cluster that is healthy, up and running and the
connection will succeed.

## Configuration

After the theory, we can go through the hands-on steps to achieve this
configuration with AWS's Route53 DNS as your domain or sub-domain
official name server.

If you would like to watch a video on the process, here you go.

{{< youtube Dp5xAGhy4ng >}}

## Connection to AWS Route53

The first step is to connect your browser to AWS and to login into the
administration interface. Then, you have to go in the *Services* menu at
the top of the page and clic on the *Route53* menu item:

![01-ServicesRoute53-en](/images/rs/01-ServicesRoute53-en.png?width=600&height=837)

Then, I assume that you already have registered a domain, and that you
defined *Route53* as the primary/master name server for the whole domain
or for one of its sub-domains. So, you should have at least one zone in
*Route53*. Clic on the *Hosted zones* link to open it:

![02-Route53HostedZones-en](/images/rs/02-Route53HostedZones-en.png?width=600&height=237)

*Route53* is now displaying the list of the zones that you defined. You
need to clic on the zone in which you want to define your cluster,
*demo-rlec.redislabs.com* in my case:

![03-HostedZoneSelection-en](/images/rs/03-HostedZoneSelection-en.png?width=600&height=206)

## Nameserver records creation

The next step is to create the record that returns the IP address of
your cluster's name servers, ie one of your cluster's nodes. To create
the first name server IP address resolution record, you need to clic on
the *Create Record Set* blue button at the top of the list:

![04-CreateRecordSet-en](/images/rs/04-CreateRecordSet-en.png?width=600&height=189)

This record will **only** be used to resolve the IP address of the
cluster name server to query, it is **not** used by the application to
connect to the cluster. This kind of record is an *A* record type and
associates an IP address to a name. To avoid the whole resolving process
each time that a name is requested, the results are cached in the
forwarding DNS and in the application's resolver library. Given that the
IP address associated with a node can change when thoe related hardware
fails, the information needs to expire quickly, otherwise, the node
fails, the name servers reflects the failover, but they are not queried
again and the local resolver still returns the IP of the failed node.
This is the Time To Live (TTL) field associated to the record.

So, you need to enter the name used as the name server's name, despite
that it could be different, I suggest that you use the node name. You
need to enter its IP address, to set the TTL to something short, I'll
set it to one minute. This is the maximum amount of time that the record
will be kept in cache of the resolver and of the forwarding DNS. If the
node goes down, the resolver will still use this value until the record
expires in his cache, but as the node will not answer, the resolver will
try the next name server in the list (he has the *A* record because he
needed to know the IP of the first name server, and if he needed this
IP, he already had the name server list).

Finally submit the first name server's *A* record to *Route53*, using
the *Create* button at the bottom of the right panel:

![05-NS1Configuration-en](/images/rs/05-NS1Configuration-en.png?width=400&height=802)

You want (and need) to have all your cluster nodes acting asname
servers, soyou have to repeat these steps for all your nodes and you
should get a list of *A* records in *Route53* interface:

![06-NSList-en](/images/rs/06-NSList-en.png?width=600&height=133)

Now, the client-side resolver and the forwarding DNS can reach the
cluster nameservers by their IP address, if they know what are the names
of the cluster's name servers. That's the next point.

## Defining the nameserver list for a subzone

Here, the idea is to provide the list of the cluster nameserver's names
to the resolvers and the forwarding DNS, so that they will be able to
resolve the IP address of one of them and query it for node's IP. To
achieve that, we have to define a new record in *Route53*, an *NS*
record for Name Server record. So, once again, we will clic on the
button to *Create \[a\] Record Set* and we will enter the relevant
information in the right panel.

The name is the name of the cluster, if your cluster nodes are
nodeX.mycluster.enterprise.com, then the cluster name is
mycluster.enterprise.com. Remember, the resolver will ask "who are the
name servers for zone ". The name is the searched key, the record type
is the field. In our case, the resolver will ask for the \`NS\` record
type to get the nameservers list of the clustername, so we have to
choose this type. A short TTL, such as one minute, is a good idea here,
too. And we have to enter the node name list in the text box. In other
DNS, we would have to create one NS record for each item, but
\*Route53\* takes care of that for us. I also have the habit to end
these records with a final dot, it is not a typo, because some other DNS
require it and it does not seem to be an issue with \*Route53\*. At the
end, we can clic on the \*Create\* button:

![07-NSRecord-en](/images/rs/07-NSRecord-en.png?width=400&height=817)

Congratulations, you completed the *Route53* DNS configuration for your
Redis Enterprise Software. Let's check what you have.

## Verification

You should end with several name server *A* record (one for each cluster
node) to be able to reach any of them by its name. You should also have
one record that lists the nameservers names for the zone (cluster):

![08-FinalConfig-en](/images/rs/08-FinalConfig-en.png?width=600&height=155)

If your cluster nodes are healthy, up and running, with DNS network
ports unfiltered, you can test the configuration. Who are the
nameservers in charge of the resolution in the cluster:

```src
dig ns demo.francois.demo-rlec.redislabs.com

; <<>> DiG 9.9.5-9+deb8u9-Debian <<>> ns demo.francois.demo-rlec.redislabs.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 25061
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;demo.francois.demo-rlec.redislabs.com. IN NS

;; ANSWER SECTION:
demo.francois.demo-rlec.redislabs.com. 3409 IN NS ns2.demo.francois.demo-rlec.redislabs.com.
demo.francois.demo-rlec.redislabs.com. 3409 IN NS ns1.demo.francois.demo-rlec.redislabs.com.
demo.francois.demo-rlec.redislabs.com. 3409 IN NS ns3.demo.francois.demo-rlec.redislabs.com.

;; Query time: 31 msec
;; SERVER: 192.168.1.254#53(192.168.1.254)
;; WHEN: Tue Feb 14 16:49:13 CET 2017
;; MSG SIZE  rcvd: 120
```

You can see that the name were changed to ns?. This answer does not come
from *Route53* but from the cluster nameservers themselves.

Now you can either install and configure your nodes, if not already
made, or connect your client, using the cluster name (**not the IP
address**).
