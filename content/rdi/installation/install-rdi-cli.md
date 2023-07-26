---
Title: Install RDI CLI
linkTitle: Install RDI CLI
description: Install Redis Data Integration CLI
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

The following installation instructions install the RDI CLI on a local workstation. For installing in K8S or OpenShift please see [k8s installation]({{<relref "/rdi/installation/install-k8s">}}).

Redis Data Integration installation is done via the RDI CLI. The CLI should have network access to the Redis Enterprise cluster API (port 9443 by default).

### Download RDI CLI

#### Ubuntu 20.04

```bash
wget https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-ubuntu20.04-{{<param rdi_cli_preview>}}.tar.gz -O /tmp/redis-di.tar.gz
```

#### Ubuntu 18.04

```bash
wget https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-ubuntu18.04-{{<param rdi_cli_preview>}}.tar.gz -O /tmp/redis-di.tar.gz
```

#### RHEL 8

```bash
wget https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-rhel8-{{<param rdi_cli_preview>}}.tar.gz -O /tmp/redis-di.tar.gz
```

#### RHEL 7

```bash
wget https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-rhel7-{{<param rdi_cli_preview>}}.tar.gz -O /tmp/redis-di.tar.gz
```

## Install RDI CLI

Unpack the downloaded `redis-di.tar.gz` into `/usr/local/bin/` directory:

```bash
sudo tar xvf /tmp/redis-di.tar.gz -C /usr/local/bin/
```

> Note: Non-root users should unpack to a directory with write permission and run `redis-di` directly from it.

