---
Title: Manage API Keys
description: 
weight: 30
alwaysopen: false
categories: ["RC Pro"]
---
## Delete a secret key

1. In https://app.redislabs.com
1. Make sure you are logged in as an account Owner
1. Navigate to 'Settings' menu
1. Click 'Cloud API Keys' tab (If the 'Cloud API Keys' is not displayed - make sure you [enabled your Account to use API]({{< relref  "/rv/api/how-to/enable-your-account-to-use-api.md" >}}))
1. Click the 'Delete' icon
1. A confirmation pop-up appears, click 'Delete' to confirm delete or 'Cancel' to keep the secret key

## Add a new allowed subnet

By default, API usage is allowed from all IP addresses (i.e. no source IP limitations)

To limit API usage to a specified range/s of source IP addresses, follow these steps:

1. Navigate to the 'Settings' menu, 'Cloud API Keys' tab
1. Click the 'Manage IPs' button associated with the key. A pop-up window appears
1. Click the plus button indicating 'Add new whitelist subnet'
1. In the text input area type in the subnet in CIDR format, **e.g.: 10.2.5.0/24** (for examples of CIDR format, see Wikipedia's [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation))
1. Click the right icon, indicating 'Save'

After adding the subnet you can add more subnets or click 'OK' button to finish.

## Delete an allowed subnet

1. Click the 'Manage IPs' button associated with the key. A pop-up window appears
1. Click the 'Delete' icon

No confirmation pop-up appears for deleting subnets.
After deleting the subnet you can delete more subnets or click 'OK' button to finish.
