# Writing to a Redis sorted set

In the example below, the data is captured from the source table named `invoice` and is written to a Redis sorted set. The connection is an optional parameter that must refer to the corresponding connection name defined in `config.yaml`. When the `data_type` parameter is specified for the job, it overrides the system-wide setting `target_data_type` (defined in `config.yaml`). 
When writing to sorted sets, two additional arguments `member` and `score` must be provided,  specifying the field names that will be used as a member and score to add an element to a sorted set. In this case, the results will be a Redis sorted set named `invoices:sorted` based on the key expression and the expiration will be set to 100 seconds for each key. If no `expire` parameter is given, the keys will never expire.

```yaml
source:
  server_name: chinook
  schema: public
  table: invoice
output:
  - uses: redis.write
    with:
      connection: target
      data_type: sorted_set
      key:
        expression: "`invoices:sorted`"
        language: jmespath
      args:
        score: Total
        member: InvoiceId 
      expire: 100      
```

Since sorted sets in Redis are inherently sorted, the set can easily be used to get top N invoices by total invoice amount using the command below (e.g. 0..9 range will show top 10 invoices):

```
ZREVRANGE invoices:sorted 0 9 WITHSCORES
```