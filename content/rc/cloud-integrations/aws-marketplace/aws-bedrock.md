---
Title: Use Redis Cloud with Amazon Bedrock
LinkTitle: Amazon Bedrock 
description: Shows how to use your Redis database with Amazon Bedrock to customize foundational models.
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: 
---

Paragraph 1: What is Bedrock?

Paragraph 2: What does the Redis Bedrock integration let you do?

## Set up Redis for Bedrock

You need to set up your Redis Cloud database before you can set it as the vector database in Amazon Bedrock. To do this, you need to:

- [Create a subscription and database in Redis Cloud](#create-a-subscription-and-database)
- [Enable Transport Layer Security (TLS) for the database and save the certificates](#get-tls-certificates)
- [Store database credentials in an Amazon secret](#store-database-credentials-in-an-amazon-secret)
- [Create a vector field in your database](#create-a-vector-field-in-your-database) for Bedrock to use

### Create a subscription and database

To set up a Redis Cloud instance for Bedrock:

1. If you're new to Redis Cloud, sign up for Redis Cloud using the [AWS Marketplace integration]({{<relref "/rc/cloud-integrations/aws-marketplace/">}}). 

1. [Create a flexible subscription]({{<relref "/rc/subscriptions/create-flexible-subscription">}}). In the **Sizing** tab, when creating your first database, make sure to have the following settings:

    - Add the **RediSearch** and **RedisJSON** advanced capabilities to your database.
    - Set the size of the database based on the amount of data that will be pulled from your Simple Storage Service (S3) [bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-buckets-s3.html). See [Find out the size of your S3 buckets](https://aws.amazon.com/blogs/storage/find-out-the-size-of-your-amazon-s3-buckets/) to find out how much training data is stored in your S3 bucket and pick the closest size from the table below. 

    | Total Size of Documents in S3 | Database size without replication | Database size with replication |
    |-------------------------------|-----------------------------------|--------------------------------|
    | 10,000 kb                     | 60 Mb                             | 120 Mb                         |
    | 100,000 kb                    | 600 Mb                            | 1.2 Gb                         |
    | 1,000,000 kb                  | 6 Gb                              | 12 Gb                          |
    | 10,000,000 kb                 | 60 Gb                             | 120 Gb                         |

### Get TLS certificates

1. Enable [Transport Layer Security (TLS)]({{<relref "/rc/security/database-security/tls-ssl#enable-tls">}}) for your database. Make sure to check **TLS client authentication** to require client authentication. Download the client certificates before saving your changes.

1. If you do not have the Redis Cloud server certificates, [download them]({{<relref "/rc/security/database-security/tls-ssl#download-certificates">}}) from the admin console.

### Store database credentials in an Amazon secret

In the [AWS Management Console](https://console.aws.amazon.com/), use the **Services** menu to locate and select **Security, Identity, and Compliance** > **Secrets Manager**. [Create a secret](https://docs.aws.amazon.com/secretsmanager/latest/userguide/create_secret.html) with the following fields:

- `username`: Database username
- `password`: Database password
- `serverCertificate`: Contents of the [server certificate]({{<relref "/rc/security/database-security/tls-ssl#download-certificates">}}) (`redis_ca.pem`)
- `clientCertificate`: Contents of the client certificate (`redis_user.crt`)
- `clientPrivateKey`: Contents of the client private key (`redis_user_private.key`)

Once you store this secret, you can view and copy the [Amazon Resource Name (ARN)](https://docs.aws.amazon.com/secretsmanager/latest/userguide/reference_iam-permissions.html#iam-resources) of your secret on the secret details page. 

### Create a vector field in your database

Once your database is set up, [connect to your database]({{<relref "/rc/security/database-security/tls-ssl#connect-with-the-redis-cli">}}) and create a vector index using [FT.CREATE](https://redis.io/commands/ft.create/). Replace <index_name> with the name of your index.

```text
FT.CREATE <index_name>                   // Index name
    ON HASH                               // Indicates the type of data to index
    SCHEMA
        "vector"  VECTOR FLAT             // For "vector" field create a FLAT index 
            6                             // 6 index parameters follow
            "TYPE" "FLOAT32"              // only FLOAT32 is currently supported by Bedrock
            "DIM" 1536                    // Each vector will have 1536 dimensions
            "DISTANCE_METRIC" "COSINE"    // Other values could be "IP" "L2"
```

## Set Bedrock vector database

On the [AWS Bedrock console](https://aws.amazon.com/bedrock/), follow the steps to create your models.

When you reach the **Vector database** section, select **Redis Enterprise Cloud**, and fill in the fields with the following information:

- **Endpoint URL**: Public endpoint of your database. This can be found in the Redis Cloud [admin console](https://app.redislabs.com/) from the database list or from the **General** section of the **Configuration** tab for the source database.
- **Credentials Secret ARN**: [Amazon Resource Name (ARN)](https://docs.aws.amazon.com/secretsmanager/latest/userguide/reference_iam-permissions.html#iam-resources) of your [database credentials secret](#store-database-credentials-in-an-amazon-secret).
- **Vector field**: Name of the [vector field](#create-a-vector-field-in-your-database) stored in your database.

## More info

- [Amazon Bedrock integration](https://redis.com/blog/amazon-bedrock-integration-with-redis-enterprise/) blog post
- [Detailed steps](https://github.com/RedisVentures/aws-redis-bedrock-stack/blob/main/README.md)
