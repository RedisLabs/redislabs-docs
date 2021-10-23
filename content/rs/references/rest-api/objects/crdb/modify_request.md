---
Title: CRDB modify request object
linkTitle: modify_request
description: An object to update an Active-Active database
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An object to update an Active-Active database.

| Name | Type/Value | Description |
|------|------------|-------------|
| add_instances | array of [CRDB instance_info]({{<relref "/rs/references/rest-api/objects/crdb/instance_info">}}) objects | List of new CRDB instances |
| crdb | [CRDB]({{<relref "/rs/references/rest-api/objects/crdb">}}) object | An object that represents an Active-Active database |
| force_update | boolean | (Warning: This flag can cause unintended and dangerous changes) Force the configuration update and increment the configuration version even if there is no change to the configuration parameters. If you use force, you can mistakenly cause the other instances to update to the configuration version even though it was not changed. |
| remove_instances.force_remove | boolean | Force removal of instance from the Active-Active database. Before we remove an instance from an Active-Active database, all of the operations that the instance received from clients must be propagated to the other instances. This is the safe method to remove an instance from the Active-Active database. If the instance does not have connectivity to other instances, the propagation fails and removal fails. To remove an instance that does not have connectivity to other instances, you must use the force flag. The removed instance keeps its data and configuration for the instance. After you remove an instance by force, you must use the purge_instances API on the removed instance. |
| remove_instances | array of integers | List of unique instance IDs |
