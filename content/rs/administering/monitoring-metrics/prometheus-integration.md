---
Title: Redis Enterprise Software Integration with Prometheus
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
From Redis Enterprise Software version 5.0.2 and higher, you can connect your Prometheus or Grafana server to your Redis Enterprise cluster in order to collect and display metrics data. Metrics are exposed at the node, database, shard and proxy levels.

- Prometheus ([https://prometheus.io/](https://prometheus.io/)) is an open-source systems monitoring and alerting toolkit that can scrape metrics from different sources.
- Grafana ([https://grafana.com/](https://grafana.com/)) is an open-source, feature-rich metrics dashboard and graph editor that can process Prometheus data.

![grafana-prometheus](/images/rs/grafana-prometheus.png?width=500)

In each cluster, the metrics_exporter component listens on port 8070 and serves as a Prometheus scraping endpoint for obtaining metrics.

## Quick Start

To get started with custom monitoring:

1. Copy this Prometheus configuration into `./prometheus/prometheus.yml` in your current folder:

    - If you already have Prometheus installed, just copy the 'redis-enterprise' job into your existing Prometheus configuration and skip the next step.
    - Replace `<cluster_name>` with your actual cluster FQDN.

    ```yml
    global:
      scrape_interval: 15s
      evaluation_interval: 15s

    # Attach these labels to any time series or alerts when communicating with
    # external systems (federation, remote storage, Alertmanager).
      external_labels:
        monitor: "prometheus-stack-monitor"

    # Load and evaluate rules in this file every 'evaluation_interval' seconds.
    #rule_files:
    # - "first.rules"
    # - "second.rules"

    scrape_configs:
    # scrape Prometheus itself
      - job_name: prometheus
        scrape_interval: 10s
        scrape_timeout: 5s
        static_configs:
          - targets: ["localhost:9090"]

    # scrape Redis Enterprise
      - job_name: redis-enterprise
        scrape_interval: 30s
        scrape_timeout: 30s
        metrics_path: /
        scheme: https
        tls_config:
          insecure_skip_verify: true
        static_configs:
          - targets: ["<cluster_name>:8070"]
    ```

1. Set up your Prometheus and Grafana servers.
    To set up Prometheus and Grafana on Docker containers:
    1. Create a _docker-compose.yml_ file with this yaml contents:

        ```yml
        version: '3'
        services:
            prometheus-server:
                image: prom/prometheus
                ports:
                    - 9090:9090
                volumes:
                    - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml

            grafana-ui:
                image: grafana/grafana
                ports:
                    - 3000:3000
                environment:
                    - GF_SECURITY_ADMIN_PASSWORD=secret
                links:
                    - prometheus-server:prometheus
        ```

    1. To start the containers, run: `docker-compose up -d`
    1. To check that all the containers are up, run: `docker ps`
    1. In your browser, login to Prometheus at http://localhost:9090 to make sure the server is running.
    1. Enter **node_up** in the Expression field.
        If Prometheus is connected to the Redis Enterprise cluster, the cluster metrics are shown.

1. Configure the Grafana datasource:
    1. Login to Grafana. If you installed Grafana locally, go to http://localhost:3000 and login with:

     - Username: admin
     - Password: secret

    1. In the Grafana configuration menu, select **Data Sources**.

        ![data-sources](/images/rs/data-sources.png?width=300)

    1. Add a new data source with:

        - Name: `redis-enterprise`
        - Type: `Prometheus`
        - URL: `http://<your prometheus address>:9090`
        - Access: `Server`

    NOTES:

    - If the network port is not accessible to the Grafana server,
    select the 'Browser' option from the Access menu.
    - In a testing environment, you can select 'Skip TLS verification'.

    ![prometheus-connection](/images/rs/prometheus-connection.png?width=500)

1. Add dashboards for cluster, node, and database metrics.
    To add preconfigured dashboards:
    1. In the Grafana dashboards menu, select **Manage**.
    1. Click **Import**.
    1. Copy one of the configurations into the **Paste JSON** field.
        {{%expand "database.json" %}}

```json
{{% embed-code "/rs/database.json" %}}
```

        {{% /expand%}}
        {{%expand "node.json" %}}

```json
{{% embed-code "/rs/node.json" %}}
```

        {{% /expand%}}
        {{%expand "cluster.json" %}}

```json
{{% embed-code "/rs/cluster.json" %}}
```

        {{% /expand%}}
    1. In the Import options, select the `redis-enterprise` datasource and click **Import**.

The dashboards that you create from the configurations are sample dashboards.
For more information about configuring dashboards, see the [Grafana documentation](http://docs.grafana.org).

## Metrics

These are the metrics available:

### Database Metrics

| Metric | Description |
|  ------ | :------ |
|  bdb_avg_latency | Average latency of operations on the DB (microsecond); returned only when there is traffic |
|  bdb_avg_latency_max | Highest value of average latency of operations on the DB (microsecond); returned only when there is traffic |
|  bdb_avg_read_latency | Average latency of read operations (microsecond); returned only when there is traffic |
|  bdb_avg_read_latency_max | Highest value of average latency of read operations (microsecond); returned only when there is traffic |
|  bdb_avg_write_latency | Average latency of write operations (microsecond); returned only when there is traffic |
|  bdb_avg_write_latency_max | Highest value of average latency of write operations (microsecond); returned only when there is traffic |
|  bdb_conns | Number of client connections to DB |
|  bdb_egress_bytes | Rate of outgoing network traffic to DB (bytes/sec) |
|  bdb_egress_bytes_max | Highest value of rate of outgoing network traffic to DB (bytes/sec) |
|  bdb_evicted_objects | Rate of key evictions from DB (evictions/sec) |
|  bdb_evicted_objects_max | Highest value of rate of key evictions from DB (evictions/sec) |
|  bdb_expired_objects | Rate keys expired in DB (expirations/sec) |
|  bdb_expired_objects_max | Highest value of rate keys expired in DB (expirations/sec) |
|  bdb_fork_cpu_system | % cores utilization in system mode for all redis shard fork child processes of this database |
|  bdb_fork_cpu_system_max | Highest value of % cores utilization in system mode for all redis shard fork child processes of this database |
|  bdb_fork_cpu_user | % cores utilization in user mode for all redis shard fork child processes of this database |
|  bdb_fork_cpu_user_max | Highest value of % cores utilization in user mode for all redis shard fork child processes of this database |
|  bdb_ingress_bytes | Rate of incoming network traffic to DB (bytes/sec) |
|  bdb_ingress_bytes_max | Highest value of rate of incoming network traffic to DB (bytes/sec) |
|  bdb_instantaneous_ops_per_sec | Request rate handled by all shards of DB (ops/sec) |
|  bdb_main_thread_cpu_system | % cores utilization in system mode for all redis shard main threas of this database |
|  bdb_main_thread_cpu_system_max | Highest value of % cores utilization in system mode for all redis shard main threas of this database |
|  bdb_main_thread_cpu_user | % cores utilization in user mode for all redis shard main threads of this database |
|  bdb_main_thread_cpu_user_max | Highest value of % cores utilization in user mode for all redis shard main threads of this database |
|  bdb_mem_frag_ratio | RAM fragmentation ratio (RSS / allocated RAM) |
|  bdb_mem_size_lua | Redis lua scripting heap size (bytes) |
|  bdb_monitor_sessions_count | Number of client connected in monitor mode to the DB |
|  bdb_no_of_keys | Number of keys in DB |
|  bdb_other_req | Rate of other (non read/write) requests on DB (ops/sec) |
|  bdb_other_req_max | Highest value of rate of other (non read/write) requests on DB (ops/sec) |
|  bdb_other_res | Rate of other (non read/write) responses on DB (ops/sec) |
|  bdb_other_res_max | Highest value of rate of other (non read/write) responses on DB (ops/sec) |
|  bdb_pubsub_channels | Count the pub/sub channels with subscribed clients. |
|  bdb_pubsub_channels_max | Highest value of count the pub/sub channels with subscribed clients. |
|  bdb_pubsub_patterns | Count the pub/sub patterns with subscribed clients. |
|  bdb_pubsub_patterns_max | Highest value of count the pub/sub patterns with subscribed clients. |
|  bdb_read_hits | Rate of read operations accessing an existing key (ops/sec) |
|  bdb_read_hits_max | Highest value of rate of read operations accessing an existing key (ops/sec) |
|  bdb_read_misses | Rate of read operations accessing a non-existing key (ops/sec) |
|  bdb_read_misses_max | Highest value of rate of read operations accessing a non-existing key (ops/sec) |
|  bdb_read_req | Rate of read requests on DB (ops/sec) |
|  bdb_read_req_max | Highest value of rate of read requests on DB (ops/sec) |
|  bdb_read_res | Rate of read responses on DB (ops/sec) |
|  bdb_read_res_max | Highest value of rate of read responses on DB (ops/sec) |
|  bdb_shard_cpu_system | % cores utilization in system mode for all redis shard processes of this database |
|  bdb_shard_cpu_system_max | Highest value of % cores utilization in system mode for all redis shard processes of this database |
|  bdb_shard_cpu_user | % cores utilization in user mode for the redis shard process |
|  bdb_shard_cpu_user_max | Highest value of % cores utilization in user mode for the redis shard process |
|  bdb_total_connections_received | Rate of new client connections to DB (connections/sec) |
|  bdb_total_connections_received_max | Highest value of rate of new client connections to DB (connections/sec) |
|  bdb_total_req | Rate of all requests on DB (ops/sec) |
|  bdb_total_req_max | Highest value of rate of all requests on DB (ops/sec) |
|  bdb_total_res | Rate of all responses on DB (ops/sec) |
|  bdb_total_res_max | Highest value of rate of all responses on DB (ops/sec) |
|  bdb_used_memory | Memory used by db (in bigredis this includes flash) (bytes) |
|  bdb_write_hits | Rate of write operations accessing an existing key (ops/sec) |
|  bdb_write_hits_max | Highest value of rate of write operations accessing an existing key (ops/sec) |
|  bdb_write_misses | Rate of write operations accessing a non- existing key (ops/sec) |
|  bdb_write_misses_max | Highest value of rate of write operations accessing a non- existing key (ops/sec) |
|  bdb_write_req | Rate of write requests on DB (ops/sec) |
|  bdb_write_req_max | Highest value of rate of write requests on DB (ops/sec) |
|  bdb_write_res | Rate of write responses on DB (ops/sec) |
|  bdb_write_res_max | Highest value of rate of write responses on DB (ops/sec) |

### Node Metrics

| Metric | Description |
|  ------ | :------ |
|  node_avg_latency | Average latency of requests handled by endpoints on node (micro-sec); returned only when there is traffic |
|  node_available_memory | Amount of free memory in node (bytes) that is available for database provisioning |
|  node_conns | Number of clients connected to endpoints on node |
|  node_cpu_idle | CPU idle time portion (0-1, multiply by 100 to get percent) |
|  node_cpu_idle_max | Highest value of CPU idle time portion (0-1, multiply by 100 to get percent) |
|  node_cpu_idle_median | Average value of CPU idle time portion (0-1, multiply by 100 to get percent) |
|  node_cpu_idle_min | Lowest value of CPU idle time portion (0-1, multiply by 100 to get percent) |
|  node_cpu_system | CPU time portion spent in kernel (0-1, multiply by 100 to get percent) |
|  node_cpu_system_max | Highest value of CPU time portion spent in kernel (0-1, multiply by 100 to get percent) |
|  node_cpu_system_median | Average value of CPU time portion spent in kernel (0-1, multiply by 100 to get percent) |
|  node_cpu_system_min | Lowest value of CPU time portion spent in kernel (0-1, multiply by 100 to get percent) |
|  node_cpu_user | CPU time portion spent by users-pace processes (0-1, multiply by 100 to get percent) |
|  node_cpu_user_max | Highest value of CPU time portion spent by users-pace processes (0-1, multiply by 100 to get percent) |
|  node_cpu_user_median | Average value of CPU time portion spent by users-pace processes (0-1, multiply by 100 to get percent) |
|  node_cpu_user_min | Lowest value of CPU time portion spent by users-pace processes (0-1, multiply by 100 to get percent) |
|  node_cur_aof_rewrites | Number of aof rewrites that are currently performed by shards on this node |
|  node_egress_bytes | Rate of outgoing network traffic to node (bytes/sec) |
|  node_egress_bytes_max | Highest value of rate of outgoing network traffic to node (bytes/sec) |
|  node_egress_bytes_median | Average value of rate of outgoing network traffic to node (bytes/sec) |
|  node_egress_bytes_min | Lowest value of rate of outgoing network traffic to node (bytes/sec) |
|  node_ephemeral_storage_avail | Disk space available to RLEC processes on configured ephemeral disk (bytes) |
|  node_ephemeral_storage_free | Free disk space on configured ephemeral disk (bytes) |
|  node_free_memory | Free memory in node (bytes) |
|  node_ingress_bytes | Rate of incoming network traffic to node (bytes/sec) |
|  node_ingress_bytes_max | Highest value of rate of incoming network traffic to node (bytes/sec) |
|  node_ingress_bytes_median | Average value of rate of incoming network traffic to node (bytes/sec) |
|  node_ingress_bytes_min | Lowest value of rate of incoming network traffic to node (bytes/sec) |
|  node_persistent_storage_avail | Disk space available to RLEC processes on configured persistent disk (bytes) |
|  node_persistent_storage_free | Free disk space on configured persistent disk (bytes) |
|  node_total_req | Request rate handled by endpoints on node (ops/sec) |
|  node_up | Node is part of the cluster and is connected |

### Proxy Metrics

| Metric | Description |
|  ------ | :------ |
|  listener_acc_latency | Accumulative latency (sum of the latencies) of all types of commands on DB. For the average latency, divide this value by listener_total_res. |
|  listener_acc_latency_max | Highest value of accumulative latency of all types of commands on DB |
|  listener_acc_other_latency | Accumulative latency (sum of the latencies) of commands that are type "other" on DB. For the average latency, divide this value by listener_other_res. |
|  listener_acc_other_latency_max | Highest value of accumulative latency of commands that are type "other" on DB |
|  listener_acc_read_latency | Accumulative latency (sum of the latencies) of commands that are type "read" on DB. For the average latency, divide this value by listener_read_res. |
|  listener_acc_read_latency_max | Highest value of accumulative latency of commands that are type "read" on DB |
|  listener_acc_write_latency | Accumulative latency (sum of the latencies) of commands that are type "write" on DB. For the average latency, divide this value by listener_write_res. |
|  listener_acc_write_latency_max | Highest value of accumulative latency of commands that are type "write" on DB |
|  listener_auth_cmds | Number of memcached AUTH commands sent to the DB |
|  listener_auth_cmds_max | Highest value of number of memcached AUTH commands sent to the DB |
|  listener_auth_errors | Number of error responses to memcached AUTH commands  |
|  listener_auth_errors_max | Highest value of number of error responses to memcached AUTH commands  |
|  listener_cmd_flush | Number of memcached FLUSH_ALL commands sent to the DB |
|  listener_cmd_flush_max | Highest value of number of memcached FLUSH_ALL commands sent to the DB |
|  listener_cmd_get | Number of memcached GET commands sent to the DB |
|  listener_cmd_get_max | Highest value of number of memcached GET commands sent to the DB |
|  listener_cmd_set | Number of memcached SET commands sent to the DB |
|  listener_cmd_set_max | Highest value of number of memcached SET commands sent to the DB |
|  listener_cmd_touch | Number of memcached TOUCH commands sent to the DB |
|  listener_cmd_touch_max | Highest value of number of memcached TOUCH commands sent to the DB |
|  listener_conns | Number of clients connected to the endpoint |
|  listener_egress_bytes | Rate of outgoing network traffic to the endpoint (bytes/sec) |
|  listener_egress_bytes_max | Highest value of rate of outgoing network traffic to the endpoint (bytes/sec) |
|  listener_ingress_bytes | Rate of incoming network traffic to the endpoint (bytes/sec) |
|  listener_ingress_bytes_max | Highest value of rate of incoming network traffic to the endpoint (bytes/sec) |
|  listener_last_req_time | Time of last command sent to the DB |
|  listener_last_res_time | Time of last response sent from the DB |
|  listener_max_connections_exceeded | Number of times the Number of clients connected to the db at the same time has exeeded the max limit |
|  listener_max_connections_exceeded_max | Highest value of number of times the Number of clients connected to the db at the same time has exeeded the max limit |
|  listener_monitor_sessions_count | Number of client connected in monitor mode to the endpoint |
|  listener_other_req | Rate of other (non read/write) requests on the endpoint (ops/sec) |
|  listener_other_req_max | Highest value of rate of other (non read/write) requests on the endpoint (ops/sec) |
|  listener_other_res | Rate of other (non read/write) responses on the endpoint (ops/sec) |
|  listener_other_res_max | Highest value of rate of other (non read/write) responses on the endpoint (ops/sec) |
|  listener_other_started_res | Number of responses sent from the DB of type "other" |
|  listener_other_started_res_max | Highest value of number of responses sent from the DB of type "other" |
|  listener_read_req | Rate of read requests on the endpoint (ops/sec) |
|  listener_read_req_max | Highest value of rate of read requests on the endpoint (ops/sec) |
|  listener_read_res | Rate of read responses on the endpoint (ops/sec) |
|  listener_read_res_max | Highest value of rate of read responses on the endpoint (ops/sec) |
|  listener_read_started_res | Number of responses sent from the DB of type "read" |
|  listener_read_started_res_max | Highest value of number of responses sent from the DB of type "read" |
|  listener_total_connections_received | Rate of new client connections to the endpoint (connections/sec) |
|  listener_total_connections_received_max | Highest value of rate of new client connections to the endpoint (connections/sec) |
|  listener_total_req | Request rate handled by the endpoint (ops/sec) |
|  listener_total_req_max | Highest value of rate of all requests on the endpoint (ops/sec) |
|  listener_total_res | Rate of all responses on the endpoint (ops/sec) |
|  listener_total_res_max | Highest value of rate of all responses on the endpoint (ops/sec) |
|  listener_total_started_res | Number of responses sent from the DB of all types |
|  listener_total_started_res_max | Highest value of number of responses sent from the DB of all types |
|  listener_write_req | Rate of write requests on the endpoint (ops/sec) |
|  listener_write_req_max | Highest value of rate of write requests on the endpoint (ops/sec) |
|  listener_write_res | Rate of write responses on the endpoint (ops/sec) |
|  listener_write_res_max | Highest value of rate of write responses on the endpoint (ops/sec) |
|  listener_write_started_res | Number of responses sent from the DB of type "write" |
|  listener_write_started_res_max | Highest value of number of responses sent from the DB of type "write" |

### Shard Metrics

| Metric | Description |
|  ------ | :------ |
|  redis_active_defrag_running | Automatic memory defragmentation current aggressiveness (% cpu) |
|  redis_allocator_active | Total used memory including external fragmentation |
|  redis_allocator_allocated | Total allocated memory |
|  redis_allocator_resident | Total resident memory (RSS) |
|  redis_aof_last_cow_size | Last AOFR, CopyOnWrite memory |
|  redis_aof_rewrite_in_progress | The number of simultaneous AOF rewrites that are in progress. |
|  redis_aof_rewrites | Number of AOF rewrites this process executed |
|  redis_blocked_clients | Count the clients waiting on a blocking call. |
|  redis_connected_clients | Number of client connections to the specific shard. |
|  redis_connected_slaves | Number of connected slaves |
|  redis_db0_avg_ttl | Average TTL of all volatile keys |
|  redis_db0_expires | Total count of volatile keys |
|  redis_db0_keys | Total key count |
|  redis_evicted_keys | Keys evicted so far (since restart) |
|  redis_expired_keys | Keys expired so far (since restart) |
|  redis_forwarding_state | Shard forwarding state (on or off) |
|  redis_master_link_status | Indicates if the slave is connected to its master |
|  redis_maxmemory | Current memory limit configured by redis_mgr according to db memory limits |
|  redis_max_process_mem | Current memory limit configured by redis_mgr according to node free memory |
|  redis_mem_aof_buffer | Current size of AOF buffer |
|  redis_mem_clients_normal | Current memory used for input and output buffers of non-slave clients |
|  redis_mem_clients_slaves | Current memory used for input and output buffers of slave clients |
|  redis_mem_fragmentation_ratio | Memory fragmentation ratio (1.3 means 30% overhead) |
|  redis_mem_replication_backlog | Size of replication backlog |
|  redis_process_cpu_system_seconds_total | Shard Process system CPU time spent in seconds. |
|  redis_process_cpu_usage_percent | Shard Process cpu usage precentage |
|  redis_process_cpu_user_seconds_total | Shard user CPU time spent in seconds. |
|  redis_process_main_thread_cpu_system_seconds_total | Shard main thread system CPU time spent in seconds. |
|  redis_process_main_thread_cpu_user_seconds_total | Shard main thread user CPU time spent in seconds. |
|  redis_process_max_fds | Shard Maximum number of open file descriptors. |
|  redis_process_open_fds | Shard Number of open file descriptors |
|  redis_process_resident_memory_bytes | Shard Resident memory size in bytes. |
|  redis_process_start_time_seconds | Shard Start time of the process since unix epoch in seconds. |
|  redis_process_virtual_memory_bytes | Shard virtual memory in bytes |
|  redis_rdb_bgsave_in_progress | Indication if bgsave is currently in progress |
|  redis_rdb_last_cow_size | Last bgsave (or SYNC fork) used CopyOnWrite memory |
|  redis_rdb_saves | Total count of bgsaves since process was restarted (including slave fullsync and persistence) |
|  redis_up | Shard is up and running |
|  redis_used_memory | Memory used by shard (in bigredis this includes flash) (bytes) |
