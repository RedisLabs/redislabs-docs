---
Title: Redis Enterprise Software product lifecycle
linkTitle: Product lifecycle
description: The product lifecycle of Redis Enterprise Software.
weight: 100
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/product-lifecycle.md,
    /rs/administering/product-lifecycle/,
    /rs/installing-upgrading/product-lifecycle.md,
    /rs/installing-upgrading/product-lifecycle/,
]
---
The Redis Enterprise Software product lifecycle fully reflects the [subscription agreement](https://redis.com/software-subscription-agreement).
However, for any discrepancy between the two policies, the subscription agreement prevails.

Redis Enterprise modules follow the [modules lifecycle]({{<relref "/stack/modules-lifecycle">}}).

## Release numbers

Redis uses a four-place numbering scheme to designate released versions of its products.
The format is “Major1.Major2.Minor-Build”.

- Major sections of the version number represents fundamental changes and additions in
    capabilities to Redis  Enterprise Software. The Major1 and Major2 part of the
    version number are incremented based on the size and scale of the changes in each
    release.
- The Minor section of the version number represents quality improvements, fixes to
    existing capabilities, and new capabilities which are typically minor, feature-flagged, or optional. 
- Build number is incremented with any changes to the product. Build number is
    incremented with each build when any change is made to the binaries.

Redis Enterprise Software typically gets two major releases every year but the product shipping cycles may vary.
Maintenance releases, typically available on the last minor release of the current major1.major2 release are typically made available on a monthly cadence, although cycles may vary.

## End-of-life schedule {#endoflife-schedule}

Beginning with Redis Enterprise Software release 6.4, end-of-life (EOL) for a given Major release occurs 18 months after the formal release of the subsequent Major. Maintenance will only be provided on the last minor release of the major1.major2 releases.
This update to the EOL policy ensures customers have a lead time of at least 18 months to upgrade to the new release after it is available.


| Version - Release date | End of Life (EOL)  |
| ----------------------------------------- | ------------------ |
| 7.4 – January 2024				        | - |
| 7.2 – August 2023				            | July 31, 2025 |
| 6.4 – February 2023						| February 28, 2025 |
| 6.2 – August 2021                         | August 31, 2024  |
| 6.0 – May 2020                            | May 31, 2022  |
| 5.6 – April 2020                          | October 31, 2021  |
| 5.4 – December 2018                       | December 31, 2020  |
| 5.2 – June 2018                           | December 31, 2019  |

 {{< note >}}
 * EOL of release 6.2 was reset to occur 18 months after the release of version 6.4, in accordance with the updated EOL policy.
 * EOL of release 6.4 will only be determined after the next major version is released and will be set to occur 18 months after that date.
{{< /note >}}
