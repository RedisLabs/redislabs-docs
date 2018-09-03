---
title: Securing Connections with SSL/TLS
description: 
weight: 25
alwaysopen: false
---
## Getting SSL/TLS Support Added to Your Subscription

To configure your subscription so you can use SSL/TLS with your Redis
Enterprise Cloud (RC) database, please contact support. To speed up this
process, provide the agent with the Account ID and subscription number
where you desire SSL service.

**Note:** Be aware that you will incur additional monthly costs by
enabling SSL.

To find your account number, go to the "Settings" page in the Web UI and
look for "Account Number":

![](/images/rc/account_number.png?width=600&height=265)

For your subscription number, please go to the "Subscriptions" page of
the Web UI and look in the title.

![](/images/rc/subscriptions2.png?width=600&height=248)

## Setting Up Your Database

Using SSL/TLS requires setup of both your Redis Enterprise Cloud
database and your application, as described below.

1.  Login to your account and navigate to the "**Database**" page in the
    top right menu.
2.  Select the database you wish to connect to and click the "**Edit**"
    button.
3.  Under the "**Access Control & Security" **section, make sure **SSL
    Client Authentication** is selected.
4.  Set the resource's client certificate using one of the following
    ways.
    1.  Bring Your Own Key:
        1.  If you have your own X.509-compliant certificate, simply
            paste it to the textbox with the "*Enter Client
            Certificate"* comment.
        2.  Click the **Download Redis Labs' Certification Authority**
            link to obtain the service certification authority.
    2.  Generate a Certificate:
        1.  Use the **Generate Client Certificate** button to generate a
            client certificate.
        2.  The generated certificate's public key will be displayed in
            the textbox.
        3.  This will also trigger an automatic download of a zip
            archive with the following contents:
            1.  `garantia_user.crt` - the certificate's public key.
            2.  `garantia_user_private.key` - the certificate's private
                key.
            3.  `garantia_ca.pem` - the service's certification
                authority.
5.  Click the **Update** button to apply the changes to your resource.

**Important**: Once SSL is
enabled, your database will no longer accept regular, non-SSL
connections.

## Setting up your application if you are not using an SSL/TLS enabled client library

This procedure describes the steps required to install and configure
[stunnel](https://stunnel.org), an open-source secure proxy, to connect
to an SSL-enabled Redis^e^ Cloud database.

Important: This procedure is only required is you are **NOT** using an
SSL/TLS enabled Redis client.

Connect to your client, set up and start stunnel as described in the
section below that's relevant to your client's OS. Once done, configure
your client to connect to stunnel (i.e. 127.0.0.1:6379 in the examples
below) instead of your resource's endpoint.

### ``

## OS-Specific Instructions for Setting Up stunnel

### Ubuntu 12.04

1.  Install stunnel:

    ``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
    $ apt-get install stunnel
    ```

2.  Copy all certificate files to /etc/stunnel.
    1.  `garantia_user.crt` - the certificate's public key.
    2.  `garantia_user_private.key` - the certificate's private key.
    3.  `garantia_ca.pem` - the service's certification authority.
3.  Change the permissions of the private key:

    ``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
    $ chown root:root /etc/stunnel/garantia_user_private.key

    $ chmod 0600 /etc/stunnel/garantia_user_private.key
    ```

4.  Create a configuration file named /etc/stunnel/redislabs.conf as
    shown in the sample below - make sure that you replace host
    and port in the last line with your resource's respective
    attributes.
5.  Enable the stunnel service by editing /etc/default/stunnel4 and
    changing the line that says ENABLED=0 to ENABLED=1.
6.  Start the stunnel service:

    ``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
    $ service stunnel4 start
    ```

### CentOS 6.5

1.  Install stunnel:

    ``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
    $ yum install stunnel
    ```

2.  Copy all certificate files to `/etc/stunnel`.
    1.  `garantia_user.crt` - the certificate's public key.
    2.  `garantia_user_private.key` - the certificate's private key.
    3.  `garantia_ca.pem` - the service's certification authority.
3.  Change the permissions of the private key:

    ``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
    $ chown root:root /etc/stunnel/garantia_user_private.key

    $ chmod 0600 /etc/stunnel/garantia_user_private.key
    ```

4.  Create a configuration file named /etc/stunnel/stunnel.conf as shown
    in the sample below - make sure that you replace host and port in
    the last line with your resource's respective attributes.
5.  Configure stunnel to run as a daemon by creating the following
    /etc/init.d/stunnel file:

    ``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
    #!/bin/bash

    #

    # stunnel Starts/stop the "at" daemon

    #

    # chkconfig:   345 95 5

    # description: Provides SSL client/server tunneling

    ### BEGIN INIT INFO

    # Provides: stunnel

    # Required-Start: $local_fs

    # Required-Stop: $local_fs

    # Default-Start: 345

    # Default-Stop: 95

    # Short-Description: Starts/stop the "stunnel" daemon

    # Description:       Provides SSL client/server tunneling

    ### END INIT INFO

    . /etc/init.d/functions

    test -x /usr/bin/stunnel || exit 0

    RETVAL=0

    prog="stunnel"

    start() {

      if [ ! -f /var/lock/subsys/stunnel ]; then

        echo -n $"Starting $prog: "

        daemon /usr/bin/stunnel

        RETVAL=$?

        [ $RETVAL -eq 0 ] && touch /var/lock/subsys/stunnel

        echo

      fi

      return $RETVAL

    }

    

    stop() {

      echo -n $"Stopping $prog: "

      killproc /usr/bin/stunnel

      RETVAL=$?

      [ $RETVAL -eq 0 ] && rm -f /var/lock/subsys/stunnel

      echo

      return $RETVAL

    }

    restart() {

      stop

      start

    }

    

    case "$1" in

      start)

        start

       ;;

      stop)

        stop

      ;;

      reload|restart)

        restart

      ;;

      condrestart)

       if [ -f /var/lock/subsys/stunnel ]; then

         restart

       fi

      ;;

      status)

        status /usr/sbin/stunnel

      ;;

      *)

        echo $"Usage: $0 {start|stop|restart|condrestart|status}"

        exit 1

    esac

    exit $RETVAL
    ```

    Then run the following commands to set file permissions and starting
    the service correctly:

    ``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
    $ chown root:root /etc/init.d/stunnel

    $ chmod 0755 /etc/init.d/stunnel

    $ chkconfig --add /etc/init.d/stunnel

    $ stunnel /etc/stunnel/redislabs.conf

    $ service stunnel start
    ```

### Sample stunnel Configuration File

Use the following stunnel configuration file to have your client open
secure connections to your Redis Labs resources via port 6379 of your
localhost:

`cert = /etc/stunnel/garantia_user.crt key = /etc/stunnel/garantia_user_private.key cafile = /etc/stunnel/garantia_ca.pem verify = 2 delay = yes`

`[redislabs] client = yes accept = 127.0.0.1:6379 connect = host:port`

### Testing Secure Connectivity to a Redis Enterprise Cloud Resource

You can test the connection from your client using redis-cli, for
example::

``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
$ redis-cli -h <hostname> -p <portnumber> PING
```
