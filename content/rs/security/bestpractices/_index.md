---
Title: Security Checklist
description:
weight: 10
alwaysopen: false
categories: ["RS"]
---

Security can often be a daunting task. In a world of constant breaches and headlines its become a priority for many organizations. This checklist guide is intended to point you to the supported security configurations within Redis Enterprise to make that task simple. While no security configuration is right for every organization this checklist details configurations that organizations should consider implementing when deploying Redis Enterprise in a production environment.

# Architecture

When deploying Redis Enterprise in production a best practice is to ensure that your overall application architecture is secure. This section details common architectural practices that can help ensure your deployment is secure and always availible. 

## Deploy Redis Enterprise inside a trusted network
Redis Enterprise is database software and should be deployed on a trusted network not accessible to the public internet. Deploying Redis Enterprise in a trusted network reduces the liklihood that someone can obtain unauthroized access to your data or the ability to manage your database configuration.

### Implement anti-virus exclusions
To ensure that anti-virus solutions that scan files or intercept processes to protect memory do not interfere with Redis Enterprise software, customers should ensure that anti-virus exclusions are implemented across all nodes in their Redis Enterprise cluster in a consistent policy. This helps ensure that anti-virus software does not impact the availibility of your Redis Enterprise cluster. To learn more about anti-virus exclusions visit our [anti-virus exclusion guide]({{< relref "/rs/security/deployment-tips/_index.md#anti-virus-exclusions" >}}).

### Sending logs to a remote logging server
Redis Enterprise is configured to send logs by default to syslog, however, in order to send these logs to a remote logging server you must configure syslog based on your remote logging server Vendors requirements. Remote logging helps ensure that the logs are not deleted so that you can rotate the logs so that your server disk does not fill up.  

### Deploy an odd number of 3 or more nodes in your cluster
Redis is an available and partition tolerant database. We recommend that Redis Enterprise be deployed in a cluster of an odd number of 3 or more nodes so that you are able to successfully failover in the event of a failure.

### Reboot sequencing 
Customers will frequently maintain reboot schedules. There are cases, however, where our customers have rebooted too many servers at once, causing a quorum failure and resulting in loss of availability of the database. We recommend that rebooting be done in a phased manner so that quorum is not lost. For example, to maintain quorum in a 3 node cluster, at least 2 nodes must be up at all times. Only one server should be rebooted at any given time to maintain quorum.

### Client-side encryption
Client-side encryption, or the practice of encrypting data within an application before storing it in a database, such as Redis, is the most widely adopted method to achieve encryption in memory. Redis is an in-memory database and stores data in-memory. If you require encryption in memory, better known as encryption in use, then client side encryption may be the right solution for you. Please be aware that when implementing solutions using client-side encryption database functions that need to operate on data — such as simple searching functions, comparisons, and incremental operations — don’t work with client-side encryption.

# Control Plane Security

Redis Enterprise comes with a simple to use user interface and API that helps to facilitate configuration of databases. The below section details common security configurations that should be considered when deploying Redis Enterprise in a production environment.

### Integrating with an external identity provider

Redis Enterprise supports integrations with an external identity provider, such as Active Directory, through an LDAP integration. LDAP is used to provide a central location where usersnames and passwords are stored. Centralized policy management such as password policies can be enforced through LDAP to help you meet your organizations policies. To learn more about configuring LDAP, visit our guide on [setting up LDAP]({{< relref "/rs/security/database-security/authentication-and-authorization.md#setting-up-ldap" >}}).

### Setup user account security to meet your organizations policies
If your organization is not able to use an LDAP integration, Redis Enterprise comes with several features to implement user account security. These features include a password complexity profile, password expiration, and user login lockouts. For more information visit our [user account security documentation.]({{< relref "/rs/security/database-security/authentication-and-authorization.md#user-account-security" >}}).

## Session timeouts
Session timeouts help to ensure that if a users session is ever compromised that the Redis Enterprise control plane will only be availible for the duration of the session lifetime. As a result a session timeout makes the tradeoff between usability and security. A session will only be availible for a set amount of time prior to a user being required to re-authenticate. By default, Redis Enterprise has a session timeout of 15 minutes, which meets most security guidelines. If you would like to configure the session timeout to meet your organizations policies visit our [session timeout documentation]({{< relref "/rs/security/database-security/authentication-and-authorization.md#session-timeout" >}}).

### Require HTTPS for API Endpoints
Redis Enterprise comes with an API that users are able to use to automate frequent manual tasks. This API is availible in both an encrypted and unencrypted endpoint for backwards compatibility. You can disable the unencrypted endpoint if its not in use without any impact. To disable the unencrypted API endpoint visit our documentation on [requiring HTTPS]({{< relref "/rs/security/control-plane-security/encryption.md#requiring-https-for-api-endpoints" >}}).

### Configuring Transport Layer Security
A common compliance requirement is to set a minimum version of TLS. This helps to ensure that only secure versions of TLS are allowed when accessing the cluster. For more information about configuring TLSvisit our [TLS configuration guidance]({{< relref "rs/security/control-plane-security/encryption.md#tls-configuration" >}})

### Installing your own certificates
Redis Enterprise comes with self-signed certificates by default, however, many organizations require the use of specific CA signed certificates.  To learn how to install your own certificates visit [requiring HTTPS]({{< relref "/rs/security/control-plane-security/encryption.md#requiring-https-for-api-endpoints" >}})

# Database Security

Redis Enterprise offers several database security controls to help protect your data against unauthroized access and to improve the operational security of your databse. The following section details configurable security controls availible for implementation.

### Implement least privledge using RBAC
In Redis Enterprise 6.0, you manage ACLs for the entire cluster, so you can reuse ACL templates across users, accounts, and multiple databases to precisely scale complex security configurations with a few simple clicks.  RBAC lets you set permissions for your databases and for the Redis Enterprise management console itself, providing a complete security-management solution for your cluster. To learn more about RBAC, visit our [RBAC documentation]({{< relref "/rs/security/database-security/authentication-and-authorization.md" >}}).

### Ensure database users can't access the control plane
Redis Enterprise allows users to be provisioned with both control plane access and access to the database. In some senarios this may be helpful for administrative users, however, for applications its reccomended that they not be enabled with control plane access. Information on how to configure application users with no control plane access may be found [here]({{< relref "/rs/security/database-security/authentication-and-authorization.md#configuring-roles-and-users" >}}).

### Use strong Redis passwords
A frequent reccomendation in the security industry is to use strong passwords to authenticate users. This helps to prevent brute force password guessing attacks against your database. Its important to check that your password aligns with your organizations security policy. 

### Disable the default user
Redis Enterprise comes with a "default" user for backwards compatibility with applications designed with versions of Redis prior to Redis Enterprise 6. The default user is turned on by default. This allows you to access the database without specifying a username and only using a shared secret. For applications designed to use access control lists, this can be disabled. Instructions on how to disable the default user can be found [here]({{< relref "/rs/security/database-security/authentication-and-authorization.md#disabling-the-default-user" >}}).


### Enable Client Certificate Authentication
To prevent unauthorized access to your data, Redis Enterprise databases support the TLS protocol, which includes authentication and encryption. Client certificate authentication can be used to ensure only authorized hosts can access the database. You can learn more about client certificate authentication [here]({{< relref "/rs/security/database-security/encryption.md#client-certificate-authentication" >}}). 

### Install Trusted Certificates
Redis Implements self-signed certificates for the database proxy and replication service, but many organizations prefer to use their own certificates. To modify these certificates check out our documentation [here]({{< relref "/rs/security/database-security/encryption.md#installing-your-own-certificates" >}}).

### Configuring TLS
Similar to the control plane, you can also configure TLS protocols to help support your security and compliane needs. For more information visit our documentation [here]({{< relref "/rs/security/database-security/encryption.md#configuring-tls-protocols" >}}).

## Database Backups
Implementing a disaster recovery strategy is an important part of data security. Redis Enterprise supports database backups to multiple backup mediums. To learn more about database backups visit our backup documentation [here]({{< relref "/rs/administering/database-operations/database-backup.md" >}}).

