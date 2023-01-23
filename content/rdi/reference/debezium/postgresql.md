---
Title: RDI configuration for PostgreSQL
linkTitle: PostgreSQL
description: Describes the `application.properties` settings that configure Debezium Servers for Cassandra
weight: $weight
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

The following example shows how to configure the Debezium Server `application.properties` file to support [PostgreSQL](https://postgresql.org).

# application.properties

```properties
debezium.sink.type=redis
debezium.sink.redis.message.format=extended
debezium.sink.redis.address=<RDI_HOST>:<RDI_PORT>
# Comment the following line if not using a password for Redis Data Integration
debezium.sink.redis.password=<RDI_PASSWORD>

# Redis SSL/TLS
#debezium.sink.redis.ssl.enabled=true
#debezium.source.database.history.redis.ssl.enabled=true
# Location of the Java keystore file containing an application process' own certificate and private key.
#javax.net.ssl.keyStore=<KEY_STORE_FILE_PATH>
# Password to access the private key from the keystore file specified by javax.net.ssl.keyStore. This password is used twice: To unlock the keystore file (store password), and To decrypt the private key stored in the keystore (key password).
#javax.net.ssl.keyStorePassword=<KEY_STORE_PASSWORD>
# Location of the Java keystore file containing the collection of CA certificates trusted by this application process (trust store).
#javax.net.ssl.trustStore=<TRUSE_STORE_FILE_PATH>
# Password to unlock the keystore file (store password) specified by javax.net.ssl.trustStore.
#javax.net.ssl.trustStorePassword=<TRUST_STORE_PASSWORD>

debezium.source.connector.class=io.debezium.connector.postgresql.PostgresConnector
debezium.source.plugin.name=pgoutput
debezium.source.offset.storage=io.debezium.server.redis.RedisOffsetBackingStore
debezium.source.topic.prefix=<SOURCE_LOGICAL_SERVER_NAME>

debezium.source.database.dbname=<SOURCE_DB_NAME>


debezium.source.database.hostname=<SOURCE_DB_HOST>
debezium.source.database.port=<SOURCE_DB_PORT>
debezium.source.database.user=<SOURCE_DB_USER>
debezium.source.database.password=<SOURCE_DB_PASSWORD>
debezium.source.offset.flush.interval.ms=1000
debezium.source.include.schema.changes=false
debezium.source.tombstones.on.delete=false
debezium.source.schema.history.internal=io.debezium.server.redis.RedisSchemaHistory
# Important: Do NOT use include and exclude column lists at the same time, use either include or exclude.
# An optional, comma-separated list of regular expressions that match the fully-qualified names of columns to include in change event record values.
#debezium.source.column.include.list=<COL1>,<COL2>...
# An optional, comma-separated list of regular expressions that match the fully-qualified names of columns to exclude from change event record values.
#debezium.source.column.exclude.list=<COL1>,<COL2>...

debezium.transforms=AddPrefix
debezium.transforms.AddPrefix.type=org.apache.kafka.connect.transforms.RegexRouter
debezium.transforms.AddPrefix.regex=.*
debezium.transforms.AddPrefix.replacement=data:$0

# The default minimum log level for every log category, change only quarkus.log.level when needed.
quarkus.log.min-level=TRACE
# The default log level for every log category.
quarkus.log.level=INFO
# Determine whether to enable the JSON console formatting extension, which disables "normal" console formatting.
quarkus.log.console.json=false
# The port on which Debezium exposes Microprofile Health endpoint and other exposed status information.
quarkus.http.port=8088
```
