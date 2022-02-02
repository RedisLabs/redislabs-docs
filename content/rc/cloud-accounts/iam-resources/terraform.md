---
Title: Create IAM resources using Terraform
linkTitle: Terraform
Weight: $weight
categories: ["RC"]
alwaysopen: false
aliases: /rc/how-to/creating-iam-resources/terraform/
         /rc/how-to/creating-iam-resources/terraform.md
         /rc/cloud-accounts/iam-resources/terraform/
         /rc/cloud-accounts/iam-resources/terraform.md

---
You can use [HashiCorp Terraform](https://www.terraform.io/intro/index.html) to create identity and access management (IAM) resources to support AWS cloud account access to Redis Enterprise Cloud subscriptions.

The following example uses the `terraform-aws-Redislabs-Cloud-Account-IAM-Resources` module, located in Amazon&nbsp;S3:


1. Create a `main.tf` as shown below (update the `profile`, `region`, and `pgp_key` values as appropriate).

    Note that a `pgp_key` is required. For details, see the [Terraform docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_user_login_profile#pgp_key). 

    {{%expand "View terraformIAMTemplate.json" %}}
    {{% code-include file="rv/terraformIAMTemplate.json" language="js" %}}
    {{% /expand%}}

2. Initialize Terraform with the module:

    Note: Terraform requires [AWS credentials be supplied](https://www.terraform.io/docs/language/modules/sources.html#s3-bucket), but the source of the module is a public S3 bucket, so any valid credentials should work.   Replace the `XXXX` fields below with your relevant values

    ```
    AWS_ACCESS_KEY_ID=XXXX AWS_SECRET_KEY=XXXX terraform init
    ```

3. Build the resources:

    ```
    terraform apply
    ```

    This displays the required values.  To access the sensitive data:

    * accessSecretKey: `echo $(terraform output -raw accessSecretKey)`
    * consolePassword:

        `echo $(terraform output -raw consolePassword | base64 --decode | keybase pgp decrypt)`
