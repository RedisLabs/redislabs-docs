---
Title: RedisAI 1.0 release notes
linkTitle: v1.0 (May 2020)
description:
weight: 100
alwaysopen: false
categories: ["Modules"]
---
## v1.0.2 (October 2020)

This is a maintenance release for version 1.0.

Headlines:

This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Minor updates:

    - #[383](https://github.com/RedisAI/RedisAI/pull/383) Enable [`AI.SCRIPTRUN`](https://oss.redislabs.com/redisai/commands/#aiscriptrun) inside [`AI.DAGRUN`](https://oss.redislabs.com/redisai/commands/#aidagrun)
    - #[395](https://github.com/RedisAI/RedisAI/pull/395) Add support for variadic arguments to `AI.SCRIPTRUN`
    - #[400](https://github.com/RedisAI/RedisAI/pull/400) Low level API additions for use in other modules (e.g. [RedisGears](https://github.com/RedisAI/RedisAI/blob/v1.0.2/redisgears.io))
    - #[396](https://github.com/RedisAI/RedisAI/pull/396) Add relevant RedisAI config entries to the Redis INFO output. Helpful for standard monitoring systems

- Bug Fixes:

    - #[403](https://github.com/RedisAI/RedisAI/pull/403) Atomic ref count
    - #[406](https://github.com/RedisAI/RedisAI/pull/406) Avoid splitting outputs in batches when nbatches == 1
    - #[438](https://github.com/RedisAI/RedisAI/pull/438) Fixed flagged as "getkeys-api" during the registration (AI.DAGRUN, AI.DAGRUN_RO, AI.MODELRUN, AI.SCRIPTRUN)
    - #[449](https://github.com/RedisAI/RedisAI/pull/449) Safely add to arrays
    - #[443](https://github.com/RedisAI/RedisAI/pull/443) Segfault for `AI.DAGRUN` + `AI.TENSORSET`

## v1.0.1 (July 2020)

This is a maintenance release for version 1.0.

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Bug Fixes:

    - [7f87f85](https://github.com/RedisAI/RedisAI/commit/7f87f8534e70927d67f99b35dc6a97156761587f) Allow inconsistent zero batch outputs.
    - #[385](https://github.com/RedisAI/RedisAI/pull/385),#[382](https://github.com/RedisAI/RedisAI/pull/382) [AI.SCRIPTRUN](https://oss.redislabs.com/redisai/commands/#aiscriptrun) results were being replicated twice.
    - #[384](https://github.com/RedisAI/RedisAI/pull/384) AI.MODELGET to return *inputs*, *outputs*, *batchsize*, and *minbatchsize*.
    - #[412](https://github.com/RedisAI/RedisAI/pull/412) Several memory leaks.

## v1.0.0 (May 2020)

Supported Backends:

- TensorFlow Lite 2.0
- TensorFlow 1.15.0
- PyTorch 1.5
- ONXXRuntime 1.2.0

New features:

- #[241](https://github.com/RedisAI/RedisAI/pull/241), #[270](https://github.com/RedisAI/RedisAI/pull/270) auto-batching support. Requests from multiple clients can be automatically and transparently batched in a single request for increased CPU/GPU efficiency during serving.
- #[322](https://github.com/RedisAI/RedisAI/pull/322) Add [AI.DAGRUN](https://oss.redislabs.com/redisai/commands/#aidagrun). With the new AI.DAGRUN (DAG as in direct acycilc graph) command we support the prescription of combinations of other AI.* commands in a single execution pass, where intermediate keys are never materialised to Redis.
- #[334](https://github.com/RedisAI/RedisAI/pull/334) Add [AI.DAGRUN_RO](https://oss.redislabs.com/redisai/commands/#ai.dagrun_ro) command, a read-only variant of AI.DAGRUN
- #[338](https://github.com/RedisAI/RedisAI/pull/338) [AI.MODELSET](https://oss.redislabs.com/redisai/commands/#ai.modelset) Added the possibility to provide a model in chunks.
- #[332](https://github.com/RedisAI/RedisAI/pull/332) Standardized GET methods (TENSORGET,MODELGET,SCRIPTGET) replies (breaking change for clients)
- #[331](https://github.com/RedisAI/RedisAI/pull/331) Cache model blobs for faster serialization and thread-safety.

Minor Enhancements:

- #[289](https://github.com/RedisAI/RedisAI/pull/289) Memory access and leak fixes.
- #[319](https://github.com/RedisAI/RedisAI/pull/319) Documentation improvements.

Build Enhancements:

- #[299](https://github.com/RedisAI/RedisAI/pull/299) Coverage info.
- #[273](https://github.com/RedisAI/RedisAI/pull/273) Enable running valgrind/callgrind on test platform
- #[277](https://github.com/RedisAI/RedisAI/pull/277), #[296](https://github.com/RedisAI/RedisAI/pull/296) tests extension and refactoring per backend.
