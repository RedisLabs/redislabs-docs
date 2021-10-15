---
Title: Job scheduler object
linkTitle: job_scheduler
description: Documents the job_scheduler object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents the job_scheduler settings in the cluster.

| Name | Type/Value | Description |
|------|------------|-------------|
| backup_job_settings        | [backup_job_settings]({{<relref "/rs/references/rest-api/objects/job_scheduler/backup_job_settings">}}) object | Backup job settings |                                                        
| redis_cleanup_job_settings | [redis_cleanup_job_settings]({{<relref "/rs/references/rest-api/objects/job_scheduler/redis_cleanup_job_settings">}}) object | Redis cleanup job settings |                                                                                  
| node_checks_job_settings   | [node_checks_job_settings]({{<relref "/rs/references/rest-api/objects/job_scheduler/node_checks_job_settings">}}) object | Node checks job settings |
| log_rotation_job_settings  | [log_rotation_job_settings]({{<relref "/rs/references/rest-api/objects/job_scheduler/log_rotation_job_settings">}}) object | Log rotation job settings |
| rotate_ccs_job_settings    | [rotate_ccs_job_settings]({{<relref "/rs/references/rest-api/objects/job_scheduler/rotate_ccs_job_settings">}}) object | Rotate CCS job settings |                                                           
| cert_rotation_job_settings | [cert_rotation_job_settings]({{<relref "/rs/references/rest-api/objects/job_scheduler/cert_rotation_job_settings">}}) object | Job settings for internal certificate rotation |
