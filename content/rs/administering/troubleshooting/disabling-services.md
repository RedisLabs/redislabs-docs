---
Title: Disabling Services to Free System Memory
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
The Redis Enterprise Software cluster nodes host a range of services that support the cluster processes.
In most deployments, either all of these services are required,
or there are enough memory resources on the nodes for the database requirements.

In a deployment with limited memory resources, you can use the REST API or `rladmin` to turn off certain services to free system memory.
Before you turn off a service, make sure that your deployment does not depend on that service.
After you turn off a service, you can re-enable it in the same way.

The services that you can disable are:

- RS Admin Console - `cm_server`
- Logs in CSV format - `stats_archiver`
- [LDAP authentication]({{< relref "/rs/security/ldap/_index.md" >}}) - `saslauthd`
- [Discovery service]({{< relref "rs/installing-upgrading/configuring/cluster-dns.md" >}})- `mdns_server`, `pdns_server`
- [Active-Active databases]({{< relref "/rs/databases/active-active/_index.md" >}}) - `crdb_coordinator`, `crdb_worker`

To disable a service with the `rladmin cluster config` command, use the `services` parameter and the name of the service, followed by `disabled`.
```text
 rladmin cluster config
        [ services <service_name> <enabled | disabled> ]
```

To turn off a service with the API, use the [PUT `/v1/cluster/services_configuration`]({{< relref "/rs/references/rest-api/requests/cluster/services_configuration#put-cluster-services_config" >}}) endpoint with the name of the service and the operating mode (enabled/disabled) in JSON format.

For example:
- To turn off the Redis Enterprise admin console, use this `PUT` request:

    ```sh
    PUT https://[host][:port]/v1/cluster/services_configuration
    '{
        "cm_server":{
            "operating_mode":"disabled"
        }
    }'
    ```

- To turn off the CRDB services and turn on the `stats_archiver` for cluster component statistics, issue this PUT request:

    ```sh
    PUT https://[host][:port]/v1/cluster/services_configuration
    '{
        "crdb_coordinator":{
            "operating_mode":"disabled"
        },
        "crdb_worker":{
            "operating_mode":"disabled"
        },
        "stats_archiver":{
            "operating_mode":"enabled"
        }
    }'
    ```
