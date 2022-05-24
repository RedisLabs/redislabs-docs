---
Title: Configuring RedisInsight
date: 2019-12-13 03:49:29 +0530
weight: 60
categories: ["RI"]
path: install/configure/
aliases: /ri/install/configure/
---
You can configure RedisInsight with system environment variables.

To configure RedisInsight with environment variables:

1. Follow the instructions to set environment variables for your operating system:

    - [Mac](https://apple.stackexchange.com/a/106814)
    - [Windows](https://www.architectryan.com/2018/08/31/how-to-change-environment-variables-on-windows-10/)
    - [Linux](https://askubuntu.com/a/58828)
    - [Docker](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file)

1. Set the environment variables.
1. Restart RedisInsight.

## RedisInsight environment variables

The following environment variables can be set to configure RedisInsight:

### RIPORT

**Description:** Which port should RedisInsight listen on.

**Type:**        Number

**Default:**     `8001`

### RIHOST

**Description:** Which host should RedisInsight bind to.

**Type:**        String

**Default:**     `"0.0.0.0"` on Docker and `"127.0.0.1"` on Windows, Mac, and Linux.

### RIHOMEDIR

**Description:** Sets the storage directory where RedisInsight stores application data (such as local database, log files and snapshot files).

**Type:**        String

**Default:**     `"~/.redisinsight"` on desktop, `"/db"` on docker.

### RILOGDIR

**Description:** Sets the logging storage directory where RedisInsight stores application logs.

**Type:**        String

**Default:**     `"~/.redisinsight"` on desktop, `"/db"` on docker.


### RILOGLEVEL

**Description:** Configures the log level of the application. Possible values are - `"DEBUG"`, `"INFO"`, `"WARNING"`, `"ERROR`" and `"CRITICAL"`.

**Type:**        String

**Default:**     `"WARNING"`


### RIAUTHPROMPT

**Description:** Enables Authentication prompt which asks for authentication before opening an instance or when the user is idle.

**Type:** Bool

**Default:** `false`


### RIAUTHTIMER

**Description:** Idle Timer value in minutes for Authentication prompt.

**Type:** Bool

**Default:** `30`


### REDISINSIGHT_PORT (DEPRECATED)

**Description:** Which port should RedisInsight listen on.

**Type:**        Number

**Default:**     `8001`

**Deprecated in:** `v1.9.0`

### REDISINSIGHT_HOST (DEPRECATED)

**Description:** Which host should RedisInsight bind to.

**Type:**        String

**Default:**     `"0.0.0.0"`

**Deprecated in:** `v1.9.0`

### REDISINSIGHT_HOME_DIR (DEPRECATED)

**Description:** Sets the storage directory where RedisInsight stores application data (such as local database, log files and snapshot files).

**Type:**          String

**Default:**       `"~/.redisinsight"` on desktop, `"/db"` on docker.

**Deprecated in:** `v1.9.0`

### LOG_DIR (DEPRECATED)

**Description:** Sets the logging storage directory where RedisInsight stores application logs.

**Type:**        String

**Default:**     `"~/.redisinsight"` on desktop, `"/db"` on docker.
