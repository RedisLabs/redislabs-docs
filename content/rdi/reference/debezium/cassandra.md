---
parent: Debezium Server Configuration File
title: cassandra
grand_parent: Reference
---

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

debezium.source.connector.class=io.debezium.connector.cassandra.Cassandra4Connector
debezium.source.offset.storage=io.debezium.server.redis.RedisOffsetBackingStore
debezium.source.topic.prefix=<SOURCE_LOGICAL_SERVER_NAME>


debezium.source.cassandra.node.id=<NAME_SOURCE_NODE>
debezium.source.cassandra.hosts=<SOURCE_DB_HOST>
debezium.source.cassandra.port=<SOURCE_DB_PORT>
debezium.source.cassandra.config=<ABSOLUTE_PATH_CONFIG_FILE>
debezium.source.commit.log.relocation.dir=<RELOCATION_DIR>
debezium.source.commit.log.real.time.processing.enabled=true
debezium.source.commit.marked.complete.poll.interval.ms=1000
debezium.source.http.port=8040

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
