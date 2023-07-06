---
Title: Customize installation directories
linkTitle: Customize install locations
description: Customize Redis Enterprise Software installation directories.
weight: 30
alwaysopen: false
categories: ["RS"]
aliases: /rs/installing-upgrading/customize-install-directories/
---

When installing Redis Enterprise Software, you can customize the installation directories.

The files are installed in the `redislabs` directory located in the path that you specify.

{{< note >}}
- Custom installation directories are supported on Red Hat Enterprise Linux versions 7 and 8.
- When you install with custom directories, the installation does not run as an RPM file.
- If a `redislabs` directory already exists in the path that you specify, the installation fails.
- All nodes in a cluster must be installed with the same file locations.
- Custom installation directories are not supported for databases using Auto Tiering.
{{< /note >}}

You can specify these file locations:

| Files               | Installer flag | Example parameter | Example file location |
| ------------------- | -------------- | ----------------- | --------------------- |
| Binaries files      | --install-dir  | /opt              | /opt/redislabs        |
| Configuration files | --config-dir   | /etc/opt          | /etc/opt/redislabs    |
| Data and log files  | --var-dir      | /var/opt          | /var/opt/redislabs    |

These files are not in the custom directories:

- OS files
    - /etc/cron.d/redislabs
    - /etc/firewalld/services
    - /etc/firewalld/services/redislabs-clients.xml
    - /etc/firewalld/services/redislabs.xml
    - /etc/ld.so.conf.d/redislabs_ldconfig.conf.tmpl
    - /etc/logrotate.d/redislabs
    - /etc/profile.d/redislabs_env.sh
    - /usr/lib/systemd/system/rlec_supervisor.service.tmpl
    - /usr/share/selinux/mls/redislabs.pp
    - /usr/share/selinux/targeted/redislabs.pp

- Installation reference files
    - /etc/opt/redislabs/redislabs_custom_install_version
    - /etc/opt/redislabs/redislabs_env_config.sh

To specify directories during [installation]({{<relref "/rs/installing-upgrading/install/install-on-linux">}}), include installer flags as [command-line options]({{<relref "/rs/installing-upgrading/install/install-script">}}) when you run the `install.sh` script. For example:

```sh
sudo ./install.sh --install-dir <path> --config-dir <path> --var-dir <path>
```
 
