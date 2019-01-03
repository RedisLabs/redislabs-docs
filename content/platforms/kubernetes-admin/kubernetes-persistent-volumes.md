---
Title: Kubernetes Operator Deployment – Persistent Volumes
description: 
weight: 40
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/kubernetes/kubernetes-operator-deployment-persistent-volumes/
---
To deploy a Redis Enterprise Cluster with Redis Enterprise Operator the
spec should include a *persistentSpec* section, in the
*redis-enterprise-cluster.yaml* file:

    spec:
      nodes: 3
      persistentSpec:
       enabled: true
       storageClassName: "standard"
       volumeSize: "23Gi” #optional 

Persistence storage is a requirement for this deployment type.

## Volume Size

*volumeSize* is an optional definition. By default, if the definition is
omitted, Operator allocates five times (5x) the amount of memory (RAM)
defined for nodes (see example below), which is the recommended
persistent storage size as described in the [Hardware
requirements]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}}) article.

To explicitly specify the persistent storage size, use the *volumeSize*
property as described in the example above.

## Storage Class Name

*storageClassName* determines the Storage Class resource, which is
defined by the Kubernetes cluster administrator, to be used for
persistent storage.

Different Kubernetes distributions and different deployments use
different Storage Class resources.

In order to determine the Storage Class resources available for your K8s
deployment, use the following command:

    kubectl get StorageClass

Below is an example of a response to the command. Typically, OpenShift
on AWS uses “gp2” as the Storage Class name while GKE uses
“standard.”

|                         |                                                         |
| ----------------------- | ------------------------------------------------------- |
| *Name:*                 | *gp2*                                                   |
| *IsDefaultClass:*       | *Yes*                                                   |
| *Annotations:*          | *storageclass.beta.kubernetes.io/is-default-class=true* |
| *Provisioner:*          | *kubernetes.io/aws-ebs*                                 |
| *Parameters:*           | *encrypted=false,kmsKeyId=,type=gp2*                    |
| *AllowVolumeExpansion:* | *\<unset\>*                                             |
| *MountOptions:*         | *\<none\>*                                              |
| *ReclaimPolicy:*        | *Delete*                                                |
| *VolumeBindingMode:*    | *Immediate*                                             |
| *Events:*               | *\<none\>*                                              |

*Note: storageClassName must be specified for this deployment type.*

Example of the redisEnterpriseNodeResources definition:

    redisEnterpriseNodeResources:
      limits:
        cpu: “4000m”
        memory: 4Gi    
      requests:
        cpu: “4000m”
        memory: 4Gi
