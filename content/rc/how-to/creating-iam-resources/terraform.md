---
Title: Create IAM resources using Terraform
linkTitle: Terraform
Weight: 20
categories: ["RC"]
alwaysopen: false
---
To automate the creation of the IAM resources needed simply create a template that references the `terraform-aws-Redislabs-Cloud-Account-IAM-Resources` module, located in S3, as instructed below:


1. create a `main.tf` as shown below (replacing the `profile`, `region` and `pgp_key` values for your own:
{{% code-include file="rv/terraformIAMTemplate.json" language="js" %}}

Notes:
-  a `pgp_key` is required. See the [terraform docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_user_login_profile#pgp_key) for more details. 

2. Initialize terraform with the module:

Note: Terraform requires [AWS credentials be supplied](https://www.terraform.io/docs/language/modules/sources.html#s3-bucket), but the source of the module is a public S3 bucket so any valid credentials will do! Replace the `XXXX` fields below with your relevant values

```
AWS_ACCESS_KEY_ID=XXXX AWS_SECRET_KEY=XXXX terraform init
```

3. Build the resources:

```
terraform apply
```
This will output the various data you need although you'll have to access the sensitive data thus:

* accessSecretKey: `terraform output accessSecretKey`
* consolePassword: `
terraform output consolePassword | tr -d \" | base64 --decode | keybase pgp decrypt`
