---
Title: Avoid Dynamic Lua Script
date: 2018-03-26 16:49:29 +0530
weight: 130
categories: ["RI"]
path: memory-optimizations/avoid-dynamic-lua-script/
altTag: Avoid Dynamic Lua Scripts
---
Refrain from generating dynamic scripts, which can cause your Lua cache to grow and get out of control.
Memory is consumed as we have scripts loaded. The memory consumption are because of the following factors.

1. Memory used by the server.lua_scripts dictionary holding original text
1. memory used internally by Lua to keep the compiled byte-code.
So If you have to use dynamic scripting, then just use plain EVAL, as there’s no point in loading them first.

## Things to Keep in Mind if Using Dynamic Lua Scripts

1. Remember to track your Lua memory consumption and flush the cache periodically with a SCRIPT FLUSH.
1. Do not hardcode and/or programmatically generate key names in your Lua scripts because it makes them useless in a clustered Redis setup.
