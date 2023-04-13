---
Title: Verify available resources
linkTitle: Resources
description: Verify the host machine has enough resources available.
weight: 20
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

Before you install or upgrade Redis Enterprise Software, verify the host machine has enough resources available.

## Disk space

Used disk space should be less than `90%`.

To check the host machine's disk usage, run the [`df`](https://man7.org/linux/man-pages/man1/df.1.html) command:

```sh
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
overlay          59G   23G   33G  41% /
/dev/vda1        59G   23G   33G  41% /etc/hosts
```

## RAM

Used memory should be less than `75%`.

Run the [`free`](https://man7.org/linux/man-pages/man1/free.1.html) command to check memory usage:

```sh
$ free
              total        used        free      shared  buff/cache   available
Mem:        6087028     1954664      993756      409196     3138608     3440856
Swap:       1048572           0     1048572
```

## CPU

Used CPU should be less than `75%`.

To check CPU usage, run one of the following commands.

Run [`top`](https://man7.org/linux/man-pages/man1/top.1.html):

```sh
$ top
Tasks:  54 total,   1 running,  53 sleeping,   0 stopped,   0 zombie
%Cpu(s):  1.7 us,  1.4 sy,  0.0 ni, 96.8 id,  0.0 wa,  0.0 hi,  0.1 si,  0.0 st
KiB Mem :  6087028 total,   988672 free,  1958060 used,  3140296 buff/cache
KiB Swap:  1048572 total,  1048572 free,        0 used.  3437460 avail Mem 
```

Run [`vmstat`](https://man7.org/linux/man-pages/man8/vmstat.8.html):

```sh
$ vmstat
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 2  0      0 988868 177588 2962876    0    0     0     6    7   12  1  1 99  0  0
```
