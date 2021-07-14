---
Title: Customize system user and group
linkTitle: Customize user and group
description:
weight: 30
alwaysopen: false
categories: ["RS"]
aliases: /rs/installing-upgrading/customize-user-and-group/
---

By default, Redis Enterprise Software is installed with the user:group `redislabs:redislabs`.

During the installation, you can specify the user and group that own all Redis Enterprise Software processes.

If you specify the user only, then installation is run with the primary group that the user belongs to.

{{< note >}}
- Custom installation user is supported on RedHat Enterprise Linux version 7.
- When you install with custom directories, the installation does not run as an RPM file.
- You must create the user and group before attempting to install Redis Software.
- You can specify an LDAP user as the installation user.
{{< /note >}}

Use command-line options for the install script to customize the user or group:

```sh
sudo ./install.sh --os-user <user> --os-group <group>
```

