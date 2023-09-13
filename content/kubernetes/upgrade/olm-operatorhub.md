---
Title: Upgrade Redis Enterprise with OpenShift OperatorHub (OLM)
linkTitle: OpenShift OperatorHub (OLM)
description: This task describes how to upgrade a Redis Enterprise cluster via OpenShift lifecycle manager.
weight: 30
alwaysopen: false
categories: ["Platforms"]
aliases: []
---

## Prerequisites

1. Check [Supported Kubernetes distributions]({{<relref "/kubernetes/reference/supported_k8s_distributions">}}) to make sure your Kubernetes distribution is supported.

2. Verify your license is valid before upgrading your REC. Invalid licenses will cause the upgrade to fail.

3. Verify you are upgrading from Redis Enterprise operator version 6.2.10-45 or later. If you are not, you must upgrade to 6.2.10-45 before upgrading to versions 6.2.18 or later.

4. When upgrading existing clusters running on RHEL7-based images, make sure to select a RHEL7-based image for the new version. See [release notes]({{<relref "/kubernetes/release-notes/">}}) for more info.

5. If you want to migrate from RHEL7-based images to RHEL8-based images, you'll need to upgrade to version 7.2.4-2 with a RHEL7-based image, then you'll be able to migrate to a RHEL8-based image when upgrading to 7.2.4-**TBD**.