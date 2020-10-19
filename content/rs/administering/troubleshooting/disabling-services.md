---
Title: Disabling Services to Improve Performance
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
The Redis Enterprise Software (RS) cluster nodes host a range of services that support the cluster processes.
In most deployments, either all of these services are required
or there are enough resources on the nodes that the unused services do not degrade performance.

In a deployment with limited resources, certain services can be disabled from API endpoint in order to improve performance.
It's important to verify that disabling the service will not prevent the cluster from functioning as expected.
After you disable a service, you can enable the service from the same API endpoint.

The services that you can disable are:

- mdns_server - 
- cm_server - 
- stats_archiver - 
- saslauthd - 
- pdns_server - 
- crdb_coordinator - 
- crdb_worker - 

To disable a service, use the `/v1/cluster/services/configuration` endpoint
with the name of the service and the operating mode (enabled/disabled) in JSON format.

For example:

- To disable the RS Web UI, run:

    ```sh
    curl --request PUT \
    --url https://localhost:9443/v1/cluster/services_configuration \
    --header 'content-type: application/json' \
    --data '{
    "cm_server": {
        "operating_mode": "disabled"
    }
    }'
    ```

- To disable the CRDB services and enable the stats_archiver for cluster component statistics, run:

    ```sh
    curl --request PUT \
    --url https://localhost:9443/v1/cluster/services_configuration \
    --header 'content-type: application/json' \
    --data '{
    "crdb_coordinator": {
        "operating_mode": "disabled"
    },
    "crdb_worker": {
        "operating_mode": "disabled"
    },
    "stats_archiver": {
        "operating_mode": "enabled"
    }
    }'
    ```
