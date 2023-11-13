---
Title: Get started with Terraform
LinkTitle: Get started
description: Shows how to install the Redis Cloud provider and create a subscription.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-3]"
categories: []
aliases: 
---

Here, you'll learn how to use the [Redis Cloud Terraform Provider]({{<relref "/rc/cloud-integrations/terraform">}}) to create a subscription and a database.

## Prerequisites

1. [Install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli).

1. [Create a Redis Cloud account]({{< relref  "/rc/rc-quickstart#create-an-account" >}}) if you do not have one already.

1. [Enable the Redis Cloud API]({{< relref  "/rc/api/get-started/enable-the-api" >}}).

1. Get your Redis Cloud [API keys]({{< relref  "/rc/api/get-started/manage-api-keys" >}}). Set them to the following environment variables:

    - Set `REDISCLOUD_ACCESS_KEY` to your API account key.
    - Set `REDISCLOUD_SECRET_KEY` to your API user key.

1. Set a [payment method]({{<relref "/rc/billing-and-payments#add-payment-method">}}).

## Install the Redis Cloud provider

1. Create a file to contain the Terraform configuration called `main.tf`.

1. Go to the [Redis Cloud Terraform Registry](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/).

1. Select **Use Provider** and copy the Terraform code located there. Paste the code into `main.tf` and save the file.

   ```text
   provider "rediscloud" {
   }

   # Example resource configuration
   resource "rediscloud_subscription" "example" {
      # ...
   }
   ```
   
1. Run `terraform init`.

## Create a Redis Cloud subscription with Terraform

In your Terraform configuration file, you can add resources and data sources to plan and create subscriptions and databases. See the [Redis Cloud Terraform Registry documentation](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs) for more info about the resources and data sources you can use as part of the Redis Cloud provider.

The steps in this section show you how to plan and create a flexible subscription with one database.

1. Use the [`rediscloud_payment_method`](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/data-sources/rediscloud_payment_method) data source to get the payment method ID.

    ```text
    # Get credit card details
    data "rediscloud_payment_method" "card" {
        card_type = "<Card type>"
        last_four_numbers = "<Last four numbers on the card>"
    }
    ```

1. Define a [`rediscloud_subscription`](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/resources/rediscloud_subscription) resource to create the subscription.

    ```text
    # Create a subscription
    resource "rediscloud_subscription" "subscription-resource" {
            name = "subscription-name"
            payment_method_id = data.rediscloud_payment_method.card.id
            memory_storage = "ram"

            # Specify the cloud provider information here
            cloud_provider {
                    provider = "<Cloud provider>"
                    region {
                            region = "<region>"
                            networking_deployment_cidr = "<CIDR>"
                    }
            }

            #Define the average database specification for databases in the subscription
            creation_plan {
                    memory_limit_in_gb = 2
                    quantity = 1
                    replication = true
                    throughput_measurement_by = "operations-per-second"
                    throughput_measurement_value = 20000
            }
    }
    ```

1. Define a [`rediscloud_subscription_database`](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs/resources/rediscloud_subscription_database) resource to create a database.

    ```text
    # Create a Database
    resource "rediscloud_subscription_database" "database-resource" {
        subscription_id = rediscloud_subscription.subscription-resource.id
        name = "database-name"
        memory_limit_in_gb = 2
        data_persistence = "aof-every-write"
        throughput_measurement_by = "operations-per-second"
        throughput_measurement_value = 20000
        replication = true

        alert {
        name = "dataset-size"
        value = 40
        }
        depends_on = [rediscloud_subscription.subscription-resource]

    }
    ```

2. Run `terraform plan` to check for any syntax errors.

    ```sh
    $ terraform plan
    data.rediscloud_payment_method.card: Reading...
    data.rediscloud_payment_method.card: Read complete after 1s [id=8859]

    Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following
    symbols:
    + create

    Terraform will perform the following actions:

        # rediscloud_subscription.subscription-resource will be created
        + resource "rediscloud_subscription" "subscription-resource" {
            [...]
        }

        # rediscloud_subscription_database.database-resource will be created
        + resource "rediscloud_subscription_database" "database-resource" {
            [...]
        }
    
    Plan: 2 to add, 0 to change, 0 to destroy.
    ```

3. Run `terraform apply` to apply the changes and enter `yes` to confirm when prompted.

    This will take some time. You will see messages like this while the subscription and database are being created.

   ```text
   rediscloud_subscription.subscription-resource: Creating...
   rediscloud_subscription.subscription-resource: Still creating... [10s elapsed]
   rediscloud_subscription.subscription-resource: Still creating... [20s elapsed]
   rediscloud_subscription.subscription-resource: Still creating... [30s elapsed]
   ```

   When complete you should see something like this:   

   ```text
   Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
   ```

If you want to verify your subscription and database creation you can view that through the Redis Cloud [admin console](https://app.redislabs.com/).

4. If you want to remove these sample resources, run `terraform destroy`.

## More info

- [Redis Cloud Terraform Registry](https://registry.terraform.io/providers/RedisLabs/rediscloud/latest/docs)
- [Terraform documentation](https://developer.hashicorp.com/terraform/docs)
- [Terraform configuration syntax](https://developer.hashicorp.com/terraform/language/syntax/configuration)