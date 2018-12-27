---
Title: Offline Installation
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/offline-installation/
---
By default, the installation process requires an Internet connection to
enable installing dependency packages and for synchronizing the
operating system clock against an NTP server (for additional details,
refer to [Synchronizing node
clocks]({{< relref "/rs/administering/designing-production/synchronizing-clocks.md" >}}).

If you install Redis Enterprise Software (RS) on a machine with no
Internet connection, you need to perform these two tasks manually, as
follows:

First, you need to install the required dependency packages. When RS is
installed on a machine that is not connected to the Internet, the
installation process fails and displays an error message informing you
it failed to automatically install dependencies. Review the installation
steps in the console to see which missing dependencies the process
attempted to install. Install all these dependency packages and then run
the installation again.

At the end of the installation, the process asks you whether you would
like to setup NTP time synchronization. If you choose "Yes" while you
are not connected to the Internet, the action fails and displays the
appropriate error message, but the installation completes successfully.
Despite the successful completion of the installation, you still have to
configure all nodes for NTP time synchronization as described
in [Synchronizing node
clocks]({{< relref "/rs/administering/designing-production/synchronizing-clocks.md" >}}).
