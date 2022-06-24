---
Title: User event logs
linkTitle: User events
description: Logged user events
weight: 50
alwaysopen: false
categories: ["RS"]
aliases: [
    content/rs/administering/logging/rsyslog-logging/user-events.md,
    content/rs/administering/logging/rsyslog-logging/user-events/,
]
---

The following user events can appear in `syslog`.

## Non-UI events

Logged events that do not appear in the UI

| Event code name | Severity | Notes |
|-----------------|----------|-------|
| user_created | info |  |
| user_deleted | info |  |
| user_updated | info | Indicates that a user configuration has been updated |
