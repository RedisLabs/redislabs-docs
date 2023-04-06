---
Title: Ensure port availability
linkTitle: Ensure port availability
description: Make sure required ports are available.
weight: 40
alwaysopen: false
categories: ["RS"]
aliases: 
---

Before [installing Redis Enterprise Software]({{<relref "/rs/installing-upgrading/install">}}), make sure all required ports are available.

## Database ports

Make sure that the ports [Redis assigns to databases]({{< relref "/rs/networking/port-configurations.md" >}}) are available and are not being used by the operating system or other processes.

To avoid port collision, we recommend updating `/etc/sysctl.conf` to include:

``` sh
net.ipv4.ip_local_port_range = 30000 65535
```

## Port 53

If port 53 is in use, the installation fails. This is known to happen in
default Ubuntu 18.04 installations in which `systemd-resolved` (DNS server) is running.

To work around this issue, change the system configuration to make this port available
before installation.

1. Edit `/etc/systemd/resolved.conf`: 

    ```sh
    sudo vi /etc/systemd/resolved.conf
    ```

1. Add `DNSStubListener=no` as the last line in the file and save the file.

1. Rename the current `/etc/resolv.conf` file:

    ```sh
    sudo mv /etc/resolv.conf /etc/resolv.conf.orig
    ```

1. Create a symbolic link for `/etc/resolv.conf`:

    ```sh
    sudo ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf
    ```

1. Restart the DNS service:

    ```sh
    sudo service systemd-resolved restart
    ```
