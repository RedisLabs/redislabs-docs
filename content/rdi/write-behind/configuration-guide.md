---
Title: Write-behind configuration guide
linkTitle: Write-behind-configuration
description: Configuring write-behind to your database
weight: 40
alwaysopen: false
categories: ["redis-di"]
aliases: 
draft: 
hidden: false
---

This guide shows you how to configure write-behind target connections.

## Overview
Write-behind target connections are the connections established between an RDI instance and a target database in a [write-behind scenario]({{<relref "/rdi/quickstart/write-behind-guide">}}). Write-behind is used to replicate changes captured in an RDI-enabled Redis Enterprise database to a target database. 
The connections must be configured in the `config.yaml` before deploying any jobs and must follow one of the formats shown below. Multiple connections can be specified in the `connections` section.

### For relational datastores

```yaml
connections:
    my-sql-datastore:
        type: <db-type>     # db2 | mysql | oracle | postgresql | sqlserver
        host: <db-host>     # IP address or FQDN of a database host and instance
        port: <db-port>     # database port
        database: <db-name> # name of the database
        user: <db-user>         # database user
        password: <db-password> # database password
        # connect_args:     # optional connection parameters passed to the driver - these are driver specific
        # query_args:       # optional parameters for SQL query execution - typically not required for RDI operation
```

### For non-relational datastores

```yaml
connections:
    my-nosql-datastore:
        type: <db-type>     # cassandra
        hosts: <db-hosts>   # array of IP addresses or host names of a datastore nodes
        port: <db-port>     # database port
        database: <db-name> # name of the database
        user: <db-user>         # database user
        password: <db-password> # database password
```

## Microsoft SQL Server

Microsoft SQL Server supports different authentication mechanisms (SQL Server Authentication and Integrated Windows Authentication) and protocols (NTLM and Kerberos). RDI can use all of them. However, systems that use Kerberos may require some additional configuration.

### Account permissions

To enable RDI to work with a SQL Server database, check that the account you specify was assigned at least the `db_datawriter` role.

### SQL Server authentication

To use SQL Server authentication mode, create a user with login credentials and then assign the necessary permissions for the target database to that user.

```yaml
connections:
    mssql2019-sqlauth:
        type: sqlserver
        host: ip-10-0-0-5.internal
        port: 1433
        database: rdi_wb_database
        user: rdi_user
        password: secret
```

### Windows authentication

To use Windows authentication mode, you need to create a Windows or Active Directory account that has the necessary permissions to access the target database, and is able to log into SQL Server. The Linux machine hosting RDI can be configured to support the NTLM authentication protocol. 

For NTLM:

```yaml
connections:
    mssql2019-ntlm:
        type: sqlserver
        host: ip-10-0-0-5.internal
        port: 1433
        database: rdi_wb_database
        user: MYDOMAIN\rdi_service_account  # company-domain\service-account
        password: secret                    # NTLM requires to provide a password
```

> Note: User must be specified with the domain name for Windows Authentication to work correctly.

After you configure the RDI connection and deploy the write-behind job, run the following SQL query to have the operator check if RDI is using the expected authentication mechanism and protocol. Note: this operation may require the `sysadmin` role.

```sql
SELECT session_id, auth_scheme FROM sys.dm_exec_connections;
```

The results indicate which `auth_scheme` is used by each session and may take values `SQL`, `NTLM`, and `Kerberos`.