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
{{<warning>}} Due to an change in the SCC, on OpenShift clusters running version 6.2.12 or earlier upgrading to version 6.2.18 or later, where `node1` is not the master node, the upgrade might get stuck. You might have a pod that doesn't become fully ready and start seeing restarts. In the ServicesRigger log, you'll see an error message containing "couldn't update pod."<br/><br/>
This may also effect OpenShift clusters containing two RECs running different versions, if one is running version 6.2.12 or earlier and the other is running 6.2.18 or later. <br/>
<br/>
To prevent this, set node1 as the master node with `rladmin master set 1`. <br/>
<br/>
This is a newly discovered issue and more information will be available soon. If you have already encountered the error and need it fixed immediately, contact Redis support.
{{</warning>}}

{{<note>}}
On clusters with more than 9 REC nodes, a Kubernetes upgrade can render the Redis cluster unresponsive in some cases. A fix is available in the 6.4.2-5 release. Upgrade your Redis cluster to [6.4.2-5]({{<relref "/kubernetes/release-notes/6-4-2-releases/6-4-2-5.md">}}) before upgrading your Kubernetes cluster.
{{</note>}}

{{<table-children columnNames="Version&nbsp;(Release&nbsp;date)&nbsp;,Major changes" columnSources="LinkTitle,Description" enableLinks="LinkTitle">}}