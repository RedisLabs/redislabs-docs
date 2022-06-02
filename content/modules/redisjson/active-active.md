---
Title: RedisJSON in Active-Active databases
linkTitle: Active-Active databases
description: RedisJSON support and conflict resolution rules for Active-Active databases.
weight: 30
alwaysopen: false
categories: ["Modules"]
---

RedisJSON v2.x added support for using RedisJSON commands in Active-Active databases.

## Command differences

Several RedisJSON commands work differently for Active-Active databases.

### `JSON.CLEAR`

[`JSON.CLEAR`](https://redis.io/commands/json.clear/) is a new command added to support concurrent updates to JSON data from different replicas in an Active-Active database.

### `JSON.NUMMULTBY`

Active-Active databases do not support [`JSON.NUMMULTBY`](https://redis.io/commands/json.nummultby/).

## Conflict resolution rules

The following conflict resolution rules show how Active-Active databases resolve conflicts that arise when RedisJSON commands concurrently run on different instances, operating on the same data, and then attempt to sync.

There are two types of conflict resolution:

1. Merge:

    - The operations are associative.

    - The results of both operations are merged.

1. Win over:

    - The operations are not associative.

    - One operation wins the conflict and sets the value.

    - The losing operation is ignored.

### Create versus create

**Conflict**

Two instances concurrently assign a new JSON document to the same key with `JSON.SET`.

**Resolution type**

Win over

**Resolution rule**

The instance with the smaller replica ID wins.

### Create versus update

**Conflict**

Instance 1 creates a new document and assigns it to an existing key with `JSON.SET`.

Instance 2 updates the content of an existing document with `JSON.SET`.

**Resolution type**

Win over

**Resolution rule**

The operation that creates a new document wins.

### Delete versus create

**Conflict**

Instance 1 deletes a JSON document.

Instance 2 creates a new JSON document and assigns it to the key deleted by instance 1.

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

Instance 1 updates a field inside a JSON document.

Instance 2 updates the same field.

**Resolution type**

Win over

**Resolution rule**

The instance with the smallest replica ID wins.

### Reset JSON document

With the previous version RedisJSON, there were two different ways to reset the content of a map:

- Assign a new empty JSON object: `JSON.SET doc $.colors '{}'`

- Remove the items key by key: `JSON.DEL doc $.colors.blue`

When you assign a new empty map, it cannot be merged with a concurrent update.

If you remove the elements instead, it can be merged with concurrent updates.

You can use the `JSON.CLEAR` command to reset the JSON document without removing each key manually. This method also lets concurrent updates be merged.

#### Assign empty map

**Conflict**

Instance 1 adds "red" to the existing "colors" map.

Instance 2 assigns a new empty map for "colors" and adds "green" to "colors".

**Resolution type**

Win over

**Resolution rule**

Document creation wins over the update.

#### Use `JSON.CLEAR`

**Conflict**

Instance 1 adds "red" to the existing "colors" map.

Instance 2 clears the map "colors" and adds "green" to "colors".

**Resolution type**

Merge

**Resolution rule**

Merges the results of all operations.

### Update ordered array with same map key

Two replicas concurrently update ordered lists under the same map key.

#### Win over conflict resolution

**Conflict**

Two instances create a new array with different content.

**Resolution rule**

On concurrent creation, the instance with the smaller replica ID wins.

#### Merge conflict resolution

For merged content, both instances have to manipulate a previously synchronized array.

**Conflict**

Both instances update the same grocery array with different content.

**Resolution rule**

When instances update the same map, the result of all the operations is merged.

### Update ordered array

**Conflict**

Two instances update the same existing array with different content.

**Resolution type**

Merge

**Resolution rule**

Merges the results of all operations on the list of characters. Preserves the original element order on each instance.

### Assign different types to same map key

**Conflict**

Two instances concurrently assign values of different types to the same key within a JSON document.

For example:

Instance 1 assigns a map to a key within a JSON document.

Instance 2 assigns an array to the same key.

**Resolution type**

Win over

**Resolution rule**

The instance with the smaller replica ID wins, so the key becomes a map in the given example.

### Delete versus update array element

**Conflict**

Instance 1 removes an element from a JSON array.

Instance 2 updates the same element that instance 1 removes.

**Resolution type**

Win over

**Resolution rule**

Deletion wins over updates.