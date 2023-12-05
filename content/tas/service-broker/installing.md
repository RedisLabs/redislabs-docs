---
Title: Installing and configuring the Redis Enterprise Service Broker for VMware Tanzu
description:
weight: 90
alwaysopen: false
hidden: true
aliases: 
---

This page describes how to install and configure Redis Enterprise Service Broker for VMware Tanzu, as well as how to create an instance of the Redis Enterprise service from the Marketplace of your VMware Tanzu deployment.

For this release, the tile version has been updated to match the version number of Redis Enterprise.

For related information see:

- [Redis Enterprise Service Broker for VMware Tanzu]({{<relref "/tas/service-broker/">}})
- [Redis Enterprise Service Broker for VMware Tanzu release notes]({{<relref "/tas/service-broker/release-notes">}})

## Install Redis Enterprise

To use the Redis Enterprise Service Broker, you must have a Redis Enterprise cluster already deployed. Configuring the Redis Enterprise Service Broker requires a Redis Enterprise admin account username and password, as well as the URL of your RS cluster.

For more information about how to install Redis Enterprise and create a cluster on VMware Tanzu, see the [RS on VMware Tanzu documentation](index.html#overview).

## Upgrading

Starting with v5.x of Service Broker, upgrading is supported between tile versions.

## Install the Redis Enterprise Service Broker

1. Download the product file from [VMware Tanzu Network](https://network.pivotal.io/products/redis-enterprise-pack-service-broker/).
1. Upload the product file on the Ops Manager Installation Dashboard.
1. Click **Add** next to the uploaded RS Service Broker in the Ops Manager **Available Products** view to add it to your staging area.
1. Click the newly added tile.
1. From the **Settings** tab, click **Redis Enterprise** and complete the following fields:
    * **Redis Enterprise admin account username**: Enter the email address you used to create the Redis Enterprise cluster.
    * **Redis Enterprise admin account password**: Enter the password you used to create the Redis Enterprise cluster.
    * **Redis Enterprise address**: Enter the Cluster Name (FQDN) of the RS cluster as you provided it when you created the cluster, in the following format: If your cluster API endpoint is `https://YOUR-CLUSTER-NAME:9443`, enter `YOUR-CLUSTER-NAME` in the FQDN field.
1. Click **Save**.
1. Return to the Ops Manager Installation Dashboard and click **Apply Changes** to install the Redis Enterprise Service Broker.

## Create a Redis Database in Apps Manager

After installing the Redis Enterprise Service Broker, Redis Enterprise appears as a service in the Marketplace of your deployment. Developers can provision Redis databases by creating service instances using Apps Manager or the Cloud Foundry Command Line Interface (cf CLI).

Follow the instructions below to create a Redis Enterprise Cluster service instance using Apps Manager.

1. Navigate to Apps Manager in a browser and log in.

1. Click **Marketplace**.

1. Click **Redis Enterprise**.

1. Choose one of the four preconfigured database plans and click **Select this plan**. For more information about the preconfigured plans, see the [Overview](index.html#overview).

1. In the **Configure Instance** form, enter an **Instance Name** to identify the service instance in the deployment as well as the database name in RS. To override the default parameters and provide additional database configuration parameters, click **Show Advanced Options**. Contact support@redislabs.com for further instructions on using this feature.

1. Once you create the service and bind it to an app, you can find the credentials in the `VCAP_SERVICES` environment variable in the following format:

  ```
  "VCAP_SERVICES": {
    "redislabs-enterprise-cluster": [
     {
      "credentials": {
       "host": "redis-12345.pcf-rlec.redislabs.com",
       "ip_list": [
        "10.0.0.171"
       ],
       "password": "some-redis-password",
       "port": 12345
      },
      "label": "redislabs-enterprise-cluster",
      "name": "my-redis-db",
      "plan": "ha-redis",
      "provider": null,
      "syslog_drain_url": null,
      "tags": [
       "redislabs"
      ]
     }
    ]
  }
  ```