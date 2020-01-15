---
Title: Compress Field Names
date: 2018-03-26 16:49:29 +0530
weight: 120
categories: ["RI"]
path: memory-optimizations/compress-field-names/
altTag: Compress Field Names
---
Redis Hash consists of Fields and their values. Like values, field name also consumes memory, so it is required to keep in mind while assigning field names. If you have a large number of hashes with similar field names, the memory adds up significantly.
To reduce memory usage, you can use smaller field names.

## What do We Mean By Compress Field Names

Referring to the previous example in convert hashes to list, we had a hash having user details.

```bash
hmset user:123 id 123 firstname Bob lastname Lee
location CA twitter bob_lee
```

In this case- firstname, lastname, location, twitter are all field names which could have been shortened to:
`fn, ln, loc, etc`. By doing this, you could have saved some memory that was been used by the field names.
