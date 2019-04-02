---
Title: Redis Enterprise Software Release Notes 5.5 Preview (April 2019)
description: 
weight: 87
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software (RS) 5.5 Preview Edition is now available.

RS 5.5 is a preview version that includes all the capabilities of Redis Enterprise 5.4,
plus support for creation of Redis databases with multiple modules and support for these modules:

- RediSearch (GA)
- RedisGraph (GA)
- RedisBloom (GA)
- RedisJSON (GA)
- RedisAI (Preview Version)
- RedisTimeSeries (Preview Version)
- RedisGears (Preview Version)

## New Features

RS 5.5 lets you create Redis databases with multiple Redis modules.

{{< video "/images/rs/multiple-modules.mp4" "Adding multiple modules" >}}

## Preview Considerations

This preview version is a standalone version. You cannot upgrade to it from a lower version
or upgrade from it to a higher version.
We also do not commit to fixing bugs in the preview edition of RS 5.5.

This preview version is not supported for networks that are isolated from the internet.

## Install Instructions

After you [install RS 5.5]({{< relref "/rs/getting-started/quick-setup.md" >}}), you must run a script on each node to install the modules.

To install the modules, run: `sudo ./install-modules.sh`