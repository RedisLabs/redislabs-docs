---
Title: Verify server configuration
linkTitle: Server configuration
description: Verify server configuration.
weight: 50
alwaysopen: false
categories: ["RS"]
aliases: 
---

## Owner and group permissions

Verify that the following directories and files have `redislabs` as the owner and group with permissions of at least `750`: /etc/opt/redislabs $installdir $vardir

The directories and files in `/etc/opt/redislabs`, `$installdir`, and `$vardir` must have `redislabs` as the owner and group (unless you are using a [custom owner or group]({{<relref "/rs/installing-upgrading/install/customize-user-and-group">}})) and the following permissions:

- The owner requires read, write, and execute permissions (`rwx`).
- The group requires read and execute permissions (`r-x`).

For more information about owner and group permissions, see [Notation of traditional Unix permissions](https://en.wikipedia.org/wiki/File-system_permissions#Notation_of_traditional_Unix_permissions).

1. Check `/etc/opt/redislabs` permissions:

    ```sh
    $ ls -al /etc/opt | grep redislabs
    drwxrwx--x 5 redislabs redislabs 4096 Jun 16 07:00 redislabs
    ```

1. Check `$installdir` permissions (default path: `/opt/redislabs`):

    ```sh
    $ ls -al $installdir
    drwxr-xr-x 2 redislabs redislabs 4096 Mar 20 09:50 bin
    drwxr-xr-x 5 redislabs redislabs 4096 Mar 20 09:51 config
    drwxr-xr-x 1 redislabs redislabs 4096 Mar 20 09:50 lib
    drwxr-xr-x 2 redislabs redislabs 4096 Mar 20 09:51 sbin
    drwxr-xr-x 2 redislabs redislabs 4096 Mar 20 09:50 utils
    ```

1. Check `$vardir` permissions (default path: `/var/opt/redislabs`):

    ```sh
    $ ls -al $vardir
    drwxr-xr-x 2 redislabs redislabs 4096 Apr 11 09:59 backup
    drwxr-xr-x 2 redislabs redislabs 4096 Apr 11 09:59 ephemeral_config 
    drwxr-xr-x 2 redislabs redislabs 4096 Apr 11 09:59 flash
    drwxr-xr-x 2 redislabs redislabs 20480 Jul 6 06:25 log
    drwxr-xr-x 4 redislabs redislabs 4096 Jun 7 06:09 persist
    drwxr-xr-x 2 redislabs redislabs 4096 Jun 14 10:58 redis
    drwxr-xr-x 2 redislabs redislabs 4096 Jun 20 14:25 run
    drwxr-xr-x 3 redislabs redislabs 4096 Jun 7 12:21 tmp
    ```

## Port availability

Reserve TCP ports 10000-19999 and 20000-29999 for Redis processes.

To check if any processes are listening on these ports, run the following [`netstat`](https://man7.org/linux/man-pages/man8/netstat.8.html) command:

```sh
sudo netstat -tlpn | grep -E '[1-2][0-9]{4}'
```

## Time server configuration

Check that time is syncronized with time server using `ntpq -p` or `chronyc sources` or [`timedatectl`](https://man7.org/linux/man-pages/man1/timedatectl.1.html):

```sh
ntpq -p
```

## Environment variable review/verification

TBA
