---
Title: Upgrading a Redis Enterprise Cluster – Kubernetes Deployment with Operator
description: 
weight: 50
alwaysopen: false
categories: ["RS"]
---
Redis Labs implements rolling updates for software upgrades in Kubernetes deployments.

Rolling updates allow deployments’ updates to take place with zero downtime 
by incrementally updating Pods’ Redis Enterprise Cluster instances with new ones.

The following illustrations depict how a rolling update occurs:

- Each pentagon represents a node
- Each box represents a Pod

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

To trigger an upgrade, first determine whether an Operator upgrade is required.
If so, make sure to apply and verify that an Operator upgrade has completed deploying before upgrading the cluster.

Edit the image value in your <operator>.yaml file,
known by the default name operator.yaml:

```src    
    spec:
      serviceAccount:   redis-enterprise-operator
      containers:
        - name:         redis-enterprise-operator       #edit to reflect the repository that you utilize
          image:        redislabs/operator:175_f2e2fb9  #edit to reflect the image tag you are upgrading to
```

After editing the operator.yaml file, apply it by running:

    kubectl apply -f operator.yaml
    
Verify that the Operator deployment has successfully completed by running the following command and verifying that it has achieved Ready status:

```src
    kubectl get pod/redis-enterprise-operator-*-*
```

Once the Operator is up and running with the upgraded image, edit the image value in your <my-cluster-name>.yaml file, 
known by the default name redis-enterprise-cluster.yaml:

```src
    spec:
      redisEnterpriseImageSpec:
        imagePullPolicy:    IfNotPresent
        repository:         redislabs/redis             #edit to reflect the repository that you utilize
        versionTag:         5.2.2-22.rhel7-openshift    #edit to reflect the image tag you are upgrading to
```

After editing the redis-enterprise-cluster.yaml file, apply it by running:

```src
    kubectl apply -f operator.yaml
```

To view the status of the current rolling upgrade run:

```src
    kubectl rollout status sts
```
