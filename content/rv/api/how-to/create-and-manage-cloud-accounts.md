---
Title: Create and manage Cloud Accounts
description: 
weight: 50
alwaysopen: false
categories: ["RC Pro"]
---

This articles describes how to create and manage a cloud account using `cURL` or `swagger` commands. 

For an introduction to using `cURL` with API operations, see "[Using the cURL HTTP client]({{< relref  "/rv/api/how-to/using-curl#using-the-curl-http-client" >}})".


## Create a cloud account

The API operation that creates a cloud account is `POST /cloud-accounts`.

The following Linux shell script sends a `POST /cloud-accounts` and waits for a cloud account Id. When the cloud account Id is received, the **processing phase** is completed.

### Pre-requisites

* Define the expected variables needed to use the API:

```shell
{{% embed-code "rv/api/05-set-variables.sh" %}}
```

### Cloud account creation script

You can run the **create cloud account** script using a command line `bash path/script-name.sh`.

Below is the sample script that you can use as a reference to calling the API operation to create a cloud account. The script contains 3 primary steps that are explained below.

Note that the script relies on the pre-requisite variable to be set (see above).


```shell
{{% embed-code "rv/api/50-create-cloud-account.sh" %}}
```
