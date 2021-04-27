---
Title: Create and Manage Cloud Accounts
description: Cloud accounts specify which account to use when creating and modifying infrastructure resources.
weight: 50
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/create-and-manage-cloud-accounts/
---
You can use `cURL` commands to create and manage a cloud account
with the [CURL HTTP client]({{< relref "/rc/api/how-to/using-curl#using-the-curl-http-client" >}}).

## Create a cloud account

The API operation that creates a cloud account is: `POST /cloud-accounts`

The following Linux shell script sends a `POST /cloud-accounts` and waits for a cloud account ID.
When the cloud account ID is received, the processing phase runs.

### Prerequisites

Before you use the API to create and manage cloud account, you must:

- Install `jq` on your machine: `sudo apt install jq`
- Define the expected variables needed to use the API:

```shell
{{% embed-code "rv/api/05-set-variables.sh" %}}
{{% embed-code "rv/api/60-cloud-account-set-variables.sh" %}}
```

### Cloud account JSON body

The created cloud account is defined by a JSON document that is sent as the body of the `POST cloud-accounts` request.

In the example below, that JSON document is stored in the `create-cloud-account-basic.json` file:

```shell
{{% embed-code "rv/api/create-cloud-account-basic.json" %}}
```

### Cloud account creation script

You can run the **create cloud account** script from the command line with: `bash path/script-name.sh`.

Below is the sample script that you can use as a reference to call the API operation to create a cloud account.
The script contains the steps that are explained below.

```shell
{{% embed-code "rv/api/50-create-cloud-account.sh" %}}
```

#### Step 1 of the cloud account creation script

This step executes a `POST` request to `cloud-accounts` with the defined parameters and a JSON body located within a separate JSON file.

The POST response is a JSON document that contains the `taskId`,
which is stored in a variable called `TASK_ID` that is used later to track the progress of the request.

#### Step 2 of the cloud account creation script

This step queries the API for the status of the cloud account creation request based on the `taskId` stored in the `$TASK_IS` variable.

#### Step 3 of the cloud account creation script

When the status changes from `processing-in-progress` to `processing-completed` (or `processing-error`),
this step prints the `response`, including the `resourceId`.
In this case the `resourceId` is a cloud account ID.

If the processing phase completed successfully, the cloud account is visible
in the [Redis Labs management site](https://app.redislabs.com) in the `pending` status.
This status indicates that the cloud account is being provisioned.

You can use the `GET /cloud-accounts/{cloudAccountId}` API operation to track the created cloud account
until it changes to the `active` state.
