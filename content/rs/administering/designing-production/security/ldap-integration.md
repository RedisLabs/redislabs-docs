---
Title: Integrating LDAP Authentication
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/designing-production/security/ldap-integration/
---

Redis Enterprise can integrate with your identity provider using LDAP authentication. 

{{% note %}}
LDAP authentication is not yet supported for Redis ACL Users. LDAP authentication is only supported for the control plane.
{{% /note %}}

The following steps should be used when configuring LDAP:
1. Configure the `saslauthd` service
1. Import the `saslauthd` configuration
1. Restart `saslauthd` service
1. Configure LDAP users

To leverage LDAP authentication, the associated user must be created as an external user.

## Configuring the `saslauthd` Service 

`saslauthd` is a process that handles authentication requests on behalf of Redis Enterprise to LDAP.  

To set `saslauthd` to use LDAP Authentication:

- Edit the `saslauthd` file located in `/etc/default`, and change the `MECHANISMS` variable to `MECHANISMS="ldap"`.

### Provide the LDAP Configuration

To provide the LDAP configuration:

1. Edit the configuration file located at `/etc/opt/redislabs/saslauthd.conf` (or the installation directory of your choice during initial configuration).
2. Provide the following information associated with each variable:

- `ldap_servers`: the ldap servers that you authenticate against and the port to use. Port 389 is standard for unencrypted LDAP connections, while port 636 is standard for encrypted LDAP connections (strongly recommended).
- `ldap_tls_cacert_file` (optional): The path to your CA Certificates. This is required for encrypted LDAP connections only.
- `ldap_filter`: The filter used to search for users
- `ldap_bind_dn`: The distinguished name for the user that will be used to authenticate to the LDAP server
- `ldap_password`: The password used for the user specified in `ldap_bind_dn`

A sample configuration may be found below:

```src
ldap_servers: ldaps://ldap1.mydomain.com:636 ldaps://ldap2.mydomain.com:636
ldap_tls_cacert_file: /path/to/your/CARootCert.crt
ldap_search_base: ou=coolUsers,dc=company,dc=com
ldap_search_base: ou=coolUsers,dc=company,dc=com
ldap_filter: (sAMAccountName=%u)
ldap_bind_dn: cn=admin,dc=company,dc=com
ldap_password: secretSquirrel
```

3. Finally, import the `saslauthd` configuration into Redis Enterprise using the following command:

```src
rladmin cluster config saslauthd_ldap_conf /etc/opt/redislabs/saslauthd.conf
```

{{% note %}}
For new server installations, be sure that your cluster set up before configuring LDAP.
{{% /note %}}

For these changes to take effect, you must restart your services.

```src
sudo supervisorctl restart saslauthd
```

