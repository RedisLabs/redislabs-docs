---
Title: Rotate CCS job settings object
linkTitle: rotate_ccs_job_settings
description: Documents the rotate_ccs_job_settings object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

| Name | Type/Value | Description |
|------|------------|-------------|
| cron_expression  | string | [CRON expression](https://en.wikipedia.org/wiki/Cron#CRON_expression) that defines the CCS rotation schedule |
| file_suffix      | string (default:&nbsp;5min) | String added to the end of the rotated RDB files |
| rotate_max_num   | integer, (range:&nbsp;1-100) (default:&nbsp;24) | The maximum number of saved RDB files |
