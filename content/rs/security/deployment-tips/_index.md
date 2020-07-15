---
Title: Deployment Tips
description:
weight: 10
alwaysopen: false
categories: ["RS"]
---

## Deployment Architecture

### Network Security
Redis Enterprise is a database software and strongly reccomended to be deployed within a trusted network. Redis Enterprise ports should not be accessible to the public internet. Redis Enterprise should be deployed inside a VPC, VNET or generally behind a firewall that restricts access from the outside world. 

### Deploy an odd number of 3 or more nodes
Redis is an available and partition tolerant database. We recommend that Redis Enterprise be deployed in a cluster of an odd number of 3 or more nodes so that you are able to successfully failover in the event of a failure.


### Reboot Sequencing
We recognize that our customers will frequently maintain reboot schedules. There are cases, however, where our customers have rebooted too many servers at once, causing a quorum failure and resulting in loss of availability of the database. We recommend that rebooting be done in a phased manner so that quorum is not lost. For example, to maintain quorum in a 3 node cluster, at least 2 nodes must be up at all times. Only one server should be rebooted at any given time to maintain quorum.


## Anti-virus Exclusions
To ensure that anti-virus solutions that scan files or intercept processes to protect memory do not interfere with Redis Enterprise software, customers should ensure that anti-virus exclusions are implemented across all nodes in their Redis Enterprise cluster in a consistent policy. 

If you are replacing your existing antivirus solution or installing/supporting Redis Enterprise, please ensure the below paths are excluded.  For antivirus solutions that intercept processes, binary files may have to be excluded directly depending on the requirements of your anti-virus vendor. 


| **Path** | **Description** |
|------------|-----------------|
| /opt/redislabs | Main installation directory for all Redis Enterprise Software binaries |
| /opt/redislabs/bin | Binaries for all the utilities for command line access and managements such as "rladmin" or "redis-cli" |
| /opt/redislabs/config | System configuration files |
| /opt/redislabs/lib | System library files |
| /opt/redislabs/sbin | System binaries for tweaking provisioning |


