---
Title: Create and manage Cloud Accounts
description: Cloud accounts specifies which account to use when creating and modifying infrastructure resources
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

- Define the expected variables needed to use the API:

```shell
{{% embed-code "rv/api/05-set-variables.sh" %}}
{{% embed-code "rv/api/60-cloud-account-set-variables.sh" %}}
```

### Cloud account creation script

First you need jq to be installed on your machine. sudo apt install jq
You can run the **create cloud account** script using a command line `bash path/script-name.sh`.

Below is the sample script that you can use as a reference to calling the API operation to create a cloud account. The script contains 3 primary steps that are explained below.

Note that the script relies on the pre-requisite variable to be set (see above).


```shell
{{% embed-code "rv/api/50-create-cloud-account.sh" %}}
```

#### **Notes:**

##### Step 1

Executes a `POST` request to `cloud-accounts` with the defined parameters and a JSON body located within a separate JSON file.

The POST response is a JSON document that contains the `taskId`, which is stored in a variable called `TASK_ID` that is used later to track the progress of the request's processing.

##### Step 2

Query the API for the status of the cloud account creation request, identified by the `taskId` (whose value is stored in the `$TASK_IS` variable).

##### Step 3

As soon as the status changes from `processing-in-progress` to `processing-completed` (or `processing-error`), print the `response` , including the `resourceId` (which in this case is a Cloud account Id).

At this point, if the processing phase completed successfully, the cloud account is visible in the [Redis Labs management site](https://app.redislabs.com) in the `pending` status, indicating that it is being provisioned.

You can continue tracking the created cloud account throughout its provisioning phase until it reaches the "`active`" state using the "`GET /cloud-accounts/{cloudAccountId}`" API operation.

### Cloud account JSON body

The created cloud account is defined by a JSON document that is sent as the body of the `POST cloud-accounts` request.

In the example above, that JSON document is stored in the `create-cloud-account-basic.json` file:


```shell
{{% embed-code "rv/api/create-cloud-account-basic.json" %}}
```
