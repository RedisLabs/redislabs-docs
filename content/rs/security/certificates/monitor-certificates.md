---
title: Monitor certificates
linkTitle: Monitor certificates
description: Monitor certificates on a Redis Enterprise cluster.
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: 
---

You can easily monitor Redis Enterprise Software various certificates:

### Monitor certificates using RS integration with Prometheus

Redis Enterprise exposes the expiration of each certficate, per node, in seconds.

Here are some examples for how to use the ‘node_cert_expiration_seconds’ metric:

node_cert_expiration_seconds{cluster="mycluster.local",logical_name="cm",node="1",path="/etc/opt/redislabs/cm_cert.pem"} 31104000.0
node_cert_expiration_seconds{cluster="mycluster.local",logical_name="api",node="1",path="/etc/opt/redislabs/api_cert.pem"} 31104000.0
node_cert_expiration_seconds{cluster="mycluster.local",logical_name="proxy",node="1",path="/etc/opt/redislabs/proxy_cert.pem"} 31104000.0
node_cert_expiration_seconds{cluster="mycluster.local",logical_name="metrics_exporter",node="1",path="/etc/opt/redislabs/metrics_exporter_cert.pem"} 31104000.0
node_cert_expiration_seconds{cluster="mycluster.local",logical_name="syncer",node="1",path="/etc/opt/redislabs/syncer_cert.pem"} 31104000.0
node_cert_expiration_seconds{cluster="mycluster.local",logical_name="ccs_internode_encryption",node="1",path="/etc/opt/redislabs/ccs_internode_encryption_cert.pem"} 2592000.0
node_cert_expiration_seconds{cluster="mycluster.local",logical_name="data_internode_encryption",node="1",path="/etc/opt/redislabs/data_internode_encryption_cert.pem"} 2592000.0
node_cert_expiration_seconds{cluster="mycluster.local",logical_name="mesh_ca_signed",node="1",path="/etc/opt/redislabs/mesh_ca_signed_cert.pem"} 2592000.0
node_cert_expiration_seconds{cluster="mycluster.local",logical_name="gossip_ca_signed",node="1",path="/etc/opt/redislabs/gossip_ca_signed_cert.pem"} 2592000.0
