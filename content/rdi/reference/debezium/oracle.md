---
Title: RDI configuration for oracle
linkTitle: oracle
description: Describes the `application.properties` settings that configure Debezium Server for oracle
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

debezium.source.connector.class=io.debezium.connector.oracle.OracleConnector
debezium.source.log.mining.strategy=online_catalog
debezium.source.log.mining.transaction.retention.ms=1800000
# Specifies a comma-separated list of Oracle Real Application Clusters (RAC) SCAN VIP names.
# To obtain the list of configured SCAN VIP names, use the command: `srvctl config scan`.
#debezium.source.rac.nodes=<SCAN_VIP1>,<SCAN_VIP2>...
# If you supply a JDBC URL for the database by using the `database.url` property, instead of defining a value for `database.port`, each RAC node entry must explicitly specify a port value.
# This mode creates a JDBC query that filters not only operation types at the database level, but also schema, table, and username include/exclude lists.
debezium.source.log.mining.query.filter.mode=in
# The name of the Oracle Pluggable Database that the connector captures changes from.
# For non-CDB installation, do not specify this property.
#debezium.source.database.pdb.name=ORCLPDB1
# Enables capturing and serialization of large object (CLOB, NCLOB, and BLOB) column values in change events.
#debezium.source.lob.enabled=true
# Specifies the constant that the connector provides to indicate that the original value is unchanged and not provided by the database.
#debezium.source.unavailable.value.placeholder=__debezium_unavailable_value
debezium.source.offset.storage=io.debezium.storage.redis.offset.RedisOffsetBackingStore
debezium.source.topic.prefix=<SOURCE_LOGICAL_SERVER_NAME>
debezium.source.database.dbname=<SOURCE_DB_NAME>

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

# Important: Do NOT use `include` and `exclude` table lists at the same time, use either `include` or `exclude`.
# An optional, comma-separated list of regular expressions that match fully-qualified table identifiers of tables whose changes you want to capture.
#debezium.source.table.include.list=<SCHEMA_NAME.TABLE_NAME1>,<SCHEMA_NAME.TABLE_NAME2>...
# An optional, comma-separated list of regular expressions that match fully-qualified table identifiers for tables whose changes you do not want to capture.
#debezium.source.table.exclude.list=<SCHEMA_NAME.TABLE_NAME1>,<SCHEMA_NAME.TABLE_NAME2>...

# Important: Do NOT use `include` and `exclude` column lists at the same time, use either `include` or `exclude`.
# An optional, comma-separated list of regular expressions that match the fully-qualified names of columns to include in change event record values.
#debezium.source.column.include.list=<SCHEMA_NAME.TABLE_NAME.COLUMN_NAME1>,<SCHEMA_NAME.TABLE_NAME.COLUMN_NAME2>...
# An optional, comma-separated list of regular expressions that match the fully-qualified names of columns to exclude from change event record values.
#debezium.source.column.exclude.list=<SCHEMA_NAME.TABLE_NAME.COLUMN_NAME1>,<SCHEMA_NAME.TABLE_NAME.COLUMN_NAME2>...

# Data filtering during snapshot.
# Table names must be in uppercase unless you have created a case-sensitive table name.
#debezium.source.snapshot.select.statement.overrides=schema.TABLE11,schema.TABLE2,schema.TABLE3
# An optional query. Provide a valid query to override the default snapshot query.
# Table names must be in uppercase unless you have created a case-sensitive table name.
#debezium.source.snapshot.select.statement.overrides.<schema>.<TABLE>=select * from <schema>.<table>

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
```
