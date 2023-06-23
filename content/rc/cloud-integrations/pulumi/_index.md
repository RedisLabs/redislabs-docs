---
Title: The Pulumi Redis Cloud Resource Provider
LinkTitle: Pulumi
description: Explains how to use Pulumi to provision Redis Cloud resources
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rc/cloud-integrations/pulumi/
         /rc/cloud-integrations/pulumi.md
---

## Introduction to Pulumi

Pulumi has gained significant popularity within the developer community due to its innovative approach to infrastructure as code (IaC) and its ability to simplify and streamline the process of cloud resource provisioning and management. Unlike traditional IaC tools, Pulumi allows developers to write infrastructure code using familiar programming languages, such as Python, JavaScript, TypeScript, and Go, rather than using domain-specific languages.

This developer-friendly approach makes it easier for software engineers to leverage their existing programming skills and apply them to infrastructure provisioning, making the learning curve smoother. Pulumi's support for multiple programming languages also provides flexibility and caters to a wider range of developers, enabling teams to collaborate effectively and work with their preferred language.

## The Pulumi Redis Cloud Resource Provider

With the recent availability of the [Redis Cloud Resource Provider](https://www.pulumi.com/registry/packages/rediscloud/), developers can now take advantage of this popular technology to create Redis Cloud resources in their favorite programming language. As of this writing, the Pulumi Redis Cloud Provider supports the following programming languages :

* TypeScript
* Python
* Go
* YAML

The Pulumi Redis Cloud Provider is based upon the TerraForm Redis Cloud Provider, thus for those who have experience using the TerraForm provider should quickly grasp the concepts behind the Pulumi provider.

{{<note>}}
The provider supports the creation of "Flexible/Annual" subscriptions, but cannot be used to create "Fixed" subscriptions
{{</note>}}

Let's examine an example of creating a "Flexible" Redis Cloud subscription using Python.

1.  Make sure you have your Pulumi environment installed. Information on setting up your environment can be found [here](https://www.pulumi.com/docs/install/).

1.  In your Python project, create an empty folder and from this folder run `pulumi new rediscloud-python`.

1.  Next, enter a project name, description, and stack name.

1.  The next step will ask for your Redis Cloud access and secret keys. Since Pulumi uses the Redis Cloud API in the background, an **access Key** and **secret key** are required. For more information on creating these keys, please refer to [Cloud API Keys]({{< relref "/rc/api/how-to/manage-api-keys.md" >}})

1.  Next, enter the credit card type (Visa, Mastercard) of the card on file with your Redis Cloud account.

1.  Finally, enter the last four numbers of the card on file with your Redis Cloud account.

Once these steps are completed, the dependencies needed for the project will be installed and a Python virtual environment will be created.

The Pulumi project includes three main files :

1.  The **Pulumi.yaml** file : A metadata file which is used to help configure the Python runtime environment.

1.  The **Pulumi.YOUR_PROJECT_NAME.yaml** file : Contains the information related to the Cloud API acess and secret key, credit card type and last 4 digits.

1.  The **__main__.py** file : A Pulumi template file which creates a **Redis Cloud Flexible subscription**. Use this template file as a starting point to create the subscription in a specified cloud provider and the specifications of the database (this includes memory, throughput, Redis modules etc).