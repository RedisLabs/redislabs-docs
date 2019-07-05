---
Title: Deployment Hardening 
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---


## Deployment Hardening

To secure your deployment of Redis Enterprise Software, the below techniques may be leveraged in order to effectively secure your databases.

### Disabling commands to the databases

You are able to disable commands on any Redis database. This can be used to prevent commands that you do not want clients to use based on your use case. 

For example, a best practice is to use the Scan command instead of Keys command in production. Your team may want to disable the Keys command to technically enforce this practice. 

The below command syntax can be used to disable commands where:

- username:password is the username and password of a user with the administrator role.
- List of commands - a comma sperated list of commands that you would like to disable.
- FQDN - The fully qualified domain name of your cluster.
- DB Number - The number of the database you would like to disable commands on. This configuration will only apply to the database in question and must be run on any database in the cluster that you would like to disable commands on.

```bash

curl -v -k -u <username>:<password> -H "Content-type: application/json" -d '{ "disabled_commands": "<List of commands>" }' -X PUT https://<FQDN>:9443/v1/bdbs/<DB Number>

```

The below coommand provides an example command that disables the Redis commands FLUSHDB, FLUSHALL and Keys on database one of a cluster

```bash

curl -v -k -u example@redislabs.com:examplepassword -H "Content-type: application/json" -d '{ "disabled_commands": "FLUSHDB,FLUSHALL,KEYS" }' -X PUT https://example.redislabs.com:9443/v1/bdbs/1

```
