---
Title: Redis Cloud security shared responsibility model
description:
weight: 11
alwaysopen: false
categories: ["RC"]
---

The security of all Redis Cloud deployments is a shared responsibility. Redis Labs, the public cloud providers (AWS, GCP, and Azure), and our customers all
take part in ensuring the security of these deployments.

## Redis Labs' responsibility

Redis Enterprise Cloud offerings are managed by Redis Labs and deployed on AWS, Azure and Google Cloud infrastructure.

Redis Labs is responsible for the software that runs Redis Enterprise Cloud. This includes the patching and maintenance of
the operating system that Redis is deployed on as well as the patching and maintenance of Redis Enterprise Cloud.

## Cloud provider responsibility

The public cloud provider hosting your Redis Enterprise Cloud databases is responsible for the physical security of their data centers and
the security of the network, storage, servers, and virtualization that form the core infrastructure of your deployment.

Amazon, Microsoft, and Google’s public clouds embrace a wide range of security best practices and compliance standards. Compliance information—including audits, attestations, and certifications about resources hosted can be found in the following compliance pages:

* [AWS Compliance](https://aws.amazon.com/compliance/)
* [GCP Compliance](https://cloud.google.com/security/compliance)
* [Azure Compliance](https://azure.microsoft.com/en-us/overview/trusted-cloud/compliance/)

## Customer responsibility

Customers are responsible for the security configurations in Redis and the Redis Cloud Admin console. Customers must understand and implement the Redis Enterprise Cloud security features and best practices.

Customers are also responsible for the applications built on Redis and the data they store in Redis. Customers determine the cloud provider, region, and availability zone of their deployments.

Customers understand that on Redis Cloud Essentials, their infrastructure is multi-tenant. In Pro and Ultimate, their infrastructure is single-tenant and dedicated to one specific customer.
