---
Title: Using flush_all for Memcached Cloud
description: 
weight: $weight
alwaysopen: false
categories: ["RC Essentials"]
---
Follow the instructions below to use flush_all.

## flush_all for SASL Protected Memcached Enterprise Cloud Databases

If your resource has SASL authentication enabled, you can't use nc
command or telnet to run flush_all on your Memcached Enterprise Cloud
resource. You will have to download a Memcached CLI client that supports
SASL. We recommend to use the bmemcached-CLI client, and the
instructions here is for this client. This instruction refers to Ubuntu
OS. Please make the necessary changes if you are using other Linux
flavor.

```src
$ wget https://github.com/RedisLabs/bmemcached-cli/archive/master.zip
$ sudo apt-get install unzip python-pip
$ unzip master.zip -d bmemcached-cli
$ cd bmemcached-cli/bmemcached-cli-master/
$ sudo pip install --upgrade pip
$ sudo pip install . -r requirements.pip
```

Now you can run the flush_all command using the bmemcached-cli. The
usage is simple:

```src
bmemcached-cli [user]:[password]@[host]:[port]
```

usage example:

```src
$ bmemcached-cli memcached-app123:x298k37@pub-memcache-1010.us-east-1-3.4.ec2.garantiadata.com:1010
([B]memcached) flush_all
True
exit
```

## flush_all for Memcached Enterprise Cloud Databases

```src
$ telnet memcached-12345.c69.us-east-1-2.ec2.cloud.redislabs.com 12345
Trying 54.165.69.88...
Connected to memcached-12345.c69.us-east-1-2.ec2.cloud.redislabs.com.
Escape character is '^]'.
flush_all
OK
quit
Connection closed by foreign host.
```
