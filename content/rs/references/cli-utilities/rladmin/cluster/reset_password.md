---
Title: rladmin cluster reset_password
linkTitle: reset_password
description: Changes the password for a given email.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
tags: ["configured"]
categories: ["RS"]
aliases: 
---

Changes the password for the user associated with the specified email address.

Enter a new password when prompted. Then enter the same password when prompted a second time to confirm the password change.

```sh
rladmin cluster reset_password <user email>
```

### Parameters

| Parameter | Type/Value | Description |
|-----------|------------|-------------|
| user email | email address | The email address of the user that needs a password reset |

### Returns

Reports whether the password change succeeded or an error occurred. 

### Example

```sh
$ rladmin cluster reset_password user@example.com
New password: 
New password (again): 
Password changed.
```