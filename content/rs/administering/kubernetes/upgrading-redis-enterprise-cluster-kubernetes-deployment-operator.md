---
Title: Upgrading a Redis Enterprise Cluster – Kubernetes Deployment with Operator
description: 
weight: 50
alwaysopen: false
categories: ["Redis Enterprise Software (RS)"]
---
Redis Labs implements rolling updates for software upgrades in Kubernetes deployments.

Rolling updates allow deployments’ updates to take place with zero downtime 
by incrementally updating Pods’ Redis Enterprise Cluster instances with new ones.

The following illustrations depict how a rolling update occurs:

* Each pentagon represents a node
* Each box represents a Pod

![kubernetes-rolling-updates]( /images/rs/kubernetes-rolling-updates.png )

The Pods are updated one by one, in the diagram starting from left to right. 
Upgrade progresses to the next Pod only once the current Pod has completed 
the upgrade process successfully.

![kubernetes-rolling-updates-newapp]( /images/rs/kubernetes-rolling-updates-newapp.png )

![kubernetes-rolling-updates-newcluster]( /images/rs/kubernetes-rolling-updates-newcluster.png )

![kubernetes-rolling-updates-done]( /images/rs/kubernetes-rolling updates-done.png )

Updates to the Pods in the StatefulSet are performed in reverse ordinal order. 
The Kubernetes controller terminates each Pod and waits for it to transition to Running, 
and then to Ready, before updating the next Pod, until all Pods are updated 
and the upgrade process is complete.

To trigger an upgrade, edit the image value in your <my-cluster-name>.yaml file, 
known by the default name redis-enterprise-cluster.yaml:

    spec:

        redisEnterpriseImageSpec:

        imagePullPolicy: IfNotPresent

        repository:        redislabs/redis #edit to reflect the repository that you utilize

        versionTag: 5.2.2-22.rhel7-openshift #edit to reflect the image tag you are upgrading to

After editing the redis-enterprise-cluster.yaml file, apply it by running:

    kubectl apply -f redis-enterprise-cluster.yaml

To view the status of the current rolling upgrade run:

    kubectl rollout status sts/<name>