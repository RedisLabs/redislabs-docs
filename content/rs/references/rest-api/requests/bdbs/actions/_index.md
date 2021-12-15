---
Title: Database actions requests
linkTitle: actions
description: Database action requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/bdbs/actions
         /rs/references/rest-api/bdbs/actions.md
         /rs/references/restapi/bdbs/actions
         /rs/references/restapi/bdbs/actions.md
         /rs/references/rest_api/bdbs/actions
         /rs/references/rest_api/bdbs/actions.md
---

## Backup

| Method | Path | Description |
|--------|------|-------------|
| [PUT]({{<relref "./backup_reset_status#put-bdbs-actions-backup-reset-status">}}) | `/v1/bdbs/{uid}/actions/backup_reset_status` | Reset database backup status |

## Export

| Method | Path | Description |
|--------|------|-------------|
| [PUT]({{<relref "./export_reset_status#put-bdbs-actions-export-reset-status">}}) | `/v1/bdbs/{uid}/actions/export_reset_status` | Reset database export status |
| [POST]({{<relref "./export#post-bdbs-actions-export">}}) | `/v1/bdbs/{uid}/actions/export` | Initiate database export |

## Import

| Method | Path | Description |
|--------|------|-------------|
| [PUT]({{<relref "./import_reset_status#put-bdbs-actions-import-reset-status">}}) | `/v1/bdbs/{uid}/actions/import_reset_status` | Reset database import status |
| [POST]({{<relref "./import#post-bdbs-actions-import">}}) | `/v1/bdbs/{uid}/actions/import` | Initiate manual dataset import |

## Optimize shards placement

| Method | Path | Description |
|--------|------|-------------|
| [GET]({{<relref "./optimize_shards_placement#get-bdbs-actions-optimize-shards-placement">}}) | `/v1/bdbs/{uid}/actions/optimize_shards_placement` | Get optimized shards placement for a database  |
