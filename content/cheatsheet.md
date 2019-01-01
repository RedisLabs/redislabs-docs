---
title: Markdown Cheatsheet
description: Syntax instructions for markdown formatting
favorite_food: ice cream
draft: false
---
## Tabbed paragraphs

A tabbed paragraph create scrolling code blocks like this:

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur, velit sit amet tempus commodo, orci ipsum laoreet turpis, eu ullamcorper orci enim ut dui.

A tabbed paragraph in a bulleted or numbered list create indented paragraphs like this:

- Lorem

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur, velit sit amet tempus commodo, orci ipsum laoreet turpis, eu ullamcorper orci enim ut dui.

## Page variables

You can add custom variables to the page metadata and use these variables within the page.

Markdown:
```yaml
---
title: my page
favorite_food: ice cream
---

I love {{</* field "favorite_food" */>}}!
```

HTML: *I love {{< field "favorite_food" >}}!*

## Links to internal pages

- To link to another page in the content directory:

    `[Redis Enterprise VPC Quick Setup]({{</* relref  "/rv/quick-setup.md" */>}})`

    For example: [Redis Enterprise VPC Quick Setup]({{< relref  "/rv/quick-setup.md" >}})

- To link to an anchor on another page in the content directory:

    `[Sign up for Redis Enterprise VPC]({{</* relref "/rv/quick-setup.md#step-1-sign-up-for-redis-enterprise-vpc-account" */>}})`

    For example: [Sign up for Redis Enterprise VPC]({{< relref "/rv/quick-setup.md#step-1-sign-up-for-redis-enterprise-vpc-account" >}})

## Text Formatting

| **Description** | **Syntax** | **Output** |
|-------------|----------------|-------------
| Emphasized text | \*emphasized\* | *emphasized* |
| Bold text | \*\*bold\*\* | **bold** |
| Inline code | \`print "hello world!"\` | `print "hello world!"` |

## Code Blocks

To add code blocks of a specific language, e.g. python, type this:

~~~md
```python

##this is python code

def hello_world():

  print "Hello World!"

```
~~~

Output:

```python
##this is python code

def hello_world():
  print "Hello World!"
```

## Tables

**Syntax**:

```md
| heading 1 | heading 2 | heading 3 |
| :-----| :-----: |-----: |
| cell 1x1  | cell 1x2  | cell 1x3  |
| cell 2x1  | cell 2x2  | cell 2x3  |
```

**Output**:

| heading 1 | heading 2 | heading 3 |
| :-----| :-----: |-----: |
| cell 1x1  | cell 1x2  | cell 1x3  |
| cell 2x1  | cell 2x2  | cell 2x3  |

## Adding an image

1. Copy the image to a directory in: /static/images
1. In the markdown page, add the alt text and path to the image like this:
`![Alt text]( /images/path/image.png )
`

For example, `![Redis Enterrpise Cluster]( /images/rs/rp_stack.png )` shows:

![Redis Enterrpise Cluster]( /images/rs/rp_stack.png )

To make an image appear on the next line in a list:

1. Write your instruction.
1. Add 2 spaces at the end of the line and put the image on the next line with a tab indentation.  
    ![Redis Enterrpise Cluster]( /images/rs/rp_stack.png )

## Expanding Blocks

```md
{{%expand "How do you make expanding blocks?" %}}
This is how you make expanding blocks.
{{% /expand%}}
```

{{%expand "How do you make expanding blocks?" %}}
This is how you make expanding blocks.
{{% /expand%}}

## Excerpts

### Defining an excerpt

```
{{%excerpt%}}The Redis OSS Cluster API support in Redis Enterprise Software (RS)
provides a simple mechanism for cluster-aware Redis clients to learn
and know the cluster topology. This enables clients to connect directly
to an RS proxy on the node hosting the master shard for the data being
operated on.{{% /excerpt%}}
```

{{%excerpt%}}The Redis OSS Cluster API support in Redis Enterprise Software (RS)
provides a simple mechanism for cluster-aware Redis clients to learn
and know the cluster topology. This enables clients to connect directly
to an RS proxy on the node hosting the master shard for the data being
operated on.{{% /excerpt%}}

### Including an excerpt

``` {{%excerpt-include filename="rs/concepts/data-access/oss-cluster-api.md" %}} ```

{{%excerpt-include filename="rs/concepts/data-access/oss-cluster-api.md" %}}

## Panels

### Info

Info boxes give background information that does not prevent proper use of the product.

**Syntax**:

` {{%/* info title="FYI" */%}}After you do this the first time, it gets easier.{{%/* /info */%}} `

**Output**:

{{% info title="FYI" %}}After you do this the first time, it gets easier.{{% /info %}}

### Tip

Tips give additional information for improved use of the product.

**Syntax**:

` {{%/*tip title="A friendly tip!" */%}}Eating on time prevents hunger.{{%/* /tip */%}} `

**Output**:

{{%tip title="A friendly tip!" %}}Eating on time prevents hunger.{{% /tip %}}

### Note

Notes suggest steps that prevent errors that do not cause data loss.

**Syntax**:

` {{%/* note title="Here is a note" */%}}Make sure you have enough disk space.{{%/* note */%}} `

**Output**:

{{% note title="Here is a note" %}}Make sure you have enough disk space.{{% /note %}}

### Warning

Warnings suggest that users think carefully before doing steps that can cause irresversible data loss.

**Syntax**:

` {{%/* warning title="ACHTUNG" */%}}Backup your data before erasing the hard disk!{{%/* warning */%}} `

**Output**:

{{% warning title="ACHTUNG" %}}Backup your data before erasing the hard disk!{{% /warning %}}
