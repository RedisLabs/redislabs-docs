---
Title: Data type conversion
linkTitle: Data type conversion
description: Describes how Redis Connect converts source data types to Redis data types.
headerrange: "2"
weight: 100
alwaysopen: false
categories: ["Connect"]
aliases: /connect/datatypes/
         /connect/datatypes.md
         /connect/data-types/
         /connect/data-types.md
---

Redis Connect converts source data to Redis data types.  The specific conversions depend on the original source and data type.  

This section describes data type conversions from different sources, including:

- Common/ANSI SQL types:

    [array](#array), [bigint](#bigint), [binary](#binary), [bitstring](#bitstring), [blob](#blob), [boolean](#boolean), [char](#char)   

    [date](#date), [integer](#integer), [interval](#interval), [null values](#null-values), [numeric](#numeric), [smallint](#smallint)   

    [text](#text), [timestamp](#timestamp-and-variants), [timetz](#timetz), [varbinary](#varbinary), [varchar](#varchar), [xml](#xml)  

- MySQL specific types:

    [enum](#m-enum), [geometry](#m-geometry), [geometrycollection](#m-geometrycollection), [json](#m-json), [linestring](#m-linestring)  

    [multilinestring](#m-multilinestring), [multipoint](#m-multipoint), [multipolygon](#m-multipolygon), [polygon](#m-polygon), [set](#m-set)

- Oracle specific types:

    [bfile](#o-bfile), [binary_double](#o-binary-double), [binary_float](#o-binary-float), [clob](#o-clob), [float, real, double precision](#o-float)  

    [long_raw](#o-long-raw), [nchar](#o-nchar), [nclob](#o-nclob), [number](#o-number), [nvarchar](#o-nvarchar)  

    [raw](#o-raw), [rowid](#o-rowid), [timestamp with tz](#o-timestamp), [urowid](#o-urowid)

- PostgreSQL specific types:

    [box](#p-box), [cidr](#p-cidr), [circle](#p-circle), [domain](#p_domain), [hstore](#p-hstore), [inet](#p-inet), [line](#p-line)  

    [macaddr](#p-macaddr), [money](#p-money), [path](#p-path), [json](#p-json), [point](#p-point), [polygon](#p-polygon), [uuid](#p-uuid)

- Microsoft SQL Server specific data types:

    [bit](#s-bit), [datetime2](#s-datetime2), [datetimmeoffset](#s-datetimeoffset), [decimal, float, real](#s-decimal), [image](#s-image)  

    [nchar](#s-nchar), [nvarchar](#n-nvarchar), [numeric](#s-numeric), [rowversion](#s-rowversion), [smalldatetime](#s-smalldatetime), [smallmoney](#smallmoney)  

    [Spatial geometry types](#s-geometry), [Spatial geography types](#s-geography), [table](#s-table), [text](#s-text), [uniqueidentifier](#s-uniqueidentifier)

Currently, Redis Connect stores incoming values as hashes.  As a result, all supported incoming values are converted to a string type.  The initial conversion is handled by the connector (Debezium).

Fields with unsupported data types do not appear in the target Redis database.

## Common/ANSI SQL types

This sections describes data types common to many relational databases systems. 

### array

Not supported

### bigint

Target data type (hash): bytes string 

The string value is either base64-encoded or hex-encoded, based on the value of the `binary.handling.mode` property in the connector configuration.

Example: The input value is saved as a string.  
    
For example, `2147483648` is saved as `"2147483648"`.

### binary

Target data type (hash): bytes string

The binary value is either base64-encoded or hex-encoded, based on the value of the `binary.handling.mode` property in the connector configuration.

Example: When `binary.handling.mode` is set to `bytes`, the value is saved as a binary string and then transformed into the Redis data type
    
To illustrate, the value `hello` is added to the table as a binary string (`0x68656C6C6F`).  This is stored in the Redis Connect instance as `aGVsbG8AAAAAAAAAAAAAAAAAAAA=`, which is also the value passed to the Redis database.
    
### bitstring

Not supported

### blob

Target data type (hash): bytes string

The binary value is either base64-encoded or hex-encoded, based on the value of the `binary.handling.mode` property in the connector configuration.

Example: When `binary.handling.mode` is set to `bytes`, the binary image file loaded into the source table is converted by Debezium to bytes, which are stored in the target Redis database as a bytes string.

### boolean

Target data type (hash): string

Example:  True values are stored as `"1"` (one); false values are stored as `"0"` (zero).

### char

Target data type (hash): string, includes support for [UTF-8](https://en.wikipedia.org/wiki/UTF-8) and [Unicode](https://home.unicode.org/basic-info/faq/)

Example:  PostgreSQL fixed length strings (example: `char(14)`) are space padded to full length.  For example, `"hello world"` is saved as `"hello world  "` in the example declaration shown here.  To learn more, see [Character types](https://www.postgresql.org/docs/current/datatype-character.html).

Padded string values carry through to the Redis database.

### date

Target data type (hash): string representing microsecond epoch time.

Example: PostgreSQL date values (example: `2021-01-29`) are converted by Debezium to integer values representing the days since the epoch.  These values are converted to milliseconds since the epoch and then stored as strings (`1611878400000`).

### integer

Target data type (hash): string

Example:  `2147483640` is stored as '"2147483640"'

### interval

Not supported

### null values

Fields with null values are not added to the target database.

### numeric

Target data type (hash): string

The `handling.decimal.mode` Debezium configuration parameter determines how the connector maps decimal values.  When this is set to 'precision', the binary string received by Debezium is converted to its corresponding numeric value.

Example:  Debezium converts a PostgreSQL field value of `4521398.56` to a binary string (`GvMbUA==`).  This is then converted to a numeric value and stored in the target Redis database as `"4521398.56"`.

### smallint

Target data type (hash): string

Example:  `32767` is stored as `"32767"`

### text

Target data type (hash): string, includes support for [UTF-8](https://en.wikipedia.org/wiki/UTF-8) and [Unicode](https://home.unicode.org/basic-info/faq/)

Example: `"This is a very long string value for a PostgreSQL text column."`

### time

Target data type (hash): string representing the number of seconds past midnight

Example: An input value of `14:23:46` is converted to `"51826000000"`

### timestamp (and variants)

Specific handling depends on the source data type.

Target data type (hash): String

- PostgreSQL and Oracle timestamp, MySQL and Microsoft SQL Server datetime:

    The input value is converted to a string reprsenting the number of milliseconds since the epoch.  
        
    The Microsoft SQL Server datetime format is YYYY-MM-DD hh:mm:ss\[.nnn] and ranges from 1753-01-01 through 9999-12-31.

- PostgreSQL timestamptz, Oracle timestamp with local timezone, MySQL timestamp:

    The input value is converted to UTC and stored as an integer representing the number of microseconds since the epoch.

Example: A PostgreSQL input value of `2018-06-20 15:13:16.945104` is stored in the target Redis database as `"1529507596945.104"`.

### timetz

Target data type (hash): string representing the number of seconds past midnight

Example: An input PostgreSQL field value of '14:23:46.12345' is converted by Debezium to `"12:23:46.12345Z"` and stored in th target Redis database as redis target as: `44638.345"`.

### varbinary

Target data type (hash): bytes string

The binary value is either base64-encoded or hex-encoded, based on the value of the `binary.handling.mode` property in the connector configuration.

Example: When `binary.handling.mode` is set to `bytes`, the string `hello` is added to the table as a binary string (`0x68656C6C6F`).  This is converted to `aGVsbG8=`, which is stored in the Redis database.

### varchar

Target data type (hash): string, includes support for [UTF-8](https://en.wikipedia.org/wiki/UTF-8) and [Unicode](https://home.unicode.org/basic-info/faq/)

Example: An input value of `"hello world"` is saved to the target Redis database as `"hello world"` 

### xml

Target data type (hash): string

Example: 

``` xml
"<contact-info>
   <name>J. Doe</name>
   <company>Redis, Inc.</company> 
   <phone>+1 (415) 930-9666</phone>
</contact-info>"
```

## MySQL specific types

MySQL supports several data types beyond the traditional ANSI data types.  Here's how Redis Connect converts these for Redis databases.

### enum {#m-enum}

Target data type (hash): string

Example: A MySQL value of `"cat"` is stored in a target Redis database as `"cat`".

### geometry {#m-geometry}

Not supported

### geometrycollection {#m-geometrycollection}

Not supported

### json {#m-json}

Target data type (hash): string

Example: `{"pid": 101, "key1": "value1", "key2": "value2"}`

### linestring {#m-linestring}

Not supported

### multilinestring {#m-multilinestring}

Not supported

### multipoint {#m-multipoint}

Not supported

### multipolygon {#m-multipolygon}

Not supported

### polygon {#m-polygon}

Not supported

### set {#m-set}

Target data type (hash): string

Example: A MySQL value of `"1,2,3"` is stored in a target Redis database as  `"1,2,3"`.

## Oracle specific types

### bfile {#o-bfile}

Not supported

### binary_double {#o-binary-double}

Target data type (hash): string

Example: `"1.7E+308"`

### binary_float {#o-binary-float}

Target data type (hash): string

Example: `"3.40282E38"`

### clob {#o-clob}

Target data type (hash): string

### float, real, double precision {#o-float}

Target data type (hash): string  

Example: real-FLOAT(63), double precision - FLOAT(126)

The `handle.decimal.mode` Debezium connector configuration setting affects this.  When it's  to `double`, an input value of `-3.402E+38` is saved to the target Redis database as  `-340200000000000000000000000000000000000`.

### long_raw {#o-long-raw}

Not supported

### nchar {#o-nchar}

Target data type (hash): string supporting Unicode characters  

Example: An Oracle input value of "Peace in Hebrew is שלום" is saved to the Redis database as `"Peace in Hebrew is \xd7\xa9\xd7\x9c\xd7\x95\xd7\x9d"`.  Trailing spaces are added to fill the field value.

### nclob {#o-nclob}

Not supported

### number(p, s) {#o-number}

Target data type (hash): string  

Example: `"10385274000.32"`

### nvarchar {#o-nvarchar}

Target data type (hash): string supporting Unicode characters  

Example: An Oracle input value of "Peace in Hebrew is שלום" is saved to the Redis database as `"Peace in Hebrew is \xd7\xa9\xd7\x9c\xd7\x95\xd7\x9d"`.

### raw {#o-raw}

Not supported

### rowid {#o-rowid}

Target data type (hash): string  

Example: `"AAAR1QAAOAAAACFAAA"`

### timestamp with tz {#o-timestamp}

Target data type (hash): string  

Example: Debezium converts an an Oracle input value of `2021-12-30 14:23:46` to `"2021-12-30T14:23:46+02:00"`.  This is stored in the target Redis database as `"1611878400000"`, which represents the milliseconds since the the Epoch.

### urowid {#o-urowid}

Not supported

## PostgreSQL specific types

### box {#p-box}

### cidr {#p-cidr}

### circle {#p-circle}

### domain {#p_domain}

### hstore {#p-hstore}

### inet {#p-inet}

### line {#p-line}

### macaddr {#p-macaddr}

### money {#p-money}

### path {#p-path}

### json {#p-json}

### point {#p-point}

### polygon {#p-polygon}

### uuid {#p-uuid}

## SQL Server types

### bit {#s-bit}

### datetime2 {#s-datetime2}

### datetimmeoffset {#s-datetimeoffset}

### decimal, float, real {#s-decimal}

### image {#s-image}

### nchar {#s-nchar}

### nvarchar {#n-nvarchar}

### numeric {#s-numeric}

### rowversion {#s-rowversion}

### smalldatetime {#s-smalldatetime}

### smallmoney {#smallmoney}

### Spatial geometry types {#s-geometry}

### Spatial geography types {#s-geography}

### table {#s-table}

### text {#s-text}

### uniqueidentifier {#s-uniqueidentifier}