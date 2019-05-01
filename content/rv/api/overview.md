---
Title: API Overview
description: BETA release information - liable to change
weight: 10
alwaysopen: false
categories: ["RC Pro"]
---

Redis Labs Pro API follows the principles of the REST architectural style to expose internal resources which enable programmatic access to Redis Labs Pro offering's features and capabilities.


### Supported Redis Labs Pro features

The API exposes programmatic access for the following features:

* **Full lifecycle management** of Redis Labs Pro [Subscriptions and Databases]({{< relref  "/rv/api/how-to/create-and-manage-subscriptions.md" >}})
* Auditing lifecycle actions (create, update, delete) using [System Log]({{< relref  "/rv/api/how-to/view-auditing-using-system-log.md" >}})
* [**Metrics and statistics information**]({{< relref  "/rv/api/concepts/metrics.md" >}}) on provisioned databases and clusters 
* [**Hosting cloud provider credentials**]({{< relref  "/rv/api/how-to/create-and-manage-cloud-accounts.md" >}}) definition and management
* **Backup & import databases** from various sources (e.g. AWS S3, FTP etc.)
* **Redis Modules** definitions
* **Alerts settings** 
* **Secure connectivity to customer system** using VPC peering and CIDR restrictions settings


### API features include:

* Secure [authentication and authorization]({{< relref  "/rv/api/concepts/authentication-and-authorization.md" >}})
* Full support for OpenAPI 2.0 and [Swagger user interface](https://api-beta1-qa.redislabs.com/beta1/swagger-ui.html)
* Support for multiple personal [API Keys]({{< relref  "/rv/api/how-to/enable-your-account-to-use-api.md" >}}) (named and fully audited)








