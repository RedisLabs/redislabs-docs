---
Title: CommandOverrider
linkTitle: CommandOverrider
description: Override a Redis command.
weight: 60
alwaysopen: false
categories: ["Modules"]
---

The `CommandOverrider` allows you to override and customize Redis commands.

1. Pass the `CommandOverrider` to the `GearsBuilder.CreateGearsBuilder` function in your Java code.
1. Add `register()` to the end of your `GearsBuilder` object.
1. Run `RG.JEXECUTE` to register your code.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| command | string | The command to override |
| prefix | string | The prefix |

## Output records

The command's name and arguments.

## Example

The following example shows how to override the `HSET` Redis command so that it also adds a `last_modified` timestamp for "user:" hashes.

Add some user data as a hash:

```sh
redis> HSET user:1 name "morgan" posts 201
(integer) 2
```

Example code:

```java
// Create the reader that will pass data to the pipe
CommandOverrider overrider = new CommandOverrider();
overrider.setCommand("HSET");
overrider.setPrefix("user:");
        
// Create the data pipe builder
GearsBuilder.CreateGearsBuilder(overrider).map(r-> {
    ArrayList<String> commandArray = new ArrayList<String>();
    for (Object arg : r) {
        commandArray.add(new String((byte[]) arg, StandardCharsets.UTF_8));
    }
        	
    // Add a last_modified timestamp to the user's profile
    commandArray.add("last_modified");
    commandArray.add(Long.toString(System.currentTimeMillis()));
        	
    GearsBuilder.execute(commandArray.toArray(new String[0]));
        	
    return "OK";
}).register();
```

After you register the previous code with the `RG.JEXECUTE` command, try to update the user's data with `HSET` to test it:

```sh
redis> HSET user:1 posts 234
"OK"
```

Now the user's profile should have the updated value for `posts` and a `last_modified` timestamp:

```sh
redis> HGETALL user:1
1) "name"
2) "morgan"
3) "posts"
4) "234"
5) "last_modified"
6) "1643237927663"
```