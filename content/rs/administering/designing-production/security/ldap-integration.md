---
Title: Integrating LDAP Authentication
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/designing-production/security/ldap-integration/
---
Redis Enterprise Software (RS) can integrate with your identity provider using LDAP authentication.
After you configure the LDAP connection, you can give LDAP users access to the RS web UI according to the permissions that you assign.

`saslauthd` is the process that handles LDAP authentication requests to RS.

{{< note >}}
LDAP authentication is not yet supported for Redis ACL Users.
{{< /note >}}

To configure LDAP authentication for RS web UI users on a running cluster:

1. Configure `saslauthd` to use LDAP Authentication:
    1. On each node, edit `/etc/default/saslauthd` to change the `MECHANISMS` variable to `MECHANISMS="ldap"`.
    1. On one node, edit the `saslauthd.conf` configuration file in the installation directory (default: `/etc/opt/redislabs/saslauthd.conf`) and enter the values for these fields:

        - `ldap_servers`: the LDAP servers that you authenticate against and the port to use. Port 389 is standard for unencrypted LDAP connections, while port 636 is standard for encrypted LDAP connections (strongly recommended).
        - `ldap_tls_cacert_file` (optional): The path to your CA Certificates. This is required for encrypted LDAP connections only.
        - `ldap_filter`: The filter used to search for users
        - `ldap_bind_dn`: The distinguished name for the user that will be used to authenticate to the LDAP server
        - `ldap_password`: The password used for the user specified in `ldap_bind_dn`

        For example:

        ```sh
        ldap_servers: ldaps://ldap1.mydomain.com:636 ldaps://ldap2.mydomain.com:636
        ldap_tls_cacert_file: /path/to/your/CARootCert.crt
        ldap_search_base: ou=coolUsers,dc=company,dc=com
        ldap_filter: (sAMAccountName=%u)
        ldap_bind_dn: cn=admin,dc=company,dc=com
        ldap_password: secretSquirrel
        ```

1. Import the `saslauthd` configuration into RS with the command:

    ```sh
    rladmin cluster config saslauthd_ldap_conf /etc/opt/redislabs/saslauthd.conf
    ```

1. Restart the `saslauthd` service on each node in the cluster for the changes to take effect: 

    ```sh
    sudo supervisorctl restart saslauthd
    ```
    
1. [Create LDAP users]({{< relref "/rs/administering/access-control#adding-a-user" >}}) as `external` users in the RS web UI.
