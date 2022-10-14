---
Title: Redis on Flash (RoF) quick start
linkTitle: Redis on Flash quick start
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

For production environments, you'll find more detailed installation instructions in the [install and setup]({{< relref "/rs/installing-upgrading/_index.md" >}}) section.

The steps to set up a Redis Enterprise Software cluster using Redis on Flash
with a single node are:

- **Step 1**: Install Redis Enterprise Software or launch with Docker
    container
- **Step 2**: Set up a Redis Enterprise Software cluster with Redis on
    Flash
- **Step 3**: Create a new Redis on Flash database
- **Step 4**: Connect to your new database

## Step 1: Install Redis Enterprise Software

### Bare metal, VM, Cloud instance

To install on bare metal, VM, or instance; download the binaries from
the [Redis Enterprise download
site](https://app.redislabs.com/#/sign-up/software?direct=true). Once
you have the bits on a Linux based OS, you need to extract the image.

```sh
tar -vxf <downloaded tar file name>
```

Once the tar command completes, you can find a new `install.sh` script in
the current directory.

```sh
sudo ./install.sh -y
```

### Docker-based installation {#dockerbased-installation}

For testing purposes, you can run a Redis Enterprise Software
Docker container on Windows, MacOS, and Linux.

```sh
docker run -d --cap-add sys_resource --name rp -p 8443:8443 -p 12000:12000 redislabs/redis:latest
```

## Step 2: Set up a cluster and enable Redis on Flash

1. Direct your browser to `https://localhost:8443/` on the host machine to
see the Redis Enterprise Software admin console. Click the
**Setup** button to get started.

{{< note >}}
Depending on your browser, you may see a certificate error.
Choose "continue to the website" to get to the setup screen.
{{< /note >}}

2. On the **node configuration** page, select the **Enable flash storage
support** checkbox and provide a cluster FQDN: **mycluster.local**.
Then simply click the **Next** button.

![Enable Redis
Flash](/images/rs/enable_redis_flash.png)

3. If you don't have a license key yet, click the **Next** button to try
the trial version of the product.

4. On the next screen, set up a cluster administrator account credentials.

5. Click **OK** to confirm that you are aware of the replacement of the HTTPS SSL/TLS
certificate on the node, and proceed through the browser warning.

## Step 3: Create a database

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

## Step 4: Connecting to your database

You are ready to connect to your database to store data. See [test connectivity]({{<relref "/rs/databases/connect/test-client-connectivity.md">}}) page for a tutorial on connecting to your database.

## Next steps

If you'd like to generate load against the
database or add a bunch of data for cluster testing, the [memtier_benchmark quick start]({{< relref "/rs/clusters/optimize/memtier-benchmark.md" >}}) should help.

To see the true performance and scale of Redis on Flash, you must tune your IO path and have the flash path set to the mounted path of SSD or NVMe flash memory as that is what it is designed to run on. For more information, see [Redis on Flash]({{< relref "/rs/databases/redis-on-flash/" >}}).
