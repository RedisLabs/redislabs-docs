---
Title: Module object
linkTitle: module
description: An object that represents a Redis module
weight: $weight
alwaysopen: false
categories: ["RS"]
---

Represents a [Redis module]({{<relref "/modules">}}).

| Name | Type/Value | Description |
|------|------------|-------------|
| uid                     | string           | Cluster unique ID of module |
| architecture            | string           | Architecture used to compile the module |
| os                      | string           | Operating system used to compile the module |
| os_list                 | array of strings | List of supported operating systems |
| display_name            | string           | Name of module for display purposes |
| author                  | string           | Module creator |
| command_line_args       | string           | Command line arguments passed to the module |
| config_command          | string           | Name of command to configure module arguments at runtime |
| description             | string           | Short description of the module
| email                   | string           | Author's email address |
| homepage                | string           | Module's homepage |
| license                 | string           | Module is distributed under this license
| min_redis_version       | string           | Minimum Redis version required by this module |
| min_redis_pack_version  | string           | Minimum Redis pack version required by this module |
| module_file             | string           | Module filename |
| module_name             | string           | Module's name |
| sha256                  | string           | SHA256 of module binary |
| version                 | integer          | Module's version |
| semantic_version        | string           | Module's semantic version |
| capabilities            | array of strings | List of capabilities supported by this module |
| is_bundled              | boolean          | Whether module came bundled with a version of Redis Enterprise |
| dependencies            | object dependencies | Module dependencies |
