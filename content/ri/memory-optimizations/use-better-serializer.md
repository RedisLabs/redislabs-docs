---
Title: Use Better Serializer
date: 2018-03-26 16:49:29 +0530
weight: 50
categories: ["RI"]
path: memory-optimizations/use-better-serializer/
altTag: Use Better Serializer
---
Redis does not have any specific data type to store the serialized objects, they are stored as byte array in Redis. If we are using regular means of serializing our java,python and PHP objects, they can be of larger size which impacts the memory consumption and latency.

## Which Serializers to Use

Instead of default serializer of your programming language (java serialzed objects, python pickle, PHP serialize etc), switch to a better library. There are various libraries like - Protocol Buffers, MessagePack etc.

### MessagePack

MessagePack is an efficient binary serialization format. It lets you exchange data among multiple languages like JSON. But it's faster and smaller. Small integers are encoded into a single byte, and typical short strings require only one extra byte in addition to the strings themselves.

As said by Salvatore Sanfilippo, creater of Redis

`Redis scripting has support for MessagePack because it is a fast and compact serialization format with a simple to implement specification. I liked it so much that I implemented a MessagePack C extension for Lua just to include it into Redis.`

### Protocol Buffers

Protocol buffers, usually referred as Protobuf, is a protocol developed by Google to allow serialization and deserialization of structured data. Google developed it with the goal to provide a better way, compared to XML, to make systems communicate. So they focused on making it simpler, smaller, faster and more maintainable then XML.
