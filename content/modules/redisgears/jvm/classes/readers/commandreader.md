---
Title: CommandReader
linkTitle: CommandReader
description: Run RedisGears functions on command.
weight: 60
alwaysopen: false
categories: ["Modules"]
---

The `CommandReader` allows you to run RedisGears functions on command when you:

1. Pass the `CommandReader` to the `GearsBuilder.CreateGearsBuilder` function in your Java code.
1. Add `register()` to the end of your `GearsBuilder` object.
1. Run `RG.JEXECUTE` to register your code.
1. Run `RG.TRIGGER` to run your code on command:

    ```sh
    RG.TRIGGER <Trigger name> [arg1 arg2 ...]
    ```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| trigger | string | The command name that will trigger the registered RedisGears functions to run |

## Output records

The trigger's name and arguments.

## Example

The following example shows how to create a custom command to update an item's stock. It also adds a timestamp to track when the last restock occurred.

Add a hash to the database that represents an inventory item:

```sh
redis> HSET inventory:headphones:blue stock 5 price 30.00
(integer) 2
```

Example code:

```java
// Create the reader that will pass data to the pipe
CommandReader reader = new CommandReader();
// Set the name of the custom command
reader.setTrigger("Restock");
        
// Create the data pipe builder
GearsBuilder.CreateGearsBuilder(reader).map(r-> {
    // Parse the command arguments to get the key name and new stock value
    String itemKey = new String((byte[]) r[1], StandardCharsets.UTF_8);
    String newStock = new String((byte[]) r[2], StandardCharsets.UTF_8);
        	
    // Update the item's stock and add a timestamp
    GearsBuilder.execute("HSET", itemKey , "stock", newStock,
        			"last_restocked", Long.toString(System.currentTimeMillis()));
        	
    return "OK restocked " + itemKey;
}).register();
```

After you register the previous code with the `RG.JEXECUTE` command, run `RG.TRIGGER` to test it:

```sh
redis> RG.TRIGGER Restock inventory:headphones:blue 20
1) "OK restocked inventory:headphones:blue"
```

The item now has the updated value for `stock` and a `last_restocked` timestamp:

```sh
redis> HGETALL inventory:headphones:blue
1) "stock"
2) "20"
3) "price"
4) "30.00"
5) "last_restocked"
6) "1643232394078"
```
