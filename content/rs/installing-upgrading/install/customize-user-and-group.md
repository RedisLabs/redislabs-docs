---
Title: Customize system user and group
linkTitle: Customize user and group
description: Specify the user and group who own all Redis Enterprise Software processes.
weight: 40
alwaysopen: false
categories: ["RS"]
aliases: /rs/installing-upgrading/customize-user-and-group/
---

By default, Redis Enterprise Software is installed with the user:group `redislabs:redislabs`.

During installation, you can specify the user and group that own all Redis Enterprise Software processes.

If you specify the user only, then installation is run with the primary group that the user belongs to.

{{< note >}}
- Custom installation user is supported on Red Hat Enterprise Linux.
- When you install with custom directories, the installation does not run as an RPM file.
- You must create the user and group before attempting to install Redis Software.
- You can specify an LDAP user as the installation user.
{{< /note >}}

To customize the user or group during [installation]({{<relref "/rs/installing-upgrading/install/install-on-linux">}}), include the `--os-user` or `--os-group` [command-line options]({{<relref "/rs/installing-upgrading/install/install-script">}}) when you run the `install.sh` script. For example:

```sh
sudo ./install.sh --os-user <user> --os-group <group>
```

