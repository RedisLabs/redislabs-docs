---
Title: Set global database configurations
linkTitle: Global configuration
description: The REAADB contains the field '.spec.globalConfigurations' and through this the database configurations are set.
weight: 50
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/active-active/preview/global-config/,

}
---
The Redis Enterprise Active-Active database custom resource contains the field called '.spec.globalConfigurations'. This field sets configurations for the Active-Active database across all participating clusters, such as memory size or shard count.

The [REAADB API reference](https://github.com/RedisLabs/redis-enterprise-operator/blob/master/deploy/redis_enterprise_active_active_database_api.md) contains a full list of available fields.

To add or change global configurations, patch or edit the REAADB custom resource YAML file.

----example yaml---

---example patch command----


## Set global database secret

