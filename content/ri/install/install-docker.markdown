---
layout: docs
title:  Installing RDBTools on Docker
description: Installing RDBTools on Docker
date:  2018-06-05 03:49:29 +0530
category: docs
permalink: docs/install/docker/
pageTitle: Installing RDBTools on Docker
nextStep:
    title: Activating RDBTools
    href: /docs/install/activating/
---
In this walkthrough, we will install RDBTools on [Docker](https://www.docker.com/){:target="_blank"}. Note that this installation is for developer machines. We have a separate guide for installing [Rdbtools on AWS](/docs/rdbtools-docker-installation-ec2/).

## I. Install Docker

The first step is to [install docker for your operating system](https://docs.docker.com/install/){:target="_blank"}. You should be able to run the `docker version` command in a terminal window without any errors.

Note: On windows and Mac, please install docker version 18.03 or higher. You can `docker version` to find out your docker version.

## II. Run Rdbtools Docker Image

Next, we will run the Rdbtools container. The easiest way is to run the following command:
{% highlight bash %}
{{site.docker_command}}:{{site.docker_image_version}}
{% endhighlight %}
and then point your browser to <a href="http://localhost:8001" target="_blank">http://localhost:8001</a>.


In addition, you can add some additional flags to the docker run command:

1. You can add the `-it` flag to see the logs and view the progress
1. On Linux, you can add `--network host`. This will make it easy to work with redis running on your local machine.
1. To analyze RDB Files stored in S3, you can add the access key and secret access key as environment variables using the `-e` flag. For example: `-e AWS_ACCESS_KEY=<aws access key> -e AWS_SECRET_KEY=<aws secret access key>`

If everything worked, you should see a message "Running RDBtools on localhost:8001" in the terminal.

<img src="/img/documentation/local_installation_docker_run_successful.png"/>
