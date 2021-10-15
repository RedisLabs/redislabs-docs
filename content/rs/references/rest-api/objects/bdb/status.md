---
Title: BDB status field
linkTitle: status
description: Documents the bdb status field used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

The BDB status field is a read-only field that represents the database status.

Possible status values:

| Status | Description | Possible next status |
|--------|-------------|----------------------|
| 'pending' | Temporary status during database creation | 'active'<br />'creation-failed' |
| 'creation-failed' | Initial database creation failed | |
| 'active' | Database is active and no special action is in progress | 'active-change-pending' <br />'import-pending' <br />'delete-pending' |
| 'active-change-pending' | |'active' |
| 'import-pending' | Dataset import is in progress | 'active' |
| 'delete-pending' | Database deletion is in progress | |
| 'recovery' | Not currently relevant (intended for future use) | |

![BDB status](/images/rs/rest-api-bdb-status.png#no-click "BDB status")
