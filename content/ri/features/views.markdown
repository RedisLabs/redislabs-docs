---
layout: docs
title:  Views
description: Views Details
date:  2018-06-14 03:49:29 +0530
category: docs
permalink: docs/features/views/
pageTitle: Views
---

<br/>
**NOTE:** These instructions are outdated. New documentation is on the way.
<br/>
<br/>

Rdbtools Views are a visual representation of your real time data in your Redis instance based on the datatype.

Views allows you to search for key or key pattern from your connected redis instance. Based on the searched term a preview of the available views are displayed varying on the datatypes. Click on any of the views to proceed.

The data is displayed in a table initially with 100 records. Clicking on show more will load a batch of 100 records more.

**Add Column** - Add column allows you to add your customized column via ```Json Path``` or ```Lua Script```. The newly added column get added to your existing view.

<img src="/img/documentation/add_column.png"/>

**Show/Hide Columns** - The views can have multiple columns in order to see few particular columns, you can use show/hide columns which will temporarily hide few columns.

<img src="/img/documentation/show_hide_columns.png"/>

**Save View** - The views consisting of default as well as custom columns can be saved for future reference. You can further edit the custom created columns in the saved views.

<img src="/img/documentation/saved_views.png"/>

**Export** - Every saved view consisting of default and custom created columns can be exported into various formats like - csv, html, json, xls
