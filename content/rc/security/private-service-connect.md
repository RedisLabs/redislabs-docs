---
Title: Enable Private Service Connect
linkTitle: Private Service Connect
description: Private Service Connect creates a private endpoint that allows secure connections to Redis Cloud databases without exposing your application VPC.
weight: 50
alwaysopen: false
toc: "true"
categories: ["RC"]
aliases:
---

Intro TBA

## Set up Private Service Connect

1. Configure Private Service Connect in the Redis Cloud admin console.

1. Create Private Service Connect endpoints in the application VPC.

1. From the Redis Cloud admin console, review and accept the Private Service Connect request.

### Configure PSC

1. Select **Subscriptions** from the Redis Cloud [admin console](https://app.redislabs.com/) menu and then select your subscription from the list.

1. Select the **Connectivity** tab and thens **Private Service Connect**.

1. Select the **Create connection** button:

    TODO: add button

1. Read the **Latency and impact cost** message and select **Accept and continue**:

    TODO: add button

1. For **Create connection**. enter the following **Endpoint details**:

    | Setting&nbsp;name | Description |
    |-------------------|-------------|
    | _Project ID_ | |
    | _VPC name_ | |
    | _Subnet name_ | |
    | _Endpoint name_ | |

1. Select **Continue**:

    TODO: add button

1. In **Add connections**, select either **Bash Shell** or **PowerShell** and download or copy the provided gcloud script for later.

1. Select **Continue**:

    TODO: add button

### Create PSC endpoints

1. TBA: copy and run generated gcloud script

To approve the Private Service Connect request between Redis Cloud and GCP, use the [gcloud CLI](https://cloud.google.com/sdk/gcloud) to run the Google cloud command that you copied earlier.

### Accept PSC connection

1. TBA: accept the PSC connection from the Redis Cloud admin console

1. Select **Accept**:

    TODO: add button

### Connect to database

TBA: get PSC connection info from the connection wizard for help connecting the application to the Redis Cloud database

## Deactivate Private Service Connect

1. Delete endpoints.

1. Remove service.