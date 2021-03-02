---
Title: CLI
date: 2018-06-14 03:49:29 +0530
weight: 40
categories: ["RI"]
path: features/cli/
---
RedisInsight CLI lets you run commands against a redis server. You don't need to remember the syntax - the integrated help shows you all the arguments and validates your command as you type.

![cli](/images/ri/cli.png)

#### Key Bindings

Emacs and Vim keybindings are supported.

![cli](/images/ri/cli-keybindings.png)

| Action                                    | Emacs           | Vim    |
| -------------                             | :-------------: | -----: |
| Previous history item                     | `C-p`           | `k`    |
| Next history item                         | `C-n`           | `j`    |
| Move cursor to the begining               | `C-a`           | `0`    |
| Move cursor to the end                    | `C-e`           | `$`    |
| Move cursor to the right by one character | `C-f`           | `h`    |
| Move cursor to the left by one character  | `C-b`           | `l`    |
| Enter insert mode                         | -               | `i`    |
| Enter normal mode                         | -               | `ESC`  |
