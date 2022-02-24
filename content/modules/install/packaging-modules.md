---
Title: Package modules
description:
weight: 70
alwaysopen: false
toc: "true"
categories: ["Modules"]
aliases: /modules/packaging
         /modules/packaging-modules/
---

{{<warning>}}
Redis does not officially support third-party modules or databases created with them.
{{</warning>}}

## Package non-certified modules

In addition to the modules packaged and certified by Redis, there are
other modules that can be installed and extend Redis databases in Redis
Enterprise Software. While many are compatible with Redis Enterprise, not all of them
are. If they work, they must be packaged so Redis Enterprise knows how to deploy and
use them in the cluster.

To deploy a custom module and enable it in a new database:

1. Get the module with `git`.
1. Compile the module.
1. Install the `ramp-packer` utility.
1. Wrap the custom module using the RAMP utility.
1. Deploy the custom module to the cluster using the admin console.
1. Create a database and enable the module.

### Get the module from GitHub

```sh
git clone https://github.com/account/myModule.git
```

### Compile the module

Compile the module with the following command:

```sh
cd myModule/;make
```

### Install `ramp-packer` utility

[RAMP](https://github.com/RedisLabs/RAMP), or "Redis Automatic Module
Packaging", is a utility created by Redis to package modules
to be installed into Redis Enterprise.

Run the following command to install `ramp-packer`:

```sh
pip install ramp-packer
```

### Wrap the custom module with RAMP

```sh
$ ramp pack <PATH_TO_myModule.so> -a "Your Name" -e "yourname@emailaddress.com"
-A "x86_64" -d "My Module" -h "https://www.mymodule.com/" -l "LicenseType"
-r "4.0.2"
```

Go to [the RAMP GitHub page](https://github.com/RedisLabs/RAMP)
for more information about RAMP's command-line options.

To deploy the packaged module, see the [module installation guide]({{<relref "/modules/install/add-module-to-database">}}).
