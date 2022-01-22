---
Title: KeysOnlyReader
linkTitle: KeysOnlyReader
description: Gets key names from a database.
weight: 60
alwaysopen: false
categories: ["Modules"]
---

The `KeysOnlyReader` only extracts the key names from a database.

## Constructors

You can use one of these constructors to create a new `KeysOnlyReader` object:

```java
public KeysOnlyReader()

public KeysOnlyReader(int scanSize, String pattern)
```

## Parameters

| Name | Type | Default value | Description |
|------|------|---------------|-------------|
| scanSize | integer | 10000 | The scan command's size limit |
| pattern | string | "\*" (match all keys) | The reader will get all keys that match this pattern |

## Output records

Each output record is a string that represents the key's name.

## Examples

Get all keys in the database:

```java
KeysOnlyReader reader = new KeysOnlyReader();
```

