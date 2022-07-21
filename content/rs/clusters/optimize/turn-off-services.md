---
Title: Turn off services to free system memory
linktitle: Free system memory
description: Turn off services to free memory and improve performance. 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/troubleshooting/disabling-services.md,
    /rs/administering/troubleshooting/disabling-services/,
    /rs/clusters/optimize/turn-off-services.md,
    /rs/clusters/optimize/turn-off-services/,

]
---
The Redis Enterprise Software cluster nodes host a range of services that support the cluster processes.
In most deployments, either all of these services are required,
or there are enough memory resources on the nodes for the database requirements.

In a deployment with limited memory resources, certain services can be disabled from API endpoint to free system memory or using the `rladmin` command.
Before you turn off a service, make sure that your deployment does not depend on that service.
After you turn off a service, you can re-enable in the same way.

The services that you can turn off are:

- RS Admin Console - `cm_server`
- Logs in CSV format - `stats_archiver`
- [LDAP authentication]({{< relref "/rs/security/ldap/_index.md" >}}) - `saslauthd`
- [Discovery service]({{< relref "rs/installing-upgrading/networking/cluster-dns.md" >}})- `mdns_server`, `pdns_server`
- [Active-Active databases]({{< relref "/rs/databases/active-active/_index.md" >}}) - `crdb_coordinator`, `crdb_worker`

To turn off a service with the `rladmin cluster config` command, use the `services` parameter and the name of the service, followed by `disabled`.
```text
 rladmin cluster config 
        [ services <service_name> <enabled | disabled> ]
```

To turn off a service with the API, use the `/v1/cluster/services/configuration` endpoint
with the name of the service and the operating mode (enabled/disabled) in JSON format.

For example:
- To turn off the Redis Enterprise admin console, issue this PUT request:

    ```sh
    curl --request PUT \
    --url https://localhost:9443/v1/cluster/services_configuration \
    --header 'content-type: application/json' \
    --data '{
        "cm_server":{
            "operating_mode":"disabled"
        }
    }'
    ```

- To turn off the CRDB services and enable the `stats_archiver` for cluster component statistics, issue this PUT request:

    ```sh
    curl --request PUT \
    --url https://localhost:9443/v1/cluster/services_configuration \
    --header 'content-type: application/json' \
    --data '{
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
