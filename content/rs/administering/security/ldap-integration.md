---
Title: Integrating LDAP Authentication
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software (RS) provides you with the ability to
integrate your existing LDAP server for authentication for account
management in RS. LDAP authentication for RS administrator accounts
requires minimal manual steps to configure the systems to interact.

**Note**: LDAP groups cannot be mapped to Redis Enterprise Software
accounts.

For the steps, you need to configure the saslauthd service for the
cluster, set up accounts on the LDAP Server, then map those IDs in RS.

The steps are:

1. Configuring the saslauthd service
1. Set up accounts on the LDAP server if not already there
1. Mapping user IDs using the RS web UI to the LDAP server
1. Using the REST API or rladmin to propagate configurations to cluster

**Warning:** Use a secure/encrypted connections between RS nodes and
between RS nodes and LDAP servers. The LDAP server uses SASL PLAIN,
sending and receiving data in the clear. You should use only a trusted
network such as a VPN, a connection encrypted with TLS v1.2, or some
other trusted network.

## Configuring the saslauthd Service

saslauthd is a process that handles authentication requests to support
Redis Enterprise Software while the LDAP protocol is utilized to connect
the LDAP server.

### Step 1: Configure LDAP options in config file

```src
$ vi /tmp/saslauthd.conf
```

Note: If you change the path for the conf file, be sure to change the
system config file we configured in the previous step.

You must specify the URIs for the LDAP servers you will be
authenticating with. You can specify multiple LDAP servers by listing
them separated by a space. 

If you are using LDAP over SSL, then 
1. Replace ldap:// in the URL with ldaps://.
2. Add ldap_tls_cacert_file: /path/to/your/CARootCert.crt 

```src
# Add the following, but with your LDAP Server FQDNs or IPs:
ldap_servers: ldap://ldap1.mydomain.com:389 ldap://ldap2.mydomain.com:389

# You must specify the LDAP distinguished name for the search to be relative to.
# It should include the base domain component (dc)
ldap_search_base: ou=coolUsers,dc=company,dc=com

# Specify a search filter. The value for the configuration option (%u)
# should correspond to parameters (uid) specific for your installation.
ldap_filter: (uid=%u)

# If your LDAP servers require a password to connect, add that to the conf file.
ldap_password: <your password here>

# If your LDAP servers don't allow anonymous binds, add this to the conf file.
ldap_bind_dn: cn=admin,dc=company,dc=com
```

Example saslauthd.conf file

```src
ldap_servers: ldap://ldap1.mydomain.com ldap://ldap2.mydomain.com
ldap_search_base: ou=coolUsers,dc=company,dc=com
ldap_filter: (uid=%u)
ldap_password: secretSquirrel
```

### Step 2: Distribute saslauthd.conf to all nodes in the cluster

```src
>$ sudo /opt/redislabs/bin/rladmin cluster config saslauthd_ldap_conf /tmp/saslauthd.conf
Cluster configured successfully
```

Note: If this is a new server installation, for this command to work, a
cluster must be set up already.

### Step 3: Confirm saslauthd is configured

Now that we have saslauthd configured, let's test with a known LDAP user
before we finish the configurations in RS.

```src
>$ testsaslauthd -u user -p password
0: OK "Success."
```

With that return of "Success", we know that saslauthd is configured and
connecting to the LDAP server.

Note: If you are using Multi-Master Replication and wish to use LDAP for
administrators, the LDAP set up process must be performed on each
cluster.

### Step 4: Create an RS User to Authenticate with LDAP

To have a user authenticate with LDAP, you need to create a new user via
the REST API call like this:

```src
$ curl -k -L -v -u "<your_admin_acct>:<your_pword>" --location-trusted \
-H "Content-Type: application/json" -X POST http://<your-res-cluster>:8080/v1/users \
-d "{\"auth_method\": \"external\", \"name\": \"<internal-user-name>\", \"role\": \"<user-role>\"}"
```

For the user-role, put in one of the following roles:

- admin
- cluster_member
- db_viewer
- db_member
- cluster_viewer

Note: At this time, there is no way to convert an existing account to
use LDAP. You must delete the existing and create a new account to use.

At this point, you should be able to log into the Redis Enterprise
Software web UI with the user you just created.
