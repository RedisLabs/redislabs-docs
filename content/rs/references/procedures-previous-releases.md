---
Title: Procedures for Previous Releases
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Here you can find procedures that were used in previous releases.

## Updating SSL/TLS certificates for Previous Releases

### For version 5.0.2

{{% warning title="WARNING" %}}If the SSL certificate/s were configured in RS 5.0.2 without using the REST API, but by updating the certificate/s on the disk, contact [Redis Labs support](https://support.redislabs.com) before you upgrade the cluster to a later version as certificates are overwritten during upgrade.{{% /warning %}}

To update a certificate in the cluster, [upgrade the cluster]({{< relref "/rs/installing-upgrading/upgrading.md" >}}) to RS 5.2.0 or above and then update the certificates with the REST API.

### For versions below 5.0.2

**Note**: If you choose to update the certificates you must follow these
steps on all machines that are part of the cluster, and on all machines
that you add to the cluster in the future.

To update a certificate in the cluster, on each cluster node:

1. On the cluster machine, after RS has been installed, navigate to
the **/etc/opt/redislabs** folder.
1. Replace the following certificate files with your own files and
rename them to the same exact names as the original files:
    - For the management UI certificate and private key:
        - cm_cert.pem
        - cm_key.pem
    - For the REST API certificate and private key:
        - api_cert.pem
        - api_key.pem
    - For the database endpoint encryption certificate and private key:
        - proxy_cert.pem
        - proxy_key.pem

    **Note**: A certificate for the databases' endpoint should be
    assigned for the same domain as the cluster name. For example,
    for a cluster with the name "redislabs.com" the certificate
    should be for "redis-\*.redislabs.com"

1. If you are using a certificate issued by an intermediate
certificate authority (CA), you should also add the chain file
named **chain_certs.pem** to the same folder.
1. After replacing the files, restart the relevant service by
running the following command from the operating system
command-line interface (CLI):

    - For the management UI:
        supervisorctl restart nginx
    - For the REST API:
        supervisorctl restart nginx
    - For the database endpoint encryption:
        supervisorctl restart dmcproxy

    **Note**: Restarting the dmcproxy service will disconnect any
    existing clients connected to any of the databases.

1. Repeat these steps on all other machines in the cluster.
