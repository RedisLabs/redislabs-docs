---
Title: Prepare Auto Tiering
linkTitle: Prepare Auto Tiering
description: Prepare to enable Auto Tiering during installation.
weight: 80
alwaysopen: false
categories: ["RS"]
aliases: 
---

If you want to use Auto Tiering for your databases, review the prerequisites, storage requirements, and [other considerations]({{< relref "/rs/databases/auto-tiering/" >}}) for Auto Tiering databases and prepare and format the flash memory.

Use the `prepare_flash` script to prepare and format flash memory:

```sh
sudo /opt/redislabs/sbin/prepare_flash.sh
```

This script finds unformatted disks and mounts them as RAID partitions in `/var/opt/redislabs/flash`.

To verify the disk configuration, run:

```sh
sudo lsblk
```
