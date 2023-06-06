---
Title: 6.2.18 release notes
linkTitle: 6.2.18 releases
description: Release notes for the 6.2.18 releases of Redis Enterprise Software for Kubernetes. 
weight: 58
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /kubernetes/release-notes/6-2-18-releases/,

]
---
{{<warning>}} Due to a change in the SCC, on OpenShift clusters running version 6.2.12 or earlier upgrading to version 6.2.18 or later, where `node:1` is <b>not</b> the master node, the upgrade might get stuck.

For more detail and steps to prevent this issue, see [upgrade a Redis Enterprise cluster (REC)]({{<relref "/kubernetes/re-clusters/upgrade-redis-cluster#before-upgrading">}}).
{{</warning>}}

{{<note>}}
On clusters with more than 9 REC nodes, a Kubernetes upgrade can render the Redis cluster unresponsive in some cases. A fix is available in the 6.4.2-5 release. Upgrade your Redis cluster to [6.4.2-5]({{<relref "/kubernetes/release-notes/6-4-2-releases/6-4-2-5.md">}}) before upgrading your Kubernetes cluster.
{{</note>}}

{{<table-children columnNames="Version&nbsp;(Release&nbsp;date)&nbsp;,Major changes" columnSources="LinkTitle,Description" enableLinks="LinkTitle">}}