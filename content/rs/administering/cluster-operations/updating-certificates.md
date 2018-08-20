---
title: Updating SSL/TLS certificates
description: 
weight: $weight
alwaysopen: false
---
Redis Enterprise Software (RS) uses self-signed certificates to encrypt
the following:

-   Management UI
-   REST API
-   The connection between the client and the database endpoint (TLS
    encryption)

These self-signed certificates are generated each time RS is installed,
thereby keeping them unique for each node.

The steps below allow you to replace the default certificates with your
own certificates, in which case it is advisable to use the same
certificate on all nodes.

**Note**: When using the default self-signed certificates, an untrusted
connection notification will appear in the management UI. If you do not
update the self-signed certificate with your own certificate, depending
on the browser you use, you might be able to allow the connection for
this specific session, or add an exception to make this site trusted in
future sessions.

 

**Note**: If you choose to update the certificates you must follow these
steps on all machines that are part of the cluster, and on all machines
that you add to the cluster in the future.

Instructions:

1.  1.  On the cluster machine, after RS has been installed, navigate to
        the **/etc/opt/redislabs** folder.
    2.  Replace the following certificate files with your own files and
        rename them to the same exact names as the original files:

        -   -   For the management UI certificate and private key:
                -   cm\_cert.pem
                -   cm\_key.pem
            -   For the REST API certificate and private key:
                -   api\_cert.pem
                -   api\_key.pem

        For the database endpoint encryption certificate and private
        key:

        -   -   proxy\_cert.pem
            -   proxy\_key.pem

        **Note**: A certificate for the databases' endpoint should be
        assigned for the same domain as the cluster name. For example,
        for a cluster with the name "redislabs.com" the certificate
        should be for "redis-\*.redislabs.com"

    3.  If you are using a certificate issued by an intermediate
        certificate authority (CA), you should also add the chain file
        named **"chain\_certs.pem"** to the same folder.
    4.  After replacing the files, restart the relevant service by
        running the following command from the operating system
        command-line interface (CLI):

        -   For the management UI:

                supervisorctl restart nginx

        -   For the REST API:

                supervisorctl restart nginx

        -   For the database endpoint encryption:

                supervisorctl restart dmcproxy

        **Note**: Restarting the dmcproxy service will disconnect any
        existing clients connected to any of the databases.

    5.  Repeat these steps on all other machines in the cluster.

### **TLS version**

[To set the minimum TLS version that can be used for encrypting various
flows, use the REST API or the following rladmin
commands:]{style="font-weight: 400;"}

-   -   [For the management UI and REST API:]{style="font-weight: 400;"}

            rladmin> cluster config min_control_TLS_version [version, e.g. 1.2]

<!-- -->

-   -   [For data path encryption:]{style="font-weight: 400;"}

            rladmin> cluster config min_data_TLS_version [version, e.g. 1.2]

[Note that communications using older TLS versions will not be
allowed.]{style="font-weight: 400;"}
