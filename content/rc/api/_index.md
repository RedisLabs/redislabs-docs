---
Title: Redis Cloud REST API
description: Describes the Redis Cloud REST API and links to additional info
weight: 80
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/
         /rc/api/
---

The [Redis Enterprise Cloud REST API](https://api.redislabs.com/v1/swagger-ui.html) helps you manage your Redis Cloud subscription programmatically.

You can use the API to:

- Add or update users  
- Create or manage databases  
- Define or change hosting credentials  
- Define or manage roles and permissions  
- Audit access via logs  
- Backup or import databases  

{{< note >}}
The Redis Cloud REST API is available only with Flexible or Annual subscriptions.  It is not supported for Fixed or Free subscriptions.
{{< /note >}}

## Getting started

1. [Enable the API]({{< relref  "/rc/api/get-started/enable-the-api.md" >}})
1. [Authenticate and authorize]({{< relref  "/rc/api/get-started/_index.md" >}})
1. [Create API keys]({{< relref  "/rc/api/get-started/manage-api-keys.md" >}})
1. [Use the API]({{< relref  "/rc/api/get-started/use-rest-api.md" >}})
1. [Learn the API lifecycle]({{< relref  "/rc/api/get-started/process-lifecycle.md" >}})
1. [Create and manage subscriptions]({{< relref  "/rc/api/examples/manage-subscriptions.md" >}})

## Examples

1. [Manage subscriptions]({{< relref  "/rc/api/examples/manage-subscriptions.md" >}})
1. Database examples
    1. [Create database]({{< relref  "/rc/api/examples/create-database.md" >}})
    1. [Update database]({{< relref  "/rc/api/examples/update-database.md" >}})
    1. [Back up and import data]({{< relref  "/rc/api/examples/back-up-and-import-data.md" >}})
1. [Manage cloud accounts]({{< relref  "/rc/api/examples/manage-cloud-accounts.md" >}})
1. [Estimate costs]({{< relref  "/rc/api/examples/dryrun-cost-estimates.md" >}})
1. [View account info]({{< relref  "/rc/api/examples/view-account-information.md" >}})
    
## More info

- Use the [Redis Cloud API]({{< relref  "/rc/api/get-started/use-rest-api.md" >}})
- [Full API Reference](https://api.redislabs.com/v1/swagger-ui.html)
- Secure [authentication and authorization]({{< relref  "/rc/api/get-started/_index.md" >}})
