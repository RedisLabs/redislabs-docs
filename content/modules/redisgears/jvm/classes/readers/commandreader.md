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
| trigger | array of strings | The command name that will trigger the registered RedisGears functions to run |

## Output records

The trigger's name and arguments.

## Example

Example code:

```java
TBA
```

After you register the previous code with the `RG.JEXECUTE` command, run `RG.TRIGGER` to test it:

```sh
redis> RG.TRIGGER TBA
1) TBA
```
