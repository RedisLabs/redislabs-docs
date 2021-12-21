---
Title: Use Redis modules with RedisInsight
linkTitle: Use modules
weight: 40
categories: ["RI"]
---

If you enable a [Redis module]({{<relref "/modules">}}) for a database, you can run module commands in the RedisInsight [**Workbench**]({{<relref "#workbench">}}) or [**CLI**]({{<relref "#cli">}}).

RedisInsight also provides [quick guide tutorials]({{<relref "#quick-guides">}}) and a [command helper]({{<relref "#command-helper">}}) to help you get familiar with module commands.

## View enabled modules

If you have any [Redis modules]({{<relref "/modules">}}) enabled for your database, their icons appear in the upper right corner of RedisInsight.

For example, if you enabled the [RedisJSON]({{<relref "/modules/redisjson">}}) and [RediSearch]({{<relref "/modules/redisearch">}}) modules for a database, you will see these icons:

{{<image filename="images/ri/enabled-modules.png" alt="View enabled modules">}}{{</image>}}

If you do not recognize a module icon, hover over it to see its name.

## Workbench

The workbench provides a text editor, an output log, and quick guide tutorials.

To access the workbench, select the **Workbench** button after you connect to your database:

{{<image filename="images/ri/icon-workbench.png" alt="The Workbench icon">}}{{</image>}}

### Text editor

The text editor allows you to split complex module commands into multiple lines. You can also enter multiple commands into the text editor.

In addition, the text editor supports syntax highlighting and autocomplete suggestions for module commands.

### Output log

The output log, located below the text editor, shows the results of executed commands.

Some commands, such as RediSearch's `FT.INFO`, `FT.SEARCH`, and `FT.AGGREGATE`, allow you to view the output results as a table:

{{<image filename="images/ri/output-redisearch-info.png" alt="Output visualization of RediSearch FT.INFO">}}{{</image>}}

{{<note>}}
If you try to run a command from a module that is not enabled in the database, the output log will display an error message with more information and links about the missing module.
{{</note>}}

### Quick guides

In the **Quick Guides** panel, RedisInsight provides some guides and working examples to help you explore module features and commands. For example, the **Document Capabilities** guide has information and examples related to [RediSearch]({{<relref "/modules/redisearch">}}) and [RedisJSON]({{<relref "/modules/redisjson">}}).

Certain guides, such as **Working with JSON**, have buttons to automatically populate the text editor with working examples:

{{<image filename="images/ri/quick-guide-index-json.png" alt="Working with JSON quick guide">}}{{</image>}}

To test an example from a guide:
1. Select an action button to populate the text editor with example commands.
1. Select the **Run** button: 

    {{<image filename="images/ri/icon-run-command.png" alt="The Run command icon">}}{{</image>}}

## CLI

If you open the CLI panel, you can also enter module commands directly into the CLI prompt.

As you type a module command, the CLI will suggest possible arguments to add. If you have the command helper open, it will show you more details about the command:

{{<image filename="images/ri/command-helper.png" alt="The command helper">}}{{</image>}}

{{<note>}}
If you try to run a command from a module that is not enabled for the database, the CLI will output an `unknown command` error.
{{</note>}}

### Command helper

The command helper tool allows you to search for supported module commands.

If the command helper is not visible, select the **Expand Command Helper** button in the upper right of the CLI panel to open it:

{{<image filename="images/ri/icon-command-helper.png" alt="The expand/collapse command helper icon">}}{{</image>}}

The search box allows you to search for available commands. If you want to filter your search results, select a command type from the dropdown box:

{{<image filename="images/ri/command-helper-search.png" alt="Command helper search and filter example">}}{{</image>}}

Select a command from the search results to view more information about the command and its available arguments:

{{<image filename="images/ri/command-helper-details.png" alt="Command helper example">}}{{</image>}}