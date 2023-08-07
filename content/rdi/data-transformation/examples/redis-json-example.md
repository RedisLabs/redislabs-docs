# Writing to a Redis JSON document

> Note: RedisJSON module must be enabled in the target Redis database to be able to utilize this feature

In the example below, the data is captured from the source table named `invoice` and is written to the Redis database as a JSON document. The connection is an optional parameter that must refer to the corresponding connection name defined in `config.yaml`. When the `data_type` parameter is specified for the job, it overrides the system-wide setting `target_data_type` (defined in `config.yaml`). 

The additional optional parameter `on_update` can specify the writing strategy (`replace` - the default or `merge`) - this will affect how the document is written to the target. Replacing the document will overwrite it completely, while merging will update it with the fields captured in the source, keeping any other intact. Replace is usually more performant, while merge allows other jobs and applications to set extra fields to the same JSON documents. 

In this case, the results will be Redis JSON documents with the key names constructed based on the key expression (e.g. `invoice_id:1`) and the expiration set to 100 seconds for each key. If no `expire` parameter is given, the keys will never expire.    

```yaml
source:
  server_name: chinook
  schema: public
  table: invoice
output:
  - uses: redis.write
    with:
      connection: target
      data_type: json
      key:
        expression: concat(['invoice_id:', InvoiceId])
        language: jmespath
      on_update: replace        
      expire: 100
```