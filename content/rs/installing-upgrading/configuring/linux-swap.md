---
Title: Configuring Swap for Linux
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/configuring/linux-swap/
---
Swap space is used by the Linux OS to help manage memory (pages) by
copying pages from RAM to disk and the OS is configured by default to be
fairly aggressive. For Redis Enterprise Software (RS) with the way it
utilizes and manages memory, it is best to eliminate the likelihood of
the OS swapping. If you would like to understand why, please read more
on [how RS manages
memory]({{< relref "/rs/concepts/memory-architecture/memory-management.md" >}})
for best functionality and performance. The formal
recommendation is to disable Linux swap completely in the OS.

## Disabling swap

To disable the swap in the OS of an existing server/VM/instance, you
must have sudo access or be root to run the following command:

```sh
$ sudo swapoff -a
$ sudo sed -i.bak '/ swap / s/^(.*)$/#1/g' /etc/fstab
```

The first command turns swap off immediately and the second command
comments out the swap partitions configured in the OS so swap being
off survives a reboot.

If you are able to, it is best when you install/build the OS on the
server/VM/instance to be used in your RS cluster, to simply not
configure swap partitions at all.
