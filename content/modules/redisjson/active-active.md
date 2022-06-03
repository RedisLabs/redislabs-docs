---
Title: RedisJSON in Active-Active databases
linkTitle: Active-Active databases
description: RedisJSON support and conflict resolution rules for Active-Active databases.
weight: 50
alwaysopen: false
categories: ["Modules"]
---

RedisJSON v2.x adds support for RedisJSON in [Active-Active Redis Enterprise databases]({{<relref "/rs/databases/active-active">}}).

## Command differences

Several RedisJSON commands work differently for Active-Active databases.

### `JSON.CLEAR`

[`JSON.CLEAR`](https://redis.io/commands/json.clear/) is a new command that resets JSON arrays and objects. It supports concurrent updates to JSON documents from different instances in an Active-Active database and allows the results to be merged.

### `JSON.NUMMULTBY`

Active-Active databases do not support [`JSON.NUMMULTBY`](https://redis.io/commands/json.nummultby/).

## Conflict resolution rules

With Active-Active databases, it's possible for two different instances to try to run write operations on the same data at the same time. If this happens, conflicts can arise when the replicas attempt to sync these changes with each other. Conflict resolution rules determine how the database handles conflicting operations.

There are two types of conflict resolution:

1. Merge:

    - The operations are associative.

    - Merges the results of both operations.

1. Win over:

    - The operations are not associative.

    - One operation wins the conflict and sets the value.

    - Ignores the losing operation.

The following conflict resolution rules show how Active-Active databases resolve conflicts for various RedisJSON commands.

### Assign different types to a key

**Conflict**

Two instances concurrently assign values of different types to the same key within a JSON document.

For example:

Instance 1 assigns a map to a key within a JSON document.

Instance 2 assigns an array to the same key.

**Resolution type**

Win over

**Resolution rule**

The instance with the smaller ID wins, so the key becomes a map in the given example.

### Create versus create

**Conflict**

Two instances concurrently use `JSON.SET` to assign a new JSON document to the same key.

**Resolution type**

Win over

**Resolution rule**

The instance with the smaller ID wins.

### Create versus update

**Conflict**

Instance 1 creates a new document and assigns it to an existing key with `JSON.SET`.

Instance 2 updates the existing content of the same key with `JSON.SET`.

**Resolution type**

Win over

**Resolution rule**

The operation that creates a new document wins.

### Delete versus create

**Conflict**

Instance 1 deletes a JSON document with `JSON.DEL`.

Instance 2 uses `JSON.SET` to create a new JSON document and assign it to the key deleted by instance 1.

**Resolution type**

Win over

**Resolution rule**

Document creation wins over deletion.

### Delete versus update

**Conflict**

Instance 1 deletes a JSON document with `JSON.DEL`.

Instance 2 updates the content of the same document with `JSON.SET`.

**Resolution type**

Win over

**Resolution rule**

Document deletion wins over updates.

### Update versus update

**Conflict**

Instance 1 updates a field inside a JSON document with `JSON.SET`.

Instance 2 updates the same field with a different value.

**Resolution type**

Win over

**Resolution rule**

The instance with the smallest ID wins.

### Update versus clear

The version of RedisJSON prior to v2.x has two different ways to reset the content of a JSON object:

- Assign a new empty JSON object:
    
    ```sh
    JSON.SET doc $.colors '{}'
    ```

    If you use this method, it cannot be merged with a concurrent update.

- For each key, remove it with `JSON.DEL`:

    ```sh
    JSON.DEL doc $.colors.blue
    ```

    With this method, it can merge the reset with concurrent updates.

As of RedisJSON v2.x, you can use the `JSON.CLEAR` command to reset the JSON document without removing each key manually. This method also lets concurrent updates be merged.

#### Assign an empty object

**Conflict**

Instance 1 adds "red" to the existing "colors" map with `JSON.SET`.

Instance 2 assigns a new empty map for "colors".

**Resolution type**

Win over

**Resolution rule**

Document creation wins over the update, so the result will be an empty map.

#### Use `JSON.CLEAR`

**Conflict**

Instance 1 adds "red" to the existing "colors" map with `JSON.SET`.

Instance 2 clears the "colors" map with `JSON.CLEAR` and adds "green" to "colors".

**Resolution type**

Merge

**Resolution rule**

Merges the results of all operations.

### Update versus update array

**Conflict**

Two instances update the same existing array with different content.

**Resolution type**

Merge

**Resolution rule**

Merges the results of all operations on the array. Preserves the original element order from each instance.

### Update versus delete array element

**Conflict**

Instance 1 removes an element from a JSON array with `JSON.ARRPOP`.

Instance 2 updates the same element that instance 1 removes.

**Resolution type**

Win over

**Resolution rule**

Deletion wins over updates.

### Update versus update map

**Conflict**

Both instances update the same existing map with different content.

**Resolution type**

Merge

**Resolution rule**

Merges the results of all operations on the map.