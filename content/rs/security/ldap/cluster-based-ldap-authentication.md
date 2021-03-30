---
Title: Cluster-based LDAP authentication
description: (Deprecatd) Describes cluder-based LDAP integration, an earlier mechanism to enable LDAP support for Redis Software.  See role-based LDAP for current approach.
hidden: true
weight: 99
alwaysopen: false
categories: ["RS"]
aliases: [
    "/rs/administering/designing-production/security/ldap-integration/",
    "/rs/security/admin-console-security/ldap/",
    "/rs/security/admin-console-security/ldap.md"
]
---
{{<warning>}}
This article describes features that are considered deprecated.  They will be removed in a future release of Redis Enterprise Software.<br/><br/>  
  
As of v6.0.20, Redis Software supports role-based [LDAP authentication]({{< relref "/rs/security/ldap/" >}}), which can be enabled using the admin console or the Redis Software REST API.<br/><br/>  
  
The features described in this article are still included with v6.0.20; however, they are considered obsolete and have been replaced by [role-based LDAP authentication]({{< relref "/rs/security/ldap/" >}}).<br/><br/>  
  
For now, you can continue to use cluster-based LDAP integration, however, support will be removed in a future version.  We strongly recommend migrating to role-base LDAP.
{{</warning>}}

Redis Enterprise Software supports Lightweight Directory Access Protocol (LDAP) admin console users.<!--more-->

{{< note >}}
Known Limitations:

- LDAP access is not yet available for database access, but this is planned for a future release.
- This process does not apply when running Redis Enterprise on Kubernetes.
{{< /note >}}

## Enabling LDAP

To enable LDAP:

1. Import the `saslauthd` configuration.
1. Restart `saslauthd` service.
1. Configure LDAP users.

## Configuring LDAP

To provide the LDAP configuration information:

1. Edit the configuration file located at /etc/opt/redislabs/saslauthd.conf or the installation directory of your choice during initial configuration.
1. Provide the following information associated with each variable:

   - ldap_servers: the ldap servers that you authenticate against and the port to use
   - Provide the following information associated with each variable
        - **ldap_servers:** the ldap servers that you authenticate against and the port to use
            - Port 389 is standardly used for unencrypted LDAP connections
            - Port 636 is standardly used for encrypted LDAP connections and is strongly recommended.
        - **Ldap_tls_cacert_file (optional):** The path to your CA Certificates. This is required for encrypted LDAP connections only.
        - **ldap_filter:** the filter used to search for users.
        - **ldap_bind_dn:** The distinguished name for the user that will be used to authenticate to the LDAP server.
            - **ldap_password:** The password used for the user specified in ldap_bind_dn
1. Import the saslauthd configuration into Redis Enterprise using the below command. This will distribute the configuration to all nodes in the cluster.

    ```sh
    rladmin cluster config saslauthd_ldap_conf <path_to_saslauthd.conf>
    ```

    {{< note >}}
If this is a new server installation, for this command to work, a cluster must be set up already.
    {{< /note >}}

1. Restart `saslauthd`:

    ```sh
    sudo supervisorctl restart saslauthd
    ```

An example configuration for your reference may be found below:

```sh
ldap_servers: ldaps://ldap1.mydomain.com:636 ldap://ldap2.mydomain.com:636
ldap_tls_cacert_file: /path/to/your/CARootCert.crt
ldap_search_base: ou=coolUsers,dc=company,dc=com
ldap_search_base: ou=coolUsers,dc=company,dc=com
ldap_filter: (sAMAccountName=%u)
ldap_bind_dn: cn=admin,dc=company,dc=com
ldap_password: secretSquirrel
```

### Setting up LDAP users in Redis Enterprise

To set up an LDAP user, simply select an external account type when configuring the user following the procedure to configure users.
