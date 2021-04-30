---
Title: Create resources (CloudFormation)
linkTitle: CloudFormation
Weight: 10
categories: ["RC"]
alwaysopen: false
---
The following link uses CloudFormation to create a stack using the AWS console:


<a href="https://console.aws.amazon.com/cloudformation/home?#/stacks/new?stackName=RedisCloud&templateURL=https://s3.amazonaws.com/cloudformation-templates.redislabs.com/RedisCloud.yaml">
<img alt="Launch RedisCloud template" src="https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png"/>
</a>

If you prefer to use the AWS CLI then the command you need is shown below, substituting your profile where it says `YOUR_PROFILE_HERE` (or using one of the other methods as per the [AWS CLI docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html))

```
aws cloudformation create-stack --stack-name RedisCloud --template-url \
https://s3.amazonaws.com/cloudformation-templates.redislabs.com/RedisCloud.yaml \
--capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM CAPABILITY_IAM \
--profile YOUR_PROFILE_HERE
```
