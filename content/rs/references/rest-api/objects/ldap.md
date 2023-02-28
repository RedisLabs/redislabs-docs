---
Title: LDAP object
linkTitle: ldap
description: An object that contains the cluster's LDAP configuration
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents the cluster's [LDAP]({{<relref "/rs/security/access-control/ldap">}}) configuration.

| Name | Type/Value | Description |
|------|------------|-------------|
| bind_dn | string | DN used when binding with the LDAP server to run queries |
| bind_pass | string | Password used when binding with the LDAP server to run queries |
| ca_cert | string | PEM-encoded CA certificate(s) used to validate TLS connections to the LDAP server |
| cache_ttl | integer (default:&nbsp;300) | Maximum TTL (in seconds) of cached entries |
| control_plane | boolean (default:&nbsp;false) | Use LDAP for user authentication/authorization in the control plane |
| data_plane | boolean (default:&nbsp;false) | Use LDAP for user authentication/authorization in the data plane |
| dn_group_attr | string | The name of an attribute of the LDAP user entity that contains a list of the groups that user belongs to. (Mutually exclusive with "dn_group_query") |
| dn_group_query | complex object | An LDAP search query for mapping from a user DN to the groups the user is a member of. The substring "%D" in the filter will be replaced with the user's DN. (Mutually exclusive with "dn_group_attr") |
| starttls | boolean (default:&nbsp;false) | Use StartTLS negotiation for the LDAP connection |
| uris | array of strings | URIs of LDAP servers that only contain the schema, host, and port |
| user_dn_query | complex object | An LDAP search query for mapping from a username to a user DN. The substring "%u" in the filter will be replaced with the username. (Mutually exclusive with "user_dn_template") |
| user_dn_template | string | A string template that maps between the username, provided to the cluster for authentication, and the LDAP DN. The substring "%u" will be replaced with the username. (Mutually exclusive with "user_dn_query") |
