---
Title: Disabling Services to Free System Memory
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
The Redis Enterprise Software (RS) cluster nodes host a range of services that support the cluster processes.
In most deployments, either all of these services are required,
or there are enough memory resources on the nodes for the database requirements.

In a deployment with limited memory resources, certain services can be disabled from API endpoint to free system memory.
Before you disable a service, make sure that your deployment does not depend on that service.
After you disable a service, you can re-enable it from the same API endpoint.

The services that you can disable are:

- RS Admin Console - `cm_server`
- Logs in CSV format - `stats_archiver`
- [Cluster-based LDAP authentication]({{< relref "/rs/security/ldap/cluster-based-ldap-authentication.md" >}}) - `saslauthd`
- [Discovery service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}})- `mdns_server`, `pdns_server`
- [Active-Active databases]({{< relref "/rs/administering/designing-production/active-active.md" >}}) - `crdb_coordinator`, `crdb_worker`

To disable a service, use the `/v1/cluster/services/configuration` endpoint
with the name of the service and the operating mode (enabled/disabled) in JSON format.

For example:

- To disable the RS Admin Console, issue this PUT request:

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

- To disable the CRDB services and enable the `stats_archiver` for cluster component statistics, issue this PUT request:

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
