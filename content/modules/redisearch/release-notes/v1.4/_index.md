---
Title: v1.4
description:
weight: 1040
alwaysopen: false
categories: ["Modules"]
---
## RediSearch v1.4.18 Release Notes

Update urgency: Medium
This is a maintenance release for version 1.4.

This release improves overall stability and provides fixes for founded issues.

- Bug fixes
    - [#947](https://github.com/RediSearch/RediSearch/issues/947) Fix short read on FORK GC pipe that could result in a crash and potential data corruption

## RediSearch v1.4.17 Release Notes

Update urgency: Medium
This is a maintenance release for version 1.4.

This release improves overall stability and provides fixes for founded issues.

- Features:
    - #[779](https://github.com/RediSearch/RediSearch/issues/779) Added `to_number()` and `to_str()` functions for ambiguity reasons
- Improvements
    - #[891](https://github.com/RediSearch/RediSearch/issues/891) All memory allocations will now use the redis memory allocator.  This means that all the memory will be exposed correctly in the redis `INFO MEMORY` command.

## RediSearch v1.4.16 Release Notes

Update urgency: Medium
This is a maintenance release for version 1.4.

This release improves overall stability and provides fixes for founded issues.

Main Features:
- #[883](https://github.com/RediSearch/RediSearch/issues/883) Forkgc optimizations - introduce new config parameter `FORK_GC_CLEAN_THRESHOLD`. RediSearch will only start to clean when the number of not cleaned documents is exceeding this threshold.

Main Fixes:
- #[848](https://github.com/RediSearch/RediSearch/issues/848) RediSearch will not crash when sorting on fields that don't exists in all documents.
- #[884](https://github.com/RediSearch/RediSearch/issues/884) Fix wrong results on intersect iterator.

## RediSearch v1.4.15 Release Notes

Update urgency: Medium
This is a maintenance release for version 1.4.

This release improves overall stability and provides fixes for founded issues.

Main Fixes:

- #[866](https://github.com/RediSearch/RediSearch/issues/866) - Fix RDB corruption caused by deleting none-existing terms from the suggestion trie.
- When Redis exits, forked processes by [FORK Garbage Collection](https://oss.redislabs.com/redisearch/Configuring.html#gc_policy) will now be closed accordingly.
- For indices that are not [temporary](https://oss.redislabs.com/redisearch/Commands.html#ftcreate) and  [interleaved](https://oss.redislabs.com/redisearch/Configuring.html#safemode): When an index is dropped, the indexer thread is now closed.

## RediSearch v1.4.14 Release Notes

Update urgency: Medium
This is a maintenance release for version 1.4.

This release improves overall stability and provides fixes for founded issues.

Main Fixes:

- #[851](https://github.com/RediSearch/RediSearch/issues/851) In interleaved mode ([non safemode](https://oss.redislabs.com/redisearch/Configuring.html#safemode)), documents deleted by concurrent updates, will be ignored.

## RediSearch v1.4.13 Release Notes

Update urgency: Medium
This is a maintenance release for version 1.4.

This release improves overall stability and provides fixes for founded issues .

Main Fixes:

- #[798](https://github.com/RediSearch/RediSearch/issues/798) fix issue where phonetic queries return wrong results
- #[820](https://github.com/RediSearch/RediSearch/issues/820) fix crash on getting a none existing doc from a doc table
- Fix issue with invalid memory read when using tags with ' ' (space) separator

## RediSearch v1.4.12 Release Notes

Update urgency: Medium
This is a maintenance release for version 1.4.

This release improves overall stability and provides fixes for founded issues .

Main Features:

- #[741](https://github.com/RediSearch/RediSearch/issues/741) Allow Chinese tokenizing to recognise \-escape for punctuations

Main Fixes:

- #[739](https://github.com/RediSearch/RediSearch/issues/739) Fix crash on search error
- #[346](https://github.com/RediSearch/RediSearch/issues/346) Fix issue where fuzzy can not be used with numbers
- #[769](https://github.com/RediSearch/RediSearch/issues/769) Fix rare crash on rdb loading
- #[749](https://github.com/RediSearch/RediSearch/issues/749) On prefix searches, do not expand prefixes to terms which have no documents

## RediSearch v1.4.11 Release Notes

Update urgency: Medium

This release only add support for aliasing to the previews 1.4.10 release.

- Added functionality
    - #[731](https://github.com/RediSearch/RediSearch/issues/731) Add index aliasing. This allows users to provide (or remove) ‘links’ to indexes. The commands are FT.ALIASADD, FT.ALIASDEL, and FT.ALIASUPDATE. See documentation for full details: https://oss.redislabs.com/redisearch/Commands.html#ftaliasadd

## RediSearch v1.4.10 Release Notes

Update urgency: Medium

This is a maintenance release for version 1.4.

This release improves overall stability and provides fixes for founded issues .

Main Fixes:

- Fix memory leak when combining SORT with APPLY on FT.AGGREGATE

## RediSearch v1.4.9 Release Notes

Update urgency: Medium

This is a maintenance release for version 1.4.

This release improves overall stability and provides fixes for founded issues .

Main Fixes:

- Fork GC will now squash the empty blocks of the inverted indexes.
- Fix invalid memory access when using aggregate with GROUPBY.
- Fix issue where using limit with SORTBY might return duplicate results.

Known Issue:

- Memory leak when combining SORT and APPLY in FT.AGGREGATE. This issue is fixed on 1.4.10. It's recommended to skip directly to v1.4.10.

## RediSearch v1.4.8 Release Notes

Update urgency: Low

Technical release, no changes nor fixes.

## RediSearch v1.4.7 Release Notes

Update urgency: Medium

This is a maintenance release for version 1.4.

This release improves overall stability and provides fixes for founded issues .

Main Fixes:

- Fix issue where Dropping and recreating the same index while querying might cause crashes.

## RediSearch v1.4.6 Release Notes

Update urgency: Medium

This is a maintenance release for version 1.4.

This release improves overall stability and provides fixes for founded issues .

Main Fixes:

- Loading a potentially corrupted RDB files generated by versions lower than 1.4
- Fix issue where `REPLACE PARTIAL` might not work properly (#[621](https://github.com/RediSearch/RediSearch/issues/621))

## RediSearch v1.4.5 Release Notes

Update urgency: Low

This is a maintenance release for version 1.4.

This release improves overall stability and provides fixes for founded issues .

Main Fixes:

- Fixed issue where FORK GC causing redis rdb fork to fail

## RediSearch v1.4.4 Release Notes

Update urgency: Low

This is a maintenance release for version 1.4.

This release improves overall stability and provides fixes for founded issues .

Main Fixes:

- Fixed memory leak on Fork GC
- Fixed key close after releasing GIL on Fork GC (might cause crashed on rare situations)

## RediSearch v1.4.3 Release Notes

Update urgency: Low

This is a maintenance release for version 1.4.

This release improves overall stability and provides fixes for founded issues .

Main Fixes:

1. Fixed memory leak on mempool destroy
2. Fixed process crash when running with fork GC (preview)
3. Fixed fork GC  (preview)  deadlock when using Tags
4. Fixed memory leaks on index creation and deletion

## RediSearch v1.4.2 Release Notes

Update urgency: Low

This is a maintenance release for version 1.4.

This release improves overall stability and provides fixes to issues found.

## RediSearch v1.4.1 Release Notes

Update urgency: Medium

This is a maintenance release for version 1.4, with the next version planned for release being 2.0.

This release improves overall stability and focuses on performance improvements of the garbage collector. It also includes:

- New: Runtime Configuration
- Change: Unlimited Autocomplete Results

### Garbage Collector

RediSearch employs a garbage collector that removes deleted documents from the internal data structures.

In this release the garbage collection mechanism was improved in terms of efficiency, i.e. the amount of memory it reclaims, as well as in terms of performance (i.e. it is faster). The improved mechanism uses forked threads. Additional details can be found in this post: [How We Increased Garbage Collection Performance with RediSearch 1.4.1](https://redislabs.com/blog/increased-garbage-collection-performance-redisearch-1-4-1/).

The improved collection mechanism is currently **experimental*- and is not enabled by default. Enabling the new garbage collection mechanism requires setting the `GC_POLICY` configuration option to `FORK` at load time, for example:

```src
redis-server --loadmodule ./redisearch.so GC_POLICY FORK
```

### Runtime Configuration

RediSearch's [configuration](https://oss.redislabs.com/redisearch/Configuring/) is applied via arguments passed to the module at load time. This release introduces the new [`FT.CONFIG`  command](https://oss.redislabs.com/redisearch/Commands/#ftconfig) that allows to retrieve the current configuration as well as change it during runtime.

### Unlimited Autocomplete Results

This version removes the limit of 10 results from `FT.SUGGET` - you can set the `MAX num` as high as needed.

## RediSearch v1.4.0 Release Notes

**Update urgency:*- Medium - mainly due to numerous fixes

This version improves overall stability and performance of RediSearch. It also delivers better support for use cases in which documents are continuously updated. New features:

- Conditional updates
- Schema modification
- Query spelling correction
- Phonetic matching
- Enhancement: More fuzziness in search

### Continuous updates

Like most search engines, RediSearch was designed for maintaining append-mostly indices. To update an existing document, the document is actually replaced - that is deleted and added to the index.

Because RediSearch provides realtime indexing and searching it is very tempting to use for searching near-realtime data (or the products of its processing). In such cases, the number of indexed documents stays mostly static, but their contents are continuously updated.

To support this use case, RediSearch has been reworked internally to use 64-bit internal document IDs so that an index can sustain high update throughputs without overflowing. Furthermore and as a result, significant effort has been put into improving memory management and garbage collection.

### Conditional updates

The `IF` subcommand has been add to [`FT.ADD`](https://oss.redislabs.com/redisearch/Commands/#ftadd). When used with the existing `REPLACE [PARTIAL]` subcommand, the document will be updated only if the condition provided evaluates to a truth value, otherwise a special `NOADD` reply is returned.

### Schema modification

The [`FT.ALTER`](https://oss.redislabs.com/redisearch/Commands/#ftalter) command has been introduced, and provides the ability to add new fields to the definition of an existing index. The contents of such newly-added fields are indexed only for new or updated documents.

### Query spelling correction

Query spelling correction, a.k.a "did you mean", is now provided via the  [`FT.SPELLCHECK`](https://oss.redislabs.com/redisearch/Commands/#ftspellcheck) command. It enables generating suggestions for search terms that could be misspelled. For more details see [Query Spelling Correction](https://oss.redislabs.com/redisearch/Spellcheck/).

### Phonetic matching

Phonetic matching, a.k.a "Jon or John?", is now supported via the `PHONETIC` text field attribute. The terms in such fields are also indexed by their phonetic equivalents, and search results include these by default. For more details see [Phonetic Matching](https://oss.redislabs.com/redisearch/Phonetic_Matching/).

### More fuzziness in search

The fuzzy match operator, '%', can now be repeated up to three times to specify the Levenshtein distance. That means that the queries `%hello%`, `%%hello%%` and `%%%hello%%%` will perform fuzzy matching on 'hello' for all terms with LD of 1, 2 and 3, respectively.
