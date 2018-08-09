---
Title: Upgrading a Module in Redis Enterprise Software
description: $description
weight: $weight
alwaysopen: false
---
[As modules are upgraded, you will need to load them into Redis
Enterprise if you desire having the new features and/or
fixes.]{style="font-weight: 400;"}

### [Acquiring the Packaged Modules]{style="font-weight: 400;"}

1.  [Redis Enterprise pre-packaged modules -- To download the upgrades
    to the modules, go to the ]{style="font-weight: 400;"}[[Redis
    Enterprise downloads
    page]{style="font-weight: 400;"}](https://redislabs.com/products/redis-pack/downloads/)[.
    For more specific information on developing with each module
    see:]{style="font-weight: 400;"}
    1.  [[ReJSON]{style="font-weight: 400;"}](https://redislabs.com/redis-enterprise-documentation/developing/modules/rejson/)
    2.  [[RediSearch
        Enterprise]{style="font-weight: 400;"}](https://redislabs.com/redis-enterprise-documentation/developing/modules/redisearch/)
    3.  [[ReBloom]{style="font-weight: 400;"}](https://redislabs.com/redis-enterprise-documentation/developing/modules/bloom-filters/)
2.  [Custom packaged modules -- For instructions on packing up any
    module from
    ]{style="font-weight: 400;"}[[redismodules.com]{style="font-weight: 400;"}](http://redismodules.com)[
    to use in upgrades, see ]{style="font-weight: 400;"}[[Developing
    with
    Modules]{style="font-weight: 400;"}](https://redislabs.com/redis-enterprise-documentation/developing/modules/)[.]{style="font-weight: 400;"}

### [Deploying the Packaged Module into Redis Enterprise Software]{style="font-weight: 400;"}

[Once you have the upgraded package, you are ready to deploy
it:]{style="font-weight: 400;"}

1.  [Go to the ]{style="font-weight: 400;"}**settings**[ tab of the
    Redis Enterprise web UI.]{style="font-weight: 400;"}
2.  [Click on ]{style="font-weight: 400;"}**redise** **modules**
3.  [Click on ]{style="font-weight: 400;"}**Add Module**

![](https://redislabs.com/wp-content/uploads/2018/03/upgrade_module-1.png){.alignnone
.size-full .wp-image-37248 width="1600" height="956"}

1.  [Select the packaged module from your file system and upload
    it]{style="font-weight: 400;"}
2.  [Go to the ]{style="font-weight: 400;"}**databases**[ tab, then to
    the configuration section]{style="font-weight: 400;"}
3.  [You will see in the page that an update is
    available.]{style="font-weight: 400;"}[\
    ]{style="font-weight: 400;"}

![](https://redislabs.com/wp-content/uploads/2018/03/update_available-1.png){.alignnone
.size-full .wp-image-37249 width="1346" height="1600"}

1.  [At this time, you cannot upgrade this database from the web UI. It
    must be completed using the rladmin command line utility from one of
    the nodes in the cluster.]{style="font-weight: 400;"}

### [Upgrading the Database to Use the New Version]{style="font-weight: 400;"}

1.  [SSH into any node of the cluster]{style="font-weight: 400;"}
2.  [Identify the database you are
    upgrading]{style="font-weight: 400;"}[\
    ]{style="font-weight: 400;"}

![](https://redislabs.com/wp-content/uploads/2018/03/rladmin_status-1.png){.alignnone
.size-full .wp-image-37250 width="1000" height="214"}

1.  [Run the rladmin command]{style="font-weight: 400;"}[\
    ]{style="font-weight: 400;"}[\$ rladmin upgrade module db\_name
    \<your\_db\_name\> module\_name \<module\_name\> version
    \<new\_module\_version\_num\> module\_args \<module
    arguments\>]{style="font-weight: 400;"}[\
    ]{style="font-weight: 400;"}[\
    ]{style="font-weight: 400;"}[Note: When this is done, it will
    restart the database shards and thus cause downtime for this
    database across the cluster.]{style="font-weight: 400;"}

 

[Each module package is a zip file. Inside the zip file is a JSON file
and it will contain the information necessary for the above rladmin
command for the module\_name and version information necessary. The
specific data points must be entered exactly as you see it in that JSON
file. The necessary data should be at the end of the JSON document. For
example, here is the information for the RediSearch Enterprise module
that i used for the example command above:]{style="font-weight: 400;"}

![](https://redislabs.com/wp-content/uploads/2018/03/module_info-1.png){.alignnone
.size-full .wp-image-37251 width="1000" height="382"}

### [Examples]{style="font-weight: 400;"}

[An example of upgrading the version of RediSearch to 10017.0 would
be:]{style="font-weight: 400;"}[\
]{style="font-weight: 400;"}[\
]{style="font-weight: 400;"}[\$ rladmin upgrade module db\_name
MyAwesomeDB module\_name ft version 10017.0
module\_args]{style="font-weight: 400;"}

 

[An example of upgrading ReBloom:]{style="font-weight: 400;"}[\
]{style="font-weight: 400;"}[\
]{style="font-weight: 400;"}[\$ rladmin upgrade module db\_name MyDB
module\_name bf version 10100.0 module\_args
""]{style="font-weight: 400;"}

 

[An example of upgrading ReJSON:]{style="font-weight: 400;"}

[\$ rladmin upgrade module db\_name MyDB module\_name ReJSON version
10002.0 module\_args ""]{style="font-weight: 400;"}
