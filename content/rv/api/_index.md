---
Title: API
description:
weight: 80
alwaysopen: false
categories: ["RC Pro"]
---
Redis Cloud Pro (RC Pro) API follows the principles of the REST architectural style to expose programmatic access to Redis Labs Pro features and capabilities.

### Supported Redis Cloud Pro Features

The API exposes programmatic access for management of :

- [**Full lifecycle management**]({{< relref  "/rv/api/concepts/provisioning-lifecycle.md" >}}) of Redis Labs Pro Subscriptions and Databases
- [**System Log**]({{< relref  "/rv/api/how-to/view-auditing-using-system-log.md" >}}) for auditing lifecycle actions (create, update, delete) using
- [**Hosting cloud provider credentials**]({{< relref  "/rv/api/how-to/create-and-manage-cloud-accounts.md" >}}) definition and management
- **Backup & import databases** from various sources (e.g. AWS S3, FTP etc.)
- **Redis Modules**
- **Alerts settings**
- **Secure connectivity to customer system** using VPC peering and CIDR restrictions settings

### API Features

The RC Pro API includes these features:

- Standard REST API (accessible using [any HTTP client / programming language]({{< relref  "/rv/api/how-to/using-curl.md" >}}))
- Supports OpenAPI 2.0 standard
- Exposes [Swagger user interface](https://api-beta1.redislabs.com/beta1/swagger-ui.html)
- Follows [Semantic Versioning 2.0](https://semver.org/#semantic-versioning-200) guidelines
- Secure [authentication and authorization]({{< relref  "/rv/api/concepts/authentication-and-authorization.md" >}})
- Support for multiple personal [API Keys]({{< relref  "/rv/api/how-to/enable-your-account-to-use-api.md" >}}) (named and fully audited)
- Restrict API usage to specific source IP addresses / ranges

{{% note %}}
The content in this article refers to a BETA release and is therefore liable to change.
{{% /note %}}
