# Writing to a Redis stream

In the example below, the data is captured from the source table named `invoice` and is written to a Redis stream. The connection is an optional parameter that must refer to the corresponding connection name defined in `config.yaml`. 
When the `data_type` parameter is specified for the job, it overrides the system-wide setting `target_data_type` (defined in `config.yaml`). 

When writing to streams, the optional parameter `mapping` can be used to limit the number of fields sent to a stream in a message and to provide aliases to them. When the `mapping` parameter is not used, all fields captured in the source will be passed as the message payload. 

Note that streams are different to other data structures in a way that we never update or delete the existing messages. Any operation in the source will generate a new message with the corresponding operation code (`op_code` field) that is automatically added to the message payload. 

In this case, the results will be a Redis stream with the name based on the key expression (e.g. `invoice:events`) and the expiration set to 100 seconds for the whole stream. If no `expire` parameter is given, the keys will never expire. 

In the example below, only three original fields will be passed in the message payload: `InvoiceId` (as `message_id`), `BillingCountry` (as `country`), `Total` (as `Total`, no alias provided) and `op_code` (which is implicitly added to all messages sent to streams).    

```yaml
source:
  server_name: chinook
  schema: public
  table: invoice
output:
  - uses: redis.write
    with:
      connection: target
      data_type: stream
      key:
        expression: "`invoice:events`"
        language: jmespath
      mapping:
        - InvoiceId: message_id
        - BillingCountry: country
        - Total
      expire: 100
```