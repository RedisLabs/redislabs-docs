---
Title: Redis Enterprise Software Product Lifecycle
description:
weight: 100
alwaysopen: false
categories: ["RS"]
---
You can view the Redis Enterprise Software (RS) subscription agreement [here](https://redislabs.com/wp-content/uploads/2019/11/redis-enterprise-software-subscription-agreement.pdf).
This Product Lifecycle fully reflects our subscription agreement.
However, for any discrepancy between the two policies, the subscription agreement prevails.

Redis Enterprise modules follow the [modules lifecycle]({{< relref "/modules/modules-lifecycle.md" >}}).

## Release numbering

Redis Labs uses a four-place numbering scheme to designate released versions of its products.
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

Redis Enterprise Software typically gets 2 major releases every year but the product shipping cycles may vary.

## End-of-life schedule {#endoflife-schedule}

End-of-Life for a given Major release occurs 18 months after the formal release of
that version.

| RS Release Date | End of Life (EOL)  |
| ----------------------------------------- | ------------------ |
| 6.0 – May 2020                            | November 30, 2021  |
| 5.6 – April 2020                          | October 31, 2021  |
| 5.4 – December 2018                       | December 31, 2020  |
| 5.2 – June 2018                           | December 31, 2019  |
| 5.0 – November 2017                       | May 31, 2019       |
| 4.5 – May 2017                            | November 30, 2018  |
