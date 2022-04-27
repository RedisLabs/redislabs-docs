---
Title: Redis Enterprise Software product lifecycle
linkTitle: Product lifecycle
description:
weight: 100
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software product lifecycle fully reflects our [subscription agreement](https://redis.com/software-subscription-agreement).
However, for any discrepancy between the two policies, the subscription agreement prevails.

Redis Enterprise modules follow the [modules lifecycle]({{< relref "/modules/modules-lifecycle.md" >}}).

## Release numbers

Redis uses a four-place numbering scheme to designate released versions of its products.
The format is “Major1.Major2.Minor-Build”.

- Major sections of the version number represents fundamental changes and additions in
    capabilities to Redis  Enterprise Software. The Major1 and Major2 part of the
    version number are incremented based on the size and scale of the changes in each
    release.
- The Minor section of the version number represents quality improvements and fixes to
    existing capabilities. We increment the minor number when many quality improvements
    are added to the release.
- Build number is incremented with any changes to the product. Build number is
    incremented with each build when any change is made to the binaries.

Redis Enterprise Software typically gets two major releases every year but the product shipping cycles may vary.

## End-of-life schedule {#endoflife-schedule}

End-of-Life for a given Major release occurs 18 months after the formal release of
that version.

| Version - Release Date | End of Life (EOL)  |
| ----------------------------------------- | ------------------ |
| 6.2 – August 2021                         | February 28, 2023  |
| 6.0 – May 2020                            | May 31, 2022*  |
| 5.6 – April 2020                          | October 31, 2021  |
| 5.4 – December 2018                       | December 31, 2020  |
| 5.2 – June 2018                           | December 31, 2019  |

 {{< note >}}
 * On June 15th, 2021, release 6.0 EOL was extended by 6 months; from November 30, 2021 to May 31, 2022.
{{< /note >}}
