---
Title: Nagios plugin for Redis Enterprise Software (RS)
description: 
weight: $weight
alwaysopen: false
---
## Overview

The RS Nagios plugin enables you to monitor the status of RS related
objects and alerts. The RS alerts can be related to the cluster, nodes,
or databases.

The alerts that can be monitored via Nagios are the same alerts that can
be configured in the RS UI in the Settings ­\> Alerts page, or the
specific Database ­\> Configuration page.

All alert configurations (active / not active, setting thresholds, etc')
can only be done through the RS UI, they cannot be configured in Nagios.
Through Nagios you can only view the status and information of the
alerts.

The full list of alerts can be found in the plugin package itself (in
"/rlec\_obj/rlec\_services.cfg" file, more details below).

RS Nagios plugin support API password retrieval from Gnome keyring,
KWallet, Windows credential vault, Mac OS X Keychain, if present, or
otherwise Linux Secret Service compatible password store. With no
keyring service available, the password is saved with base64 encoding,
under the user home directory.

## Configuring the Nagios plugin

In order to configure the Nagios plugin you need to copy the files that
come with the package into your Nagios environment and place them in a
Nagios configuration directory. Or, alternatively you can copy parts of
the package configuration into your existing Nagios configuration.

If Keyring capabilities are needed to store the password, python keyring
package should be installed and used by following the below steps from
the operating system CLI on Nagios machine:

1.  pip install keyring ­to install the package (See
    https://pip.pypa.io/en/stable/installing/ on how to install python
    pip if needed).
2.  keyring set RLEC­-Nagios ­\<RLEC user email\> to set the password.
    User email should be identical to the email used in Nagios
    configuration and the password should be set using the same user
    that run the Nagios server.

Note: RLEC is a previous name of Redis Enterprise Software

Then, you need to update the local parameters, such as hostnames,
addresses, and object IDs, to the values relevant for your
RS deployment.

Finally, you need to set the configuration for each node and database
you would like to monitor. More details below.

The RS Nagios package includes two components:

-   The plugin itself ­- with suffix "rlec\_nagios\_plugin"
-   Configuration files - with suffix "rlec\_nagios\_conf"

Below is the list of files included in these packages and instructions
regarding what updates need to be made to these flies.

Note : The instructions below assume you are running on Ubuntu, have a
clean Nagios installation, and the base Nagios directory is
"/usr/local/nagios/"

### Step 1

Copy the folder named "libexec" from the plugin folder and its contents
to "/usr/local/nagios/"

These files included in it are:

-   check\_rlec\_alert
-   check\_rlec\_node
-   check\_rlec\_bdb
-   email\_stub
-   rlecdigest.py

Note : The check\_rlec\_alert, check\_rlec\_node, check\_rlec\_bdb files
are the actual plugin implementation. You can run each of them with a
"­h" switch in order to retrieve their documentation and their expected
parameters.

### Step 2

Add the following lines to your "nagios.cfg":

-   cfg\_dir=/usr/local/nagios/etc/rlec\_obj
-   cfg\_dir=/usr/local/nagios/etc/rlec\_local
-   resource\_file=/usr/local/nagios/etc/rlec\_resource.cfg

### Step 3

Copy the configuration files along with their folders to
"/usr/local/nagios/etc" and make the required updates, as detailed
below.

1.  Under the "/etc" folder:
    A.  "rlec\_resource.cfg " ­ holds global variables definitions for
        the user and password to use to connect to RS. You should update
        the variables to the relevant user and password for your
        deployment.
    B.  "rlec\_local " folder
    C.  "rlec\_obj" folder
2.  Under the "/rlec\_local" folder:
    A.  "cluster.cfg " ­ holds configuration details at the cluster
        level. If you would like to monitor more than one cluster then
        you need to duplicate the two existing entries in the file for
        each cluster.
        I.  The first "define host" section defines a variable for the
            IP address of the cluster that is used in other
            configuration files.
            a.  Update the "address" to the Cluster Name (FQDN) as
                defined in DNS, or the IP address of one of the nodes in
                the cluster.
            b.  If you are configuring more than one RS then when
                duplicating this section you should make sure:
                i.  The "name" is unique.
        II. In the second "define host" section:
            a.  The "host\_name " in each entry must be unique.
            b.  The "display\_name" in each entry can be updated to a
                user-friendly name that will show in Nagios UI.
    B.  "contacts.cfg " ­ holds configuration details who to send emails
        to. It should be updated to values relevant for your deployment.
        If this file already exists in your existing Nagios environment
        then you should update it accordingly.
    C.  "databases.cfg" ­ holds configuration details of the databases
        to monitor. The "define host" section should be duplicated for
        every database to monitor.
        I.  "host\_name" should be a unique value.
        II. "display\_name " should be updated to a user-friendly name
            to show in the UI.
        III. "\_RLECID " should be the database's internal id that can
            be retrieved from
            [rladmin](/redis-enterprise-documentation/references/cli-reference/rladmin/)
            status command output.
    D.  "nodes.cfg " ­ holds configuration details of the nodes in the
        cluster. The "define host" section should be duplicated for
        every node in the cluster.
        I.  "host\_name" should be a unique value.
        II. "display\_name " should be updated to a user-friendly name
            to show in the UI.
        III. "address" should be updated to the DNS name mapped to the
            IP address of the node, or to the IP address itself.
        IV. "\_RLECID " should be the node's internal id that can be
            retrieved
            from [rladmin](/redis-enterprise-documentation/references/cli-reference/rladmin/)
            status command output.
    E.  Under the "/rlec\_obj" folder:
        I.  "rlec\_cmd.cfg" ­ holds configuration details of how to
            activate the plugin. No need to make any updates to it.
        II. "rlec\_groups.cfg" holds definitions of host groups. No need
            to make any updates to it.
        III. "rlec\_services.cfg" holds definitions of all alerts that
            are monitored. No need to make any updates to it.
        IV. "rlec\_templates.cfg" holds general RS Nagios definitions.
            No need to make any updates to it.
