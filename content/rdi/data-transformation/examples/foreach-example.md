# Write Behind foreach example

The `foreach` section is used in order to explode a list of objects or arrays to rows is a selected target.
The `foreach` expression is structured in the following way `foreach <filed_name>:<JMESPath expression>`.
The example below uses the `add_field` transformation to prepare the input JSON to the desired structure and then applies `foreach` to write each `order` object as a relational database record using `keys` and `mapping`.
In this example the `JMESPath` function `to_string` is used to flatten an array of objects `specs` to a string.


```yaml
source:
  keyspace:
          pattern: orderdetail:*
transform:
  - uses: add_field
    with:
      fields:
        - field: my_orders
          language: jmespath
          expression: |
            orders[*].{
              code: code
              periodStartTime: periodStartTime
              periodEndTime: periodEndTime
              specs: to_string(specs)
            }
output:
  - uses: relational.write
    with:
      connection: mssql
      schema: dbo
      table: OrderMaster
      keys:
        - Code: orderDetail.code
      mapping:
        - DeliveryDate: orderDetail.deliveryDate
        - ProductCode: orderDetail.productCode
        - CountryCode: orderDetail.countryCode
  - uses: relational.write
    with:
      connection: mssql
      schema: dbo
      table: Order
      foreach: "order: my_orders[]"
      keys:
        - Code: order.code
      mapping:
        - OrderDetailCode: orderDetail.code
        - PeriodStartTime: order.periodStartTime
        - PeriodEndTime: order.periodEndTime
        - Specs: order.specs

```