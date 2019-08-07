---
Title: Using Redis Enterprise Software on Pivotal Cloud Foundry (PCF)
description: 
weight: 60
alwaysopen: false
categories: ["Platforms"]
aliases: /rs/getting-started/pcf/
---
This topic describes how to use Redis Enterprise Software (RS) for PCF.

## Using RS for PCF

### Installing a License Key in an Existing Cluster

1. Connect to the RS web UI using the "**Cluster Name**" you previously specified at the following URL:

    ```src
    https://rpadmin.cluster-name
    ```

1. Log in using the Administrator email account and password you specified in the tile configuration.

1. Navigate to the "**settings**" tab and then general.

1. Paste the license key you received from Redis Labs into the "**Cluster key**" form field and click the "**Save**" button.

For more information about RS in general, see [the product documentation site]({{< relref "/rs" >}}).
