---
Title: Troubleshoot database connectivity
linktitle: Troubleshoot
description: Troubleshoot connectivity issues between the database and clients or applications.
weight: 90
alwaysopen: false
toc: "true"
categories: ["RS"]
---

If your client or application cannot connect to your database, verify the following.

## Database endpoint resolution

On the client machine, check if the database endpoint can be resolved:

```sh
dig <endpoint>
```

If endpoint resolution fails on the client machine, check one of the cluster nodes:

```sh
dig @localhost <endpoint>
```

If endpoint resolution succeeds on the cluster node but fails on the client machine, the problem is with the organizational DNS.

{{<note>}}
Can you elaborate on what is meant by organizational DNS problems? Does this just mean DNS isn't set up properly, so the user should review their DNS configuration?
{{</note>}}

{{<note>}}
What if the endpoint can't be resolved on the cluster node either? What does this mean and what should they do next?
{{</note>}}

## Client application issues

To identify possible client application issues, test connectivity from the client machine to the database using [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli">}}):

- [`INFO`](https://redis.io/commands/info/):

    ```sh
    redis-cli -h <endpoint> -p <port> -a <password> INFO
    ```

- [`PING`](https://redis.io/commands/ping/):

    ```sh
    redis-cli -h <endpoint> -p <port> -a <password> --tls --insecure --cert --key PING
    ```

 If the client machine cannot connect, try to connect to the database from one of the cluster nodes:

```sh
redis-cli -p <port> PING
```

 If the cluster node is also unable to connect to the database, the issue is with the network. Contact your system administrator for help.

 {{<note>}}
 What if the client fails to the connect but the cluster node succeeds? What should the user do in that situation?
 {{</note>}}

## Firewall access

Run one of the following commands to verify that database access is not blocked by a firewall on the client machine or cluster:

```sh
iptables -L
```

```sh
ufw status
```

```sh
firewall-cmd –list-all
```

To resolve firewall issues:

- If a firewall is configured for your database, add the client IP address to the firewall rules.

- Configure third-party firewalls and external proxies to allow the cluster FQDN, database endpoint IP address, and database ports.
