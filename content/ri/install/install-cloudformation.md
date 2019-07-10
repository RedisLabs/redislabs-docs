---
layout: docs
title:  Installing RedisInsight via AWS CloudFormation
description: Instructions for Installing RedisInsight via AWS CloudFormation
date:  2018-07-20 03:49:29 +0530
categories: ["RI"]
permalink: docs/install/cloudformation/
pageTitle: Installing RedisInsight via AWS CloudFormation
nextStep:
    title: Activating RedisInsight
    href: /docs/install/activating/
---
Launch a CloudFormation stack with RedisInsight preinstalled using our template:

1. Go to the CloudFormation launch page and select our template.

1. Fill the form to create stack.
    - **Stack Name** - You can give any logical name to your CloudFormation stack, by default it is RedisInsight.
    - **InstanceType** - Choose instance type, by default it is t2.medium.
    - **KeyName** - Select an existing EC2 KeyPair so that you can SSH to the instance.
    - **VPC** - Select the VPC in which  you want to launch this instance.
    - **Subnet** - Choose a public subnet so that you can connect to RedisInsight over http(s). This subnet must have network connectivity to ElastiCache.

    ![create-stack](/images/ri/create-stack.png)

1. Once stack is created, you can navigate to Stack list and click on the website URL
   under output section in order to get started with RedisInsight.

    ![stack-output](/images/ri/stack-output.png)
