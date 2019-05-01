---
Title: API Overview
description: 
weight: 10
alwaysopen: false
categories: ["RC Pro"]
---

Redis Labs Pro API follows the principles of the REST architectural style to expose internal resources which enable programmatic access to Redis Labs Pro offering's features and capabilities.


### Supported Redis Labs Pro features

The API exposes programmatic access for the following features:

* [**Full lifecycle management**]({{< relref  "/rv/api/concepts/provisioning-lifecycle.md" >}}) of Redis Labs Pro Subscriptions and Databases
* [**System Log**]({{< relref  "/rv/api/how-to/view-auditing-using-system-log.md" >}}) for auditing lifecycle actions (create, update, delete) using 
* [**Metrics and statistics information**]({{< relref  "/rv/api/concepts/metrics.md" >}}) on provisioned databases and clusters 
* [**Hosting cloud provider credentials**]({{< relref  "/rv/api/how-to/create-and-manage-cloud-accounts.md" >}}) definition and management
* **Backup & import databases** from various sources (e.g. AWS S3, FTP etc.)
* **Redis Modules**
* **Alerts settings** 
* **Secure connectivity to customer system** using VPC peering and CIDR restrictions settings


### API features include:

* Standard REST API (accessing using any HTTP client / programming language)
* Full support for OpenAPI 2.0 and [Swagger user interface](https://api-beta1-qa.redislabs.com/beta1/swagger-ui.html)
* Follows [Semantic Versioning 2.0](https://semver.org/#semantic-versioning-200)
* Secure [authentication and authorization]({{< relref  "/rv/api/concepts/authentication-and-authorization.md" >}})
* Support for multiple personal [API Keys]({{< relref  "/rv/api/how-to/enable-your-account-to-use-api.md" >}}) (named and fully audited)


**NOTE: The content in this article refers to a BETA release and is therefore liable to change**




