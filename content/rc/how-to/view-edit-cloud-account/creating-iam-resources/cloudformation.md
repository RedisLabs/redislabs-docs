---
Title: Create IAM Resources using CloudFormation
linkTitle: CloudFormation
Weight: 10
categories: ["RC"]
alwaysopen: false
---
CloudFormation is the AWS native automation tool for creating resources.


Select ONE of the following two options for using CloudFormation to create the resources and to gather the information needed to create the Cloud Account. (Note that different information is required depending on whether one uses the Redis Cloud admin UI or the REST API. The output from the CloudFormation stack contains all the information needed by both methods).

## UI
Click on the following image to be taken to the CloudFormation stack creation section of your AWS console. We'd suggest you keep all the default options until/unless you're experienced with CloudFormation.

<center><a href="https://console.aws.amazon.com/cloudformation/home?#/stacks/new?stackName=RedisCloud&templateURL=https://s3.amazonaws.com/iam-resource-automation-do-not-delete/RedisCloud.yaml">
<img alt="Launch RedisCloud template" src="https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png"/>
</a></center>

Once the stack has been built you can use the values under the `Outputs` tab to find the data needed to complete the creation of a Cloud Account, as described in [Cloud Account Management (AWS Only)](/rc/how-to/view-edit-cloud-account)

(Note - be very careful in cutting/pasting output values from the AWS console to the Redis Cloud Management UI. Additional whitespace characters can be added to the strings copied if you're not careful!)

## CLI

If you prefer to use the AWS CLI then the command you need is shown below, assuming you have setup your environment as per the [AWS CLI docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).

```
aws cloudformation create-stack --stack-name RedisCloud --template-url \
https://s3.amazonaws.com/iam-resource-automation-do-not-delete/RedisCloud.yaml \
--capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM CAPABILITY_IAM 
```

To obtain the outputs using the cli use the following commands:
### accessKeyId

```
aws cloudformation describe-stacks --stack-name RedisCloud \
--query "Stacks[0].Outputs[?OutputKey=='accessKeyId'].OutputValue" \
--output text
```

### IAMRoleName

```
aws cloudformation describe-stacks --stack-name RedisCloud \
--query "Stacks[0].Outputs[?OutputKey=='IAMRoleName'].OutputValue" \
--output text
```

### consolePassword
The consolePassword is encoded as a JSON object, therefore we use [jq(1)](https://www.systutorials.com/docs/linux/man/1-jq/) to decode it.
```
aws secretsmanager get-secret-value --secret-id /redislabsuser/password \
--query SecretString --output text | jq -r .password
```

### signInLoginUrl
```
aws cloudformation describe-stacks --stack-name RedisCloud \
--query "Stacks[0].Outputs[?OutputKey=='signInLoginUrl'].OutputValue" \
--output text
```
### accessSecretKey
```
aws secretsmanager get-secret-value --secret-id /redislabsuser/secret_access_key \
--query SecretString --output text
```
### consoleUsername
```
aws cloudformation describe-stacks --stack-name RedisCloud \
--query "Stacks[0].Outputs[?OutputKey=='consoleUsername'].OutputValue" \
--output text
```
