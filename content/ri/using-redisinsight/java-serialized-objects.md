---
Title: View Java Serialized Objects in Redis
weight: 100
alwaysopen: false
categories: ["RI"]
path: features/view-java-serialized-objects/
---
RedisInsight detects java serialized objects and converts them to a nicely formatted JSON object, along with the fully qualified class name.

![java-serialized-objects](/images/ri/java-serialized-objects.png)

It doesn't matter what you store. Whether it is a hibernate object, or a user session or a plain old java object, RedisInsight reverse-engineers and show it to you nicely.

Just for fun, we tried out how such an object would look without the formatting.

![java-serialized-objects-noprettyprint](/images/ri/java-serialized-objects-noprettyprint.png)
