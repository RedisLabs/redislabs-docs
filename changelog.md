# Doc changelog

The docs are updated regularly; here are some recent highlights:

## December 2021

- Redis Enterprise Cloud updates

    - [Billing & payments](https://docs.redis.com/latest/rc/billing-and-payments/#apply-coupon) now describes how to apply coupons; duplicate content has been consolidated ([PR #1720](https://github.com/RedisLabs/redislabs-docs/pull/1720))

    - [Shard descriptions](https://docs.redis.com/latest/rc/subscriptions/create-flexible-subscription/#shard-types) were added to the Create Flexible subscription topic ([PR #1717](https://github.com/RedisLabs/redislabs-docs/pull/1717))

    - Eviction [policy descriptions](https://docs.redis.com/latest/rc/databases/configuration/data-eviction-policies/) have been updated ([PR #1721](https://github.com/RedisLabs/redislabs-docs/pull/1721))

- Redis Enterprise Software doc updates

    - Eviction [policy descriptions](https://docs.redis.com/latest/rs/administering/database-operations/eviction-policy/) have been updated; duplicate content has been consolidated ([PR #1721](https://github.com/RedisLabs/redislabs-docs/pull/1721))

- Redis Enterprise for Kubernetes doc updates

    - The Redis Enterprise for Kubernetes [quick start](https://docs.redis.com/latest/kubernetes/deployment/quick-start/) has been updated ([PR #1706](https://github.com/RedisLabs/redislabs-docs/pull/1706/))

    - The OpenShift CLI [quick start](https://docs.redis.com/latest/kubernetes/deployment/openshift/openshift-cli/) has been updated ([PR #1675](https://github.com/RedisLabs/redislabs-docs/pull/1675/))

- Redis module doc updates

    - The Modules [quick start](https://docs.redis.com/latest/modules/modules-quickstart/) has been updated ([PR #1711](https://github.com/RedisLabs/redislabs-docs/pull/1711))

    - A new RediSearch [quick start](https://docs.redis.com/latest/modules/redisearch/redisearch-quickstart/) is available ([PR #1711](https://github.com/RedisLabs/redislabs-docs/pull/1711))

    - Release notes were added for [RedisJSON v2.0.6](https://docs.redis.com/latest/modules/redisjson/release-notes/redisjson-2.0-release-notes/) ([PR #1712](https://github.com/RedisLabs/redislabs-docs/pull/1712)) & v2.0.5 ([PR #1688](https://github.com/RedisLabs/redislabs-docs/pull/1688))  

    - Release notes were added for [RediSearch v2.0.15](https://docs.redis.com/latest/modules/redisearch/release-notes/redisearch-2.2-release-notes/) ([PR #1704](https://github.com/RedisLabs/redislabs-docs/pull/1704))

    - Module release note have been updated to reflect minimum version requirements and to highlight changes ([PR #1692](https://github.com/RedisLabs/redislabs-docs/pull/1692))

- RedisInsight doc updates

    - A new tutorial shows how to use [RedisInsight with modules](https://docs.redis.com/staging/jira-doc-523/ri/using-redisinsight/modules/) ([PR #1715](https://github.com/RedisLabs/redislabs-docs/pull/1715)) 

    - The article showing how to deploy [RedisInsight to Kubernetes](https://docs.redis.com/staging/jira-doc-1040/ri/installing/install-k8s/) was updated to reflect the RedisInsight v2 private preview ([PR #1702](https://github.com/RedisLabs/redislabs-docs/pull/1702)) 

- Infrastructure improvements

    - Various issues have been resolved for in-page tables of contents (([PR #1703](https://github.com/RedisLabs/redislabs-docs/pull/1703), [PR #1697](https://github.com/RedisLabs/redislabs-docs/pull/1697), & [PR #1691](https://github.com/RedisLabs/redislabs-docs/pull/1691))

    - "Hero" page icons have been refactored to improve doc experience ([PR #1683](https://github.com/RedisLabs/redislabs-docs/pull/1683))

    - Legacy content has been updated to reflect current logos

Finally, a variety of updates addressed typos, missing images, and other glitches

To learn more, review the [merged pull requests](https://github.com/RedisLabs/redislabs-docs/pulls?q=is%3Apr+merged%3A2021-12-01..2021-12-31)

## November 2021

- Redis Enterprise Software doc updates: 

    - REST API docs are [now generally available](https://docs.redis.com/latest/rs/references/rest-api/) ([PR #1620](https://github.com/RedisLabs/redislabs-docs/pull/1620))

    - The [Redis client](https://docs.redis.com/latest/rs/references/client_references/) reference docs have been updated ([PR #1630](https://github.com/RedisLabs/redislabs-docs/pull/1630))

    - The cluster [maintenance mode](https://docs.redis.com/latest/rs/administering/cluster-operations/maintenance-mode/) article has been updated ([PR #1647](https://github.com/RedisLabs/redislabs-docs/pull/1647))

    - [System log docs](https://docs.redis.com/latest/rs/administering/logging/rsyslog-logging/) have been updated and expanded, including details describing alerts and events for databases, clusters, and nodes ([PR #1631](https://github.com/RedisLabs/redislabs-docs/pull/1631))

- Kubernetes doc updates:

    - A new article shows how to [create Active-Active databases](https://docs.redis.com/latest/kubernetes/re-clusters/create-aa-database/) on Kubernetes ([PR #1555](https://github.com/RedisLabs/redislabs-docs/pull/1555))

    - Docs have been updated to support Redis Enterprise for [Kubernetes v6.2.8-2](https://docs.redis.com/latest/kubernetes/release-notes/k8s-6-2-8-2-2021-11/) ([PR #1648](https://github.com/RedisLabs/redislabs-docs/pull/1648))

    - The _Options for Redis Enterprise databases_ article now describes [databasePort](https://docs.redis.com/latest/kubernetes/reference/db-options/#databaseport) ([PR #1644](https://github.com/RedisLabs/redislabs-docs/pull/1644))

    - The _Options for Redis Enterprise clusters_ article now describes [redisUpgradePolicy](https://docs.redis.com/latest/kubernetes/reference/cluster-options/#redisupgradepolicy) ([PR #1645](https://github.com/RedisLabs/redislabs-docs/pull/1645))

- Release notes have been added for:
    - [RedisAI v1.2](https://docs.redis.com/latest/modules/redisai/release-notes/redisai-1.2-release-notes/) ([PR #1668](https://github.com/RedisLabs/redislabs-docs/pull/1668))
    - [RedisBloom v2.2.9](https://docs.redis.com/latest/modules/redisbloom/release-notes/redisbloom-2.2-release-notes/) ([PR #1668](https://github.com/RedisLabs/redislabs-docs/pull/1668))
    - [RedisGears v1.0.8](https://docs.redis.com/latest/modules/redisgears/release-notes/redisgears-1.0-release-notes/#v108-november-2021) ([PR #1682](https://github.com/RedisLabs/redislabs-docs/pull/1682))
    - [RedisGraph 2.4.12](https://docs.redis.com/latest/modules/redisgraph/release-notes/redisgraph-2.4-release-notes/#v2412-october-2021) ([PR #1668](https://github.com/RedisLabs/redislabs-docs/pull/1668))
    - [RediSearch v2.25](https://docs.redis.com/latest/modules/redisearch/release-notes/redisearch-2.2-release-notes/) ([PR #1664](https://github.com/RedisLabs/redislabs-docs/pull/1664)) and [v2.0.13](https://docs.redis.com/latest/modules/redisearch/release-notes/redisearch-2.0-release-notes/#v2013-november-2021) ([PR #1652](https://github.com/RedisLabs/redislabs-docs/pull/1652))
    - [RedisTimeSeries v1.4.13](https://docs.redis.com/latest/modules/redistimeseries/release-notes/redistimeseries-1.4-release-notes/#v1413-november-2021) ([PR #1668](https://github.com/RedisLabs/redislabs-docs/pull/1668))
    - RedisInsight v2 public preview [release notes](https://docs.redis.com/latest/ri/release-notes/v2.0.2/) have been added ([PR #1676](https://github.com/RedisLabs/redislabs-docs/pull/1676))

- Additional updates to fix typos, missing images, and other glitches

    To learn more, review the [merged pull requests](https://github.com/RedisLabs/redislabs-docs/pulls?q=is%3Apr+merged%3A2021-11-01..2021-11-30)

## October 2021

- Redis Enterprise Software doc updates: 

    - Updated docs to support the v6.2.8 release ([PR #1632](https://github.com/RedisLabs/redislabs-docs/pull/1632)), which included:
        - [Release notes](https://docs.redis.com/latest/rs/release-notes/rs-6-2-8-october-2021/) ([PR #1628](https://github.com/RedisLabs/redislabs-docs/pull/1628)) 
        - Updates to the [Redis upgrade policy](https://docs.redis.com/latest/rs/installing-upgrading/upgrading/#redis-upgrade-policy) docs ([PR #1599](https://github.com/RedisLabs/redislabs-docs/pull/1599))
        - Updates to the [backup data](https://docs.redis.com/latest/rs/administering/import-export/database-backup/) and [export data](https://docs.redis.com/latest/rs/administering/import-export/exporting-data/) articles ([PR #1548](https://github.com/RedisLabs/redislabs-docs/pull/1548) & [PR #1598](https://github.com/RedisLabs/redislabs-docs/pull/1598))

    - REST API docs are [in preview](https://docs.redis.com/staging/rs-rest-api/rs/references/rest-api/) ([PR #1533](https://github.com/RedisLabs/redislabs-docs/pull/1533), [PR #1621](https://github.com/RedisLabs/redislabs-docs/pull/1621))

- Redis Enterprise Cloud updates:

    - REST API docs have been clarified and updated to reflect the new user experience ([PR #1651](https://github.com/RedisLabs/redislabs-docs/pull/1651)), which includes:
        - [Get started](https://docs.redis.com/latest/rc/api/get-started/)
        - [Enable the API](https://docs.redis.com/latest/rc/api/get-started/enable-the-api/)
        - [Manage API keys](https://docs.redis.com/latest/rc/api/get-started/manage-api-keys/)

    - A new article describes how to [migrate data](https://docs.redis.com/latest/rc/databases/migrate-databases/) to Redis Enterprise Cloud subscriptions ([PR #1619](https://github.com/RedisLabs/redislabs-docs/pull/1619))

- Kubernetes doc updates:

    - The Platforms section of the docs has been renamed to Kubernetes ([PR #1562](https://github.com/RedisLabs/redislabs-docs/pull/1562))

- Additional changes

    - Modules: A new article documents Redis Enterprise [feature compatibility support](https://docs.redis.com/latest/modules/enterprise-capabilities/) ([PR #1504](https://github.com/RedisLabs/redislabs-docs/pull/1504))

    - Release notes have been added for:
        - [RedisGraph v2.4.11](https://docs.redis.com/latest/modules/redisgraph/release-notes/redisgraph-2.4-release-notes/#v2411-october-2021) ([PR #1560](https://github.com/RedisLabs/redislabs-docs/pull/1560))
        - [RediSearch v2.0.12](https://docs.redis.com/latest/modules/redisearch/release-notes/redisearch-2.0-release-notes/#v2012-september-2021) ([PR #1616](https://github.com/RedisLabs/redislabs-docs/pull/1616))

    - RedisInsight: [v1.11 release notes](https://docs.redis.com/latest/ri/release-notes/v1.11.0/) have been added ([PR #1605](https://github.com/RedisLabs/redislabs-docs/pull/1605))

- Additional updates to fix typos, missing images, and other glitches

    To learn more, review the [merged pull requests](https://github.com/RedisLabs/redislabs-docs/pulls?q=is%3Apr+merged%3A2021-10-01..2021-10-31).


## September 2021

- Changes affecting all sections:

    - PDF support is enabled for all articles on the [latest branch](https://docs.redis.com/latest/).  ([PR #1524](https://github.com/RedisLabs/redislabs-docs/pull/) and others)

        In addition, you can download [a tarball](https://docs.redis.com/latest/pdfs/current/redis-docs-latest.tar.gz) containing PDFs of all docs.  The tarball contains separate PDFs for each section of the website.

        PDFs update when content is pushed to latest, so they're always up-to-date.

    - Issues with the in-page table of contents have been addressed. ([PR #1543](https://github.com/RedisLabs/redislabs-docs/pull/1543)) 

- Redis Enterprise Software doc updates: 

    - Clarified and fixed issues in the 6.2.4 docs. ([PR #1536](https://github.com/RedisLabs/redislabs-docs/pull/1536)) 

- Redis Enterprise Cloud updates:

    - Docs were updated to support the new user experience; these changes include updates, rewrites, and reorgs.  Some changes remain, but the major workflows have been updated.  ([PR #1274](https://github.com/RedisLabs/redislabs-docs/pull/1274) & [PR #1548](https://github.com/RedisLabs/redislabs-docs/pull/1452))

    - A new article helps you manage [billing and payments](https://docs.redis.com/latest/rc/billing-and-payments/) for your subscription. ([PR #1274](https://github.com/RedisLabs/redislabs-docs/pull/1274))  

- Kubernetes doc updates:

    - Updated docs to support the K8s [6.2.4-1 release](https://docs.redis.com/latest/platforms/release-notes/k8s-6-2-4-1-2021-09/). ([PR #1527](https://github.com/RedisLabs/redislabs-docs/pull/1527)) 

    - [Manage Redis Enterprise databases on Kubernetes](https://docs.redis.com/latest/platforms/kubernetes/redb/db-controller/) has been updated. ([PR #1524](https://github.com/RedisLabs/redislabs-docs/pull/1524)) 

    - A new article shows how to [connect to the admin console](https://docs.redis.com/latest/platforms/kubernetes/rec/connect-to-admin-console/) to manage the Redis Enterprise cluster in your Kubernetes deployment.  ([PR #1529](https://github.com/RedisLabs/redislabs-docs/pull/1529))

    - A new article shows how to [enable internode encryption](https://docs.redis.com/latest/platforms/kubernetes/security/internode-encryption/) between Redis Enterprise cluster nodes in your Kubernetes deployment.  ([PR #1526](https://github.com/RedisLabs/redislabs-docs/pull/1526))  

- Additional updates to fix typos, missing images, and other glitches

    To learn more, review the [merged pull requests](https://github.com/RedisLabs/redislabs-docs/pulls?q=is%3Apr+merged%3A2021-09-01..2021-09-30).


## August 2021

- Changes affecting all sections:

    - The company name change was incorporated into the website and its content ([PR #1480](https://github.com/RedisLabs/redislabs-docs/pull/1480) and others)

    - Breadcrumbs now use the same text as the table of contents ([PR #1501](https://github.com/RedisLabs/redislabs-docs/pull/1501))

- Redis Enterprise Software doc updates: 

    - Updated docs to support the 6.2.4 release ([PR #1479](https://github.com/RedisLabs/redislabs-docs/pull/1479), [PR #1489](https://github.com/RedisLabs/redislabs-docs/pull/1471), [PR #1472](https://github.com/RedisLabs/redislabs-docs/pull/1489), [PR #1506](https://github.com/RedisLabs/redislabs-docs/pull/1506), [PR #1511](https://github.com/RedisLabs/redislabs-docs/pull/1511), and [PR #1514](https://github.com/RedisLabs/redislabs-docs/pull/1514)):
    
        - A new article describing [internode encryption](https://docs.redis.com/latest/rs/security/internode-encryption/)

        - Rewrites to the [upgrade existing deployment](https://docs.redis.com/latest/rs/installing-upgrading/upgrading/) doc

        - [release notes](https://docs.redis.com/latest/rs/release-notes/rs-6-2-4-august-2021/) 

        - [rladmin updates](https://docs.redis.com/latest/rs/references/rladmin/)
        
    - A copy of the [v6.0.x docs](https://docs.redis.com/6.0/rs/) has been archived to support customers who remain on those releases ([PR #1452](https://github.com/RedisLabs/redislabs-docs/pull/1452))

- Redis Enterprise Cloud

    - Continued updating and reorganizing docs for the updated user experience (in preview) ([PR #1419](https://github.com/RedisLabs/redislabs-docs/pull/1419), [PR #1453](https://github.com/RedisLabs/redislabs-docs/pull/1453), [PR #1454](https://github.com/RedisLabs/redislabs-docs/pull/1454))

- Kubernetes doc updates:

    - A new article describes how to set up external routing using an [ingress controller](https://docs.redis.com/latest/platforms/kubernetes/tasks/set-up-ingress-controller/) ([PR #1466](https://github.com/RedisLabs/redislabs-docs/pull/1466), [PR #1497](https://github.com/RedisLabs/redislabs-docs/pull/1497))

    - Added a task describing how to run the [log collector script](https://docs.redis.com/latest/platforms/kubernetes/tasks/run-log-collector-script/)  ([PR #1486](https://github.com/RedisLabs/redislabs-docs/pull/1471), [PR #1472](https://github.com/RedisLabs/redislabs-docs/pull/1486))

    - Multiple typos and clarifications have been made throughout the section ([PR #1505](https://github.com/RedisLabs/redislabs-docs/pull/1505), [PR #1516](https://github.com/RedisLabs/redislabs-docs/pull/1516), [PR #1517](https://github.com/RedisLabs/redislabs-docs/pull/1517))

- Additional updates:

    - Module release notes have been updated to reflect recent updates ([PR #1508](https://github.com/RedisLabs/redislabs-docs/pull/1508), [PR #1509](https://github.com/RedisLabs/redislabs-docs/pull/1509), [PR #1510](https://github.com/RedisLabs/redislabs-docs/pull/1510))

    - The Glossary has been expanded ([PR #1490](https://github.com/RedisLabs/redislabs-docs/pull/1490))

    - PDF generation is currently in preview

- Additional updates to fix typos, missing images, and other glitches

    To learn more, review the [merged pull requests](https://github.com/RedisLabs/redislabs-docs/pulls?q=is%3Apr+merged%3A2021-08-01..2021-08-31)



## July 2021

- Redis Enterprise Software doc updates:

    - Updated the [Redis client reference](https://docs.redislabs.com/latest/rs/references/client_references/) to improve readability and navigation.  ([PR #1467](https://github.com/RedisLabs/redislabs-docs/pull/1467))

    - Updated [release notes](https://docs.redislabs.com/latest/rs/release-notes/) to improve links to internal docs. ([PR #1443](https://github.com/RedisLabs/redislabs-docs/pull/1443))

    - Continued to refine [install/setup](https://docs.redislabs.com/latest/rs/installing-upgrading/) docs, along with supporting material.
    ([PR #1460](https://github.com/RedisLabs/redislabs-docs/pull/1460))

    - Clarified and improved readability of the [FAQs](https://docs.redislabs.com/latest/rs/faqs/). ([PR #1431](https://github.com/RedisLabs/redislabs-docs/pull/1431))

- Redis Enterprise Cloud doc updates:

    - Continued reorganizing docs to improve navigation and discoverability.  [Cloud account](https://docs.redislabs.com/latest/rc/cloud-accounts/) docs are now a top-level section and have been updated to improve accuracy and clarity. ([PR #1454](https://github.com/RedisLabs/redislabs-docs/pull/1454))

    - Continued updating [preview docs](https://docs.redislabs.com/staging/release-rc-new-ui/rc/rc-quickstart/) to reflect the new admin console experience. ([PR #1453](https://github.com/RedisLabs/redislabs-docs/pull/1453))

    - Clarified a number of docs based on feedback ([PR #1431](https://github.com/RedisLabs/redislabs-docs/pull/1431), [PR #1440](https://github.com/RedisLabs/redislabs-docs/pull/1440), [PR #1448](https://github.com/RedisLabs/redislabs-docs/pull/1448))

- Redis Enterprise for Kubernetes release notes

    - Created a [support matrix](https://docs.redislabs.com/latest/platforms/kubernetes/reference/supported_k8s_distributions/) detailing the distributions (and versions) supported by Redis Enterprise for Kubernetes.  ([PR #1451](https://github.com/RedisLabs/redislabs-docs/pull/1451))

    - Created a [new article](https://docs.redislabs.com/latest/platforms/kubernetes/concepts/manage_rec_credentials/) describing how to manage Redis Enterprise cluster (REC) credentials.  ([PR #1466](https://github.com/RedisLabs/redislabs-docs/pull/1466))

    - Added [a warning](https://docs.redislabs.com/latest/platforms/kubernetes/concepts/persistent-volumes/) noting that the size of a persistent volume cannot be changed after deployment.  ([PR #1449](https://github.com/RedisLabs/redislabs-docs/pull/1449))
    
    - Clarified and improved readability of the [FAQs](https://docs.redislabs.com/latest/platforms/faqs/). ([PR #1459](https://github.com/RedisLabs/redislabs-docs/pull/1459))

- Redis module docs - Updated release notes for [all modules](https://docs.redislabs.com/latest/modules/) to be current, consistent, and easier to navigate. ([PR #1426](https://github.com/RedisLabs/redislabs-docs/pull/1426))

- Additional updates to fix typos, missing images, and other glitches

    To learn more, review the [merged pull requests](https://github.com/RedisLabs/redislabs-docs/pulls?q=is%3Apr+merged%3A2021-07-01..2021-07-31)

## June 2021

- Redis Enterprise Software doc updates:

    - Updated [Using Redis with .NET](https://docs.redislabs.com/latest/rs/references/client_references/client_csharp/)  ([PR #1401](https://github.com/RedisLabs/redislabs-docs/pull/1401))

    - Added description of replication backlog to [Update database configuration](https://docs.redislabs.com/latest/rs/administering/database-operations/updating-configurations/) ([PR #1389](https://github.com/RedisLabs/redislabs-docs/pull/1389) and [PR #1395](https://github.com/RedisLabs/redislabs-docs/pull/1395))

    - Cleaned up release note navigation ([PR #1406](https://github.com/RedisLabs/redislabs-docs/pull/1406))

- Redis Enterprise Cloud doc updates:

    - Editorial updates to multiple files, including:
    
         - [Quick start]() ([PR #1415](https://github.com/RedisLabs/redislabs-docs/pull/1415))
         - [System logs]() ([PR #1409](https://github.com/RedisLabs/redislabs-docs/pull/1409))
         - [Backup data](https://docs.redislabs.com/latest/rc/databases/back-up-data/)  ([PR #1411](https://github.com/RedisLabs/redislabs-docs/pull/1411))
         - [FAQs](https://docs.redislabs.com/latest/rc/faqs/) ([PR #1409](https://github.com/RedisLabs/redislabs-docs/pull/1409))
         - and more

    - Continued updating [preview docs](https://docs.redislabs.com/staging/release-rc-new-ui/rc/rc-quickstart/) to reflect the new admin console experience. ([PR #1382](https://github.com/RedisLabs/redislabs-docs/pull/1382) and [PR #1419](https://github.com/RedisLabs/redislabs-docs/pull/1419))

- Platform docs

    - Redis Enterprise for Kubernetes release notes
    
        - Added 6.0.20-4 (May 2021) [release notes](https://docs.redislabs.com/latest/platforms/release-notes/k8s-6-0-20-4-2021-05/) ([PR #1398](https://github.com/RedisLabs/redislabs-docs/pull/1398))
        
        - Added 5.4.14 (March 2020) [release notes](https://docs.redislabs.com/latest/platforms/release-notes/k8s-5-4-14-2-2020-03/) ([PR #1403](https://github.com/RedisLabs/redislabs-docs/pull/1403))

        - Updated release note navigation ([PR #1405](https://github.com/RedisLabs/redislabs-docs/pull/1405))

    - Resolved navigation issue created when removing an out-of-date Redis Enterprise for Openshift article. ([PR #1384](https://github.com/RedisLabs/redislabs-docs/pull/1384))

- Additional updates to fix typos, missing images, and other glitches

    To learn more, review the [merged pull requests](https://github.com/RedisLabs/redislabs-docs/pulls?q=is%3Apr+merged%3A2021-06-01..2021-06-30)


## May 2021

- Redis Enterprise Software doc updates:

    - Added article describing compatibility with [open source Redis](https://docs.redislabs.com/latest/rs/concepts/compatibility/) ([PR #1345](https://github.com/RedisLabs/redislabs-docs/pull/1345))

    - Simplified [install and update](https://docs.redislabs.com/latest/rs/installing-upgrading/) article and resolved navigation issues ([PR #1376](https://github.com/RedisLabs/redislabs-docs/pull/1376))

    - Updated [password rotation](https://docs.redislabs.com/latest/rs/administering/access-control/password-rotation/) article ([PR #1355](https://github.com/RedisLabs/redislabs-docs/pull/1355))

- Redis Enterprise Cloud doc updates:

    - Added new article introducing [high availability](https://docs.redislabs.com/latest/rc/databases/high-availability/) ([PR #1371](https://github.com/RedisLabs/redislabs-docs/pull/1371))

    - Updated [data backup](https://docs.redislabs.com/latest/rc/databases/back-up-data/) article to clarify instructions for Google Cloud Platform ([PR #1348](https://github.com/RedisLabs/redislabs-docs/pull/1348)) 

    - Created [preview docs](https://docs.redislabs.com/staging/release-rc-new-ui/rc/rc-quickstart/) for updated user experience ([PR #1274](https://github.com/RedisLabs/redislabs-docs/pull/1371))

- Additional updates to fix typos, missing images, and other glitches

    To learn more, review the [merged pull requests](https://github.com/RedisLabs/redislabs-docs/pulls?q=is%3Apr+merged%3A2021-05-01..2021-05-31)

## April 2021

- Redis Enterprise Software doc updates:

    - Updated docs to support release 6.0.20, which includes new [LDAP authentication](https://docs.redislabs.com/latest/rs/security/ldap/) docs, updated [certificate docs](https://docs.redislabs.com/latest/rs/security/admin-console-security/encryption/), [and more](https://docs.redislabs.com/latest/rs/release-notes/rs-6-0-20-april-2021/) ([PR #1317](https://github.com/RedisLabs/redislabs-docs/pull/1317))

    - Documented Active-Active support for [bitfield types](https://docs.redislabs.com/latest/rs/references/developing-for-active-active/developing-strings-active-active/) ([PR #1300](https://github.com/RedisLabs/redislabs-docs/pull/1300))

- Redis Enterprise Cloud doc updates:

    - Reorganized and simplified docs for common [subscription](https://docs.redislabs.com/latest/rc/subscriptions/) and [database](https://docs.redislabs.com/latest/rc/databases/) operations ([PR #1231](https://github.com/RedisLabs/redislabs-docs/pull/1231))

    - Reorganized and simplified the [REST API](https://docs.redislabs.com/latest/rc/api/) docs ([PR #1310](https://github.com/RedisLabs/redislabs-docs/pull/1310))

    - Updated [data backup](https://docs.redislabs.com/latest/rc/databases/back-up-data/) article for Microsoft Azure ([PR #1341](https://github.com/RedisLabs/redislabs-docs/pull/1341))

- Additional updates to fix typos, missing images, and other glitches

    To learn more, review the [merged pull requests](https://github.com/RedisLabs/redislabs-docs/pulls?q=is%3Apr+merged%3A2021-04-01..2021-04-30)


## January through March 2021

- Redis Enterprise Software doc updates:

    - Reorganized [security docs](https://docs.redislabs.com/latest/rs/security/) ([PR #918](https://github.com/RedisLabs/redislabs-docs/pull/918))

    - Reworked `rladmin` [command reference](https://docs.redislabs.com/latest/rs/references/rladmin/) ([PR #1256](https://github.com/RedisLabs/redislabs-docs/pull/1256))

    - Updated [install and setup](https://docs.redislabs.com/latest/rs/installing-upgrading/) doc ([PR #1123](https://github.com/RedisLabs/redislabs-docs/pull/1123))

- Redis Enterprise Cloud doc updates:

    - Update docs to reflect new [subscription plans](https://docs.redislabs.com/latest/rc/subscriptions/) ([PR #1251](https://github.com/RedisLabs/redislabs-docs/pull/1251))

    - Updated administration [landing page](https://docs.redislabs.com/latest/rc/administration/) ([PR #1191](https://github.com/RedisLabs/redislabs-docs/pull/1191))

    - Updated [Enable the REST API](https://docs.redislabs.com/latest/rc/api/get-started/enable-the-api/) page for clarity ([PR #1244](https://github.com/RedisLabs/redislabs-docs/pull/1244))

- Additional changes

    - Added [Glossary](https://docs.redislabs.com/latest/glossary/) to help define terms consistently.  ([PR #1238](https://github.com/RedisLabs/redislabs-docs/pull/1238/))

    - Created Kubernetes [quick start](https://docs.redislabs.com/latest/platforms/kubernetes/getting-started/quick-start/) ([PR #1174](https://github.com/RedisLabs/redislabs-docs/pull/1174)) and [developer guides](https://docs.redislabs.com/latest/platforms/kubernetes/tasks/) ([PR #1173](https://github.com/RedisLabs/redislabs-docs/pull/1173))

    - Additional  updates to fix typos, missing images, and other glitches

        To learn more, review the [merged pull requests](https://github.com/RedisLabs/redislabs-docs/pulls?q=is%3Apr+merged%3A2021-01-01..2021-03-31)

