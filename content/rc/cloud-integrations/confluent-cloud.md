---
Title: Use the Redis Sink Confluent connector with Redis Cloud
LinkTitle: Confluent
description: Describes how to integrate Redis Cloud into Confluent Cloud.
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: 
---

You can send data from [Confluent Cloud](https://confluent.cloud/) to your Redis Cloud database using the [Redis Sink connector for Confluent Cloud](https://docs.confluent.io/cloud/current/connectors/cc-redis-sink.html).

## Prerequisites

Before you add the Redis Sink Confluent connector to your Confluent Cloud cluster:

1. [Create a database]({{<relref "rc/databases/create-database">}}) in the same region as your Confluent Cloud cluster.

1. If you decide to [enable Transport Layer Security (TLS)]({{<relref "/rc/security/database-security/tls-ssl">}}) for your Redis database, [download the server certificate]({{<relref "/rc/security/database-security/tls-ssl#download-certificates">}}) from the Redis Cloud console and [encode it](#encode-server-certificate) to be used with Confluent Cloud.

1. Ensure you meet the prerequisites in the [Redis Sink connector documentation](https://docs.confluent.io/cloud/current/connectors/cc-redis-sink.html#quick-start) to set up your Redis Sink with Confluent Cloud. 

### Encode server certificate

If you decide to enable Transport Layer Security (TLS) for your database, you will need to encode the [server certificate]({{<relref "/rc/security/database-security/tls-ssl#download-certificates">}}) (`redis_ca.pem`) for use as the Confluent Cloud Truststore file. To do this:

1. Use a base64 utility to encode `redis_ca.pem` into base64 in a new file. For example, using the [`base64` command-line utility](https://linux.die.net/man/1/base64):

    ```sh
    $ base64 -i redis_ca.pem -o <truststore_file_name>
    ```

1. Using a text editor, add the following text to the beginning of the truststore file:

    ```text
    data:text/plain;base64
    ```

1. Save and close the truststore file.

## Connect the Redis Sink connector to Redis Cloud

To add the Redis Sink connector to your Confluent Cloud environment from the Redis Cloud console: 

1. From the [Redis Cloud console](https://app.redislabs.com/), select **Account Settings** and then select the **Integrations** tab.

1. Select the **Configure** button in the **Confluent** tile. 

    {{<image filename="images/rc/account-settings-integrations-confluent.png" alt="The Confluent integration tile." >}}{{< /image >}}

1. This will take you to [New Sink Connector](https://confluent.cloud/go/new-sink-connector/RedisSink) on Confluent Cloud. If you have more than one Confluent Cloud environment or Cluster, select your environment and cluster from the lists and select **Continue**.

    {{<image filename="images/rc/confluent-create-connector.png" alt="Select your environment and cluster from the Create a Connector selector." >}}{{< /image >}}

1. From there, follow the steps to [Enter the connector details](https://docs.confluent.io/cloud/current/connectors/cc-redis-sink.html#step-4-enter-the-connector-details) on the Confluent documentation.

    When you get to the **Authentication** step, fill in the fields with the following information:

    - **Redis hostname**: The Public endpoint of your database, without the port number. This can be found in the Redis Cloud [admin console](https://app.redislabs.com/) from the database list or from the **General** section of the **Configuration** tab for the source database.
    - **Redis port number**: The database's port. This is the number at the end of your database's Public endpoint.
    - **Redis database index**: Set this to 0 for a Redis Cloud database.
    - **Redis server password**: Enter the database password. If you have not set your own database user and password, use the [default user password]({{<relref "/rc/security/database-security/tls-ssl">}}), which appears in the **Security** section of the **Configuration** tab of the database details screen.
    - **SSL mode**: Set depending on what type of [TLS authentication]({{<relref "/rc/security/database-security/tls-ssl">}}) is set for your database.
        - If TLS authentication is turned off, select **disabled**.
        - If TLS authentication is turned on, select **server**. 
    - **Trustore file**: If the **SSL mode** is set to **server**, upload the truststore file created when you [encoded the server certificate](#encode-server-certificate).
    - **Redis Server mode**: If [Cluster OSS]({{<relref "/rc/databases/view-edit-database">}}) is enabled, select **Cluster**. Otherwise, select **Standalone**.
        
    Select **Continue** once you have entered the database information. Enter the rest of the [connector details](https://docs.confluent.io/cloud/current/connectors/cc-redis-sink.html#step-4-enter-the-connector-details) from the **Configuration** step.

1. [Connect to your database]({{<relref "/rc/rc-quickstart#connect-to-a-database">}}) to verify that data is being stored.



