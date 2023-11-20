---
Title: Redis Cloud changelog (October 2023)
linktitle: October 2023
description: New features, enhancements, and other changes added to Redis Cloud during October 2023.
highlights: Cost report CSV download, SAML Account linking tokens
weight: 76
alwaysopen: false
categories: ["RC"]
aliases: []
---

## New features

### Cost report CSV download

You can now download shard cost reports in CSV format from the [**Billing and Payments**]({{<relref "/rc/billing-and-payments">}}) and [**Usage Reports**]({{<relref "/rc/logs-reports/usage-reports">}}) pages.

{{< embed-md "rc-cost-report-csv.md" >}}
### SAML account linking tokens

The process for [linking new Redis accounts]({{<relref "/rc/security/access-control/saml-sso#link-other-accounts">}}) to your [SAML single sign-on]({{<relref "/rc/security/access-control/saml-sso">}}) configuration has changed to enhance security. Now, both accounts must use a token to ensure that the connection is legitimate.
