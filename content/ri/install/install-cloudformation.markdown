---
layout: docs
title:  Installing RDBTools via AWS CloudFormation
description: Instructions for Installing RDBTools via AWS CloudFormation
date:  2018-07-20 03:49:29 +0530
category: docs
permalink: docs/install/cloudformation/
pageTitle: Installing RDBTools via AWS CloudFormation
nextStep:
    title: Activating RDBTools
    href: /docs/install/activating/
---

Launch a CloudFormation stack with RDBTools preinstalled using our template:

1. Select your desired region below and click **Launch** to go to the CloudFormation launch page with our template selected.

   <form target="_blank" action="{{site.aws_template_url}}{{site.docker_image_version}}+&+stackName=Rdbtools">
        <select name="region" class="aws-region-select">
            {% for region in site.data.aws-regions %}
            <option value="{{region.value}}">{{region.name}}</option>
            {% endfor %}
        </select>
        <input id ="launch-aws-button" type="submit" value="Launch" class="aws_launch_btn"/>
    </form>
    <br/>

2. Fill the form to create stack.
    - **Stack Name** - You can give any logical name to your CloudFormation stack, by default it    								 is RDBTools.
    - **InstanceType** - Choose instance type, by default it is t2.medium.
    - **KeyName** - Select an existing EC2 KeyPair so that you can SSH to the instance.
    - **VPC** - Select the VPC in which  you want to launch this instance.
    - **Subnet** - Choose a public subnet so that you can connect to RDBTools over http(s). This subnet must have network connectivity to ElastiCache.

	![create-stack](/images/ri/create-stack.png)

3. Once stack is created, you can navigate to Stack list and click on the website URL 
   under output section in order to get started with RDBTools.

	![stack-output](/images/ri/stack-output.png)
