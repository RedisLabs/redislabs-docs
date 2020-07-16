---
Title: Authentication and Authorization
description:
weight: 10
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise comes with an easy to use user interface to help you configure your deployment. The control plane consists of a website based user interface and a REST API used to automating tasks. This section details the configurable parameters that you can use to help secure the control plane and the API.

## Role Based Access Control

Redis Enterprise includes five pre-built roles to help users who need limited access to Admin Console.

1. **DB Viewer** - Read any settings for databases
1. **DB Member** - Administer databases
1. **Cluster Viewer** - Read any cluster setting
1. **Cluster Member** - Administrator the cluster
1. **Admin** - Full cluster access

The following table elaborates on the privileges for each of these roles:

{{< embed-html "account-role-table.html" >}}

### Configuring users with roles
To add a user to the cluster:

1. Go to the  access control tab
1. Click ![Add](/images/rs/icon_add.png#no-click "Add")
1. Enter the name, email and password of the new user and select the role to assign to the user.
1. Select the internal user type
1. For email alerts, click "Edit" and select the alerts that the user should receive. You can select:
      
	  - Receive alerts for databases - The alerts that are enabled for the selected databases will be sent to the user. You can either select "All databases", or you can select "Customize" and select the individual databases to send alerts for.
        - Receive cluster alerts - The alerts that are enabled for the cluster in **settings** > **alerts** are sent to the user.

1. Select the save icon.
{{< video "/images/rs/new-user-add.mp4" "Create a new user" >}}

## User Account Security

Redis Enterprise supports the following user account security settings:

1. Password complexity
1. Password expiration
1. User Lockouts
1. Account inactivity timeout

To enforce a more advanced password policy, we recommend that you use a LDAP integration with an external identity provider, such as Active Directory. 

### Setting up password complexity

Redis Enterprise Software provides an optional password complexity profile that meets most organizational needs. When enabled, this password profile requires the following:
1. At least 8 characters
1. At least one uppercase character
1. At least one lowercase character
1. At least one number (not first or last character)
1. At least one special character (not first or last character)
1. Does not contain the User ID or reverse of the User ID
1. No more than 3 repeating characters

{{< note >}}
The password complexity profile applies when a new user is added or an existing user changes their password. This profile does not apply to external users using an external identity provider.
{{< /note >}}

To enforce the password complexity profile, you need to use the REST API. Here's a curl command to enable password complexity:

```sh
curl -k -X PUT -v -H "cache-control: no-cache" -H "content-type: application/json" -u "<administrator-user-email>:<password>" -d '{"password_complexity":true}' https://<RS_server_address>:9443/v1/cluster
```
To disable the password complexity requirement, run the above command, but set "password_complexity" to "false".

### Setting up user password expiration

To enforce an expiration of a local users password after a specified number of days, run the following command:

```sh
curl -k -X PUT -v -H "cache-control: no-cache" -H "content-type: application/json" -u "<administrator_user>:<password>" -d '{"password_expiration_duration":<number_of_days>}' https://<RS_server_address>:9443/v1/cluster
```
To disable password expiration, set the number of days to 0.

## User Login Lockout

The parameters for the user login lockout are:

- **Login Lockout Threshold** - The number of failed login attempts allowed before the user account is locked. (Default: 5)
- **Login Lockout Counter Reset** - The amount of time during which failed login attempts are counted. (Default: 15 minutes)
- **Login Lockout Duration** - The amount of time that the user account is locked after excessive failed login attempts. (Default: 30 minutes)

By default, after 5 failed login attempts within 15 minutes, the user account is locked for 30 minutes.

You can view the user login restrictions for your cluster with:

```sh
rladmin info cluster | grep login_lockout
```
### Changing the Login Lockout Threshold 

You can set the login lockout threshold with the command:

```sh
rladmin tune cluster login_lockout_threshold <login_lockout_threshold>
```
For example, to set the lockout threshold to 10 failed login attempts.
```sh
rladmin tune cluster login_lockout_threshold 10
```

Setting the lockout threshold to 0 disables account lockout. In this case, the cluster settings show: login_lockout_threshold: disabled

### Changing the Login Lockout Counter Reset 
You can set the login lockout reset counter in seconds with the command:

```sh
rladmin tune cluster login_lockout_counter_reset_after <login_lockout_counter_reset_after>
```
To set the lockout reset to 1 hour, run:

```sh
rladmin tune cluster login_lockout_counter_reset_after 3600
```
### Changing the Login Lockout Duration 

You can set the login lockout duration in seconds with the command:

```sh
rladmin tune cluster login_lockout_duration <login_lockout_duration>
```

For example, to set the lockout duration to 1 hour use the command:

```sh
rladmin tune cluster login_lockout_duration 3600
``` 
If you set the lockout duration to 0, then the account can be unlocked only when an administrator changes the account's password. In this case, the cluster settings show: login_lockout_duration: admin-release
 
#### Unlocking Locked User Accounts 

To unlock a user account or reset a user password from the CLI, run:

```sh
rladmin cluster reset_password <username>
```

### Session timeout 

The Redis Enterprise admin console supports session timeouts. By default, users are automatically logged out after 15 minutes of inactivity.

To customize the session timeout you can run the following command:

```sh
rladmin cluster config cm_session_timeout_minutes <number_of_min>
```

Here, number_of_min is the number of minutes after which sessions will time out.

## Setting up LDAP

Redis Enterprise supports LDAP Authentication for the admin console.

{{< note >}}
LDAP access is not yet available for database access, but this is planned for a future release.
{{< /note >}}

There following steps should be used when configuring LDAP:

1. Configure the saslauthd service
1. Import the saslauthd configuration
1. Restart saslauthd service
1. Configure LDAP users

### Configuring the saslauthd Service 

Saslauthd is a process that handles authentication requests on behalf of Redis Enterprise to LDAP.  There are two steps to configuring this process:

1. Modify the mechanisms configuration to LDAP
1. Provide the LDAP configuration information

**To modify the mechanisms configuration:**

1. Edit the saslauthd file located in /etc/default
	- In this file change the MECHANISMS variable to MECHANISMS=”ldap”

**To provide the LDAP configuration information:**
   
1. Edit the configuration file located at /etc/opt/redislabs/saslauthd.conf or the installation directory of your choice during initial configuration.
1. Provide the following information associated with each variable
	- ldap_servers: the ldap servers that you authenticate against and the port to use
	- Provide the following information associated with each variable
		- **ldap_servers:** the ldap servers that you authenticate against and the port to use
			- Port 389 is standardly used for unencrypted LDAP connections
			- Port 636 is standardly used for encrypted LDAP connections and is strongly recommended.
		- **Ldap_tls_cacert_file (optional):** The path to your CA Certificates. This is required for encrypted LDAP connections only.
		- **ldap_filter:** the filter used to search for users 
		- **ldap_bind_dn:** The distinguished name for the user that will be used to authenticate to the LDAP server.
    		- **ldap_password:** The password used for the user specified in ldap_bind_dn
1. Import the saslauthd configuration into Redis Enterprise using the below command
```sh
rladmin cluster config saslauthd_ldap_conf <path_to_saslauthd.conf>
```
{{< note >}}
If this is a new server installation, for this command to work, a cluster must be set up already.
{{< /note >}}
1. If this is a new server installation, for this command to work, a cluster must be set up already.
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

