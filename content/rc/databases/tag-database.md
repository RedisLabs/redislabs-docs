---
Title: Manage database tags
LinkTitle: Tag database
description:
weight: 33
alwaysopen: false
categories: ["RC"]
aliases: 
---

Tags are key-value pairs that let you categorize your databases. You can create tags and add them to your databases to associate them with each other. Once you've added tags, you can filter your databases in the database list by tag key or value.

## Manage tags

You can manage tags from the [Redis Cloud console](https://app.redislabs.com/#/) in the [tag manager](#tag-manager). You can find the tag manager in the following places: 

- [From your database in the **Tags** tab](#tags-tab)
- [From the database list](#database-list)

After you open the [tag manager](#tag-manager), you can use it to add, edit, or delete tags.

### Open tag manager from the Tags tab {#tags-tab}

To learn how to navigate to your database, see [View and edit databases]({{<relref "/rc/databases/view-edit-database">}}). Select the **Tags** tab to view the tags that are set for your database.

{{<image filename="images/rc/tags-database-tab.png" alt="The Tags tab on the database page." >}}{{< /image >}}

Select **Add tags** to open the [tag manager](#tag-manager).

{{<image filename="/images/rc/tags-icon-add-tags.png" alt="The Add tags button." width=60px >}}{{< /image >}}

You can also hover over a tag and select **Edit** to open the [tag manager](#tag-manager), or select **Delete** to delete the tag.

{{<image filename="/images/rc/tags-icon-edit.png" alt="The Edit button." width=50px >}}{{< /image >}}
{{<image filename="/images/rc/tags-icon-delete.png" alt="The Delete button." width=50px >}}{{< /image >}}

### Open tag manager from the database list {#database-list}

Using the database list allows you to manage tags for multiple databases without having to go into each database's **Tags** tab.

To get to the database list, select **Databases** from the main menu. 

{{<image filename="images/rc/tags-database-list.png" alt="The database list with databases that are tagged." >}}{{< /image >}}

Hover over the database and select **Manage tags**, or select **More actions** > **Manage tags** to open the [tag manager](#tag-manager).

{{<image filename="/images/rc/tags-icon-manage-tags.png" alt="The Manage tags button." width=40px >}}{{< /image >}}
{{<image filename="/images/rc/tags-icon-more-actions.png" alt="The More actions button." width=40px >}}{{< /image >}}

### Use the tag manager {#tag-manager}

The tag manager shows any tags that are associated with the database and allows you to create, edit, or delete tags.

{{<image filename="images/rc/tags-tag-manager.png" alt="The tag manager." >}}{{< /image >}}

{{< embed-md "rc-tags-tag-module.md" >}}

Select **Save tags** to save your changes.

{{<image filename="images/rc/tags-button-save-tags.png" width=100px alt="The Save tags button." >}}{{< /image >}}
