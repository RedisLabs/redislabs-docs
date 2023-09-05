---
Title: Write to a Redis set
linkTitle: Write to a Redis set
description:
weight: 30
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

In the example below, the data is captured from the source table named `invoice` and is written to a Redis set. The connection is an optional parameter that must refer to the corresponding connection name defined in `config.yaml`. When the `data_type` parameter is specified for the job, it overrides the system-wide setting `target_data_type` (defined in `config.yaml`). 
When writing to sets the additional argument `member` must be provided,  specifying the field that will be written to a set. In this case, the results will be a Redis set with the key names constructed based on the key expression (e.g. `invoices:Germany`, `invoices:USA`, etc.) and the expiration set to 100 seconds for each key. If no `expire` parameter is given, the keys will never expire.    

```yaml
source:
  server_name: chinook
  schema: public
  table: invoice
output:
  - uses: redis.write
    with:
      connection: target
      data_type: set
      key:
        expression: concat(['invoices:', BillingCountry])
        language: jmespath
      args:
        member: InvoiceId
      expire: 100
```