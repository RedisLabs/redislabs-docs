---
Title: Installation script command-line options
linkTitle: Installation script options
description: Command-line options for the install.sh script.
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: 
---

Run `./install.sh --help` to view command-line options supported by the install script.

The following options are supported:

| Option | Description |
|--------|-------------|
| `-y` | Automatically answers `yes` to all install prompts, accepting all default values<br/>See [Manage install questions]({{<relref "/rs/installing-upgrading/prepare-install/manage-installation-questions">}})|
| <nobr>`-c <answer file>`</nobr> | Specify answer file used to respond to install prompts<br/>See [Manage install questions]({{<relref "/rs/installing-upgrading/prepare-install/manage-installation-questions">}})|
| <nobr>`-s <socket dir>`</s> | Specify directory for redislabs unix sockets  _(new installs only)_|
| <nobr>`--install-dir <dir>`</nobr> | Specifies installation directory _(new installs only)_ <br/> See [Customize install locations]({{<relref "/rs/installing-upgrading/prepare-install/customize-install-directories">}})|  
| <nobr>`--config-dir <dir>` | Configuration file directory *(new installs only)* <br/>See [Customize install locations]({{<relref "/rs/installing-upgrading/prepare-install/customize-install-directories">}})|
| <nobr>`--var-dir <dir>`</nobr> | Var dir used for installation *(new installs only)* <br/>See [Customize install locations]({{<relref "/rs/installing-upgrading/prepare-install/customize-install-directories">}})|
| <nobr>`--os-user <user>`| Operating system user account associated with install; default: `redislabs`<br/>See [Customize user and group]({{<relref "/rs/installing-upgrading/prepare-install/customize-user-and-group">}}) *(new installs only)*|
|<nobr>`--os-group <group>` | Operating system group associated with install; default: `redislabs`<br/>See [Customize user and group]({{<relref "/rs/installing-upgrading/prepare-install/customize-user-and-group">}}) *(new installs only)* |
