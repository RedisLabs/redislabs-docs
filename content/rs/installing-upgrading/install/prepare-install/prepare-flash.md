---
Title: Prepare Redis on Flash
linkTitle: Prepare Redis on Flash
description: Prepare to enable Redis on Flash during installation.
weight: 80
alwaysopen: false
categories: ["RS"]
aliases: 
---

If you want to use Redis on Flash for your databases, review the prerequisites, storage requirements, and [other considerations]({{< relref "/rs/databases/redis-on-flash/" >}}) for RoF databases and prepare and format the flash memory.

Use the `prepare_flash` script to prepare and format flash memory:

```sh
sudo /opt/redislabs/sbin/prepare_flash.sh
```

This script finds unformatted disks and mounts them as RAID partitions in `/var/opt/redislabs/flash`.

To verify the disk configuration, run:

```sh
sudo lsblk
```
