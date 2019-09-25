---
title:  Adding a Redis instance
date:  2018-07-20 03:49:29 +0530
weight: 10
categories: ["RI"]add-instance/
pageTitle: Adding a Redis instance
nextStep:
    title: Memory Analysis
    href: /docs/features/memory-analysis/
---
Now, we will connect RedisInsight to a Redis Server. Let's start by connecting to redis server running on localhost.

![add_redisinstance_localhost](/images/ri/add_redisinstance_localhost.png)

If the connection is successful, you should start seeing statistics for this redis server.

![instance_overview_page](/images/ri/instance_overview_page.png)

{{% note %}}
1. RedisInsight can only connect to redis servers that your redis-cli can connect to. If RedisInsight cannot connect to your redis server, check if you can connect using `redis-cli`
1. On mac and windows, if localhost does not work, try `host.docker.internal` as the server name.
1. On linux, if localhost does not work, restart docker with the `--network host` flag in the docker run command.
{{% /note %}}

## Connecting to ElastiCache

If you want to work with ElastiCache Redis instances with RedisInsight, you have two options:

1. [Install RedisInsight on an EC2 instance]({{< relref "/ri/install/install-ec2.md" >}}) that has access to the ElastiCache Redis instance.
1. Create a SSH tunnel through an EC2 instance that can access the ElastiCahe Redis instance.

### Using an SSH Tunnel

If you want to add and work with an ElastiCache Redis instance but you're running RedisInsight outside AWS, you  can still connect to it through an EC2 instance that can access it. This can be done by creating a SSH tunnel. An SSH tunnel consists of an encrypted tunnel created through an SSH protocol connection. An SSH tunnel can be used to transfer unencrypted traffic over a network through an encrypted channel.

1. Run this command to create an ssh tunnel:

    ```bash
    ssh -f -N -L8765:<elasticache_endpoint> \
    -i ~/.ssh/rdbtools-dev.pem <ec2_endpoint>
    ```

1. Go to Add Instance in RedisInsight and add an instance with host=localhost, port=8765,
   name=your_instance_name

1. You are now connected to your elasticache instance and can start using it locally.
