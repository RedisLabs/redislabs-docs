---
Title: Write-behind foreach example
linkTitle: Write-behind foreach
description:
weight: 30
alwaysopen: false
categories: ["redis-di"]
aliases: 
---


The `foreach` section is used to explode a list of objects or arrays to rows in a selected target.
The `foreach` expression is structured as `<field_name>:<JMESPath expression>`.
The following example uses the `add_field` transformation to prepare the input JSON to the desired structure. Then, it applies `foreach` to write each `order` object as a relational database record using `keys` and `mapping`.
In this example, the `JMESPath` function `to_string` is used to flatten an array of objects, `specs`, to a string.

```yaml
source:
  redis:
    key_pattern: orderdetail:*
    trigger: write-behind
    exclude_commands: ["json.del"]
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