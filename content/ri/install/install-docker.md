---
title:  Installing RedisInsight on Docker
date:  2018-06-05 03:49:29 +0530
weight: 40
categories: ["RI"]install/docker/
pageTitle: Installing RedisInsight on Docker
nextStep:
    title: Activating RedisInsight
    href: /docs/install/activating/
---
In this walkthrough, we will install RedisInsight on [Docker](https://www.docker.com/). Note that this installation is for developer machines. We have a separate guide for installing [RedisInsight on AWS](/docs/rdbtools-docker-installation-ec2/).

## I. Install Docker

The first step is to [install docker for your operating system](https://docs.docker.com/install/). You should be able to run the `docker version` command in a terminal window without any errors.

{{% note %}}
On windows and Mac, please install docker version 18.03 or higher. You can `docker version` to find out your docker version.
{{% /note %}}

## II. Run RedisInsight Docker Image

Next, we will run the RedisInsight container. The easiest way is to run the following command:

```bash
{{< param docker_command >}}:{{< param docker_image_version >}}
```

and then point your browser to [http://localhost:8001](http://localhost:8001).

In addition, you can add some additional flags to the docker run command:

1. You can add the `-it` flag to see the logs and view the progress
1. On Linux, you can add `--network host`. This will make it easy to work with redis running on your local machine.
1. To analyze RDB Files stored in S3, you can add the access key and secret access key as environment variables using the `-e` flag. For example: `-e AWS_ACCESS_KEY=<aws access key> -e AWS_SECRET_KEY=<aws secret access key>`

If everything worked, you should see a message "Running RDBtools on localhost:8001" in the terminal.

![local_installation_docker_run_successful](/images/ri/local_installation_docker_run_successful.png)
