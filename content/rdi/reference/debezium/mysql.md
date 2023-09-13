---
Title: RDI configuration for mysql
linkTitle: mysql
description: Describes the `application.properties` settings that configure Debezium Server for mysql
weight:
alwaysopen: false
categories: ["redis-di"]
aliases:
---

## application.properties

```properties
debezium.sink.type=redis
debezium.sink.redis.message.format=extended
debezium.sink.redis.address=<RDI_HOST>:<RDI_PORT>
# Uncomment the following line if you are not using a separate user for Redis Data Integration.
#debezium.sink.redis.user=<RDI_USER>
# If you are using the default user for authentication, please configure the password below.
# If you are using a custom user, make sure to specify both the username and password correctly.
debezium.sink.redis.password=<RDI_PASSWORD>
debezium.sink.redis.memory.limit.mb=80
# Redis SSL/TLS
#debezium.sink.redis.ssl.enabled=true
# When Redis is configured with a replica shard, these properties allow to verify that the data has been written to the replica.
#debezium.sink.redis.wait.enabled=true
#debezium.sink.redis.wait.timeout.ms=1000
#debezium.sink.redis.wait.retry.enabled=true
#debezium.sink.redis.wait.retry.delay.ms=1000
#debezium.source.database.history.redis.ssl.enabled=true
# Location of the Java keystore file containing an application process' own certificate and private key.
#javax.net.ssl.keyStore=<KEY_STORE_FILE_PATH>
# Password to access the private key from the keystore file specified by javax.net.ssl.keyStore. This password is used twice: To unlock the keystore file (store password), and To decrypt the private key stored in the keystore (key password).
#javax.net.ssl.keyStorePassword=<KEY_STORE_PASSWORD>
# Location of the Java keystore file containing the collection of CA certificates trusted by this application process (trust store).
#javax.net.ssl.trustStore=<TRUSE_STORE_FILE_PATH>
# Password to unlock the keystore file (store password) specified by javax.net.ssl.trustStore.
#javax.net.ssl.trustStorePassword=<TRUST_STORE_PASSWORD>

debezium.source.connector.class=io.debezium.connector.mysql.MySqlConnector
# A numeric ID of this database client, which must be unique across all currently-running database processes in the MySQL cluster.
debezium.source.database.server.id=1
debezium.source.offset.storage=io.debezium.storage.redis.offset.RedisOffsetBackingStore
debezium.source.topic.prefix=<SOURCE_LOGICAL_SERVER_NAME>

debezium.source.database.hostname=<SOURCE_DB_HOST>
debezium.source.database.port=<SOURCE_DB_PORT>
debezium.source.database.user=<SOURCE_DB_USER>
debezium.source.database.password=<SOURCE_DB_PASSWORD>
debezium.source.include.schema.changes=false
# Determines whether the connector should omit publishing change events when there are no modifications in the included columns.
debezium.source.skip.messages.without.change=true
debezium.source.offset.flush.interval.ms=1000
debezium.source.tombstones.on.delete=false
debezium.source.schema.history.internal=io.debezium.storage.redis.history.RedisSchemaHistory

# Important: Do NOT use `include` and `exclude` database lists at the same time, use either `include` or `exclude`.
# An optional, comma-separated list of regular expressions that match database names to be monitored.
# By default, all databases are monitored.
#debezium.source.database.include.list=<DB_NAME1>,<DB_NAME2>...
# An optional, comma-separated list of regular expressions that match database names for which you do not want to capture changes.
#debezium.source.database.exclude.list=<DB_NAME1>,<DB_NAME2>...
# Important: Do NOT use `include` and `exclude` table lists at the same time, use either `include` or `exclude`.
# An optional, comma-separated list of regular expressions that match fully-qualified table identifiers of tables whose changes you want to capture.
#debezium.source.table.include.list=<DB_NAME.TABLE_NAME1>,<DB_NAME.TABLE_NAME2>...
# An optional, comma-separated list of regular expressions that match fully-qualified table identifiers for tables whose changes you do not want to capture.
#debezium.source.table.exclude.list=<DB_NAME.TABLE_NAME1>,<DB_NAME.TABLE_NAME2>...

# Important: Do NOT use include and exclude column lists at the same time, use either include or exclude.
# An optional, comma-separated list of regular expressions that match the fully-qualified names of columns to include in change event record values.
#debezium.source.column.include.list=<DB_NAME.TABLE_NAME.COLUMN_NAME1>,<DB_NAME.TABLE_NAME.COLUMN_NAME2>...
# An optional, comma-separated list of regular expressions that match the fully-qualified names of columns to exclude from change event record values.
#debezium.source.column.exclude.list=<DB_NAME.TABLE_NAME.COLUMN_NAME1>,<DB_NAME.TABLE_NAME.COLUMN_NAME2>...

# Records only DDL statements that are relevant to tables whose changes are being captured by Debezium.
# In case of changing the captured tables, run `redis-di reset`.
debezium.source.schema.history.internal.store.only.captured.tables.ddl=true

# Whether to include the detailed schema information generated by Debezium in each record written to RDI.
# Note: Including the schema reduces the initial sync throughput and is not recommended for large data sets.
debezium.source.key.converter.schemas.enable=false
debezium.source.value.converter.schemas.enable=false
# When detailed schema information is excluded, handle decimal numeric types as strings.
debezium.source.decimal.handling.mode=string

debezium.transforms=AddPrefix
debezium.transforms.AddPrefix.type=org.apache.kafka.connect.transforms.RegexRouter
debezium.transforms.AddPrefix.regex=.*
debezium.transforms.AddPrefix.replacement=data:$0

# Logging
# Uncomment the following lines if running Debezium Server as a Java standalone process (non-containerized).
#quarkus.log.file.enable=true
#quarkus.log.file.path=<LOG_FILE_PATH>
#quarkus.log.file.rotation.max-file-size=100M
#quarkus.log.file.rotation.rotate-on-boot=true
#quarkus.log.file.rotation.file-suffix=.yyyy-MM-dd.gz
#quarkus.log.file.rotation.max-backup-index=3

# The default minimum log level for every log category, change only quarkus.log.level when needed.
quarkus.log.min-level=TRACE
# The default log level for every log category.
quarkus.log.level=INFO
# Determine whether to enable the JSON console formatting extension, which disables "normal" console formatting.
quarkus.log.console.json=false
# The port on which Debezium exposes Microprofile Health endpoint and other exposed status information.
quarkus.http.port=8088

# Optional properties.
# Each table name must match the name defined in the particular database metadata.
# List all the tables to be synchronized.
# debezium.source.table.include.list=schema.table1,schema.table2
# List all the columns to be synchronized.
# debezium.source.column.include.list=schema.table1.column1,schema.table2.column1
# List all the tables requiring filtering.
# debezium.source.snapshot.select.statement.overrides=schema.table1:schema.table2:schema.table3
# For each table, provide a valid query to override the default snapshot query.
# debezium.source.snapshot.select.statement.overrides.schema.table=select * from schema.table
```
