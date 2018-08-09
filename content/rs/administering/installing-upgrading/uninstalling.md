---
Title: Uninstalling Redis Enterprise Software
description: $description
weight: $weight
alwaysopen: false
---
In the event that you need to uninstall Redis Enterprise Software
(RS) from a server, please run the following command in the operating
system CLI:

-   In Ubuntu:

    ``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
    $ sudo apt-get purge redislabs
    ```

-   In CentOS / RHEL:

    ``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
    $ sudo yum remove redislabs
    ```

After you confirm the uninstallation, the uninstall process runs and
removes the RS installation from the server.

Note: If you would like to uninstall RS, but keep the configuration and
persistence files intact, then you can use the apt-get remove command in
Ubuntu, or the rpm -e command in RHEL/CentOS/OEL. Note that you should
not try to reinstall RS on a node that still has the configuration files
on it as the installation might fail or end up corrupted.
