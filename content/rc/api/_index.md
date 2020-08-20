---
Title: API
description:
weight: 80
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/
---
Redis Cloud Pro (RC Pro) API follows the principles of the REST architectural style to expose programmatic access to Redis Labs Pro features and capabilities.

## Supported Redis Cloud Pro features

The API exposes programmatic access for management of:

- [**Full lifecycle management**]({{< relref  "/rc/api/concepts/provisioning-lifecycle.md" >}}) of Redis Labs Pro Subscriptions and Databases
- [**System Log**]({{< relref  "/rc/api/how-to/view-auditing-using-system-log.md" >}}) for auditing lifecycle actions (create, update, delete) using
- [**Hosting cloud provider credentials**]({{< relref  "/rc/api/how-to/create-and-manage-cloud-accounts.md" >}}) definition and management
- **Backup & import databases** from various sources (e.g. AWS S3, FTP etc.)
- **Redis Modules**
- **Alerts settings**
- **Secure connectivity to customer system** using VPC peering and CIDR restrictions settings

## API Features

The RC Pro API includes these features:

- Standard REST API (accessible using [any HTTP client / programming language]({{< relref  "/rc/api/how-to/using-curl.md" >}}))
- Supports OpenAPI 2.0 standard
- Exposes [Swagger user interface](https://api.redislabs.com/v1/swagger-ui.html)
- Follows [Semantic Versioning 2.0](https://semver.org/#semantic-versioning-200) guidelines
- Secure [authentication and authorization]({{< relref  "/rc/api/concepts/authentication-and-authorization.md" >}})
- Support for multiple personal [API Keys]({{< relref  "/rc/api/how-to/enable-your-account-to-use-api.md" >}}) (named and fully audited)
- Restrict API usage to specific source IP addresses / ranges

## Getting started

1. [Enable your Account to use API]({{< relref  "/rc/api/how-to/enable-your-account-to-use-api.md" >}})
1. [Authentication and Authorization]({{< relref  "/rc/api/concepts/authentication-and-authorization.md" >}})
1. [Create API Keys for your team]({{< relref  "/rc/api/how-to/create-api-keys-for-your-team.md" >}})
1. [Using the API]({{< relref  "/rc/api/how-to/using-curl.md" >}})
1. [The Processing and Provisioning Lifecycle]({{< relref  "/rc/api/concepts/provisioning-lifecycle.md" >}})
1. [Create and manage Subscriptions]({{< relref  "/rc/api/how-to/create-and-manage-subscriptions.md" >}})

