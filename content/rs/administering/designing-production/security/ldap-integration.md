---
Title: Integrating LDAP Authentication
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/designing-production/security/ldap-integration/
---

Redis Enterprise comes with the ability to support integration with your identity provider through LDAP Authentication. 

{{% note %}}
LDAP Authentication is not yet supported for Redis ACL Users. LDAP Authentication is only supported for the control plane.
{{% /note %}}

There following steps should be used when configuring LDAP:
1. Configure the saslauthd service
1. Import the saslauthd configuration
1. Restart saslauthd service
1. Configure LDAP users

For a user to be able to leverage LDAP authentication, they must be created as an external user.

## Configuring the saslauthd Service 

Saslauthd is a process that handles authentication requests on behalf of Redis Enterprise to LDAP.  

To set saslauthd to use LDAP Authentication:

- Edit the saslauthd file located in /etc/default and change the MECHANISMS variable to MECHANISMS=”ldap”

### Provide the LDAP configuration information

To provide the LDAP configuration information:

1. Edit the configuration file located at /etc/opt/redislabs/saslauthd.conf or the installation directory of your choice during initial configuration.
2. Provide the following information associated with each variable

3. ldap_servers: the ldap servers that you authenticate against and the port to use 

- Port 389 is standardly used for unencrypted LDAP connections
- Port 636 is standardly used for encrypted LDAP connections and is strongly recommended.

4. Ldap_tls_cacert_file (optional): The path to your CA Certificates. This is required for encrypted LDAP connections only.
5. ldap_filter: the filter used to search for users
6. ldap_bind_dn: The distinguished name for the user that will be used to authenticate to the LDAP server.
7. ldap_password : The password used for the user specified in ldap_bind_dn

An example configuration for your reference may be found below:

```src
ldap_servers: ldaps://ldap1.mydomain.com:636 ldap://ldap2.mydomain.com:636
ldap_tls_cacert_file: /path/to/your/CARootCert.crt
ldap_search_base: ou=coolUsers,dc=company,dc=com
ldap_search_base: ou=coolUsers,dc=company,dc=com
ldap_filter: (sAMAccountName=%u)
ldap_bind_dn: cn=admin,dc=company,dc=com
ldap_password: secretSquirrel
```

Finally, import the saslauthd configuration into Redis Enterprise using the below command:

```src
rladmin cluster config saslauthd_ldap_conf /etc/opt/redislabs/saslauthd.conf
```

{{% note %}}
If this is a new server installation, for this command to work, a cluster must be set up already.
Recycle saslauthd services using the below command.
{{% /note %}}

In order for these changes to take effect, you must restart services.

```src
sudo supervisorctl restart saslauthd
```

