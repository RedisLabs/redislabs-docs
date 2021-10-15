---
Title: LDAP mapping object
linkTitle: ldap_mapping
description: Documents the ldap_mapping object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents an LDAP mapping

| Name | Type/Value | Description |
|------|------------|-------------|
| uid                   | integer            | LDAP mapping's unique uid |
| name                  | string             | Role's name |
| dn                    | string             | An LDAP group's distinguished name |
| email                 | string             | Email address used for alerts (if set) |
| email_alerts          | boolean (default:&nbsp;true) | Activate email alerts for an associated email |
| bdbs_email_alerts     | complex object     | UIDs of databases that associated email addresses will receive alerts for |
| cluster_email_alerts  | boolean            | Activate cluster email alerts for an associated email |
| role_uids             | array of integers  | List of role uids associated with the LDAP group |
| account_id            | integer            | SM account ID |
| action_uid            | string             | Action uid. If it exists, progress can be tracked by the `GET`&nbsp;`/actions/{uid}` API (read-only) |
