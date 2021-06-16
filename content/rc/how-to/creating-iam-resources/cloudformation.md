---
Title: Create resources (CloudFormation)
linkTitle: CloudFormation
Weight: 10
categories: ["RC"]
alwaysopen: false
---
The following link uses CloudFormation to create a stack using the AWS console:


<a href="https://console.aws.amazon.com/cloudformation/home?#/stacks/new?stackName=RedisCloud&templateURL=https://s3.amazonaws.com/iam-resource-automation-do-not-delete/RedisCloud.yaml">
<img alt="Launch RedisCloud template" src="https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png"/>
</a>

You can then use the `Outputs` tab to find the data needed to complete the creation of a Cloud Account. For the `accessSecretKey` (i.e. user's access key) and `consolePassword` (user's console password) you'll have to follow the links to the AWS Secrets Manager service, and use that to find the secret values. These values, being secrets, aren't displayed directly by CloudFormation.

If you prefer to use the AWS CLI then the command you need is shown below, substituting your profile where it says `YOUR_PROFILE_HERE` (or using one of the other methods as per the [AWS CLI docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html))

```
export AWS_PROFILE=YOUR_PROFILE_HERE
aws cloudformation create-stack --stack-name RedisCloud --template-url \
https://s3.amazonaws.com/iam-resource-automation-do-not-delete/RedisCloud.yaml \
--capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM CAPABILITY_IAM
```

You can track the status of the cloud formation thus:
```
aws cloudformation describe-stacks --stack-name RedisCloud
```
The data needed to complete the creation of a Cloud Account is shown as `Output Key` and `Output Value` pairs.

For the two secrets (`accessSecretKey` and `consolePassword`) you'll need to use the AWS secretmanager CLI - the value you'll need has a key of `SecretString`:

```
aws secretsmanager get-secret-value --secret-id=/redislabsuser/secret_access_key
```

We recommend for the `consolePassword` you use yaml output - it makes decoding the required value easier

```
aws secretsmanager get-secret-value --secret-id=/redislabsuser/password --output yaml
```

The `consolePassword` is a json object containing a single member whose key is `password` and whose value is the password. This can be a bit complex to parse out. Here's an example output:

```
tobyferguson@Tobys-work-computer ~ % aws secretsmanager get-secret-value --secret-id=/redislabsuser/password --output yaml
ARN: arn:aws:secretsmanager:us-east-1:913769183952:secret:/redislabsuser/password-qaEMYs
CreatedDate: '2021-06-16T06:27:53.402000-06:00'
Name: /redislabsuser/password
SecretString: '{"password":"Pvt1)LFaU3S]*Ee('')oS1ibm3l^Av4"}'
VersionId: 7d10ccdb-d610-4085-9686-15a8df52586f
VersionStages:
- AWSCURRENT
```

The json object is the value (less the single quotes) of the `SecretString` key. i.e. it is `{"password":"Pvt1)LFaU3S]*Ee('')oS1ibm3l^Av4"}`.

The password value is the member of that object, less the double quotes: `Pvt1)LFaU3S]*Ee('')oS1ibm3l^Av4`
