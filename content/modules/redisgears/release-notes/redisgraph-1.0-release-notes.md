---
Title: RedisGears 1.0 Release Notes
description:
weight: 100
alwaysopen: false
categories: ["Modules"]
---
## RedisGears 1.0.0

### Highlights

* Thread pool support for running several executions in parallel.
* Enhanced dependency installation and module configuration options.
* Revision of all Readers with added arguments which results in more granular reading.

### New features

***1. Core***

* Introduction of the command reader, which allows you to trigger registrations using a command.
* Added thread pool support to run executions, the number of threads can be given as a module argument.
* The dependency installation will download the Wheels and distribute them to all the shards (instead of each shard downloading and install separately)
* Added execution max idle time for distributed executions.

***2. StreamReader***

* on 'run': `fromId`: the message id from where to start reading messages (default `0-0`)
* on 'register': `trimStream`: When set to `True`, trims the stream  execution. (default `True`)

***3. KeysReader:***

The `KeysReader` format was changed and now provides also the key type (string, hash, list, ..) and the event (set, hset, ...). In addition, the KeysReader introduces the following arguments:

* on 'run': `readValue`: if `False`,  only the 'key' and the 'event' values will be provided (default: `True`)
* on 'run': `noScan`: if `True`, read the exact pattern without performing a scan operation (default: `False`)
* on 'register': `readValue: if `False`, only the 'key' and the 'event' values will be provided (default: `True`)

***4. KeysOnlyReader***

#263: KeysOnlyReader now supports the following arguments:
* pattern - the keys pattern to return.
* count - the count parameter provided to the `SCAN` command (ignored if `isPattern` is false)
* exactMatch - boolean indicating if an exact match is required (that is, do not use `SCAN`; just return the given pattern)
* patternGenerator - a callback to generate different patterns on each shard. If supplied, the callback will run on each shard and the return tuple <pattern, isPattern> will be used. (pattern and isPattern arguments will be ignored.)

Execution:
225 Added 'with atomic()' to allow atomic execution of Redis commands.

Minor Enhancements:
276 The python interpreter can now be installed anywhere you want using PythonInstallationDir config value.

Minor Bugfixes:
262 Fix issue where the execution reuse mechanism caused the second run to return no values.

Breaking Changes (compared to v0.9.0):
#263 - StreamReader format was changed to : {'key':..., 'msg_id':..., 'value':{'k':'v',...}}
key - the stream key (string)
msg_id - the current message id (string)
value - the message value (dictionary)

Deprecations:
The 'Log' function was deprecated; use 'log(msg, level='notice')' instead.
Regex argument on KeysReader was deprecated, use prefix instead.
Regex argument on StreamReader was deprecated, use prefix instead.
