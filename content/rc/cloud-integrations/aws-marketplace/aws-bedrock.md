---
Title: Use Redis Cloud with Amazon Bedrock
LinkTitle: Amazon Bedrock 
description: Shows how to use your Redis database with Amazon Bedrock to customize foundational models.
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: 
---

[Amazon Bedrock](https://aws.amazon.com/bedrock/) is a service that allows you to securely customize foundational models (FMs) with your own data, and to use these models without having to build complex infrastructure management. With Amazon Bedrock, users can access FMs from a variety of vendors through a single API, streamlining the process of creating generative artificial intelligence (AI).

Amazon Bedrock allows you to choose Redis Cloud as the [vector database](https://redis.com/solutions/use-cases/vector-database/) for your models. Once your database is set up and connected to Amazon Bedrock, it will import text data from an Amazon Simple Storage Service (S3) bucket into Redis Cloud and use it to extract relevant information when prompted.

For more information about the Redis integration with Amazon Bedrock, see the [Amazon Bedrock integration blog post](https://redis.com/blog/amazon-bedrock-integration-with-redis-enterprise/).

## Set up Redis for Bedrock

You need to set up your Redis Cloud database before you can set it as the vector database in Amazon Bedrock. To do this, you need to:

1. [Create a subscription and database in Redis Cloud](#create-subscription)
1. [Enable Transport Layer Security (TLS) for the database and save the certificates](#get-certs)
1. [Store database credentials in AWS secrets manager](#store-secret)
1. [Create a vector index in your database](#create-vector-index) for Bedrock to use

Once you have set up the database, you can use the information

### Create a subscription and database {#create-subscription}

To set up a Redis Cloud instance for Bedrock:

1. If you're new to Redis Cloud, sign up for Redis Cloud using the [AWS Marketplace integration]({{<relref "/rc/cloud-integrations/aws-marketplace/">}}). 

1. [Create a flexible subscription]({{<relref "/rc/subscriptions/create-flexible-subscription">}}). In the **Sizing** tab, when creating your first database, make sure to have the following settings:

    - Add the **RediSearch** and **RedisJSON** advanced capabilities to your database.
    - Set the size of the database based on the amount of data that will be pulled from your Simple Storage Service (S3) [bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-buckets-s3.html). See [Find out the size of your S3 buckets](https://aws.amazon.com/blogs/storage/find-out-the-size-of-your-amazon-s3-buckets/) to find out how much training data is stored in your S3 bucket and pick the closest size from the table below. 

    | Total Size of Documents in S3 | Database size without replication | Database size with replication |
    |-------------------------------|-----------------------------------|--------------------------------|
    | 10,000 kb                     | 135 Mb                             | 270 Mb                         |
    | 100,000 kb                    | 1.35 Gb                            | 2.7 Gb                         |
    | 1,000,000 kb                  | 13.5 Gb                              | 27 Gb                          |
    | 10,000,000 kb                 | 135 Gb                             | 270 Gb                         |

    For more information on sizing, see the [Bedrock integration blog post](https://redis.com/blog/amazon-bedrock-integration-with-redis-enterprise#right-size-your-database-for-amazon-bedrock).

### Get TLS certificates {#get-certs}

1. Enable [Transport Layer Security (TLS)]({{<relref "/rc/security/database-security/tls-ssl#enable-tls">}}) for your database. Make sure to check **TLS client authentication** to require client authentication. Download the client certificates before saving your changes.

1. If you do not have the Redis Cloud server certificates, [download them]({{<relref "/rc/security/database-security/tls-ssl#download-certificates">}}) from the admin console.

### Store database credentials in AWS secrets manager {#store-secret}

In the [AWS Management Console](https://console.aws.amazon.com/), use the **Services** menu to locate and select **Security, Identity, and Compliance** > **Secrets Manager**. [Create a secret](https://docs.aws.amazon.com/secretsmanager/latest/userguide/create_secret.html) with the following fields:

- `username`: Database username
- `password`: Database password
- `serverCertificate`: Contents of the [server certificate]({{<relref "/rc/security/database-security/tls-ssl#download-certificates">}}) (`redis_ca.pem`)
- `clientCertificate`: Contents of the client certificate (`redis_user.crt`)
- `clientPrivateKey`: Contents of the client private key (`redis_user_private.key`)

Once you store this secret, you can view and copy the [Amazon Resource Name (ARN)](https://docs.aws.amazon.com/secretsmanager/latest/userguide/reference_iam-permissions.html#iam-resources) of your secret on the secret details page. 

### Create a vector index in your database {#create-vector-index}

Once your database is set up, you need to create an index with a vector field as your knowledge base for Amazon Bedrock.

#### [RedisInsight](https://redis.io/docs/ui/insight/)

RedisInsight is a free Redis GUI that allows you to visualize and optimize your data in Redis. 

Follow the steps in [this dedicated guide](https://github.com/RedisVentures/aws-redis-bedrock-stack/blob/main/docs/vector-index-creation.md) to create your vector index with RedisInsight.

#### [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli">}})

The `redis-cli` command-line utility lets you connect and run Redis commands directly from the command line. To gain access to `redis-cli`, you can [install Redis](https://redis.io/docs/getting-started/).

Follow the instructions to [connect to your database with TLS certificates]({{<relref "/rc/security/database-security/tls-ssl#connect-with-the-redis-cli">}}).

```text
FT.CREATE <index_name>                   // Index name
    ON HASH                               // Indicates the type of data to index
    SCHEMA
        "<field_name>"  VECTOR FLAT       // Vector field name and index type
            6                             // 6 index parameters follow
            "TYPE" "FLOAT32"              // only FLOAT32 is currently supported by Bedrock
            "DIM" 1536                    // Each vector will have 1536 dimensions
            "DISTANCE_METRIC" "COSINE"    // Other values could be "IP" "L2"
```

## Set Bedrock vector database {#set-bedrock-database}

On the [Amazon Bedrock console](https://aws.amazon.com/bedrock/), follow the steps to create your models.

When you reach the **Vector database** section, select **Redis Enterprise Cloud**, and fill in the fields with the following information:

- **Endpoint URL**: Public endpoint of your database. This can be found in the Redis Cloud [admin console](https://app.redislabs.com/) from the database list or from the **General** section of the **Configuration** tab for the source database.
- **Credentials Secret ARN**: [Amazon Resource Name (ARN)](https://docs.aws.amazon.com/secretsmanager/latest/userguide/reference_iam-permissions.html#iam-resources) of your [database credentials secret](#store-database-credentials-in-an-amazon-secret).
- **Vector Index name**: Name of the [vector index](#create-vector-index) 
- **Vector field**: Name of the [vector field](#create-vector-index) stored in your database.

## More info

- [Amazon Bedrock integration blog post](https://redis.com/blog/amazon-bedrock-integration-with-redis-enterprise/)
- [Detailed steps](https://github.com/RedisVentures/aws-redis-bedrock-stack/blob/main/README.md)
