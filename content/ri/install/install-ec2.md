---
layout: docs
title:  Install RedisInsight on AWS EC2
description: Install RedisInsight on AWS EC2
date:  2018-06-05 03:49:29 +0530
category: docs
permalink: docs/install/ec2/
pageTitle: Install RedisInsight on AWS EC2
altTag: Install RedisInsight on AWS EC2
nextStep:
    title: Activating RedisInsight
    href: /docs/install/activating/
---
In this guide, we will install RedisInsight on an AWS EC2 instance. You will need access to the AWS Console, and must have the ability to launch EC2 instances. At the end of this guide, you will be able to manage ElastiCache Redis instances using RedisInsight.

As an alternative, you can also use our 1-click cloudformation launch wizard to automatically perform these steps for you.

Step 1: Create a new IAM Role (Optional)
--------------

RedisInsight needs read-only access to S3 and ElastiCache APIs. This is an optional step.

1. Login to AWS Console, and navigate to IAM screen
1. Create a new IAM Role
1. Under *Select type of trusted entity*, choose EC2. In other words, the role we are creating will be used by an EC2 instance
1. Assign the following permissions:
    * AmazonS3ReadOnlyAccess
    * AmazonElastiCacheReadOnlyAccess

Step 2: Launch EC2 Instance
--------------

Next, we will launch an EC2 instance.

1. Navigate to EC2 under AWS Console
1. Click Launch Instance
1. Choose 64 bit Amazon Linux AMI
1. Choose at least a t2.medium instance. The size of the instance depends on the memory used by your ElastiCache instance that you wish to analyze
1. Under Configure Instance:
   * Choose the VPC that has your ElastiCache instances
   * Choose a subnet that has network access to your ElastiCache instances
   * Ensure that your EC2 instance has a public IP Address
   * Assign the IAM role that you created in Step 1
1. Under the storage section, ensure at least 100 GiB storage
1. Under security group, ensure that:
    * Incoming traffic is allowed on port 80 and 443
    * Incoming traffic is allowed on port 22 only during installation
1. Review and launch the ec2 instance

Step 3: Verify Permissions & Connectivity
----------

Next, we will verify the EC2 instance has the required IAM permissions, and can connect to ElastiCache Redis instances.

1. SSH into the newly launched EC2 instance
1. Open a command prompt
1. Run the command `aws s3 ls`. This should list S3 buckets
    1. If the `aws` command cannot be found, make sure your ec2 instance is based of amazon linux
1. Next, find the hostname an ElastiCache instance you wish to analyze, and run the command `echo info | nc <redis host> 6379`
1. If you see some details about the ElastiCache redis instance, you can proceed to the next step
1. If you cannot connect to redis, you should review your VPC, subnet, and security group settings.

Step 4: Install Docker on EC2
-------

Next, we will install Docker on the EC2 instance. Run the following commands:

1. `sudo yum update -y`
1. `sudo yum install -y docker`
1. `sudo service docker start`
1. `sudo usermod -a -G docker ec2-user`
1. Log out and log back in again to pick up the new docker group permissions.
1. To verify, run `docker ps`. You should see some output without having to run sudo

Step 5: Run RedisInsight Docker Container

Finally, we can now install RedisInsight. Run the following command

`docker run -v rdbtools:/db -p 80:8001 rdbtools/rdbtools:{{site.docker_image_version}}`

This command will download and run the RedisInsight docker image and expose it as a web page on port 80.

Find the IP Address of your EC2 instances, and a launch your browser to `http://<EC2 IP Address>`. You should see the RedisInsight create account page. Follow the steps to activate your free or paid license.

Summary
------

In this guide, we installed RedisInsight on an EC2 instance running Docker. As a next step, you should now add an ElastiCache Redis Instance and then run the memory analysis.
