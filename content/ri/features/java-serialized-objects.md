---
layout: docs
title:  View Java Serialized Objects in Redis
description: View Cached Java Serialized Objects | Redis GUI
category: docs
permalink: docs/features/view-java-serialized-objects/
pageTitle: View Java Serialized Objects
---


RDBTools GUI for redis detects java serialized objects and converts them to a nicely formatted JSON object, along with the fully qualified class name.

<img src="/img/documentation/java-serialized-objects.png" alt="RDBTools GUI for Redis showing java serialized objects as a nicely formatted JSON"/>


It doesn't matter what you store. Whether it is a hibernate object, or a user session or a plain old java object, RDBTools will reverse engineer and show it to you nicely.


Just for fun, we tried out how such an object would look without the formatting. Total garbage.

<img src="/img/documentation/java-serialized-objects-noprettyprint.png" alt="Java Serialized Objects Unformmatted Is Garbage"/>
