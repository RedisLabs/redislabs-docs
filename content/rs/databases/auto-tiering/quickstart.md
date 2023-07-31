---
Title: Auto Tiering quick start
linkTitle: Quick start
description: Get started with Auto Tiering quickly, creating a cluster and database using flash storage. 
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
         /rs/databases/auto-tiering/quickstart.md
         /rs/databases/auto-tiering/quickstart/
         

---
This page guides you through a quick setup of [Auto Tiering]({{< relref "/rs/databases/auto-tiering/" >}}) with a single node for testing and demo purposes. 

For production environments, you can find more detailed installation instructions in the [install and setup]({{< relref "/rs/installing-upgrading/_index.md" >}}) section.

The steps to set up a Redis Enterprise Software cluster using Auto Tiering
with a single node are:

1. Install Redis Enterprise Software or run it in a Docker
    container.
1. Set up a Redis Enterprise Software cluster with Auto Tiering.
1. Create a new database with Auto Tiering enabled.
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

## Set up a cluster and enable Auto Tiering

1. Direct your browser to `https://localhost:8443/new` on the host machine to
see the Redis Enterprise Software Cluster Manager UI.

    {{<note>}}
Depending on your browser, you may see a certificate error.
Choose "continue to the website" to go to the setup screen.
    {{</note>}}

1. Select **Create new cluster**.

1. Set up account credentials for a cluster administrator, then select **Next** to proceed to cluster setup.

1. Enter your cluster license key if you have one. Otherwise, the cluster uses the trial version.

1. Provide a cluster FQDN such as `mycluster.local`, then select **Next**.

1. In the **Storage configuration** section, turn on the **Enable flash storage** toggle.

1. Select **Create cluster**.

1. Select **OK** to confirm that you are aware of the replacement of the HTTPS TLS
certificate on the node, and proceed through the browser warning.

## Create a database

On the **Databases** screen:

1. Select **Quick database**.

1. Verify **Flash** is selected for **Runs on**.

    {{<image filename="images/rs/screenshots/databases/quick-db-flash.png" alt="Create a quick database with Runs on Flash selected." >}}{{</image>}}

1. Enter `12000` for the endpoint **Port** number.

1. _(Optional)_ Select **Full options** to see available alerts.

1. Select **Create**.

You now have a  database with Auto Tiering enabled!

## Connect to your database

You are ready to connect to your database to store data. See the [test connectivity]({{<relref "/rs/databases/connect/test-client-connectivity.md">}}) page to learn how to connect to your database.

## Next steps

If you want to generate load against the
database or add a bunch of data for cluster testing, see the [memtier_benchmark quick start]({{< relref "/rs/clusters/optimize/memtier-benchmark.md" >}}) for help.

To see the true performance and scale of Auto Tiering, you must tune your I/O path and set the flash path to the mounted path of SSD or NVMe flash memory as that is what it is designed to run on. For more information, see [Auto Tiering]({{< relref "/rs/databases/auto-tiering/" >}}).
