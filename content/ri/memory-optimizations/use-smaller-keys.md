---
Title: Use Smaller Keys
date: 2018-03-26 16:49:29 +0530
weight: 20
categories: ["RI"]
path: memory-optimizations/use-smaller-keys/
altTag: Use Smaller Keys
---
Redis keys can play a devil in increasing the memory consumption for your Redis instances. In general, you should always prefer descriptive keys but if you have a large dataset having millions of keys then these large keys can eat a lot of your money.

## How to Convert to Smaller Keys

In a well written application, switching to shorter keys usually involves updating a few constant strings in the application code.

You have to identify, all the big keys in your Redis Instance and shorten it by removing extra characters from it. You can achieve this in two ways:

1. You can identify the big keys in your Redis Instance by using RedisInsight. This gives you details about all the keys and a way to sort your data based on the length of keys.
1. Alternatively, you can run the command `redis-cli --bigkeys`

Advantage of using RedisInsight is that it gives you the big keys from the whole dataset whereas the big keys commands run over a certain set of records and return the big keys from that set, hence it is difficult to identify the big keys from the whole dataset using big keys.

## Advantages

Let's take an example:
Suppose you have 100,000,000 keys name like

```bash
my-descriptive-large-keyname (28 characters)
```

Now if you shorten the key name like

```bash
my-des-lg-kn (12 characters)
```

You save 16 characters by shortening your key i.e. 16 bytes which lets you save **1,000,000,000*16 = 1.6GB of RAM Memory !**

## Trade Offs

Large Keys were more descriptive then shortened keys, hence when reading through your database you may find the keys less relatable, but the memory and cost savings are much efficient as compared to this pain.
