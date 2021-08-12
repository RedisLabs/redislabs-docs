---
Title: Package modules
description:
weight: 8
alwaysopen: false
categories: ["Modules"]
aliases: /modules/packaging
---

{{< warning >}}
Redis does not and cannot support third-party modules or databases created with them.
{{< /warning >}}

## Packaging non-certified modules

In addition to the ones Redis packages and certifies, there are
other modules that can be installed and extend Redis databases in Redis
Enterprise Software. While many are compatible with RS, not all of them
are. If they work, they must be packaged so RS knows how to deploy and
use them in the cluster.

Deploying a custom module and creating a database utilizing that modules
require six steps:

1. Get the module from git
1. Compile the module
1. Install ramp-packer utility
1. Wrap the custom module using ramp utility
1. Deploy the custom module to the cluster using the admin console
1. Create a database that utilizes the module

### Get the module from GitHub

```sh
git clone https://github.com/account/myModule.git
```

### Compile the module

To compile the module just run:

```sh
cd myModule/;make
```

### Install ramp-packer utility

[RAMP](https://github.com/RedisLabs/RAMP) or "Redis Automatic Module
Packaging", is a utility created by Redis for packaging up modules
to be installed into Redis Enterprise.

Run the next command to install ramp-packer:

```sh
pip install ramp-packer
```

### Wrap the custom module using ramp utility

```sh
$ ramp pack <PATH_TO_myModule.so> -a "Your Name" -e "yourname@emailaddress.com"
-A "x86_64" -d "My Module" -h "https://www.mymodule.com/" -l "LicenseType"
-r "4.0.2"
```

Go to [the ramp](https://github.com/RedisLabs/RAMP) github [page](https://github.com/RedisLabs/RAMP)
for more information each command line switch in ramp.

To deploy the packaged module, see [Installing a Module]({{< relref "/modules/add-module-to-database.md" >}}).
