---
Title: Redis on Flash (RoF) quick start
linkTitle: Quick start
description: Get started with Redis on Flash quickly, creating a cluster and database using flash storage. 
weight: 80
alwaysopen: false
categories: ["RS"]
aliases: /rs/getting-started/creating-database/redis-flash/
         /rs/getting-started/creating-database/
         /rs/administering/cluster-operations/getting-started-redis-flash.md
         /rs/administering/cluster-operations/getting-started-redis-flash/
         /rs/databases/getting-started-redis-flash.md
         /rs/databases/getting-started-redis-flash/
         /rs/databases/redis-on-flash/getting-started-redis-flash/
         /rs/databases/redis-on-flash/rof-quickstart.md
         /rs/databases/redis-on-flash/rof-quickstart/
         

---
This page guides you through a quick setup of a [Redis on
Flash]({{< relref "/rs/databases/redis-on-flash/" >}}) cluster with a single node for testing and demo purposes. 

For production environments, you can find more detailed installation instructions in the [install and setup]({{< relref "/rs/installing-upgrading/_index.md" >}}) section.

The steps to set up a Redis Enterprise Software cluster using Redis on Flash
with a single node are:

1. Install Redis Enterprise Software or run it in a Docker
    container.
1. Set up a Redis Enterprise Software cluster with Redis on
    Flash.
1. Create a new Redis on Flash database.
1. Connect to your new database.

## Install Redis Enterprise Software

### Bare metal, VM, Cloud instance

To install on bare metal, a virtual machine, or an instance:

1. Download the binaries from the [Redis Enterprise download center](https://app.redislabs.com/#/sign-up/software?direct=true).

1. Upload the binaries to a Linux-based operating system.

1. Extract the image:

```sh
tar -vxf <downloaded tar file name>
```

1. After the `tar` command completes, you can find a new `install.sh` script in the current directory:

```sh
sudo ./install.sh -y
```

### Docker-based installation {#dockerbased-installation}

For testing purposes, you can run a Redis Enterprise Software
Docker container on Windows, MacOS, and Linux.

```sh
docker run -d --cap-add sys_resource --name rp -p 8443:8443 -p 12000:12000 redislabs/redis:latest
```

## Set up a cluster and enable Redis on Flash

1. Direct your browser to `https://localhost:8443/` on the host machine to
see the Redis Enterprise Software admin console. Select the
**Setup** button to get started.

{{< note >}}
Depending on your browser, you may see a certificate error.
Choose "continue to the website" to get to the setup screen.
{{< /note >}}

2. On the **node configuration** page, select the **Enable flash storage
support** checkbox and provide a cluster FQDN: **mycluster.local**.
Then select the **Next** button.

![Enable Redis
Flash](/images/rs/enable_redis_flash.png)

3. If you don't have a license key yet, select the **Next** button to try
the trial version of the product.

4. On the next screen, set up account credentials for a cluster administrator.

5. Select **OK** to confirm that you are aware of the replacement of the HTTPS SSL/TLS
certificate on the node, and proceed through the browser warning.

## Create a database

Select the "new redis db flash" option.

![redis-on-flash](/images/rs/redis-on-flash.png)

On the **create database** page:
1. Enter **myredisflashdb** for a database name.
2. Enter **12000** for the endpoint port number.
3. Select **show advanced options** to see the various alerts available.
4. Select **Activate** to create your database.

![new redis flash
db](/images/rs/newredisflashdb.png)

You now have a Redis on Flash database!

## Connect to your database

You are ready to connect to your database to store data. See the [test connectivity]({{<relref "/rs/databases/connect/test-client-connectivity.md">}}) page to learn how to connect to your database.

## Next steps

If you want to generate load against the
database or add a bunch of data for cluster testing, see the [memtier_benchmark quick start]({{< relref "/rs/clusters/optimize/memtier-benchmark.md" >}}) for help.

To see the true performance and scale of Redis on Flash, you must tune your I/O path and set the flash path to the mounted path of SSD or NVMe flash memory as that is what it is designed to run on. For more information, see [Redis on Flash]({{< relref "/rs/databases/redis-on-flash/" >}}).
