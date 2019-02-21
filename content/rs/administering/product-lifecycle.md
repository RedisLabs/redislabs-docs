---
Title: Redis Enterprise Software Product Lifecycle
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
You can view the Redis Enterprise Software subscription agreement
[here](https://redislabs.com/company/terms-of-use#software). This Product Lifecycle should fully reflect our subscription agreement. However, for any discrepancy between the two policies, the subscription agreement prevails.

## Release numbering

Redis Labs uses a four-place numbering scheme to designate released versions of its products. The format is “Major1.Major2.Minor-Build”

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

## End-of-Life Policy

Our Support Services cover each Major release for 18 months after its general release. After this time period, the Supported Software has reached its End of Life (“EOL”).

Note that patches and upgrades (Tier 4 support) are provided only on the latest minor
release of the supported major release.

For example, if major release 6.1 is made available on January 1, 2000, and minor
release 6.1.4 was the last minor release on that major version, then 6.1  is supported
until July 1, 2001 and  software patches are provided on 6.1.4. In other cases, if
6.1.4 already solves the reported issue, the customer will be requested to upgrade to
6.1.4

After the EOL, Redis Labs will not support, in any way, a Major Release and/or any
Minor Releases of that Major Release. 

Support for other versions of the Supported Software is not provided under this Support
Policy. Support only covers use of the Supported Software on the platform or operating
system versions that are specified by Redis Labs. Support does not cover use of the
Supported Software on platforms or operating systems that are no longer supported by
Redis Labs.

## End-of-Life Announcement

On release of each new version, Redis Labs will send a formal notification to its
customers that indicates the End of Life schedule, as detailed below. In addition, a
formal notification will be sent to each customer that uses or downloaded a version
that has reached its End of Life. This will be done in order to ensure timely upgrades
and to prevent situations where a customer uses a version excess of its support term.

## End-of-Life Schedule

End-of-Life for a given Major release occurs 18 months after the formal release of
that version.

| Release Date – Full Support Starts for RP | End of Life (EOL)  |
| ----------------------------------------- | ------------------ |
| 5.4 – December 2018                       | June 30, 2020      |
| 5.2 – June 2018                           | December 31, 2019  |
| 5.0.2 – March 2018                        | September 30, 2019 |
| 5.0 – November 2017                       | May 31, 2019       |
| 4.5 – May 2017                            | November 30, 2018  |
