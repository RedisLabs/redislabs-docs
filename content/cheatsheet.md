---
title: Markdown Cheatsheet
description: Syntax instructions for markdown formatting
favorite_food: ice cream
draft: false
---
Here you can find examples of style and formatting elements that you can use in your pages.

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

## Code

Code can be displayed using the code shortcode as well.

**Syntax**:

```
{{%/* code */%}}var x = 123;{{%/* /code */%}}
```

**Output**:

{{% code %}}var x = 123;{{% /code %}}

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

### Image shortcode

Images can also be added using the **image** shortcode.

**Syntax**:

```
{{%/* image filename="/images/rs/rp_stack.png" */%}}
```

**Output**:

{{% image filename="/images/rs/rp_stack.png" %}}


## Adding a video

To embed a video, use the `video` shortcode with the location of the video and a video title.

`{{</* video "/images/<path>/<video>.mp4" "Video title" */>}}`

{{< video "/images/rs/crdb_service_account.mp4" "CRDB Service Account" >}}

### YouTube

#### Default
Embed YouTube video.

**Syntax**:

``` 
{{%/* youtube Bi1T3toQfF4 */%}}
```

**Output**:

{{% youtube Bi1T3toQfF4 %}}

#### Start from time
Embed YouTube video and start playback from specific timestamp.

**Syntax**:

``` 
{{%/* youtube_start Bi1T3toQfF4 10 */%}}
```

**Output**:

{{% youtube_start Bi1T3toQfF4 10 %}}

## Expanding Blocks

```md
{{%/* expand "How do you make expanding blocks?" */%}}
This is how you make expanding blocks.
{{%/* /expand */%}}
```

{{%expand "How do you make expanding blocks?" %}}
This is how you make expanding blocks.
{{% /expand%}}

## Excerpts

### Defining an excerpt

```
{{%/* excerpt */%}}The Redis OSS Cluster API support in Redis Enterprise Software (RS)
provides a simple mechanism for cluster-aware Redis clients to learn
and know the cluster topology. This enables clients to connect directly
to an RS proxy on the node hosting the master shard for the data being
operated on.{{%/* /excerpt */%}}
```

{{% excerpt %}}The Redis OSS Cluster API support in Redis Enterprise Software (RS)
provides a simple mechanism for cluster-aware Redis clients to learn
and know the cluster topology. This enables clients to connect directly
to an RS proxy on the node hosting the master shard for the data being
operated on.{{% /excerpt %}}

### Including an excerpt

```
{{%/* excerpt-include filename="rs/concepts/data-access/oss-cluster-api.md" */%}}
```

{{%excerpt-include filename="rs/concepts/data-access/oss-cluster-api.md" %}}

## Informative Notices

### Info

Info boxes give background information that does not prevent proper use of the product.

**Syntax**:

```
{{%/* info */%}}After you do this the first time, it gets easier.{{%/* /info */%}}
```

**Output**:

{{% info %}}After you do this the first time, it gets easier.{{% /info %}}

### Tip

Tips give additional information for improved use of the product.

**Syntax**:

```
{{%/* tip */%}}Eating on time prevents hunger.{{%/* /tip */%}}
```

**Output**:

{{% tip %}}Eating on time prevents hunger.{{% /tip %}}

### Note

Notes suggest steps that prevent errors that do not cause data loss.

**Syntax**:

```
{{%/* note */%}}Make sure you have enough disk space.{{%/* /note */%}}
```

**Output**:

{{% note %}}Make sure you have enough disk space.{{% /note %}}

### Alert

Alerts suggest that users think carefully ...

**Syntax**:

```
{{%/* alert */%}}Are you sure?{{%/* /alert */%}}
```

**Output**:

{{% alert %}}Are you sure?{{% /alert %}}

### Warning

Warnings suggest that users think carefully before doing steps that can cause irresversible data loss.

**Syntax**:

```
{{%/* warning */%}}Backup your data before erasing the hard disk!{{%/* /warning */%}}
```

**Output**:

{{% warning %}}Backup your data before erasing the hard disk!{{% /warning %}}

## Label

Label displays a label. The type parameter can be passed to the shortcode in order to display the label in a different color, eg. **success** for a green label, **warning** for orange, **info** for blue and **danger** for red.

**Syntax**:

```
{{%/* label type="info" */%}}This is a label{{%/* /label */%}}
```

**Output**:

{{% label type="info" %}}This is a label{{% /label %}}

## All children

Allchildren displays all the child pages of current page.

**Syntax**:

```
{{%/* allchildren style="h2" description="true" */%}}
```

**Output**:

See example [here](/rc/administration).


## Anchor Link

Anchor Link links to another part of the page, ie. the anchor link.

**Syntax**:

```
{{%/* anchorlink anchor="example" */%}}An example anchor{{%/* /anchorlink */%}}
```

**Output**:

{{% anchorlink anchor="example" %}}An example anchor{{% /anchorlink %}}

## Button

Button displays a button. The theme parameter can be passed to the shortcode in order to display the button in a different color, eg. **success** for a green button, **warning** for orange, **info** for blue and **danger** for red.

**Syntax**:

```
{{%/* button theme="success" */%}}Click here{{%/* /button */%}}
```

**Output**:

{{% button theme="success" %}}Click here{{% /button %}}

## Icon

Icon displays one of the icons available in Bootstraps **Glyphicon** pack. List of icons available can be found [here](https://getbootstrap.com/docs/3.3/components/#glyphicons).

**Syntax**:

```
{{%/* icon "fa-calendar" */%}}
```

**Output**:

{{% icon "fa-calendar" %}}

## Emoticon

Emoticon displays one of the following icons: *thumbs-up*, *thumbs-down*, *information*, *tick*, *cross*, *warning*, *smile*, *sad*, *cheeky*, *laugh*, *wink*.

**Syntax**:

```
{{%/* emoticon name="thumbs-up" */%}}{{%/* /emoticon */%}}
```

**Output**:

{{% emoticon name="thumbs-up" %}}{{% /emoticon %}}

## Header

Header displays the menu of current page along with a title.

**Syntax**:

```
{{%/* header */%}} The menu of this page {{%/* /header */%}}
```

**Output**:

{{% header %}} The menu of this page {{% /header %}}

## Recently updated
This shortcode can be used to display recently updated articles.

**Syntax**:

```
{{%/* recently-updated */%}} Recently updated articles {{%/* /recently-updated */%}}
```

**Output**:

{{% recently-updated %}}
Recently updated articles
{{% /recently-updated %}}

## TOC
This shortcode displays the table of contents of current page.

**Syntax**:

```
{{%/* toc */%}}
```

**Output**:

{{% toc %}}

## Well
Well displays content inside a container.

**Syntax**:

``` 
{{%/* well */%}} Inside a well {{%/* /well */%}} 
```

**Output**:


{{% well %}}
Inside a well
{{% /well %}}

## Embedding a partial

A partial markdown or HTML file can be included in other files using the **embed-md** or **embed-html** shortcodes. Partials should be placed in `layouts/partials/embeds` directory.

Syntax for embedding a markdown partial:

```
{{</* embed-md "sample.md"  */>}}
```

{{< embed-html "sample.md" >}}

Syntax for embedding an HTML partial:

```
{{</* embed-html "sample-table.html" */>}}
```

{{< embed-html "sample.html" >}}

## Other Shortcodes

- [Attachments](https://learn.netlify.com/en/shortcodes/attachments/)
- [Mermaid](https://learn.netlify.com/en/shortcodes/mermaid/)
- [Children](https://learn.netlify.com/en/shortcodes/children/)
