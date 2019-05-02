---
Title: Create API Keys for your team
description: 
weight: 20
alwaysopen: false
categories: ["RC Pro"]
---
API access requires each HTTP request to include 2 parameters:

1. Access key (available via the 'Settings -> Account' menu)
1. Secret key (provided by  the account owner directly to the user)

Creating API keys can only be done by account owners.

In the SM, navigate to 'Settings' menu, then to 'Cloud API Keys'.
For creating a new key, click the button labeled 'Add new API secret key'.

Fill in the secret key properties:

1. User Name: The user associated with the key. API requests using this key will be authorized and audited as this user.
1. API Key Name: Descriptive name for the key. Two keys associated with the same user must have different names. 

## Keeping the secret value of the key
Click the button labeled 'Generate API Key'. A pop-up windows will appear specifying the secret key was successfully created. The secret value of the key is displayed for the first and only time.
The secret value should be used as a parameter for all API requests.
Convey this value to the recipient user in a secured manner.
