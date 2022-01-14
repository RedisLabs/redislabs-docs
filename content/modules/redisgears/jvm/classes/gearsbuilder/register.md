---
Title: Register
linkTitle: register
description: Register the pipeline of functions to run when certain events occur.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

```java
public java.lang.String register​(
    ExecutionMode mode, 
    gears.operations.OnRegisteredOperation onRegister, 
    gears.operations.OnUnregisteredOperation onUnregistered)
```

Register the pipeline of functions to run when certain events occur.

## Parameters

| Name | Type | Description |
|------|------|-------------|
| mode | ExecutionMode | The execution mode to use (ASYNC/ASYNC_LOCAL/SYNC) |
| onRegister | gears.operations.OnRegisteredOperation | Register callback that will be called on each shard upon register |
| onUnregistered | gears.operations.OnUnregisteredOperation | Unregister callback that will be called on each shard upon unregister |

## Returns

Returns a registration ID.

## Example

```java
GearsBuilder.CreateGearsBuilder(reader).register();
```