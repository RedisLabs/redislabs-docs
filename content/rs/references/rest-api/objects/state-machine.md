---
Title: State Machine object
linkTitle: state-machine
description: An object that represents state machines.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

A `state-machine` object tracks the creation of a database on a Redis Enterprise cluster. When you create a database on a Redis Enterprise cluster, Redis Enterprise creates a state machine that tracks the status of the database creation process.

A state machine contains the following attributes:

| Name        | Type/Value | Description |
|-------------|------------|-------------|
| action_uid  | string     | A globally unique identifier of the action |
| object_name | string     | Name of the object being manipulated by the state-machine |
| status      | pending    | Requested state machine has not started |
|             | active     | State machine is currently running |
|             | completed  | Operation complete |
|             | failed     | Operation or State Machine failed |
| name        | string     | Name of the running (or failed) state-machine |
| state       | string     | Current state within the state-machine, when known |
| error       | string     | A descriptive error string for failed state-machine, when known |
