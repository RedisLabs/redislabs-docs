---
Title: Security
description:
weight: 51
alwaysopen: false
categories: ["RC"]
aliases: "/rc/administration/security"
---

Redis Cloud provides a number of features to ensure the security of your cloud
database deployments. As a Redis Cloud user, there are three systems you need
to consider when thinking about security: the admin console, the Redis Cloud API,
and your databases.

## Admin Console Security

The admin console is the web application you use to manage Redis Cloud. Securing the admin console
by assigning the appropriate user roles and enabling multi-factor authentication is essential for a
secure deployment.

## Redis Cloud API security

The Redis Cloud API allows you to programmatically administer your subscriptions and database deployments. This API
is disabled by default. When you enable the API, you can then manage the API keys for the all owners of your Redis Cloud account.

## Database Security

You can secure your databases running
