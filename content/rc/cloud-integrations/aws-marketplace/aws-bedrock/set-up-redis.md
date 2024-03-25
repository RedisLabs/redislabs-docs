---
Title: Set up Redis for Bedrock
LinkTitle: Set up Redis
description: Shows how to set up your Redis database for Amazon Bedrock.
weight: 1
alwaysopen: false
categories: ["RC"]
aliases: 
---

You need to set up your Redis Cloud database before you can set it as the vector database in Amazon Bedrock. To do this, you need to:

1. [Sign up for Redis Cloud and create a database](#sign-up-create-subscription)
1. [Enable Transport Layer Security (TLS) for the database and save the certificates](#get-certs)
1. [Store database credentials in AWS secrets manager](#store-secret)
1. [Create a vector index in your database](#create-vector-index) for Bedrock to use

After you set up the database, you can use the database information to set it as your knowledge base database when you [create a knowledge base]({{< relref  "rc/cloud-integrations/aws-marketplace/aws-bedrock/create-knowledge-base" >}}).

## Sign up and create a database  {#sign-up-create-subscription}

To set up a Redis Cloud instance for Bedrock, you need to:

1. [Sign up for Redis Cloud](#sign-up) if you do not already have an account.
1. [Create a database](#create-sub) to use for your Bedrock knowledge base.

### Sign up for Redis Cloud using AWS Marketplace {#sign-up}

1.  Select the [Redis Cloud](https://aws.amazon.com/marketplace/pp/prodview-mwscixe4ujhkq?sr=0-1&ref_=beagle&applicationId=AWSMPContessa) AWS marketplace link from Bedrock to be taken to the Redis Cloud plan listing.

    {{<image filename="images/rc/aws-marketplace-rc-flexible-plan.png" alt="The Redis Cloud listing on AWS Marketplace" >}}{{< /image >}}

1.  Subscribe to Redis Cloud listing, locate the **Set Up Your Account** button, and then select it to begin mapping your Redis Cloud account with your AWS Marketplace account.

    {{<image filename="images/rc/aws-marketplace-account-setup-button.png" alt="Use the Set Up Your Account button after subscribing to Redis Cloud with your AWS Marketplace account." width="50%">}}{{< /image >}}

1.  Sign in to the Redis Cloud [admin console](https://app.redislabs.com).

1.  Select the Redis account to be mapped to your AWS Marketplace account and confirm that your payment method will change and that the connection cannot be undone.

    {{<image filename="images/rc/aws-marketplace-map-account-dialog.png" alt="Use the AWS Marketplace dialog to map your Redis Cloud account to your AWS Marketplace account." width="80%">}}{{< /image >}}

1.  Use the **Map account** button to confirm your choice.

1.  Once your Redis account is mapped to your AWS Marketplace account, a message appears in the upper, left corner of the account panel.

    {{<image filename="images/rc/aws-marketplace-billing-badge.png" alt="The AWS Marketplace badge appears when your Redis Cloud account is mapped to an AWS Marketplace account." width="150px">}}{{< /image >}}

    In addition, AWS Marketplace is reported as the selected payment method.

### [Create a database]({{<relref "/rc/databases/create-pro-database-new">}}) {#create-sub} 

1. In the [admin console](https://app.redislabs.com/), select **Create database**. 

    {{<image filename="images/rc/button-subscription-new.png" width="50%" alt="The New subscriptions button in the admin console menu." >}}{{< /image >}}

1. When the **New database** page appears, select **Flexible plans**.

    {{<image filename="images/rc/new-subscription-plans-flexible.png" alt="Available subscription plans; Flexible plan is selected." >}}{{< /image >}}

1. Select **Amazon Web Services** as the cloud vendor, select a region, and enter a name for your subscription.

    {{<image filename="images/rc/subscription-new-flexible-setup-general.png" width="75%" alt="The General settings of the Setup tab." >}}{{< /image >}}

1. In the **Version** section, select **Redis 7.2**.

    {{<image filename="images/rc/subscription-new-flexible-version-section.png"  alt="Version selection between Redis 6.2 and 7.2" >}}{{< /image >}}

1. In the **Advanced options** section, select Multi-AZ to ensure [high-availability]({{<relref "rc/databases/configuration/high-availability">}}). 

    {{<image filename="images/rc/subscription-new-flexible-advanced-multi-az.png" width="75%" alt="The Multi-AZ toggle set to on." >}}{{< /image >}}

1. Enter a [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) range of IP addresses for your deployment in the **Deployment CIDR** field.

    {{<image filename="images/rc/subscription-new-flexible-advanced-cidr.png" width="75%" alt="The Deployment CIDR field." >}}{{< /image >}}

1. When finished, select **Continue**.

    {{<image filename="images/rc/button-subscription-continue.png" width="100px" alt="Select the Continue button to continue to the next step." >}}{{< /image >}}

1. The **Sizing** tab helps you specify the database requirements for your subscription.

    {{<image filename="images/rc/subscription-new-flexible-sizing-tab.png" width="75%" alt="The Sizing tab when creating a new Flexible subscription." >}}{{< /image >}}

    Select the **Add** button to create a database.

    {{<image filename="images/rc/icon-add-database.png" width="30px" alt="Use the Add button to define a new database for your subscription." >}}{{< /image >}}

1. In the **New Database** dialog, name your database and select **Search and query**. 

    {{<image filename="images/rc/flexible-add-database-basic.png" width="75%" alt="The New Database dialog with basic settings." >}}{{< /image >}}

1. Set the Memory limit of your database based on the amount of data that will be pulled from your Simple Storage Service (S3) [bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-buckets-s3.html). See [Find out the size of your S3 buckets](https://aws.amazon.com/blogs/storage/find-out-the-size-of-your-amazon-s3-buckets/) to find out how much training data is stored in your S3 bucket and pick the closest size from the table below. 

    | Total Size of Documents in S3 | Database size without replication | Database size with replication |
|-------------------------------|-----------------------------------|--------------------------------|
| 10,000 kb                     | 135 Mb                             | 270 Mb                         |
| 100,000 kb                    | 1.35 Gb                            | 2.7 Gb                         |
| 1,000,000 kb                  | 13.5 Gb                              | 27 Gb                          |
| 10,000,000 kb                 | 135 Gb                             | 270 Gb                         |

    For more information on sizing, see the [Bedrock integration blog post](https://redis.com/blog/amazon-bedrock-integration-with-redis-enterprise#right-size-your-database-for-amazon-bedrock).

1. When finished, select **Save database** to create your database.

    {{<image filename="images/rc/button-database-save.png" width="140px" alt="Select the Save Database button to define your new database." >}}{{< /image >}}

1. Select **Continue** to move to the **Review and Create** tab.

1. Review your subscription. You will not need to enter a payment method, as it's automatically assigned to your AWS Marketplace account. 

1. Select **Create subscription** to create your new flexible subscription.

    {{<image filename="images/rc/button-subscription-create.png" width="140px" alt="Select Create subscription to create your new subscription." >}}{{< /image >}}

    Note that subscriptions are created in the background.  While they are provisioning, you aren't allowed to make changes.  (The process generally takes 10-15 minutes.)

    Use the **Subscriptions list** to check the status of your subscription.  You will also receive an email when your subscription is ready to use.

## Enable TLS and get certificates {#get-certs}

For your database to be fully secure, you must enable [Transport Layer Security (TLS)]({{<relref "/rc/security/database-security/tls-ssl#enable-tls">}}) for your database with client authentication.

1. Select **Databases** from the [admin console](https://app.redislabs.com/) menu and then select your database from the list.

1. From the database's **Configuration** screen, select the **Edit database** button:

    {{<image filename="images/rc/button-database-edit.png" width="140px" alt="The Edit database button lets you change selected database properties." >}}{{< /image >}}

1. In the **Security** section, use the **Transport layer security (TLS)** toggle to enable TLS:

    {{<image filename="images/rc/database-details-configuration-tab-security-tls-toggle.png" width="200px" alt="Use the Transport Layer Security toggle to enable TLS." >}}{{< /image >}}

1. Select **Download server certificate** to download the Redis Cloud certificate bundle `redis_ca.pem`:

    {{<image filename="images/rc/button-database-config-security-server-ca-download.png" width="250px" alt="Use the Download server certificate button to download the Redis Cloud CA certificates." >}}{{< /image >}}

1. Select the **Mutual TLS (require client authentication)** checkbox to require client authentication.

1. Select **Add client certificate** to add a certificate.

    {{<image filename="images/rc/mtls-add-client-certificate.png" width="200px" alt="The Add client certificate button." >}}{{< /image >}}

1. Either provide an [X.509 client certificate](https://en.wikipedia.org/wiki/X.509) or chain in PEM format for your client or select **Generate** to create one:

    {{<image filename="images/rc/database-details-configuration-tab-security-tls-client-auth-certificate.png" alt="Provide or generate a certificate for Mutual TLS." >}}{{< /image >}}

    - If you generate your certificate from the Redis Cloud console, a **Download certificate** button will appear after it is generated. Select it to download the certificate. 

        {{<image filename="images/rc/mtls-download-certificate.png" alt="The Download certificate button." >}}{{< /image >}}
        
        The download contains:

        - `redis-db-<database_id>.crt` – the certificate's public key.

        - `redis-db-<database_id>.key` – the certificate's private key.

        {{<note>}}
You must download the certificate using the button at this point.  After your changes have been applied, the full bundle of public and private keys will no longer be available for download.
        {{</note>}}
    
    - If you provide a client certificate, you will see the certificate details before you save your changes.

        {{<image filename="images/rc/mtls-certificate-details.png" alt="The Download certificate button." >}}{{< /image >}}

1. To apply your changes and enable TLS, select the **Save database** button:

    {{<image filename="images/rc/button-database-save.png" width="140px" alt="Use the Save database button to save database changes." >}}{{< /image >}}

## Store database credentials in AWS secrets manager {#store-secret}

In the [AWS Management Console](https://console.aws.amazon.com/), use the **Services** menu to locate and select **Security, Identity, and Compliance** > **Secrets Manager**. [Create a secret](https://docs.aws.amazon.com/secretsmanager/latest/userguide/create_secret.html) of type **Other type of secret** with the following key/value fields:

- `username`: Database username
- `password`: Database password
- `serverCertificate`: Contents of the [server certificate]({{<relref "/rc/security/database-security/tls-ssl#download-certificates">}}) (`redis_ca.pem`)
- `clientCertificate`: Contents of the client certificate (`redis_user.crt`)
- `clientPrivateKey`: Contents of the client private key (`redis_user_private.key`)

After you store this secret, you can view and copy the [Amazon Resource Name (ARN)](https://docs.aws.amazon.com/secretsmanager/latest/userguide/reference_iam-permissions.html#iam-resources) of your secret on the secret details page. 

## Create a vector index in your database {#create-vector-index}

After your database is set up, create an index with a vector field using [FT.CREATE](https://redis.io/commands/ft.create/) as your knowledge base for Amazon Bedrock. You can accomplish this using **RedisInsight** or `redis-cli`.

### [RedisInsight](https://redis.io/docs/connect/insight/)

RedisInsight is a free Redis GUI that allows you to visualize and optimize your data in Redis. 

To create your vector index in RedisInsight:

1. [Download and install RedisInsight](https://redis.com/redis-enterprise/redis-insight/) if you don't have it already.

1. In the Redis Cloud [admin console](https://app.redislabs.com/), in your subscription's **Databases** tab, select the **Connect** button next to your database to open the connection wizard.

    ![Connect button](/images/rc/connection-wizard-button.png#no-click "Connect button.")

1. In the connection wizard, under **RedisInsight Desktop**, select **Public Endpoint**. Select **Open with RedisInsight** to connect to the database with RedisInsight.

1. Select **Use TLS**. In the **CA Certificate** section, select **Add new CA certificate**. Give the certificate a name in the **Name** field, and enter the contents of `redis_ca.pem` into the **Certificate** field.

    {{<image filename="images/rc/ri-bedrock-add-ca-cert.png" width=80% alt="The RedisInsight Add CA Certificate section." >}}{{< /image >}}

1. Select **Requires TLS Client Authentication**. In the **Client Certificate** section, select **Add new certificate**. Give the certificate a name in the **Name** field. Enter the contents of `redis_user.crt` into the **Certificate** field, and the contents of `redis_user_private.key` into the **Private Key** field.

    {{<image filename="images/rc/ri-bedrock-add-client-cert.png" width=80% alt="The RedisInsight Add Client Certificate section." >}}{{< /image >}}

1. Select **Add Redis Database** to connect to the database.

1. Select your database alias to connect to your database. Select the **Workbench** icon to go to the workbench.

    {{<image filename="images/rc/ri-bedrock-workbench.png" width=50px alt="The RedisInsight workbench icon." >}}{{< /image >}}

1. Enter the [FT.CREATE](https://redis.io/commands/ft.create/) command to create an index. 

    ```text
    FT.CREATE <index_name>                    
        ON HASH                
        SCHEMA
            "<text_field>" TEXT
            "<metadata_field>" TEXT                   
            "<vector_field>"  VECTOR FLAT     
                6                          
                "TYPE" "FLOAT32"            
                "DIM" 1536                   
                "DISTANCE_METRIC" "COSINE"  
    ```

    Replace the following fields:

    - `<index_name>` with the vector index name
    - `<text_field>` with the text field name
    - `<metadata_field>` with the metadata field name
    - `<vector_field>` with the vector field name

1. Select **Run** to create the index.

    {{<image filename="images/rc/ri-bedrock-run-button.png" width=50px alt="The RedisInsight run button." >}}{{< /image >}}

### [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli">}})

The `redis-cli` command-line utility lets you connect and run Redis commands directly from the command line. To use `redis-cli`, you can [install Redis](https://redis.io/docs/getting-started/).

Public endpoint and port details are available from the **Databases** list or the database's **Configuration** screen. Select **Connect** to view how to connect to your database with `redis-cli`.

```sh
redis-cli -h <endpoint> -p <port> --tls --cacert redis_ca.pem \
    --cert redis_user.crt --key redis_user_private.key
```

After you are connected with `redis-cli`, create an index using [FT.CREATE](https://redis.io/commands/ft.create/). 

```text
FT.CREATE <index_name>                    
    ON HASH                
    SCHEMA
        "<text_field>" TEXT
        "<metadata_field>" TEXT                   
        "<vector_field>"  VECTOR FLAT     
            6                          
            "TYPE" "FLOAT32"            
            "DIM" 1536                   
            "DISTANCE_METRIC" "COSINE"  
```

Replace the following fields:
- `<index_name>` with the vector index name
- `<text_field>` with the text field name
- `<metadata_field>` with the metadata field name
- `<vector_field>` with the vector field name

## Next steps

After your Redis subscription and database is set up, you can use it to [create a knowledge base]({{< relref  "rc/cloud-integrations/aws-marketplace/aws-bedrock/create-knowledge-base" >}}) in Amazon Bedrock.