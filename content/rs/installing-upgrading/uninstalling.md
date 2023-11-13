---
Title: Uninstall Redis Enterprise Software
LinkTitle: Uninstall
description:
weight: 70
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/uninstalling/
---

Use the `rl_uninstall` script to uninstall Redis Enterprise Software and remove its files. `rl_uninstall` also deletes all Redis data and configuration.

The default location for the `rl_uninstall` script is in `opt/redislabs/bin`. 

For each node in the cluster, navigate to the script's location and run:

```sh
sudo ./rl_uninstall.sh
```
