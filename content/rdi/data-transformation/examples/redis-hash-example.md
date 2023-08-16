# Writing to a Redis hash

In the below example, the data is captured from the source table named `invoice` and is written to the Redis database as a `hash`. The connection is an optional parameter that must refer to the corresponding connection name defined in `config.yaml`. 
When the `data_type` parameter is specified for the job, it overrides the system-wide setting `target_data_type` (defined in `config.yaml`). 

In this case, the results will be Redis hashes with keys based on the key expression (e.g. `invoice_id:1`) and the expiration set to 100 seconds for each key. 
If no `expire` parameter is given, the keys will never expire.    

```yaml
source:
  server_name: chinook
  schema: public
  table: invoice
output:
  - uses: redis.write
    with:
      connection: target
      data_type: hash
      key:
        expression: concat(['invoice_id:', InvoiceId])
        language: jmespath
      expire: 100
```