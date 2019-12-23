---
Title: Adding a Redis instance
date: 2018-07-20 03:49:29 +0530
weight: 10
categories: ["RI"]
path: add-instance/
nextStep:
    Title: Memory Analysis
    href: /docs/features/memory-analysis/
---
Now, let's connect RedisInsight to a Redis Server. We can start by connecting to redis server running on localhost.

![add_redis_instance_localhost](/images/ri/add_redis_instance_localhost.png)

If the connection is successful, you should start seeing statistics for this redis server.

![instance_overview_page](/images/ri/instance_overview_page.png)

{{% note %}}
Troubleshooting:

1. RedisInsight can only connect to redis servers that your redis-cli can connect to.
    If RedisInsight cannot connect to your redis server, check if you can connect using `redis-cli`
1. On mac and windows, if localhost does not work, try `host.docker.internal` as the server name.
1. On linux, if localhost does not work, restart docker with the `--network host` flag in the docker run command.
{{% /note %}}

## Connecting to ElastiCache

Connecting to AWS ElastiCache can be particularly problematic since ElastiCache Redis caches cannot be accessed from outside the VPC, as they don't have public IP addresses assigned to them.

If you want to work with ElastiCache Redis caches using RedisInsight, you have four options:

1. [Install RedisInsight on an EC2 instance]({{< relref "/ri/installing/install-ec2.md" >}}) that's in the same VPC and has access to the ElastiCache Redis cache. 
   This is the easiest option and yields the best performance.
1. [Use a NAT instance to forward traffic between your ElastiCache Redis cache and RedisInsight.](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/accessing-elasticache.html#access-from-outside-aws) 
   This option has a non-trivial setup, and is not recommended by AWS. Also, this [*does not work with cluster-mode-enabled ElastiCache caches*](https://redis.io/topics/cluster-tutorial#redis-cluster-and-docker).
1. [Set up an SSH tunnel to forward traffic between your ElastiCache Redis cache and RedisInsight.](#ssh-tunnel-instructions) This option has a relatively easy setup. It [*does not work with cluster-mode-enabled ElastiCache caches*](https://redis.io/topics/cluster-tutorial#redis-cluster-and-docker).
1. Set up a VPN to your AWS VPC using [AWS VPN](https://aws.amazon.com/vpn/). 
   You can then access the ElastiCache Redis cache using the private endpoint.


<a name="ssh-tunnel-instructions"></a>

### Using an SSH Tunnel

If you want to add and work with an ElastiCache Redis instance but you're running RedisInsight outside AWS, you  can still connect to it through an EC2 instance that can access it. This can be done by creating a SSH tunnel. An SSH tunnel consists of an encrypted tunnel created through an SSH protocol connection. An SSH tunnel can be used to transfer unencrypted traffic over a network through an encrypted channel.

1. Run this command to create an ssh tunnel:

    ```bash
    ssh -f -N -L8765:<elasticache_endpoint> \
    -i ~/.ssh/redisinsight-dev.pem <ec2_endpoint>
    ```

1. Go to Add Instance in RedisInsight and add an instance with host=localhost, port=8765,
   name=your_instance_name

1. You are now connected to your elasticache instance and can start using it locally.