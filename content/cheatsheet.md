---
title: Markdown Cheatsheet
description: Syntax instructions for markdown formatting
favorite_food: ice cream
draft: false
---
Here you can find examples of style and formatting elements that you can use in your pages.

{{< note >}}
% is used when the inner content of the shortcode is markdown, and < is used when the inner content is HTML.
{{< /note >}}

## Basic content formatting

### Tabbed paragraphs

A tabbed paragraph create scrolling code blocks like this:

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur, velit sit amet tempus commodo, orci ipsum laoreet turpis, eu ullamcorper orci enim ut dui.

A tabbed paragraph in a bulleted or numbered list create indented paragraphs like this:

- Lorem

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur, velit sit amet tempus commodo, orci ipsum laoreet turpis, eu ullamcorper orci enim ut dui.

### Links to internal pages

To link to another page in the content directory:

Syntax:

```md
[Redis Cloud Quick Start]({{</* relref  "/rc/rc-quickstart.md" */>}})`
```

Output:

[Redis Cloud Quick Start]({{< relref  "/rc/rc-quickstart.md" >}})

To link to an anchor on another page in the content directory:

Syntax:

```md
`[Sign up for Redis Cloud]({{</* relref "/rc/rc-quickstart#step-1-sign-up-for-redis-cloud-pro-account" */>}})`
```

Output:

[Sign up for Redis Cloud]({{< relref "/rc/rc-quickstart#step-1-sign-up-for-redis-cloud-pro-account" >}})

### Text formatting

**Text styles**

| **Style** | **Syntax** | **Output** |
|-------------|----------------|-------------
| Emphasized text | \*emphasized\* | *emphasized* |
| Bold text | \*\*bold\*\* | **bold** |

**Comments**

Text in the comments shortcode is not published in the output.

Syntax:

```sh
{{%/* comment */%}}Do not publish!{{%/* /comment */%}}
```

Ouput:

{{% comment %}}Do not publish!{{% /comment %}}

### Definitions

A series of definitions, as you'd find in a glossary, should go into a definition list (e.g., `<dl></dl>`).

For the entires, use the following shortcode:

```
{{%/*definition "term"%}}
The definition of "term" goes here.
{{%/definition%}}
```

This produces the following HTML output:

```
<dt id="term">term</dt>
<dd>The definition of "term" goes here.</dd>
```

### Code formatting

**Embedded code snippets**

Code snippets that need to pass automation must be located in `/static/code`
and included in the article with:

~~~src
```json
{{</* embed-code "sample.json" */>}}
```
~~~

If the code snippet is more than 30 lines, add it within an expanding block:

~~~src
{{%/* expand */%}}
```json
{{</* embed-code "sample.json" */>}}
```
{{%/* /expand */%}}
~~~

**Code blocks**

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

**Inline Code**

To indicate text entry, commands or code paramters inline use a single backtick (``).

Syntax:

```md
Use the `TRUE` value to enable the feature.
```

Output:

Use the `TRUE` value to enable the feature.

**Code shortcode**

Code can be shown like code fences using the code shortcode also.

Syntax:

```sh
{{</* code */>}}var x = 123;{{</* /code */>}}
```

Ouput:

{{< code >}}var x = 123;{{< /code >}}

### Tables

Syntax:

```md
| heading 1 | heading 2 | heading 3 |
| :-----| :-----: |-----: |
| cell 1x1  | cell 1x2  | cell 1x3  |
| cell 2x1  | cell 2x2  | cell 2x3  |
```

Ouput:

| heading 1 | heading 2 | heading 3 |
| :-----| :-----: |-----: |
| cell 1x1  | cell 1x2  | cell 1x3  |
| cell 2x1  | cell 2x2  | cell 2x3  |t

### Tables from CSV
The first parameter when using this shortcode is the name of the CSV file located in */static/tables* directory and the second is the number of columns in the table.

Syntax:
`{{</* table-csv "test_table.csv" 3 */>}}`

File:

```csv
Name,Description,Detail
cell 1x1,cell 1x2,cell 1x3
cell 2x1,cell 2x2,cell 2x3
cell 3x1,cell 3x2,cell 3x3
```

Output:

{{< table-csv "test_table.csv" 3 >}}

### Tabs

Source: https://github.com/rvanhorn/hugo-dynamic-tabs

Syntax:
```
{{%/* tabs tabTotal="3" tabID="1" tabName1="Tab 1" tabName2="Tab 2" tabName3="Tab 3" */%}}
  {{%/* tab tabNum="1" */%}}

  Tab 1 Content

  {{%/* /tab */%}}
  {{%/* tab tabNum="2" */%}}

  Tab 2 Content

  {{%/* /tab */%}}
  {{%/* tab tabNum="3" */%}}

  Tab 3 Content

  {{%/* /tab */%}}
{{%/* /tabs */%}}
```

Output:

{{< tabs tabTotal="3" tabID="1" tabName1="Tab 1" tabName2="Tab 2" tabName3="Tab 3" >}}
  {{< tab tabNum="1" >}}

  **Tab 1 Content**  
  Content in the first tab

  {{< /tab >}}
  {{< tab tabNum="2" >}}

  **Tab 2 Content**

  {{< /tab >}}
  {{< tab tabNum="3" >}}

  **Tab 3 Content**

  {{< /tab >}}
{{< /tabs >}}

## Images and videos

### Adding an image

1. Copy the image to a directory in: /static/images
1. In the markdown page, add the alt text and path to the image like this:

Syntax:

```md
`![Alt text]( /images/path/image.png )`
```

Output:

`![Redis Enterpise Cluster]( /images/rs/rp_stack.png )` shows:

![Redis Enterrpise Cluster]( /images/rs/rp_stack.png )

To make an image appear on the next line in a list:

1. Write your instruction.
1. Add 2 spaces at the end of the line and put the image on the next line with a tab indentation.
    ![Redis Enterrpise Cluster]( /images/rs/rp_stack.png )

### Adding a video

**Embed a local video**

To embed a video, use the `video` shortcode with the location of the video and a video title.

`{{</* video "/images/<path>/<video>.mp4" "Video title" */>}}`

{{< video "/images/rs/crdb_service_account.mp4" "CRDB Service Account" >}}

**YouTube**

Embed YouTube video.

Syntax:

```sh
{{</* youtube Bi1T3toQfF4 */>}}
```

Ouput:

{{< youtube Bi1T3toQfF4 >}}

**Youtube with start time**

Embed YouTube video and start playback from specific timestamp.

Syntax:

```sh
{{</* youtube_start Bi1T3toQfF4 10 */>}}
```

Ouput:

{{< youtube_start Bi1T3toQfF4 10 >}}

## Single-sourcing {#singlesourcing}

### Expanding blocks

Syntax:

```md
{{</* expand "How do you make expanding blocks?" */>}}
This is how you make expanding blocks.
{{</* /expand */>}}
```

Output:

{{< expand "How do you make expanding blocks?" >}}
This is how you make expanding blocks.
{{< /expand >}}

### Embedded partials

A partial markdown or HTML file can be included in other files using the **embed-md** or **embed-html** shortcodes. Partials must be placed in `content/embeds` directory.

Embed a markdown partial

Syntax:

```md
{{</* excerpt */>}}The Redis OSS Cluster API support in Redis Enterprise Software (RS)
provides a simple mechanism for cluster-aware Redis clients to learn
and know the cluster topology. This enables clients to connect directly
to an RS proxy on the node hosting the master shard for the data being
operated on.{{</* /excerpt */>}}
```

Output:

{{< excerpt >}}The Redis OSS Cluster API support in Redis Enterprise Software (RS)
provides a simple mechanism for cluster-aware Redis clients to learn
and know the cluster topology. This enables clients to connect directly
to an RS proxy on the node hosting the master shard for the data being
operated on.{{< /excerpt >}}

Embed an HTML partial

Syntax:

```sh
{{</* excerpt-include filename="rs/concepts/data-access/oss-cluster-api.md" */>}}
```

Output:

{{< excerpt-include filename="rs/concepts/data-access/oss-cluster-api.md" />}}

### Excerpts

{{< warning >}}
In most cases, use embedded partials instead of excerpts.
{{< /warning >}}

**Defining an excerpt**

Syntax:

```md
{{%/* excerpt */%}}The Redis OSS Cluster API support in Redis Enterprise Software (RS)
provides a simple mechanism for cluster-aware Redis clients to learn
and know the cluster topology. This enables clients to connect directly
to an RS proxy on the node hosting the master shard for the data being
operated on.{{%/* /excerpt */%}}
```

Output:

{{% excerpt %}}The Redis OSS Cluster API support in Redis Enterprise Software (RS)
provides a simple mechanism for cluster-aware Redis clients to learn
and know the cluster topology. This enables clients to connect directly
to an RS proxy on the node hosting the master shard for the data being
operated on.{{% /excerpt %}}

**Including an excerpt**

Syntax:

```sh
{{%/* excerpt-include filename="rs/concepts/data-access/oss-cluster-api.md" */%}}
```

Output:

{{< excerpt-include filename="rs/concepts/data-access/oss-cluster-api.md" />}}

## Informative notices

**Info**

Info boxes give background information that does not prevent proper use of the product.

Syntax:

```sh
{{</* info */>}}After you do this the first time, it gets easier.{{</* /info */>}}
```

Ouput:

{{< info >}}After you do this the first time, it gets easier.{{< /info >}}

**Tip**

Tips give additional information for improved use of the product.

Syntax:

```sh
{{</* tip */%}}Eating on time prevents hunger.{{</* /tip */>}}
```

Ouput:

{{< tip >}}Eating on time prevents hunger.{{< /tip >}}

**Note**

Notes suggest steps that prevent errors that do not cause data loss.

Syntax:

```sh
{{</* note */>}}Make sure you have enough disk space.{{</* /note */>}}
```

Ouput:

{{< note >}}Make sure you have enough disk space.{{< /note >}}

**Warning**

Warnings suggest that users think carefully before doing steps that can cause irresversible data loss.

Syntax:

```sh
{{</* warning */>}}Backup your data before erasing the hard disk!{{</* /warning */>}}
```

Ouput:

{{< warning >}}Backup your data before erasing the hard disk!{{< /warning >}}

**Label** (Not used)

Label displays a label. The type parameter can be passed to the shortcode in order to display the label in a different color, eg. **success** for a green label, **warning** for orange, **info** for blue and **danger** for red.

Syntax:

```sh
{{</* label type="info" */>}}This is a label{{</* /label */>}}
```

Ouput:

{{< label type="info" >}}This is a label{{< /label >}}

**Well**

Well displays content inside a container.

Syntax:

```sh
{{</* well */>}} Inside a well {{</* /well */>}}
```

Ouput:

{{< well >}}
Inside a well
{{< /well >}}

## Contents lists

### All children

Allchildren displays all the child pages of current page.

Syntax:

```sh
{{</* allchildren style="h2" description="true" */>}}
```

Ouput:

See example [here](/rc/administration).

### Recently updated

This shortcode can be used to display recently updated articles.

Syntax:

```sh
{{</* recently-updated */>}} Recently updated articles {{</* /recently-updated */>}}
```

Ouput:

{{< recently-updated >}}
Recently updated articles
{{< /recently-updated >}}

## Other shortcodes

- [Attachments](https://learn.netlify.com/en/shortcodes/attachments/)
- [Mermaid](https://learn.netlify.com/en/shortcodes/mermaid/)
- [Children](https://learn.netlify.com/en/shortcodes/children/)

## Related Info

For more info about editing and writing our documents:

- [Editing guide]({{<relref "content/editing-guide.md">}})
- [Contribution guide]({{<relref "content/contribution-guide.md">}})