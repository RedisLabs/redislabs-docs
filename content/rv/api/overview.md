---
Title: API Overview
description: 
weight: 10
alwaysopen: false
categories: ["RC Pro"]
---
Redis Labs Pro API follows the principles of the REST architectural style to expose programmatic access to Redis Labs Pro features and capabilities.

### Supported Redis Labs Pro features

The API exposes programmatic access for the following features:

- [**Full lifecycle management**]({{< relref  "/rv/api/concepts/provisioning-lifecycle.md" >}}) of Redis Labs Pro Subscriptions and Databases
- [**System Log**]({{< relref  "/rv/api/how-to/view-auditing-using-system-log.md" >}}) for auditing lifecycle actions (create, update, delete) using 
- [**Metrics and statistics information**]({{< relref  "/rv/api/concepts/metrics.md" >}}) on provisioned databases and clusters 
- [**Hosting cloud provider credentials**]({{< relref  "/rv/api/how-to/create-and-manage-cloud-accounts.md" >}}) definition and management
- **Backup & import databases** from various sources (e.g. AWS S3, FTP etc.)
- **Redis Modules**
- **Alerts settings** 
- **Secure connectivity to customer system** using VPC peering and CIDR restrictions settings

### API features include

- Standard REST API (accessible using [any HTTP client / programming language]({{< relref  "/rv/api/how-to/using-curl.md" >}}))
- Supports OpenAPI 2.0 standard
- Exposes [Swagger user interface](https://api-beta1.redislabs.com/beta1/swagger-ui.html)
- Follows [Semantic Versioning 2.0](https://semver.org/#semantic-versioning-200) guidelines
- Secure [authentication and authorization]({{< relref  "/rv/api/concepts/authentication-and-authorization.md" >}})
- Support for multiple personal [API Keys]({{< relref  "/rv/api/how-to/enable-your-account-to-use-api.md" >}}) (named and fully audited)
- Restrict API usage to specific source IP addresses / ranges

**NOTE: The content in this article refers to a BETA release and is therefore liable to change**
