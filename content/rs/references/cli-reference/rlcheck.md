---
Title: rlcheck - Node Verification Utility
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
rlcheck is a utility that runs various health checks on an Redis
Enterprise Software (RS) node, and alerts on any issues found. This
utility can be useful to confirm a successful installation or to verify
that the node is functioning properly.

rlcheck can be accessed from the operating system's command-line
interface (CLI) and should be run separately on each RS node.

To run rlcheck, in the operating system command-line interface (CLI),
enter the following commands:

1. sudo su --
1. rlcheck

The utility runs and reports the result of each check.

**Note**: rlcheck has several optional flags that can be listed by
entering rlcheck --help. Most noteworthy is the --continue-on-error flag
that enables running all tests to completion, regardless of whether an
issue was encountered in one of the tests.

If any issues are reported at the end of rlcheck's execution, contact
our support at <support@redislabs.com>.
