---
Title: Get started with Pulumi
LinkTitle: Get started
description: Shows how to install the Redis Cloud Pulumi provider and create a subscription.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-3]"
categories: []
aliases: 
---

Here, you'll learn how to use the [Redis Cloud Pulumi provider]({{<relref "/rc/cloud-integrations/pulumi">}}) to create a Flexible subscription and a database using Python.

## Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/install/) and [create a Pulumi account](https://app.pulumi.com/signin) if you do not have one already.

1. [Create a Redis Cloud account]({{< relref  "/rc/rc-quickstart#create-an-account" >}}) if you do not have one already.

1. [Enable the Redis Cloud API]({{< relref  "/rc/api/get-started/enable-the-api" >}}).

1. Get your Redis Cloud [API keys]({{< relref  "/rc/api/get-started/manage-api-keys" >}}).

## Install the Pulumi provider files

1.  In your Python project, create an empty folder. From this folder, run `pulumi new rediscloud-python`.

1. Log into Pulumi using your [Pulumi access token](https://app.pulumi.com/account/tokens) if prompted.

1.  Enter a project name, description, and stack name.

1.  Enter your Redis Cloud access and secret keys.

1.  Enter the credit card type (Visa, Mastercard) on file with your Redis Cloud account.

1.  Enter the last four numbers of the card on file with your Redis Cloud account.

Once these steps are completed, the dependencies needed for the project will be installed and a Python virtual environment will be created.

## Deploy resources with Pulumi

The Pulumi Python project includes three main files:

- `pulumi.yaml` : A metadata file which is used to help configure the Python runtime environment.

- `pulumi.YOUR_PROJECT_NAME.yaml`: Contains the information related to the Cloud API access and secret key, credit card type and last 4 digits.

- `__main__.py`: A Pulumi template file that creates a Redis Cloud flexible subscription. Use this template file as a starting point to create the subscription with a cloud provider and define specifications for the database (this includes memory, throughput, Redis modules, and other information).

To deploy the resources described in `__main__.py`, run `pulumi up`. This will take some time. You will be able to see your subscription being created through the [admin console](https://app.redislabs.com/).

If you want to remove these resources, run `pulumi down`.

## More info

- [Redis Cloud Pulumi registry](https://www.pulumi.com/registry/packages/rediscloud/)
- [Pulimi documentation](https://www.pulumi.com/docs/)
