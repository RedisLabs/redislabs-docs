---
Title: Data types for Active-Active databases
linktitle: Data types
description: Introduction to differences in data types between standalone and Active-Active Redis databases.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/database-operations/create-crdb/
        /rs/administering/database-operations/create-active-active/
---


Active-Active databases use conflict-free replicated data types (CRDTs). From a developer perspective, most supported data types work the same for Active-Active and standard Redis databases. However, a few methods also come with specific requirements in Active-Active databases.

Even though they look identical to standard Redis data types, there are specific rules that govern the handling of
conflicting concurrent writes for each data type.

As conflict handling rules differ between data types, some commands have slightly different requirements in Active-Active databases vs standard Redis databases.

