---
Title: RedisGears 1.0 Release Notes
description:
weight: 100
alwaysopen: false
categories: ["Modules"]
---
## RedisGears 1.0.3 (November 2020)

This is a maintenance release for version 1.0.

Headlines:

This release improves overall stability and provides fixes for issues found after the previous release.

- Bugfixes:
    - #[427](https://github.com/RedisGears/RedisGears/pull/427) Rare issue where messages might get lost and cause executions timeouts.
    - #[434](https://github.com/RedisGears/RedisGears/pull/434) Triggering an execution on uninitialized cluster state should raise a cluster uninitialized error.

## RedisGears 1.0.2 (October 2020)

This is a maintenance release for version 1.0.

Headlines:

This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Minor Features:
    - #[368](https://github.com/RedisGears/RedisGears/pull/368) Support for buffer input on `createTensorFromBlob` when integrating with [RedisAI](https://github.com/RedisGears/RedisGears/blob/v1.0.2/redisai.io) API.
    - #[373](https://github.com/RedisGears/RedisGears/pull/373) Registered execution plans will not re-send their metadata when they are triggered (this feature reduces network overhead and improve performance of distributed registrations).
    - #[371](https://github.com/RedisGears/RedisGears/pull/371) Full details on import requirement failure.

- Bugfixes:

    - #[374](https://github.com/RedisGears/RedisGears/pull/374) Fix RedisAI `toFlatList` function to handle long long encoding.
    - #[375](https://github.com/RedisGears/RedisGears/pull/375) Call `OnRegister` on RDBLoad.
    - #[388](https://github.com/RedisGears/RedisGears/pull/388) Fix crash on hello request failure (internal protocol between shards), a retry will be triggered after 1 second.
    - #[395](https://github.com/RedisGears/RedisGears/pull/395) Fix rare wrong results on [aggregate](https://oss.redislabs.com/redisgears/operations.html#aggregate) and [aggregateby](https://oss.redislabs.com/redisgears/operations.html#aggregateby). Use deep copy on the zero value to avoid those incorrect results.

## RedisGears 1.0.1 (July 2020)

This is a maintenance release for version 1.0.

Highlights:

- *Import and Export requirements* - With this capability, you can export the python requirements present in RedisGears and import them into another instance using [gears-cli](https://github.com/RedisGears/gears-cli). This enables, amongst others, to import requirements to environments without internet access. Notice that the requirement should be exported from and imported into machines with the same OS and version. This is the recommended tool to use for productionising RedisGears functions (for example to be used in your CI).
- *Optimised requirements installation mechanism* - requirements will now be distributed once to each shard and not each time an execution is triggered.
- *RedisAI API fixes and additions* - fixes/additions related to the integration with RedisAI.

Details:

- Features:
    - #[330](https://github.com/RedisGears/RedisGears/pull/330) [SendMsgRetries](https://oss.redislabs.com/redisgears/configuration.html#sendmsgretries) configuration parameter indicating how many times RedisGears should try sending messages between shards.
    - #[330](https://github.com/RedisGears/RedisGears/pull/330) [PythonInstallReqMaxIdleTime](https://oss.redislabs.com/redisgears/configuration.html#pythoninstallreqmaxidletime) configuration parameter for the maximum amount of time to wait for requirements to be installed.
    - #[330](https://github.com/RedisGears/RedisGears/pull/330) RG.[PYDUMPREQ](https://oss.redislabs.com/redisgears/commands.html#rgpydumpreqs) command that output all the currently available python requirements.
    - Added the following API functionality to the RedisAI integration:
        - #[346](https://github.com/RedisGears/RedisGears/pull/346) Script run will now return a list of tensors.
        - #[347](https://github.com/RedisGears/RedisGears/pull/347) Allow tensor creation from bytes.
        - #[350](https://github.com/RedisGears/RedisGears/pull/350) Added mget and mset to get/set multiple tensors from/to the keyspace.
        - #[345](https://github.com/RedisGears/RedisGears/pull/345) Free python GIL before calling redisAI model/script run.

- Bugfixes:
    - #[325](https://github.com/RedisGears/RedisGears/pull/325) Circular reference that caused a logical memory leak.
    - #[330](https://github.com/RedisGears/RedisGears/pull/330) Crash on wrong reply status.
    - #[345](https://github.com/RedisGears/RedisGears/pull/345) Crash on python session (private data on rg.dumpregistration) 'tostr' function when there is no requirements.
    - #[334](https://github.com/RedisGears/RedisGears/pull/334) Type check to RedisAI API to prevent potential crashes.

## RedisGears 1.0.0 (May 2020)

This is the first GA Release of RedisGears (v1.0.0).

Highlights:

- Program everything you want in Redis - With a built-in C-API and Python interpreter, RedisGears lets you use full-fledged Python scripts and libraries to process data inside Redis.
- Write once, deploy anywhere - Write your functions against a standalone Redis database and deploy them to production clusters—with no changes required.
- Run your serverless engine where your data lives - RedisGears lets you process events and streams faster by running in memory next to your data in Redis.

To get started please check out [redisgears.io](https://oss.redislabs.com/redisgears/). We plan to release a blogpost soon and will cross link it here.

Bugfixes (compared to RC1):

- #[288](https://github.com/RedisGears/RedisGears/issues/288) dependencies with version will not crash the server.
- #[309](https://github.com/RedisGears/RedisGears/issues/309), #[313](https://github.com/RedisGears/RedisGears/issues/313) Prevent crashes on [RedisAI](https://oss.redislabs.com/redisai/) intergration and update the low level C api of RedisAI.
- #[311](https://github.com/RedisGears/RedisGears/issues/311) Fix out-of-order reply in certain situations.
- #[321](https://github.com/RedisGears/RedisGears/issues/321) Return error when unknown argument is given.

{{< note >}}
- The version inside Redis will be 10000 or 1.0.0 in semantic versioning.
- This version requires the Redis version to be 6.0 and above.
{{< /note >}}
