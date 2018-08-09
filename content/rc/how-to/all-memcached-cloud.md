---
Title: Using flush_all for Memcached Cloud
description: $description
weight: $weight
alwaysopen: false
---
### flush\_all for SASL Protected Memcached Enterprise Cloud Databases {#flush_all-SASL-Memcached}

If your resource has SASL authentication enabled, you can't use nc
command or telnet to run flush\_all on your Memcached Enterprise Cloud
resource. You will have to download a Memcached CLI client that supports
SASL. We recommend to use the bmemcached-CLI client, and the
instructions here is for this client. This instruction refers to Ubuntu
OS. Please make the necessary changes if you are using other Linux
flavor.

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ wget https://github.com/RedisLabs/bmemcached-cli/archive/master.zip
$ sudo apt-get install unzip python-pip
$ unzip master.zip -d bmemcached-cli
$ cd bmemcached-cli/bmemcached-cli-master/
$ sudo pip install --upgrade pip
$ sudo pip install . -r requirements.pip
```

Now you can run the flush\_all command using the bmemcached-cli. The
usage is simple:

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
bmemcached-cli [user]:[password]@[host]:[port]
```

usage example:

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ bmemcached-cli memcached-app123:x298k37@pub-memcache-1010.us-east-1-3.4.ec2.garantiadata.com:1010
([B]memcached) flush_all
True
exit
```

### flush\_all for Memcached Enterprise Cloud Databases

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ telnet memcached-12345.c69.us-east-1-2.ec2.cloud.redislabs.com 12345
Trying 54.165.69.88...
Connected to memcached-12345.c69.us-east-1-2.ec2.cloud.redislabs.com.
Escape character is '^]'.
flush_all
OK
quit
Connection closed by foreign host.
```
