---
Title: Uninstalling Redis Enterprise Software
description:
weight: 70
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/uninstalling/
---
You can uninstall Redis Enterprise Software (RS) from a node to uninstall RS
and remove the RS files.
By default, the files are in: `/opt/redislabs`, `/etc/opt/redislabs`, `/var/opt/redislabs`

To uninstall RS from a node, run:

```src
rl_uninstall.sh
```

For RS versions below 5.6 you will need to utilize the following methods:

- In Ubuntu:	To uninstall RS from a node, run:


    ```src	```src
    sudo apt-get purge redislabs	rl_uninstall.sh
    ```	```

- In CentOS / RHEL:	

    ```src	
    sudo yum remove redislabs	
    ```	

After you confirm the uninstallation, the uninstall process runs and	
removes the RS installation from the server.	

Note: If you would like to uninstall RS, but keep the configuration and	
persistence files intact, then you can use the apt-get remove command in	
Ubuntu, or the rpm -e command in RHEL/CentOS/OEL. Note that you should	
not try to reinstall RS on a node that still has the configuration files	
on it as the installation might fail or end up corrupted.
