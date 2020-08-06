---
Title: Cloud admin console security
description:
weight: 12
alwaysopen: false
categories: ["RC"]
---

The Redis Cloud admin console provides several security features. These include:

* Multi-factor authentication

## Password security
Password must be between 8 and 128 characters, with at least one uppercase letter (A-Z), one lowercase letter (a-z), one number (0-9), and one special character (!, @, #, $, %, ^, &, *, (, ), _, +, -, “, ’, <, =, >, \, -, :, ; /, ?, [, ], {, }, `, ~, |)

(length >= 8) && (length <= 128) && password.match(/[a-z]/g) &&
  password.match(/[A-Z]/g) && password.match(/[0-9]/g) &&
  password.match(/[!@#$%^&*()\_\+\-\"\' ,.<=>\-:;/?\\\[\]\{|\}`~]/g);
