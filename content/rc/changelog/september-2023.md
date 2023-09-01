---
Title: Redis Enterprise Cloud changelog (September 2023)
linktitle: September 2023
description: New features, enhancements, and other changes added to Redis Enterprise Cloud during September 2023.
highlights: RESP protocol selection
weight: 78
alwaysopen: false
categories: ["RC"]
aliases: []
---

## New features

### RESP protocol selection

For all databases using Redis 7.2, you can now choose between the RESP2 and RESP3 protocols when you [create a database](({{<relref "/rc/databases/create-database">}})). For more information about the different RESP versions, see the [Redis serialization protocol specification](https://redis.io/docs/reference/protocol-spec/#resp-versions).