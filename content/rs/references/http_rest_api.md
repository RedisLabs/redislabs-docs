---
Title: REST API Documentation
description:
weight: 10
alwaysopen: false
categories: ["RS"]
---
<div id="key-concepts">
    <h2>Key Concepts</h2>
    <div id="clusters">
        <h3>Clusters</h3>
        <p>Redis Labs clusters are a set of nodes, typically two or more, providing
            database services. Clusters are inherently multi-tenant, and a single cluster
            can manage multiple databases accessed through individual endpoints.</p>
    </div>
</div>
<div id="protocol-and-headers">
    <h2>Protocol and Headers</h2>
    <div id="json-requests-and-responses">
        <h3>JSON Requests and Responses</h3>
        <p>The Redis Labs REST API uses the JavaScript Object Notation (JSON) for requests
            and responses.</p>
        <p>Some responses may have an empty body, but indicate the response with standard
            HTTP codes. For more information, see RFC 4627
            (<a
                href="http://www.ietf.org/rfc/rfc4627.txt">http://www.ietf.org/rfc/rfc4627.txt</a>) and
            www.json.org.</p>
        <p>Both requests and responses may include zero or more objects.</p>
        <p>In case the request is for a single entity, the response shall return a single
            JSON object, or none. In case the request if for a list of entities, the
            response shall return a single JSON array with 0 or more elements.</p>
        <p>Requests may be delivered with some JSON object fields missing. In this case,
            these fields will be assigned default values (often indicating they are not in
            use).</p>
    </div>
    <div id="request-headers">
        <h3>Request Headers</h3>
        <p>The Redis Labs REST API supports the following HTTP headers:</p>
        <table>
            <colgroup>
                <col width="26%" />
                <col width="74%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Header</th>
                    <th>Supported/Required Values</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>Accept</td>
                    <td>application/json</td>
                </tr>
                <tr>
                    <td>Content-Length</td>
                    <td>Length (in bytes) of request message.</td>
                </tr>
                <tr>
                    <td>Content-Type</td>
                    <td>application/json</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="response-headers">
        <h3>Response Headers</h3>
        <p>The Redis Labs REST API supports the following HTTP headers:</p>
        <table>
            <colgroup>
                <col width="25%" />
                <col width="75%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Header</th>
                    <th>Supported/Required Values</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>Content-Type</td>
                    <td>application/json</td>
                </tr>
                <tr>
                    <td>Content-Length</td>
                    <td>Length (in bytes) of response message.</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<div id="api-versions">
    <h2>API Versions</h2>
    <p>All RLEC API operations are versioned, in order to minimize the impact
        of backwards-incompatible API changes and to coordinate between different
        versions operating in parallel.</p>
</div>
<div id="authentication">
    <h2>Authentication
    </h2>
    <p>Authentication to RLEC API occurs via <a
            href="https://en.wikipedia.org/wiki/Basic_access_authentication">Basic Auth</a>.
        Provide your RLEC username and password as the basic auth credentials.</p>
    <p>All calls must be made over SSL, to port 9443.</p>
    <p>Example Request:</p>
    <div>
        <div>
            <pre>curl -u &quot;demo@redislabs.com:password&quot; https://localhost:9443/v1/bdbs
</pre>
        </div>
    </div>
</div>
<div id="common-responses">
    <h2>Common Responses</h2>
    <p>The following are common responses which may be returned in some cases
        regardless of any specific request.</p>
    <table>
        <colgroup>
            <col width="25%" />
            <col width="75%" />
        </colgroup>
        <thead valign="bottom">
            <tr>
                <th>Response</th>
                <th>Condition / Required handling</th>
            </tr>
        </thead>
        <tbody valign="top">
            <tr>
                <td>503 (Service
                    Unavailable)</td>
                <td>Contacted node is currently not a member of any
                    active cluster.</td>
            </tr>
            <tr>
                <td>505 (HTTP
                    Version Not
                    Supported)</td>
                <td>An unsupported X-API-Version was used, see API
                    Versions above.</td>
            </tr>
        </tbody>
    </table>
</div>
<div id="object-attributes">
    <h2>Object Attributes</h2>
    <p><em>Note: Some objects include fields that are for internal use and are not documented. These fields
            might be returned as part of the object’s json format and should be ignored.</em></p>
    <span id="module-apidoc"><span id="id1">
    <div id="action">
        <h3>action</h3>
    </div>
    <div id="bdb">
        <h3>bdb</h3>
        <p>An API object that represents a managed database in the cluster.</p>
        <table>
            <colgroup>
                <col width="21%" />
                <col width="54%" />
                <col width="25%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>uid</td>
                    <td>integer</td>
                    <td>Cluster unique ID of database. Can be
                        set on Create, but can not be updated.</td>
                </tr>
                <tr>
                    <td>shard_list</td>
                    <td>array of integer</td>
                    <td>Cluster unique IDs of all database
                        shards.</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>string</td>
                    <td>Database name</td>
                </tr>
                <tr>
                    <td rowspan="2">type</td>
                    <td><strong>‘redis’</strong></td>
                    <td rowspan="2">Type of database</td>
                </tr>
                <tr>
                    <td>‘memcached’</td>
                </tr>
                <tr>
                    <td>version</td>
                    <td>string</td>
                    <td>Database compatibility version</td>
                </tr>
                <tr>
                    <td>redis_version</td>
                    <td>string</td>
                    <td>Version of the redis-server processes</td>
                </tr>
                <tr>
                    <td>bigstore</td>
                    <td>boolean (default: False)</td>
                    <td>Database bigstore option</td>
                </tr>
                <tr>
                    <td>created_time</td>
                    <td>string</td>
                    <td>The date and time the database was
                        created (read-only)</td>
                </tr>
                <tr>
                    <td>last_changed_time</td>
                    <td>string</td>
                    <td>Last administrative configuration change
                        (read-only)</td>
                </tr>
                <tr>
                    <td rowspan="7">status</td>
                    <td>‘pending’</td>
                    <td rowspan="7">Database life-cycle status. See the ‘bdb
                        -&gt; status’ section (read-only)</td>
                </tr>
                <tr>
                    <td>‘active’</td>
                </tr>
                <tr>
                    <td>‘active-change-pending’</td>
                </tr>
                <tr>
                    <td>‘delete-pending’</td>
                </tr>
                <tr>
                    <td>‘import-pending’</td>
                </tr>
                <tr>
                    <td>‘creation-failed’</td>
                </tr>
                <tr>
                    <td>‘recovery’</td>
                </tr>
                <tr>
                    <td rowspan="5">import_status</td>
                    <td>‘idle’</td>
                    <td rowspan="5">Database import process status (read-
                        only)</td>
                </tr>
                <tr>
                    <td>‘initializing’</td>
                </tr>
                <tr>
                    <td>‘importing’</td>
                </tr>
                <tr>
                    <td>‘succeeded’</td>
                </tr>
                <tr>
                    <td>‘failed’</td>
                </tr>
                <tr>
                    <td>import_progress</td>
                    <td>number, 0-100</td>
                    <td>Database import progress (percentage)
                        (read-only)</td>
                </tr>
                <tr>
                    <td rowspan="7">import_failure_reason</td>
                    <td>‘download-error’</td>
                    <td rowspan="7">Import failure reason (read-only)</td>
                </tr>
                <tr>
                    <td>‘file-corrupted’</td>
                </tr>
                <tr>
                    <td>‘general-error’</td>
                </tr>
                <tr>
                    <td>‘file-larger-than-mem-limit:&lt;n bytes of expected dataset&gt;:&lt;n bytes configured bdb
                        limit&gt;’</td>
                </tr>
                <tr>
                    <td>‘key-too-long’</td>
                </tr>
                <tr>
                    <td>‘invalid-bulk-length’</td>
                </tr>
                <tr>
                    <td>‘out-of-memory’</td>
                </tr>
                <tr>
                    <td rowspan="3">backup_status</td>
                    <td>‘exporting’</td>
                    <td rowspan="3">Status of scheduled periodic backup
                        process (read-only)</td>
                </tr>
                <tr>
                    <td>‘succeeded’</td>
                </tr>
                <tr>
                    <td>‘failed’</td>
                </tr>
                <tr>
                    <td>backup_progress</td>
                    <td>number, 0-100</td>
                    <td>Database scheduled periodic backup
                        progress (percentage) (read-only)</td>
                </tr>
                <tr>
                    <td rowspan="3">backup_failure_reason</td>
                    <td>‘no-permission’</td>
                    <td rowspan="3">Reason of last failed backup process
                        (read-only)</td>
                </tr>
                <tr>
                    <td>‘wrong-file-path’</td>
                </tr>
                <tr>
                    <td>‘general-error’</td>
                </tr>
                <tr>
                    <td rowspan="3">export_status</td>
                    <td>‘exporting’</td>
                    <td rowspan="3">Status of manually trigerred export
                        process (read-only)</td>
                </tr>
                <tr>
                    <td>‘succeeded’</td>
                </tr>
                <tr>
                    <td>‘failed’</td>
                </tr>
                <tr>
                    <td>export_progress</td>
                    <td>number, 0-100</td>
                    <td>Database manually trigerred export
                        progress (percentage) (read-only)</td>
                </tr>
                <tr>
                    <td rowspan="3">export_failure_reason</td>
                    <td>‘no-permission’</td>
                    <td rowspan="3">Reason of last failed export process
                        (read-only)</td>
                </tr>
                <tr>
                    <td>‘wrong-file-path’</td>
                </tr>
                <tr>
                    <td>‘general-error’</td>
                </tr>
                <tr>
                    <td>last_export_time</td>
                    <td>string</td>
                    <td>Time of last successful export (read-
                        only)</td>
                </tr>
                <tr>
                    <td>dataset_import_sources</td>
                    <td>complex object</td>
                    <td>Array of source file location
                        description objects to import from when
                        performing an import action. This is
                        write only, it cannot be read after set.
                        GET /jsonschema to retrieve the object’s
                        structure. See also the ‘bdb -&gt;
                        dataset_import_sources’ section.</td>
                </tr>
                <tr>
                    <td>memory_size</td>
                    <td>integer (default: 0)</td>
                    <td>Database memory limit (0 is unlimited),
                        expressed in bytes.</td>
                </tr>
                <tr>
                    <td>bigstore_ram_size</td>
                    <td>integer (default: 0)</td>
                    <td>Memory size of bigstore RAM part.</td>
                </tr>
                <tr>
                    <td rowspan="8">eviction_policy</td>
                    <td>‘volatile-lru’</td>
                    <td rowspan="8">Database eviction policy (Redis style).
                        Redis db default: ‘volatile-lru’,
                        memcached db default: ‘allkeys-lru’</td>
                </tr>
                <tr>
                    <td>‘volatile-ttl’</td>
                </tr>
                <tr>
                    <td>‘volatile-random’</td>
                </tr>
                <tr>
                    <td>‘allkeys-lru’</td>
                </tr>
                <tr>
                    <td>‘allkeys-random’</td>
                </tr>
                <tr>
                    <td>‘noeviction’</td>
                </tr>
                <tr>
                    <td>‘volatile-lfu’</td>
                </tr>
                <tr>
                    <td>‘allkeys-lfu’</td>
                </tr>
                <tr>
                    <td>replication</td>
                    <td>boolean (default: False)</td>
                    <td>In-memory database replication mode</td>
                </tr>
                <tr>
                    <td rowspan="3">data_persistence</td>
                    <td><strong>‘disabled’</strong></td>
                    <td rowspan="3">Database on-disk persistence policy. For
                        snapshot persistence, a snapshot_policy
                        must be provided</td>
                </tr>
                <tr>
                    <td>‘snapshot’</td>
                </tr>
                <tr>
                    <td>‘aof’</td>
                </tr>
                <tr>
                    <td>snapshot_policy</td>
                    <td>array of <a href="#snapshot-policy">snapshot_policy</a> object</td>
                    <td>Policy for snapshot-based data
                        persistence. Dataset snapshot will be
                        taken every N secs if there are at least
                        M writes changes in the dataset</td>
                </tr>
                <tr>
                    <td rowspan="2">aof_policy</td>
                    <td><strong>‘appendfsync-every-sec’</strong></td>
                    <td rowspan="2">Policy for Append-Only File data
                        persistence</td>
                </tr>
                <tr>
                    <td>‘appendfsync-always’</td>
                </tr>
                <tr>
                    <td>max_aof_load_time</td>
                    <td>integer</td>
                    <td>Maximum time shard’s AOF reload should
                        take (seconds). Default 3600.</td>
                </tr>
                <tr>
                    <td>max_aof_file_size</td>
                    <td>integer</td>
                    <td>Maximum size for shard’s AOF file
                        (bytes). Default 300GB, (on bigstore DB
                        150GB)</td>
                </tr>
                <tr>
                    <td>backup</td>
                    <td>boolean (default: False)</td>
                    <td>Policy for periodic database backup</td>
                </tr>
                <tr>
                    <td>backup_location</td>
                    <td>complex object</td>
                    <td>Target for automatic database backups.
                        GET /jsonschema to retrieve the object’s
                        structure. See also the ‘bdb -&gt;
                        backup_location’ section.</td>
                </tr>
                <tr>
                    <td>backup_interval</td>
                    <td>integer</td>
                    <td>Interval in seconds in which automatic
                        backup will be initiated</td>
                </tr>
                <tr>
                    <td>backup_interval_offset</td>
                    <td>integer</td>
                    <td>Offset (in seconds) from round backup
                        interval when automatic backup will be
                        initiated (should be less than
                        backup_interval)</td>
                </tr>
                <tr>
                    <td>backup_history</td>
                    <td>integer (default: 0)</td>
                    <td>Backup history retention policy (number
                        of days, 0 is forever)</td>
                </tr>
                <tr>
                    <td>last_backup_time</td>
                    <td>string</td>
                    <td>Time of last successful backup (read-
                        only)</td>
                </tr>
                <tr>
                    <td rowspan="2">hash_slots_policy</td>
                    <td>‘legacy’</td>
                    <td rowspan="2">The policy used for hash slots handling;
                        ‘legacy’ means slots range will be
                        ‘1-4096’, ‘16k’ means slots range will
                        be ‘0-16383’</td>
                </tr>
                <tr>
                    <td><strong>‘16k’</strong></td>
                </tr>
                <tr>
                    <td>oss_cluster</td>
                    <td>boolean (default: False)</td>
                    <td>OSS Cluster mode option. Cannot be
                        enabled with ‘hash_slots_policy’:
                        ‘legacy’</td>
                </tr>
                <tr>
                    <td>disabled_commands</td>
                    <td>string (default: )</td>
                    <td>Redis commands which are disabled in db</td>
                </tr>
                <tr>
                    <td rowspan="2">oss_cluster_api_preferred_ip_type</td>
                    <td><strong>‘internal’</strong></td>
                    <td rowspan="2">Internal/external IP type in oss cluster
                        API. Default value for new endpoints</td>
                </tr>
                <tr>
                    <td>‘external’</td>
                </tr>
                <tr>
                    <td>sharding</td>
                    <td>boolean (default: False)</td>
                    <td>Cluster mode (server side sharding).
                        When true, shard hashing rules must be
                        provided by either oss_sharding or
                        shard_key_regex</td>
                </tr>
                <tr>
                    <td>shards_count</td>
                    <td>integer, 1-512 (default: 1)</td>
                    <td>Number of database server-side shards</td>
                </tr>
                <tr>
                    <td rowspan="2">shards_placement</td>
                    <td><strong>‘dense’</strong></td>
                    <td rowspan="2">Control the density of shards: should
                        they reside on as few or as many nodes
                        as possible</td>
                </tr>
                <tr>
                    <td>‘sparse’</td>
                </tr>
                <tr>
                    <td>shard_key_regex</td>
                    <td>
                        <div>
                            <div>
                                <pre>[{
&quot;regex&quot;: string
}, ...]
</pre>
                            </div>
                        </div>
                    </td>
                    <td>Custom keyname-based sharding rules.
                        Custom keyname-based sharding rules. To
                        use the default rules you should set the
                        value to: [ { “regex”:
                        “.*\\{(?&lt;tag&gt;.*)\\}.*” }, {
                        “regex”: “(?&lt;tag&gt;.*)” } ]</td>
                </tr>
                <tr>
                    <td>oss_sharding</td>
                    <td>boolean (default: False)</td>
                    <td>An alternative to shard_key_regex for
                        using the common case of the oss shard
                        hashing policy</td>
                </tr>
                <tr>
                    <td>auto_upgrade</td>
                    <td>boolean (default: False)</td>
                    <td>Should upgrade automatically after a
                        cluster upgrade</td>
                </tr>
                <tr>
                    <td>internal</td>
                    <td>boolean (default: False)</td>
                    <td>Is this a bdb used by the cluster
                        internally</td>
                </tr>
                <tr>
                    <td>tags</td>
                    <td>
                        <div>
                            <div>
                                <pre>[{
&quot;key&quot;: string,
&quot;value&quot;: string
}, ...]
</pre>
                            </div>
                        </div>
                    </td>
                    <td>Optional list of tags objects attached
                        to the database; <strong>key</strong>: key
                        representing the tag’s meaning - must be
                        unique among tags. (pattern does not
                        allow special characters &amp;,&lt;,&gt;,”);
                        <strong>value</strong>: the tag’s value</td>
                </tr>
                <tr>
                    <td>action_uid</td>
                    <td>string</td>
                    <td>Currently running action’s uid (read-
                        only)</td>
                </tr>
                <tr>
                    <td>sm_id</td>
                    <td>string</td>
                    <td>deprecated; here for backwards
                        compatibility (read-only)</td>
                </tr>
                <tr>
                    <td>authentication_redis_pass</td>
                    <td>string</td>
                    <td>Redis AUTH password authentication</td>
                </tr>
                <tr>
                    <td>authentication_sasl_uname</td>
                    <td>string</td>
                    <td>Binary memcache SASL username (pattern
                        does not allow special characters
                        &amp;,&lt;,&gt;,”)</td>
                </tr>
                <tr>
                    <td>authentication_sasl_pass</td>
                    <td>string</td>
                    <td>Binary memcache SASL password</td>
                </tr>
                <tr>
                    <td>authentication_admin_pass</td>
                    <td>string</td>
                    <td>Password for administrative access to
                        the BDB (used for SYNC from the BDB)</td>
                </tr>
                <tr>
                    <td>ssl</td>
                    <td>boolean (default: False)</td>
                    <td>(deprecated) Require SSL authenticated
                        and encrypted connections to the
                        database</td>
                </tr>
                <tr>
                    <td rowspan="3">tls_mode</td>
                    <td>‘enabled’</td>
                    <td rowspan="3">Require SSL authenticated and encrypted
                        connections to the database</td>
                </tr>
                <tr>
                    <td><strong>‘disabled’</strong></td>
                </tr>
                <tr>
                    <td>‘replica_ssl’</td>
                </tr>
                <tr>
                    <td rowspan="2">enforce_client_authentication</td>
                    <td><strong>‘enabled’</strong></td>
                    <td rowspan="2">Require authentication of client
                        certificates for SSL connections to the
                        database. If set to ‘enabled’, a
                        certificate should be provided in either
                        authentication_ssl_client_certs or
                        authentication_ssl_crdt_certs</td>
                </tr>
                <tr>
                    <td>‘disabled’</td>
                </tr>
                <tr>
                    <td>authentication_ssl_client_certs</td>
                    <td>
                        <div>
                            <div>
                                <pre>[{
&quot;client_cert&quot;: string
}, ...]
</pre>
                            </div>
                        </div>
                    </td>
                    <td>List of authorized client certificates;
                        <strong>client_cert</strong>: X.509 PEM (base64)
                        encoded certificate</td>
                </tr>
                <tr>
                    <td>authentication_ssl_crdt_certs</td>
                    <td>
                        <div>
                            <div>
                                <pre>[{
&quot;client_cert&quot;: string
}, ...]
</pre>
                            </div>
                        </div>
                    </td>
                    <td>List of authorized crdt certificates;
                        <strong>client_cert</strong>: X.509 PEM (base64)
                        encoded certificate</td>
                </tr>
                <tr>
                    <td>roles_permissions</td>
                    <td>
                        <div>
                            <div>
                                <pre>[{
&quot;role_uid&quot;: integer,
&quot;data_permissions_uid&quot;: integer
}, ...]
</pre>
                            </div>
                        </div>
                    </td>
                    <td>&#160;</td>
                </tr>
                <tr>
                    <td>default_user</td>
                    <td>boolean (default: True)</td>
                    <td>Is connecting with a default user
                        allowed?</td>
                </tr>
                <tr>
                    <td>port</td>
                    <td>integer</td>
                    <td>TCP port on which the database is
                        available. Will be generated
                        automatically if omitted and will be
                        returned as 0</td>
                </tr>
                <tr>
                    <td>dns_address_master</td>
                    <td>string</td>
                    <td>(deprecated) Database private address
                        endpoint FQDN (read-only)</td>
                </tr>
                <tr>
                    <td>endpoints</td>
                    <td>array</td>
                    <td>List of database access endpoints (read-
                        only)</td>
                </tr>
                <tr>
                    <td>endpoint_node</td>
                    <td>integer</td>
                    <td>(deprecated) Node UID hosting the BDB’s
                        endpoint (read-only)</td>
                </tr>
                <tr>
                    <td>endpoint_ip</td>
                    <td>complex object</td>
                    <td>(deprecated) External IP addresses of
                        node hosting the BDB’s endpoint. GET
                        /jsonschema to retrieve the object’s
                        structure. (read-only)</td>
                </tr>
                <tr>
                    <td>max_connections</td>
                    <td>integer (default: 0)</td>
                    <td>Maximum number of client connections
                        allowed (0 unlimited)</td>
                </tr>
                <tr>
                    <td>implicit_shard_key</td>
                    <td>boolean (default: False)</td>
                    <td>Controls the behavior of what happens in
                        case a key does not match any of the
                        regex rules. When set to True, if a key
                        does not match any of the rules, the
                        entire key will be used for the hashing
                        function. When set to False, if a key
                        does not match any of the rules, an
                        error will be returned.</td>
                </tr>
                <tr>
                    <td>replica_sources</td>
                    <td>array of <a href="#syncer-sources">syncer_sources</a> object</td>
                    <td>Remote endpoints of database to sync
                        from. See the ‘bdb -&gt; replica_sources’
                        section</td>
                </tr>
                <tr>
                    <td>crdt_sources</td>
                    <td>array of <a href="#syncer-sources">syncer_sources</a> object</td>
                    <td>Remote endpoints/peers of CRDB database
                        to sync from. See the ‘bdb -&gt;
                        replica_sources’ section</td>
                </tr>
                <tr>
                    <td rowspan="2">gradual_src_mode</td>
                    <td>‘enabled’</td>
                    <td rowspan="2">Indicates if gradual sync (of sync
                        sources) should be activated</td>
                </tr>
                <tr>
                    <td>‘disabled’</td>
                </tr>
                <tr>
                    <td>gradual_src_max_sources</td>
                    <td>integer (default: 1)</td>
                    <td>Sync a maximum N sources in parallel
                        (gradual_src_mode should be enabled for
                        this to take effect)</td>
                </tr>
                <tr>
                    <td rowspan="3">gradual_sync_mode</td>
                    <td>‘enabled’</td>
                    <td rowspan="3">Indicates if gradual sync (of source
                        shards) should be activated (‘auto’ for
                        automatic decision)</td>
                </tr>
                <tr>
                    <td>‘disabled’</td>
                </tr>
                <tr>
                    <td>‘auto’</td>
                </tr>
                <tr>
                    <td>gradual_sync_max_shards_per_source</td>
                    <td>integer (default: 1)</td>
                    <td>Sync a maximum of N shards per source in
                        parallel (gradual_sync_mode should be
                        enabled for this to take effect)</td>
                </tr>
                <tr>
                    <td>sync_sources</td>
                    <td>
                        <div>
                            <div>
                                <pre>[{
&quot;uid&quot;: integer,
&quot;uri&quot;: string,
&quot;compression&quot;: integer,
&quot;status&quot;: string,
&quot;rdb_transferred&quot;: integer,
&quot;rdb_size&quot;: integer,
&quot;last_update&quot;: string,
&quot;lag&quot;: integer,
&quot;last_error&quot;: string
}, ...]
</pre>
                            </div>
                        </div>
                    </td>
                    <td>(deprecated, instead use replica_sources
                        or crdt_sources) Remote endpoints of
                        database to sync from. See the ‘bdb -&gt;
                        replica_sources’ section; <strong>uid</strong>:
                        Numeric unique identification of this
                        source; <strong>uri</strong>: Source redis URI;
                        <strong>compression</strong>: Compression level for
                        the replication link; <strong>status</strong>: Sync
                        status of this source;
                        <strong>rdb_transferred</strong>: Number of bytes
                        transferred from the source’s RDB during
                        the syncing phase.; <strong>rdb_size</strong>: The
                        source’s RDB size to be transferred
                        during the syncing phase.;
                        <strong>last_update</strong>: Time when we last
                        receive an update from the source.;
                        <strong>lag</strong>: Lag in millisec between source
                        and destination (while synced).;
                        <strong>last_error</strong>: Last error encountered
                        when syncing from the source.</td>
                </tr>
                <tr>
                    <td rowspan="4">replica_sync</td>
                    <td>‘enabled’</td>
                    <td rowspan="4">Allow to enable, disable or pause
                        syncing from specified replica_sources.
                        See the ‘bdb -&gt; replica_sync’ section</td>
                </tr>
                <tr>
                    <td><strong>‘disabled’</strong></td>
                </tr>
                <tr>
                    <td>‘paused’</td>
                </tr>
                <tr>
                    <td>‘stopped’</td>
                </tr>
                <tr>
                    <td rowspan="4">crdt_sync</td>
                    <td>‘enabled’</td>
                    <td rowspan="4">Allow to enable, disable or pause
                        syncing from specified crdt_sources.
                        Applicable only for CRDB bdb. See the
                        ‘bdb -&gt; replica_sync’ section</td>
                </tr>
                <tr>
                    <td><strong>‘disabled’</strong></td>
                </tr>
                <tr>
                    <td>‘paused’</td>
                </tr>
                <tr>
                    <td>‘stopped’</td>
                </tr>
                <tr>
                    <td rowspan="4">sync</td>
                    <td>‘enabled’</td>
                    <td rowspan="4">(deprecated, instead use replica_sync or
                        crdt_sync) Allow to enable, disable or
                        pause syncing from specified
                        sync_sources. See the ‘bdb -&gt;
                        replica_sync’ section</td>
                </tr>
                <tr>
                    <td><strong>‘disabled’</strong></td>
                </tr>
                <tr>
                    <td>‘paused’</td>
                </tr>
                <tr>
                    <td>‘stopped’</td>
                </tr>
                <tr>
                    <td>bigstore_ram_weights</td>
                    <td>
                        <div>
                            <div>
                                <pre>[{
&quot;shard_uid&quot;: integer,
&quot;weight&quot;: number
}, ...]
</pre>
                            </div>
                        </div>
                    </td>
                    <td>List of shard UIDs and their bigstore
                        RAM weights; <strong>shard_uid</strong>: Shard UID;
                        <strong>weight</strong>: Relative weight of RAM
                        distribution</td>
                </tr>
                <tr>
                    <td>email_alerts</td>
                    <td>boolean (default: False)</td>
                    <td>Send email alerts for this DB</td>
                </tr>
                <tr>
                    <td>rack_aware</td>
                    <td>boolean (default: False)</td>
                    <td>Require the database to be always
                        replicated across multiple racks</td>
                </tr>
                <tr>
                    <td rowspan="3">proxy_policy</td>
                    <td>‘single’</td>
                    <td rowspan="3">The default policy used for proxy
                        binding to endpoints</td>
                </tr>
                <tr>
                    <td>‘all-master-shards’</td>
                </tr>
                <tr>
                    <td>‘all-nodes’</td>
                </tr>
                <tr>
                    <td>use_nodes</td>
                    <td>array of string</td>
                    <td>Cluster node uids to use for bdb’s
                        shards and bound endpoints</td>
                </tr>
                <tr>
                    <td>avoid_nodes</td>
                    <td>array of string</td>
                    <td>Cluster node uids to avoid when placing
                        the bdb’s shards and binding its
                        endpoints</td>
                </tr>
                <tr>
                    <td>endpoint</td>
                    <td>string</td>
                    <td>Latest bound endpoint. Used when
                        reconfiguring an endpoint via update</td>
                </tr>
                <tr>
                    <td>wait_command</td>
                    <td>boolean (default: True)</td>
                    <td>Support Redis wait command. (read-only)</td>
                </tr>
                <tr>
                    <td>background_op</td>
                    <td>
                        <div>
                            <div>
                                <pre>[{
&quot;status&quot;: string,
&quot;name&quot;: string,
&quot;error&quot;: object,
&quot;progress&quot;: number
}, ...]
</pre>
                            </div>
                        </div>
                    </td>
                    <td>(read-only); <strong>progress</strong>: Percent of
                        completed steps in current operation</td>
                </tr>
                <tr>
                    <td>module_list</td>
                    <td>
                        <div>
                            <div>
                                <pre>[{
&quot;module_id&quot;: string,
&quot;module_args&quot;: [u&#39;string&#39;, u&#39;null&#39;],
&quot;module_name&quot;: string,
&quot;semantic_version&quot;: string
}, ...]
</pre>
                            </div>
                        </div>
                    </td>
                    <td>List of modules associated with
                        database.; <strong>module_id</strong>: Module UID;
                        <strong>module_args</strong>: Module command line
                        arguments (pattern does not allow
                        special characters &amp;,&lt;,&gt;,”);
                        <strong>module_name</strong>: Module’s name;
                        <strong>semantic_version</strong>: Module’s semantic
                        version</td>
                </tr>
                <tr>
                    <td>crdt</td>
                    <td>boolean (default: False)</td>
                    <td>Use CRDT-based data types for multi-
                        master replication</td>
                </tr>
                <tr>
                    <td>crdt_replica_id</td>
                    <td>integer</td>
                    <td>Local replica-id, for internal use only.</td>
                </tr>
                <tr>
                    <td>crdt_replicas</td>
                    <td>string</td>
                    <td>Replica-set configuration, for internal
                        use only.</td>
                </tr>
                <tr>
                    <td>crdt_ghost_replica_ids</td>
                    <td>string</td>
                    <td>Removed replicas IDs, for internal use
                        only.</td>
                </tr>
                <tr>
                    <td>crdt_causal_consistency</td>
                    <td>boolean (default: False)</td>
                    <td>Causal consistent CRDB.</td>
                </tr>
                <tr>
                    <td>crdt_config_version</td>
                    <td>integer</td>
                    <td>Replica-set configuration version, for
                        internal use only.</td>
                </tr>
                <tr>
                    <td>crdt_protocol_version</td>
                    <td>integer</td>
                    <td>CRDB active Protocol version</td>
                </tr>
                <tr>
                    <td>crdt_featureset_version</td>
                    <td>integer</td>
                    <td>CRDB active FeatureSet version</td>
                </tr>
                <tr>
                    <td>crdt_guid</td>
                    <td>string</td>
                    <td>GUID of CRDB this bdb is part of, for
                        internal use only.</td>
                </tr>
                <tr>
                    <td>slave_ha</td>
                    <td>boolean</td>
                    <td>Enable slave high availability mechanism
                        for this bdb. default takes the cluster
                        setting.</td>
                </tr>
                <tr>
                    <td>slave_ha_priority</td>
                    <td>integer</td>
                    <td>Priority of the BDB in slave high
                        availability mechanism.</td>
                </tr>
                <tr>
                    <td rowspan="2">skip_import_analyze</td>
                    <td>‘enabled’</td>
                    <td rowspan="2">Enable/disable skipping the analysis
                        stage when importing an RDB file</td>
                </tr>
                <tr>
                    <td>‘disabled’</td>
                </tr>
            </tbody>
        </table>
        <div id="syncer-sources">
            <h4>syncer_sources</h4>
            <table>
                <colgroup>
                    <col width="28%" />
                    <col width="16%" />
                    <col width="56%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>uid</td>
                        <td>integer</td>
                        <td>Numeric unique identification of this
                            source</td>
                    </tr>
                    <tr>
                        <td>uri</td>
                        <td>string</td>
                        <td>Source redis URI</td>
                    </tr>
                    <tr>
                        <td>compression</td>
                        <td>integer</td>
                        <td>Compression level for the replication
                            link</td>
                    </tr>
                    <tr>
                        <td>encryption</td>
                        <td>boolean</td>
                        <td>Encryption enabled / disabled</td>
                    </tr>
                    <tr>
                        <td>server_cert</td>
                        <td>string</td>
                        <td>Server certificate to use if encryption
                            is enabled</td>
                    </tr>
                    <tr>
                        <td>client_cert</td>
                        <td>string</td>
                        <td>Client certificate to use if encryption
                            is enabled</td>
                    </tr>
                    <tr>
                        <td>client_key</td>
                        <td>string</td>
                        <td>Client key to use if encryption is
                            enabled</td>
                    </tr>
                    <tr>
                        <td>status</td>
                        <td>string</td>
                        <td>Sync status of this source</td>
                    </tr>
                    <tr>
                        <td>replication_tls_sni</td>
                        <td>string</td>
                        <td>Replication TLS server name indication</td>
                    </tr>
                    <tr>
                        <td>rdb_transferred</td>
                        <td>integer</td>
                        <td>Number of bytes transferred from the
                            source’s RDB during the syncing phase.</td>
                    </tr>
                    <tr>
                        <td>rdb_size</td>
                        <td>integer</td>
                        <td>The source’s RDB size to be transferred
                            during the syncing phase.</td>
                    </tr>
                    <tr>
                        <td>last_update</td>
                        <td>string</td>
                        <td>Time when we last receive an update from
                            the source.</td>
                    </tr>
                    <tr>
                        <td>lag</td>
                        <td>integer</td>
                        <td>Lag in millisec between source and
                            destination (while synced).</td>
                    </tr>
                    <tr>
                        <td>last_error</td>
                        <td>string</td>
                        <td>Last error encountered when syncing from
                            the source.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="snapshot-policy">
            <h4>snapshot_policy</h4>
            <table>
                <colgroup>
                    <col width="24%" />
                    <col width="36%" />
                    <col width="39%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>secs</td>
                        <td>integer</td>
                        <td>&#160;</td>
                    </tr>
                    <tr>
                        <td>writes</td>
                        <td>integer</td>
                        <td>&#160;</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div id="bdb-group">
        <h3>bdb_group</h3>
        <p>An API object that represents a group of databases that share a memory pool.</p>
        <table>
            <colgroup>
                <col width="18%" />
                <col width="24%" />
                <col width="58%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>uid</td>
                    <td>integer</td>
                    <td>Cluster unique ID of the database group.</td>
                </tr>
                <tr>
                    <td>memory_size</td>
                    <td>integer</td>
                    <td>The common memory pool size limit for
                        all datbases in the group, expressed in
                        bytes</td>
                </tr>
                <tr>
                    <td>members</td>
                    <td>array of string</td>
                    <td>A list of uids of member databases
                        (read-only)</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="bootstrap">
        <h3>bootstrap</h3>
        <p>An bootstrap configuration object.</p>
        <table>
            <colgroup>
                <col width="20%" />
                <col width="37%" />
                <col width="43%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>action</td>
                    <td>‘recover_cluster’</td>
                    <td>Action to perform</td>
                </tr>
                <tr>
                    <td>recovery_filename</td>
                    <td>string</td>
                    <td>Name of backup file to recover from</td>
                </tr>
                <tr>
                    <td>node</td>
                    <td>object <a href="#node-identity">node_identity</a></td>
                    <td>Node description.</td>
                </tr>
                <tr>
                    <td><strong>or:</strong></td>
                    <td>&#160;</td>
                    <td>&#160;</td>
                </tr>
                <tr>
                    <td rowspan="2">action</td>
                    <td>‘join_cluster’</td>
                    <td rowspan="2">Action to perform</td>
                </tr>
                <tr>
                    <td>‘create_cluster’</td>
                </tr>
                <tr>
                    <td>max_retries</td>
                    <td>integer</td>
                    <td>Max. number of retries in case of
                        recoverable errors.</td>
                </tr>
                <tr>
                    <td>retry_time</td>
                    <td>integer</td>
                    <td>Max. waiting time, in seconds, between
                        retries.</td>
                </tr>
                <tr>
                    <td>dns_suffixes</td>
                    <td>
                        <div>
                            <div>
                                <pre>[{
&quot;name&quot;: string,
&quot;cluster_default&quot;: boolean,
&quot;use_aaaa_ns&quot;: boolean,
&quot;use_internal_addr&quot;: boolean,
&quot;slaves&quot;: array
}, ...]
</pre>
                            </div>
                        </div>
                    </td>
                    <td>Explicit configuration of DNS suffixes;
                        <strong>name</strong>: DNS suffix name;
                        <strong>cluster_default</strong>: Should this suffix
                        be the default cluster suffix;
                        <strong>use_aaaa_ns</strong>: Should AAAA records be
                        published for NS records;
                        <strong>use_internal_addr</strong>: Should internal
                        cluster IPs be published for databases;
                        <strong>slaves</strong>: List of slave servers that
                        should be published as NS and notified</td>
                </tr>
                <tr>
                    <td>license</td>
                    <td>string</td>
                    <td>License string</td>
                </tr>
                <tr>
                    <td>cluster</td>
                    <td>object <a href="#cluster-identity">cluster_identity</a></td>
                    <td>Cluster to join or create.</td>
                </tr>
                <tr>
                    <td>credentials</td>
                    <td>object <a href="#credentials">credentials</a></td>
                    <td>Cluster admin credentials.</td>
                </tr>
                <tr>
                    <td>node</td>
                    <td>object <a href="#node-identity">node_identity</a></td>
                    <td>Node description.</td>
                </tr>
                <tr>
                    <td>policy</td>
                    <td>object <a href="#policy">policy</a></td>
                    <td>Policy object.</td>
                </tr>
                <tr>
                    <td>cnm_https_port</td>
                    <td>integer</td>
                    <td>Port to join a cluster with non-default
                        cnm_https port</td>
                </tr>
                <tr>
                    <td>required_version</td>
                    <td>string</td>
                    <td>This node can join the cluster only if
                        all nodes in the cluster are of version
                        greater than the required_version</td>
                </tr>
            </tbody>
        </table>
        <div id="credentials">
            <h4>credentials</h4>
            <table>
                <colgroup>
                    <col width="16%" />
                    <col width="19%" />
                    <col width="66%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>username</td>
                        <td>string</td>
                        <td>Admin username (pattern does not allow
                            special characters &amp;,&lt;,&gt;,”)</td>
                    </tr>
                    <tr>
                        <td>password</td>
                        <td>string</td>
                        <td>Admin password</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="cluster-identity">
            <h4>cluster_identity</h4>
            <table>
                <colgroup>
                    <col width="17%" />
                    <col width="31%" />
                    <col width="52%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>name</td>
                        <td>string</td>
                        <td>Fully qualified cluster name. Limited to
                            64 characters and must comply with the
                            IETF’s RFC 952 standard and section 2.1
                            of the RFC 1123 standard.</td>
                    </tr>
                    <tr>
                        <td>nodes</td>
                        <td>array of string</td>
                        <td>Array of IP addresses of existing
                            cluster nodes.</td>
                    </tr>
                    <tr>
                        <td>wait_command</td>
                        <td>boolean (default: True)</td>
                        <td>Support Redis wait command</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="node-identity">
            <h4>node_identity
            </h4>
            <table>
                <colgroup>
                    <col width="26%" />
                    <col width="28%" />
                    <col width="46%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>identity</td>
                        <td>object <a href="#identity">identity</a></td>
                        <td>Node identity.</td>
                    </tr>
                    <tr>
                        <td>limits</td>
                        <td>object <a href="#limits">limits</a></td>
                        <td>Node limits.</td>
                    </tr>
                    <tr>
                        <td rowspan="4">bigstore_driver</td>
                        <td>‘ibm-capi-ga1’</td>
                        <td rowspan="4">Bigstore driver name or none</td>
                    </tr>
                    <tr>
                        <td>‘ibm-capi-ga2’</td>
                    </tr>
                    <tr>
                        <td>‘ibm-capi-ga4’</td>
                    </tr>
                    <tr>
                        <td>‘rocksdb’</td>
                    </tr>
                    <tr>
                        <td>paths</td>
                        <td>object <a href="#paths">paths</a></td>
                        <td>Storage paths object.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="paths">
            <h4>paths</h4>
            <table>
                <colgroup>
                    <col width="32%" />
                    <col width="18%" />
                    <col width="50%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>ephemeral_path</td>
                        <td>string</td>
                        <td>Ephemeral storage path.</td>
                    </tr>
                    <tr>
                        <td>bigstore_path</td>
                        <td>string</td>
                        <td>Bigredis storage path.</td>
                    </tr>
                    <tr>
                        <td>persistent_path</td>
                        <td>string</td>
                        <td>Persistent storage path.</td>
                    </tr>
                    <tr>
                        <td>ccs_persistent_path</td>
                        <td>string</td>
                        <td>Persistent storage path of ccs.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="identity">
            <h4>identity</h4>
            <table>
                <colgroup>
                    <col width="21%" />
                    <col width="29%" />
                    <col width="49%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>name</td>
                        <td>string</td>
                        <td>Node’s name.</td>
                    </tr>
                    <tr>
                        <td>uid</td>
                        <td>integer</td>
                        <td>Assumed node’s uid, for cluster joining.
                            Used to replace a dead node with a new
                            one.</td>
                    </tr>
                    <tr>
                        <td>rack_id</td>
                        <td>string</td>
                        <td>Rack id, overrides cloud config.</td>
                    </tr>
                    <tr>
                        <td>override_rack_id</td>
                        <td>boolean</td>
                        <td>When replacing an existing node in a
                            rack aware cluster, allows the new node
                            to be located in a different rack.</td>
                    </tr>
                    <tr>
                        <td>addr</td>
                        <td>string</td>
                        <td>Internal IP address of node</td>
                    </tr>
                    <tr>
                        <td>external_addr</td>
                        <td>complex object</td>
                        <td>External IP addresses of node. GET
                            /jsonschema to retrieve the object’s
                            structure.</td>
                    </tr>
                    <tr>
                        <td>accept_servers</td>
                        <td>boolean (default: True)</td>
                        <td>If True no shards will be created on the
                            node</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="limits">
            <h4>limits</h4>
            <table>
                <colgroup>
                    <col width="24%" />
                    <col width="30%" />
                    <col width="46%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>max_redis_servers</td>
                        <td>integer (default: 100)</td>
                        <td>Max. allowed redis servers on node.</td>
                    </tr>
                    <tr>
                        <td>max_listeners</td>
                        <td>integer (default: 100)</td>
                        <td>Max. allowed listeners on node.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="policy">
            <h4>policy</h4>
            <table>
                <colgroup>
                    <col width="33%" />
                    <col width="25%" />
                    <col width="41%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>rack_aware</td>
                        <td>boolean</td>
                        <td>Cluster rack awareness.</td>
                    </tr>
                    <tr>
                        <td rowspan="3">default_sharded_proxy_policy</td>
                        <td>‘single’</td>
                        <td rowspan="3">Default proxy_policy for newly-created
                            sharded databases’ endpoints</td>
                    </tr>
                    <tr>
                        <td><strong>‘all-master-shards’</strong></td>
                    </tr>
                    <tr>
                        <td>‘all-nodes’</td>
                    </tr>
                    <tr>
                        <td rowspan="3">default_non_sharded_proxy_policy</td>
                        <td><strong>‘single’</strong></td>
                        <td rowspan="3">Default proxy_policy for newly-created
                            non sharded databases’ endpoints</td>
                    </tr>
                    <tr>
                        <td>‘all-master-shards’</td>
                    </tr>
                    <tr>
                        <td>‘all-nodes’</td>
                    </tr>
                    <tr>
                        <td rowspan="2">default_shards_placement</td>
                        <td><strong>‘sparse’</strong></td>
                        <td rowspan="2">Default shards_placement for newly-
                            created databases</td>
                    </tr>
                    <tr>
                        <td>‘dense’</td>
                    </tr>
                    <tr>
                        <td>shards_overbooking</td>
                        <td>boolean (default: True)</td>
                        <td>If true, all bdbs’ memory_size is
                            ignored during shards placement</td>
                    </tr>
                    <tr>
                        <td>default_fork_evict_ram</td>
                        <td>boolean (default: False)</td>
                        <td>If true, the bdb’s should evict data
                            from ram in order to succeed replication
                            or persistency</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div id="check-result">
        <h3>check_result</h3>
        <p>Cluster check result</p>
        <table>
            <colgroup>
                <col width="23%" />
                <col width="30%" />
                <col width="47%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>cluster_test_result</td>
                    <td>boolean</td>
                    <td>Indication if any one of the tests
                        failed</td>
                </tr>
                <tr>
                    <td>nodes</td>
                    <td>
                        <div>
                            <div>
                                <pre>[{
&quot;node_uid&quot;: integer,
&quot;result&quot;: boolean,
&quot;error&quot;: string
}, ...]
</pre>
                            </div>
                        </div>
                    </td>
                    <td>Nodes results</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="cluster">
        <h3>cluster</h3>
        <p>An API object that represents the cluster.</p>
        <table>
            <colgroup>
                <col width="30%" />
                <col width="33%" />
                <col width="37%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>name</td>
                    <td>string</td>
                    <td>Cluster’s fully qualified domain name
                        (read-only)</td>
                </tr>
                <tr>
                    <td>created_time</td>
                    <td>string</td>
                    <td>Cluster creation date (read-only)</td>
                </tr>
                <tr>
                    <td>rack_aware</td>
                    <td>boolean</td>
                    <td>Cluster operates in a rack-aware mode
                        (read-only)</td>
                </tr>
                <tr>
                    <td>default_sharded_proxy_policy</td>
                    <td>string (default: all-master-shards)</td>
                    <td>Default proxy_policy for newly-create
                        sharded databases’ endpoints (read-only)</td>
                </tr>
                <tr>
                    <td>default_non_sharded_proxy_policy</td>
                    <td>string (default: single)</td>
                    <td>Default proxy_policy for newly-create
                        non sharded databases’ endpoints (read-
                        only)</td>
                </tr>
                <tr>
                    <td>alert_settings</td>
                    <td>object <a href="#alert-settings">alert_settings</a></td>
                    <td>Cluster and node alert settings</td>
                </tr>
                <tr>
                    <td>smtp_host</td>
                    <td>string</td>
                    <td>SMTP server to use for automated emails</td>
                </tr>
                <tr>
                    <td>smtp_port</td>
                    <td>integer</td>
                    <td>SMTP server port for automated emails</td>
                </tr>
                <tr>
                    <td>smtp_username</td>
                    <td>string</td>
                    <td>SMTP server username (pattern does not
                        allow special characters &amp;,&lt;,&gt;,”)</td>
                </tr>
                <tr>
                    <td>smtp_password</td>
                    <td>string</td>
                    <td>SMTP server password</td>
                </tr>
                <tr>
                    <td>email_from</td>
                    <td>string</td>
                    <td>Sender email for automated emails</td>
                </tr>
                <tr>
                    <td>smtp_use_tls</td>
                    <td>boolean (default: False)</td>
                    <td>Deprecated, please use smtp_tls_mode
                        field instead. Use TLS for SMTP access</td>
                </tr>
                <tr>
                    <td rowspan="3">smtp_tls_mode</td>
                    <td>‘none’</td>
                    <td rowspan="3">Specifcies if and what TLS mode to use
                        for SMTP access</td>
                </tr>
                <tr>
                    <td>‘tls’</td>
                </tr>
                <tr>
                    <td>‘starttls’</td>
                </tr>
                <tr>
                    <td>email_alerts</td>
                    <td>boolean (default: False)</td>
                    <td>Send node/clsuter email alerts. Requires
                        valid SMTP and email_from settings.</td>
                </tr>
                <tr>
                    <td>wait_command</td>
                    <td>boolean (default: True)</td>
                    <td>Support Redis wait command (read-only)</td>
                </tr>
                <tr>
                    <td>password_complexity</td>
                    <td>boolean (default: False)</td>
                    <td>Enforce password complexity policy.</td>
                </tr>
                <tr>
                    <td>password_expiration_duration</td>
                    <td>integer (default: 0)</td>
                    <td>The number of days a password is valid
                        until the user is required to replace
                        it.</td>
                </tr>
                <tr>
                    <td>use_ipv6</td>
                    <td>boolean (default: True)</td>
                    <td>Should redislabs services listen on
                        ipv6.</td>
                </tr>
                <tr>
                    <td>cipher_suites</td>
                    <td>string</td>
                    <td>Specifies the enabled ciphers. The
                        ciphers are specified in the format
                        understood by the OpenSSL library.</td>
                </tr>
                <tr>
                    <td>cm_port</td>
                    <td>integer, 1024-65535</td>
                    <td>UI HTTPS listening port.</td>
                </tr>
                <tr>
                    <td>cnm_http_port</td>
                    <td>integer, 1024-65535</td>
                    <td>API HTTP listening port.</td>
                </tr>
                <tr>
                    <td>cnm_https_port</td>
                    <td>integer, 1024-65535</td>
                    <td>API HTTPS listening port.</td>
                </tr>
                <tr>
                    <td>handle_redirects</td>
                    <td>boolean (default: False)</td>
                    <td>Handle API HTTPS requests redirect to
                        master node internally.</td>
                </tr>
                <tr>
                    <td>http_support</td>
                    <td>boolean (default: False)</td>
                    <td>Decide whether to enable or disable HTTP
                        support</td>
                </tr>
                <tr>
                    <td>debuginfo_path</td>
                    <td>string</td>
                    <td>Path to a local directory used when
                        generating support packages.</td>
                </tr>
                <tr>
                    <td>saslauthd_ldap_conf</td>
                    <td>string</td>
                    <td>saslauthd ldap configuration.</td>
                </tr>
                <tr>
                    <td>proxy_certificate</td>
                    <td>string</td>
                    <td>Cluster’s proxy certificate.</td>
                </tr>
                <tr>
                    <td>syncer_certificate</td>
                    <td>string</td>
                    <td>Cluster’s syncer certificate.</td>
                </tr>
                <tr>
                    <td>cluster_ssh_public_key</td>
                    <td>string</td>
                    <td>Cluster’s auto-generated ssh public key</td>
                </tr>
                <tr>
                    <td>proxy_max_ccs_disconnection_time</td>
                    <td>integer</td>
                    <td>Cluster-wide proxy timeout policy
                        between proxy and CCS</td>
                </tr>
                <tr>
                    <td rowspan="3">min_control_TLS_version</td>
                    <td>‘1’</td>
                    <td rowspan="3">The minimum version of TLS protocol
                        which is supported at the control path</td>
                </tr>
                <tr>
                    <td>‘1.1’</td>
                </tr>
                <tr>
                    <td>‘1.2’</td>
                </tr>
                <tr>
                    <td rowspan="3">min_data_TLS_version</td>
                    <td>‘1’</td>
                    <td rowspan="3">The minimum version of TLS protocol
                        which is supported at the data path.</td>
                </tr>
                <tr>
                    <td>‘1.1’</td>
                </tr>
                <tr>
                    <td>‘1.2’</td>
                </tr>
                <tr>
                    <td>slave_ha</td>
                    <td>boolean (default: False)</td>
                    <td>Enable slave high availability
                        mechanism. (read-only)</td>
                </tr>
                <tr>
                    <td>slave_ha_grace_period</td>
                    <td>integer (default: 900)</td>
                    <td>Time in seconds between when a node
                        fails, and when slave high availability
                        mechanism starts relocating shards.
                        (read-only)</td>
                </tr>
                <tr>
                    <td>slave_ha_cooldown_period</td>
                    <td>integer (default: 3600)</td>
                    <td>Time in seconds between runs of slave
                        high availability mechanism, on
                        different nodes. (read-only)</td>
                </tr>
                <tr>
                    <td>slave_ha_bdb_cooldown_period</td>
                    <td>integer (default: 86400)</td>
                    <td>Time in seconds between runs of slave
                        high availability mechanism, on
                        different nodes, on the same database.
                        (read-only)</td>
                </tr>
                <tr>
                    <td>upgrade_mode</td>
                    <td>boolean (default: False)</td>
                    <td>Is cluster currently in upgrade mode.</td>
                </tr>
                <tr>
                    <td rowspan="3">sentinel_ssl_policy</td>
                    <td>‘required’</td>
                    <td rowspan="3">Is ssl for the Discovery Service
                        required/disabled/allowed</td>
                </tr>
                <tr>
                    <td>‘disabled’</td>
                </tr>
                <tr>
                    <td>‘allowed’</td>
                </tr>
            </tbody>
        </table>
        <div id="alert-settings">
            <h4>alert_settings</h4>
            <table>
                <colgroup>
                    <col width="30%" />
                    <col width="37%" />
                    <col width="33%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>node_failed</td>
                        <td>boolean (default: False)</td>
                        <td>Node failed</td>
                    </tr>
                    <tr>
                        <td>node_insufficient_disk_aofrw</td>
                        <td>boolean (default: False)</td>
                        <td>Insufficient AOF disk space</td>
                    </tr>
                    <tr>
                        <td>node_checks_error</td>
                        <td>boolean (default: False)</td>
                        <td>Some node checks have failed</td>
                    </tr>
                    <tr>
                        <td>node_aof_slow_disk_io</td>
                        <td>boolean (default: False)</td>
                        <td>AOF reaching disk I/O limits</td>
                    </tr>
                    <tr>
                        <td>node_memory</td>
                        <td>object <a
                                href="#cluster-alert-settings-with-threshold">cluster_alert_settings_with_threshold</a>
                        </td>
                        <td>Node memory has reached the threshold
                            value [% of the memory limit]</td>
                    </tr>
                    <tr>
                        <td>node_persistent_storage</td>
                        <td>object <a
                                href="#cluster-alert-settings-with-threshold">cluster_alert_settings_with_threshold</a>
                        </td>
                        <td>Node persistent storage has reached the
                            threshold value [% of the storage limit]</td>
                    </tr>
                    <tr>
                        <td>node_ephemeral_storage</td>
                        <td>object <a
                                href="#cluster-alert-settings-with-threshold">cluster_alert_settings_with_threshold</a>
                        </td>
                        <td>Node ephemeral storage has reached the
                            threshold value [% of the storage limit]</td>
                    </tr>
                    <tr>
                        <td>node_free_flash</td>
                        <td>object <a
                                href="#cluster-alert-settings-with-threshold">cluster_alert_settings_with_threshold</a>
                        </td>
                        <td>Node flash storage has reached the
                            threshold value [% of the storage limit]</td>
                    </tr>
                    <tr>
                        <td>node_cpu_utilization</td>
                        <td>object <a
                                href="#cluster-alert-settings-with-threshold">cluster_alert_settings_with_threshold</a>
                        </td>
                        <td>Node cpu utilization has reached the
                            threshold value [% of the utilization
                            limit]</td>
                    </tr>
                    <tr>
                        <td>node_net_throughput</td>
                        <td>object <a
                                href="#cluster-alert-settings-with-threshold">cluster_alert_settings_with_threshold</a>
                        </td>
                        <td>Node network throughput has reached the
                            threshold value [bytes/s]</td>
                    </tr>
                    <tr>
                        <td>cluster_ram_overcommit</td>
                        <td>boolean (default: False)</td>
                        <td>RAM committed to databases is larger
                            than cluster total RAM</td>
                    </tr>
                    <tr>
                        <td>cluster_flash_overcommit</td>
                        <td>boolean (default: False)</td>
                        <td>Flash committed to databases is larger
                            than cluster total flash</td>
                    </tr>
                    <tr>
                        <td>cluster_too_few_nodes_for_replication</td>
                        <td>boolean (default: False)</td>
                        <td>Replication requires at least 2 nodes in
                            cluster</td>
                    </tr>
                    <tr>
                        <td>cluster_even_node_count</td>
                        <td>boolean (default: False)</td>
                        <td>True high availability requires odd
                            number of nodes in cluster</td>
                    </tr>
                    <tr>
                        <td>cluster_multiple_nodes_down</td>
                        <td>boolean (default: False)</td>
                        <td>Multiple cluster nodes are down - this
                            might cause a data loss</td>
                    </tr>
                    <tr>
                        <td>cluster_inconsistent_rl_sw</td>
                        <td>boolean (default: False)</td>
                        <td>Not all nodes in cluster are running the
                            same Redis Labs software version</td>
                    </tr>
                    <tr>
                        <td>cluster_inconsistent_redis_sw</td>
                        <td>boolean (default: False)</td>
                        <td>Not all shards in cluster are running
                            the same Redis software version</td>
                    </tr>
                    <tr>
                        <td>cluster_internal_bdb</td>
                        <td>boolean (default: False)</td>
                        <td>Issues with internal cluster databases</td>
                    </tr>
                    <tr>
                        <td>cluster_node_joined</td>
                        <td>boolean (default: False)</td>
                        <td>New node joined cluster</td>
                    </tr>
                    <tr>
                        <td>cluster_node_remove_completed</td>
                        <td>boolean (default: False)</td>
                        <td>Node removed from cluster</td>
                    </tr>
                    <tr>
                        <td>cluster_node_remove_failed</td>
                        <td>boolean (default: False)</td>
                        <td>Failure to removed node from cluster</td>
                    </tr>
                    <tr>
                        <td>cluster_node_remove_abort_completed</td>
                        <td>boolean (default: False)</td>
                        <td>Abort node remove operation completed</td>
                    </tr>
                    <tr>
                        <td>cluster_node_remove_abort_failed</td>
                        <td>boolean (default: False)</td>
                        <td>Abort node remove operation failed</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="cluster-alert-settings-with-threshold">
            <h4>cluster_alert_settings_with_threshold</h4>
            <table>
                <colgroup>
                    <col width="15%" />
                    <col width="37%" />
                    <col width="48%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>enabled</td>
                        <td>boolean (default: False)</td>
                        <td>Alert enabled or disabled</td>
                    </tr>
                    <tr>
                        <td>threshold</td>
                        <td>string</td>
                        <td>Threshold for alert going on/off</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div id="data-permissions">
        <h3>data_permissions</h3>
        <p>An API object that represents a DataPermissions (data permissions) object</p>
        <table>
            <colgroup>
                <col width="11%" />
                <col width="21%" />
                <col width="68%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>uid</td>
                    <td>integer</td>
                    <td>Object’s unique uid.</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>string</td>
                    <td>Role’s name</td>
                </tr>
                <tr>
                    <td>acl</td>
                    <td>string</td>
                    <td>Redis’ ACL’s data permissions string</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="database-recovery">
        <h3>database_recovery</h3>
        <p>A database recovery plan configuration</p>
        <table>
            <colgroup>
                <col width="23%" />
                <col width="33%" />
                <col width="44%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td rowspan="3">status</td>
                    <td>‘ready’</td>
                    <td rowspan="3">Current recovery status (read-only)</td>
                </tr>
                <tr>
                    <td>‘missing-files’</td>
                </tr>
                <tr>
                    <td>‘misplaced-files’</td>
                </tr>
                <tr>
                    <td>ignore_errors</td>
                    <td>boolean</td>
                    <td>If set, database recovery should ignore
                        errors loading data files</td>
                </tr>
                <tr>
                    <td>data_files</td>
                    <td>
                        <div>
                            <div>
                                <pre>[{
&quot;node_uid&quot;: string,
&quot;filename&quot;: string,
&quot;size&quot;: integer,
&quot;last_modified&quot;: string,
&quot;shard_slots&quot;: string
}, ...]
</pre>
                            </div>
                        </div>
                    </td>
                    <td>Data files available/requested to
                        recover from; <strong>node_uid</strong>: Id of node
                        on which file is located; <strong>filename</strong>:
                        Name of data file; <strong>size</strong>: Size of
                        data file (bytes); <strong>last_modified</strong>:
                        Last modification time; <strong>shard_slots</strong>:
                        Id of shards data stored in file</td>
                </tr>
                <tr>
                    <td>recover_without_data</td>
                    <td>boolean (default: False)</td>
                    <td>Recover database configuration without
                        its data</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="db-alerts-settings">
        <h3>db_alerts_settings</h3>
        <p>An API object that represents the database alerts configuration.</p>
        <table>
            <colgroup>
                <col width="33%" />
                <col width="34%" />
                <col width="33%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>bdb_backup_delayed</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>Periodic backup has been delayed for
                        longer than specified threshold value
                        [minutes]</td>
                </tr>
                <tr>
                    <td>bdb_high_latency</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>Latency is higher than specified
                        threshold value [micro-sec]</td>
                </tr>
                <tr>
                    <td>bdb_high_throughput</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>Throughput is higher than specified
                        threshold value [requests / sec.]</td>
                </tr>
                <tr>
                    <td>bdb_low_throughput</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>Throughput is lower than specified
                        threshold value [requests / sec.]</td>
                </tr>
                <tr>
                    <td>bdb_size</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>Dataset size has reached the threshold
                        value [% of the memory limit]</td>
                </tr>
                <tr>
                    <td>bdb_ram_dataset_overhead</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>Dataset RAM overhead of a shard has
                        reached the threshold value [% of its
                        RAM limit]</td>
                </tr>
                <tr>
                    <td>bdb_ram_values</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>Percent of values kept in a shard’s RAM
                        is lower than [% of its key count]</td>
                </tr>
                <tr>
                    <td>bdb_shard_num_ram_values</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>Number of values kept in a shard’s RAM
                        is lower than [values]</td>
                </tr>
                <tr>
                    <td>bdb_high_syncer_lag</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>(Deprecated) Replica of - sync lag is
                        higher than specified threshold value
                        [seconds]</td>
                </tr>
                <tr>
                    <td>bdb_syncer_connection_error</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>(Deprecated) Replica of - sync has
                        connection error while trying to connect
                        replica source</td>
                </tr>
                <tr>
                    <td>bdb_syncer_general_error</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>(Deprecated) Replica of - sync
                        encountered in general error</td>
                </tr>
                <tr>
                    <td>bdb_replica_src_high_syncer_lag</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>Replica-of source - sync lag is higher
                        than specified threshold value [seconds]</td>
                </tr>
                <tr>
                    <td>bdb_replica_src_syncer_connection_error</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>Replica-of source - sync has connection
                        error while trying to connect replica
                        source</td>
                </tr>
                <tr>
                    <td>bdb_replica_src_syncer_general_error</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>Replica-of - sync encountered in general
                        error</td>
                </tr>
                <tr>
                    <td>bdb_crdt_src_high_syncer_lag</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>CRDB source - sync lag is higher than
                        specified threshold value [seconds]</td>
                </tr>
                <tr>
                    <td>bdb_crdt_src_syncer_connection_error</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>CRDB source - sync has connection error
                        while trying to connect replica source</td>
                </tr>
                <tr>
                    <td>bdb_crdt_src_syncer_general_error</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>CRDB - sync encountered in general error</td>
                </tr>
                <tr>
                    <td>bdb_long_running_action</td>
                    <td>object <a
                            href="#bdb-alert-settings-with-threshold">bdb_alert_settings_with_threshold</a></td>
                    <td>An alert for state-machines that are
                        running for too long</td>
                </tr>
            </tbody>
        </table>
        <div id="bdb-alert-settings-with-threshold">
            <h4>bdb_alert_settings_with_threshold</h4>
            <table>
                <colgroup>
                    <col width="15%" />
                    <col width="37%" />
                    <col width="48%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>enabled</td>
                        <td>boolean (default: False)</td>
                        <td>Alert enabled or disabled</td>
                    </tr>
                    <tr>
                        <td>threshold</td>
                        <td>string</td>
                        <td>Threshold for alert going on/off</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div id="db-command">
        <h3>db_command</h3>
        <p>An object representing a generic Redis command.</p>
        <table>
            <colgroup>
                <col width="20%" />
                <col width="37%" />
                <col width="43%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>command</td>
                    <td>string</td>
                    <td>Redis command.</td>
                </tr>
                <tr>
                    <td>args</td>
                    <td>array of string</td>
                    <td>Command arguments.</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="job-scheduler">
        <h3>job_scheduler
        </h3>
        <p>An API object that represents the job_scheduler settings in the cluster.</p>
        <table>
            <colgroup>
                <col width="30%" />
                <col width="39%" />
                <col width="30%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>backup_job_settings</td>
                    <td>object <a href="#backup-job-settings">backup_job_settings</a></td>
                    <td>Backup job settings</td>
                </tr>
                <tr>
                    <td>redis_cleanup_job_settings</td>
                    <td>object <a
                            href="#redis-cleanup-job-settings">redis_cleanup_job_settings</a></td>
                    <td>Redis cleanup job settings</td>
                </tr>
                <tr>
                    <td>node_checks_job_settings</td>
                    <td>object <a
                            href="#node-checks-job-settings">node_checks_job_settings</a></td>
                    <td>Node checks job settings</td>
                </tr>
                <tr>
                    <td>log_rotation_job_settings</td>
                    <td>object <a
                            href="#log-rotation-job-settings">log_rotation_job_settings</a></td>
                    <td>Log rotation job settings</td>
                </tr>
                <tr>
                    <td>rotate_ccs_job_settings</td>
                    <td>object <a href="#rotate-ccs-job-settings">rotate_ccs_job_settings</a>
                    </td>
                    <td>Rotate CCS job settings</td>
                </tr>
            </tbody>
        </table>
        <div id="log-rotation-job-settings">
            <h4>log_rotation_job_settings</h4>
            <table>
                <colgroup>
                    <col width="40%" />
                    <col width="29%" />
                    <col width="31%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>cron_expression</td>
                        <td>string</td>
                        <td>&#160;</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="node-checks-job-settings">
            <h4>node_checks_job_settings</h4>
            <table>
                <colgroup>
                    <col width="40%" />
                    <col width="29%" />
                    <col width="31%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>cron_expression</td>
                        <td>string</td>
                        <td>&#160;</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="rotate-ccs-job-settings">
            <h4>rotate_ccs_job_settings</h4>
            <table>
                <colgroup>
                    <col width="19%" />
                    <col width="34%" />
                    <col width="47%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>cron_expression</td>
                        <td>string</td>
                        <td>&#160;</td>
                    </tr>
                    <tr>
                        <td>file_suffix</td>
                        <td>string (default: 5min)</td>
                        <td>String added to the end of the rotated
                            rdb files</td>
                    </tr>
                    <tr>
                        <td>rotate_max_num</td>
                        <td>integer, 2-100 (default: 24)</td>
                        <td>The maximum number of saved rdb files</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="backup-job-settings">
            <h4>backup_job_settings</h4>
            <table>
                <colgroup>
                    <col width="40%" />
                    <col width="29%" />
                    <col width="31%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>cron_expression</td>
                        <td>string</td>
                        <td>&#160;</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="redis-cleanup-job-settings">
            <h4>redis_cleanup_job_settings</h4>
            <table>
                <colgroup>
                    <col width="40%" />
                    <col width="29%" />
                    <col width="31%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>cron_expression</td>
                        <td>string</td>
                        <td>&#160;</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div id="jwt-authorize">
        <h3>jwt_authorize
        </h3>
        <p>User authentication or JW token refresh request to REST API</p>
        <table>
            <colgroup>
                <col width="12%" />
                <col width="39%" />
                <col width="49%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>username</td>
                    <td>string</td>
                    <td>&#160;</td>
                </tr>
                <tr>
                    <td>password</td>
                    <td>string</td>
                    <td>&#160;</td>
                </tr>
                <tr>
                    <td>ttl</td>
                    <td>integer, 1-86400 (default: 300)</td>
                    <td>Time To Live - The amount of time in
                        seconds the token will be valid</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="ldap-mapping">
        <h3>ldap_mapping</h3>
        <p>An API object that represents aan LDAP-mapping object</p>
        <table>
            <colgroup>
                <col width="15%" />
                <col width="25%" />
                <col width="59%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>uid</td>
                    <td>integer</td>
                    <td>LDAP-mapping’s unique uid.</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>string</td>
                    <td>Role’s name</td>
                </tr>
                <tr>
                    <td>dn</td>
                    <td>string</td>
                    <td>An LDAP group’s distinguished name</td>
                </tr>
                <tr>
                    <td>email</td>
                    <td>string</td>
                    <td>email address that (if set) is used for
                        alerts</td>
                </tr>
                <tr>
                    <td>role_uids</td>
                    <td>array of integer</td>
                    <td>List of role uids associated with the
                        LDAP group</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="module">
        <h3>module</h3>
        <p>Represents a Redis module</p>
        <table>
            <colgroup>
                <col width="29%" />
                <col width="20%" />
                <col width="51%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>uid</td>
                    <td>string</td>
                    <td>Cluster unique ID of module</td>
                </tr>
                <tr>
                    <td>architecture</td>
                    <td>string</td>
                    <td>Module was compiled under this
                        architecture</td>
                </tr>
                <tr>
                    <td>os</td>
                    <td>string</td>
                    <td>OS on which this module was compiled on</td>
                </tr>
                <tr>
                    <td>os_list</td>
                    <td>array of string</td>
                    <td>List of OSes the module supports</td>
                </tr>
                <tr>
                    <td>display_name</td>
                    <td>string</td>
                    <td>Name of module for display purposes</td>
                </tr>
                <tr>
                    <td>author</td>
                    <td>string</td>
                    <td>Who created this module</td>
                </tr>
                <tr>
                    <td>command_line_args</td>
                    <td>string</td>
                    <td>Command line arguments passed to the
                        module</td>
                </tr>
                <tr>
                    <td>config_command</td>
                    <td>string</td>
                    <td>Name of command to configure module
                        arguments at runtime</td>
                </tr>
                <tr>
                    <td>description</td>
                    <td>string</td>
                    <td>Short description of the module</td>
                </tr>
                <tr>
                    <td>email</td>
                    <td>string</td>
                    <td>Author’s email address</td>
                </tr>
                <tr>
                    <td>homepage</td>
                    <td>string</td>
                    <td>Module’s Homepage</td>
                </tr>
                <tr>
                    <td>license</td>
                    <td>string</td>
                    <td>Module is distributed under this license</td>
                </tr>
                <tr>
                    <td>min_redis_version</td>
                    <td>string</td>
                    <td>Minimum Redis version required by this
                        module</td>
                </tr>
                <tr>
                    <td>min_redis_pack_version</td>
                    <td>string</td>
                    <td>Minimum redis pack version required by
                        this module</td>
                </tr>
                <tr>
                    <td>module_file</td>
                    <td>string</td>
                    <td>Module file name</td>
                </tr>
                <tr>
                    <td>module_name</td>
                    <td>string</td>
                    <td>Module’s name</td>
                </tr>
                <tr>
                    <td>sha256</td>
                    <td>string</td>
                    <td>SHA256 of module binary</td>
                </tr>
                <tr>
                    <td>version</td>
                    <td>integer</td>
                    <td>Module’s version</td>
                </tr>
                <tr>
                    <td>semantic_version</td>
                    <td>string</td>
                    <td>Module’s semantic version</td>
                </tr>
                <tr>
                    <td>capabilities</td>
                    <td>array of string</td>
                    <td>List of capabilities supported by this
                        module</td>
                </tr>
                <tr>
                    <td>is_bundled</td>
                    <td>boolean</td>
                    <td>Whether module came bundled with a
                        version of Redis Enterprise</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="node">
        <h3>node</h3>
        <p>An API object that represents a node in the cluster.</p>
        <table>
            <colgroup>
                <col width="30%" />
                <col width="26%" />
                <col width="44%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>uid</td>
                    <td>integer</td>
                    <td>Cluster unique ID of node (read-only)</td>
                </tr>
                <tr>
                    <td rowspan="4">status</td>
                    <td>‘active’</td>
                    <td rowspan="4">Node status (read-only)</td>
                </tr>
                <tr>
                    <td>‘provisioning’</td>
                </tr>
                <tr>
                    <td>‘decommissioning’</td>
                </tr>
                <tr>
                    <td>‘down’</td>
                </tr>
                <tr>
                    <td>addr</td>
                    <td>string</td>
                    <td>Internal IP address of node</td>
                </tr>
                <tr>
                    <td>external_addr</td>
                    <td>complex object</td>
                    <td>External IP addresses of node. GET
                        /jsonschema to retrieve the object’s
                        structure.</td>
                </tr>
                <tr>
                    <td>public_addr</td>
                    <td>string</td>
                    <td>Public IP address of node</td>
                </tr>
                <tr>
                    <td>total_memory</td>
                    <td>integer</td>
                    <td>Total memory of node (bytes) (read-only)</td>
                </tr>
                <tr>
                    <td>cores</td>
                    <td>integer</td>
                    <td>Total number of CPU cores (read-only)</td>
                </tr>
                <tr>
                    <td>architecture</td>
                    <td>string</td>
                    <td>Hardware architecture (read-only)</td>
                </tr>
                <tr>
                    <td rowspan="4">bigstore_driver</td>
                    <td>‘ibm-capi-ga1’</td>
                    <td rowspan="4">Bigstore driver name or none</td>
                </tr>
                <tr>
                    <td>‘ibm-capi-ga2’</td>
                </tr>
                <tr>
                    <td>‘ibm-capi-ga4’</td>
                </tr>
                <tr>
                    <td>‘rocksdb’</td>
                </tr>
                <tr>
                    <td>bigstore_size</td>
                    <td>integer</td>
                    <td>Storage size of bigstore storage (read-
                        only)</td>
                </tr>
                <tr>
                    <td>bigredis_storage_path</td>
                    <td>string</td>
                    <td>Flash storage path (read-only)</td>
                </tr>
                <tr>
                    <td>ephemeral_storage_path</td>
                    <td>string</td>
                    <td>Ephemeral storage path (read-only)</td>
                </tr>
                <tr>
                    <td>ephemeral_storage_size</td>
                    <td>number</td>
                    <td>Ephemeral storage size (bytes) (read-
                        only)</td>
                </tr>
                <tr>
                    <td>persistent_storage_path</td>
                    <td>string</td>
                    <td>Persistent storage path (read-only)</td>
                </tr>
                <tr>
                    <td>persistent_storage_size</td>
                    <td>number</td>
                    <td>Persistent storage size (bytes) (read-
                        only)</td>
                </tr>
                <tr>
                    <td>recovery_path</td>
                    <td>string</td>
                    <td>Recovery files path</td>
                </tr>
                <tr>
                    <td>software_version</td>
                    <td>string</td>
                    <td>Installed Redis Labs cluster software
                        version (read-only)</td>
                </tr>
                <tr>
                    <td>supported_database_versions</td>
                    <td>
                        <div>
                            <div>
                                <pre>[{
&quot;db_type&quot;: string,
&quot;version&quot;: string
}, ...]
</pre>
                            </div>
                        </div>
                    </td>
                    <td>Versions of open source databases
                        supported by Redis Labs software on the
                        node (read-only); <strong>db_type</strong>: Type of
                        database; <strong>version</strong>: Version of
                        database</td>
                </tr>
                <tr>
                    <td>shard_list</td>
                    <td>array of integer</td>
                    <td>Cluster unique IDs of all node shards.</td>
                </tr>
                <tr>
                    <td>os_version</td>
                    <td>string</td>
                    <td>Installed OS version (human readable)
                        (read-only)</td>
                </tr>
                <tr>
                    <td>os_name</td>
                    <td>string</td>
                    <td>OS name only (read-only)</td>
                </tr>
                <tr>
                    <td>os_semantic_version</td>
                    <td>string</td>
                    <td>Full version number (read-only)</td>
                </tr>
                <tr>
                    <td>shard_count</td>
                    <td>integer</td>
                    <td>Number of shards on the node (read-only)</td>
                </tr>
                <tr>
                    <td>uptime</td>
                    <td>integer</td>
                    <td>System uptime (seconds) (read-only)</td>
                </tr>
                <tr>
                    <td>system_time</td>
                    <td>string</td>
                    <td>System time (UTC) (read-only)</td>
                </tr>
                <tr>
                    <td>rack_id</td>
                    <td>string</td>
                    <td>Rack ID where node is installed</td>
                </tr>
                <tr>
                    <td>accept_servers</td>
                    <td>boolean (default: True)</td>
                    <td>If True no shards will be created on the
                        node</td>
                </tr>
                <tr>
                    <td>max_redis_servers</td>
                    <td>integer</td>
                    <td>Maximal number of shards on the node</td>
                </tr>
                <tr>
                    <td>max_listeners</td>
                    <td>integer</td>
                    <td>Maximal number of listeners on the node</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="role">
        <h3>role</h3>
        <p>An API object that represents a role.</p>
        <table>
            <colgroup>
                <col width="24%" />
                <col width="36%" />
                <col width="40%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>uid</td>
                    <td>integer</td>
                    <td>Role’s unique uid.</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>string</td>
                    <td>Role’s name</td>
                </tr>
                <tr>
                    <td rowspan="6">management</td>
                    <td>‘none’</td>
                    <td rowspan="6">Management role</td>
                </tr>
                <tr>
                    <td>‘db_viewer’</td>
                </tr>
                <tr>
                    <td>‘cluster_viewer’</td>
                </tr>
                <tr>
                    <td>‘db_member’</td>
                </tr>
                <tr>
                    <td>‘cluster_member’</td>
                </tr>
                <tr>
                    <td>‘admin’</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="shard">
        <h3>shard</h3>
        <p>An API object that represents a Redis shard in in a bdb.</p>
        <table>
            <colgroup>
                <col width="26%" />
                <col width="23%" />
                <col width="51%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>uid</td>
                    <td>integer</td>
                    <td>Cluster unique ID of shard.</td>
                </tr>
                <tr>
                    <td rowspan="3">status</td>
                    <td>‘active’</td>
                    <td rowspan="3">The current status of the shard</td>
                </tr>
                <tr>
                    <td>‘inactive’</td>
                </tr>
                <tr>
                    <td>‘trimming’</td>
                </tr>
                <tr>
                    <td rowspan="8">detailed_status</td>
                    <td>‘ok’</td>
                    <td rowspan="8">A more specific status of the shard</td>
                </tr>
                <tr>
                    <td>‘importing’</td>
                </tr>
                <tr>
                    <td>‘timeout’</td>
                </tr>
                <tr>
                    <td>‘loading’</td>
                </tr>
                <tr>
                    <td>‘busy’</td>
                </tr>
                <tr>
                    <td>‘down’</td>
                </tr>
                <tr>
                    <td>‘trimming’</td>
                </tr>
                <tr>
                    <td>‘unknown’</td>
                </tr>
                <tr>
                    <td>bdb_uid</td>
                    <td>integer</td>
                    <td>The ID of bdb this shard belongs to.</td>
                </tr>
                <tr>
                    <td>node_uid</td>
                    <td>integer</td>
                    <td>The ID of the node this shard is located
                        on.</td>
                </tr>
                <tr>
                    <td rowspan="2">role</td>
                    <td>‘master’</td>
                    <td rowspan="2">Role of this shard (master or slave)</td>
                </tr>
                <tr>
                    <td>‘slave’</td>
                </tr>
                <tr>
                    <td>assigned_slots</td>
                    <td>string</td>
                    <td>Shards hash slot range</td>
                </tr>
                <tr>
                    <td>bigstore_ram_weight</td>
                    <td>number</td>
                    <td>Shards RAM distribution weight</td>
                </tr>
                <tr>
                    <td>sync</td>
                    <td>object <a href="#sync">sync</a></td>
                    <td>Indication of the shard’s current sync
                        status and progress</td>
                </tr>
                <tr>
                    <td>loading</td>
                    <td>object <a href="#loading">loading</a></td>
                    <td>Current status of dump file loading</td>
                </tr>
                <tr>
                    <td>backup</td>
                    <td>object <a href="#backup">backup</a></td>
                    <td>Current status of dump file loading</td>
                </tr>
                <tr>
                    <td>report_timestamp</td>
                    <td>string</td>
                    <td>The time in which the shard’s info was
                        collected (read-only)</td>
                </tr>
                <tr>
                    <td>redis_info</td>
                    <td>object redis_info</td>
                    <td>A sub-dictionary of Redis INFO command.
                        see <a
                            href="https://redis.io/commands/info">https://redis.io/commands/info</a> for
                        detailed documentation</td>
                </tr>
            </tbody>
        </table>
        <div id="loading">
            <h4>loading</h4>
            <table>
                <colgroup>
                    <col width="15%" />
                    <col width="22%" />
                    <col width="63%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td rowspan="2">status</td>
                        <td>‘in_progress’</td>
                        <td rowspan="2">Indication if the load of a dump file is
                            on-going (read-only)</td>
                    </tr>
                    <tr>
                        <td>‘idle’</td>
                    </tr>
                    <tr>
                        <td>progress</td>
                        <td>number, 0-100</td>
                        <td>Percentage of bytes already loaded.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="backup">
            <h4>backup</h4>
            <table>
                <colgroup>
                    <col width="15%" />
                    <col width="22%" />
                    <col width="63%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td rowspan="3">status</td>
                        <td>‘exporting’</td>
                        <td rowspan="3">Status of scheduled periodic backup
                            process</td>
                    </tr>
                    <tr>
                        <td>‘succeeded’</td>
                    </tr>
                    <tr>
                        <td>‘failed’</td>
                    </tr>
                    <tr>
                        <td>progress</td>
                        <td>number, 0-100</td>
                        <td>Shard backup progress (percentage)</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="sync">
            <h4>sync</h4>
            <table>
                <colgroup>
                    <col width="15%" />
                    <col width="22%" />
                    <col width="63%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Name</th>
                        <th>Type/Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td rowspan="3">status</td>
                        <td>‘in_progress’</td>
                        <td rowspan="3">Indication of the shard’s current sync
                            status</td>
                    </tr>
                    <tr>
                        <td>‘idle’</td>
                    </tr>
                    <tr>
                        <td>‘link_down’</td>
                    </tr>
                    <tr>
                        <td>progress</td>
                        <td>integer</td>
                        <td>Number of bytes remaining in current
                            sync</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div id="suffix">
        <h3>suffix</h3>
        <p>An API object that represents a DNS suffix in the cluster.</p>
        <table>
            <colgroup>
                <col width="18%" />
                <col width="24%" />
                <col width="58%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>name</td>
                    <td>string</td>
                    <td>Suffix name, unique and represents its
                        zone (read-only)</td>
                </tr>
                <tr>
                    <td>mdns</td>
                    <td>boolean</td>
                    <td>Support for Multicast DNS (read-only)</td>
                </tr>
                <tr>
                    <td>internal</td>
                    <td>boolean</td>
                    <td>Does the Suffix point on internal ip
                        addresses (read-only)</td>
                </tr>
                <tr>
                    <td>default</td>
                    <td>boolean</td>
                    <td>Suffix is default suffix for the cluster
                        (read-only)</td>
                </tr>
                <tr>
                    <td>use_aaaa_ns</td>
                    <td>boolean</td>
                    <td>Suffix uses AAAA NS entries (read-only)</td>
                </tr>
                <tr>
                    <td>slaves</td>
                    <td>array of string</td>
                    <td>Frontend DNS servers that are to be
                        updated by this suffix</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="user">
        <h3>user</h3>
        <p>An API object that represents an RLEC user.</p>
        <table>
            <colgroup>
                <col width="25%" />
                <col width="28%" />
                <col width="47%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Name</th>
                    <th>Type/Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>uid</td>
                    <td>integer</td>
                    <td>User’s unique uid.</td>
                </tr>
                <tr>
                    <td>email</td>
                    <td>string</td>
                    <td>User’s email. (pattern matching only
                        ascii characters)</td>
                </tr>
                <tr>
                    <td>password</td>
                    <td>string</td>
                    <td>User’s password.</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>string</td>
                    <td>User’s name. (pattern does not allow non
                        ascii and special characters &amp;,&lt;,&gt;,”)</td>
                </tr>
                <tr>
                    <td>email_alerts</td>
                    <td>boolean (default: True)</td>
                    <td>Activate email alerts for a user.</td>
                </tr>
                <tr>
                    <td>bdbs_email_alerts</td>
                    <td>complex object</td>
                    <td>UIDs of databases that user will receive
                        alerts for.</td>
                </tr>
                <tr>
                    <td>cluster_email_alerts</td>
                    <td>boolean</td>
                    <td>Activate cluster email alerts for a
                        user.</td>
                </tr>
                <tr>
                    <td rowspan="6">role</td>
                    <td>‘admin’</td>
                    <td rowspan="6">User’s role.</td>
                </tr>
                <tr>
                    <td>‘cluster_member’</td>
                </tr>
                <tr>
                    <td><strong>‘db_viewer’</strong></td>
                </tr>
                <tr>
                    <td>‘db_member’</td>
                </tr>
                <tr>
                    <td>‘cluster_viewer’</td>
                </tr>
                <tr>
                    <td>‘none’</td>
                </tr>
                <tr>
                    <td rowspan="2">auth_method</td>
                    <td><strong>‘regular’</strong></td>
                    <td rowspan="2">User’s authentication method.</td>
                </tr>
                <tr>
                    <td>‘external’</td>
                </tr>
                <tr>
                    <td>password_issue_date</td>
                    <td>string</td>
                    <td>The date in which the password was set .
                        (read-only)</td>
                </tr>
                <tr>
                    <td>role_uids</td>
                    <td>array of integer</td>
                    <td>List of role uids associated with the
                        LDAP group</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="bdb-status">
        <h3>bdb -&gt; status
        </h3>
        <p>The bdb status field is a read-only field representing database status and can have one of the
            following possible values:</p>
        <ul>
            <li>
                <dl>
                    <dt>‘pending’: temporary status while the database is initially created</dt>
                    <dd>
                        <dl>
                            <dt>Can change to:</dt>
                            <dd>
                                <ul>
                                    <li>‘active’</li>
                                    <li>‘creation-failed’</li>
                                </ul>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt>‘creation-failed’ - status if the initial database creation failed</dt>
                    <dd>
                        <dl>
                            <dt>Can change to:</dt>
                            <dd>
                                <ul>
                                    <li>N/A</li>
                                </ul>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt>‘active’ - status when the database is active and no special action it taking place</dt>
                    <dd>
                        <dl>
                            <dt>Can change to:</dt>
                            <dd>
                                <ul>
                                    <li>‘active-change-pending’</li>
                                    <li>‘import-pending’</li>
                                    <li>‘delete-pending’</li>
                                </ul>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt>‘active-change-pending’</dt>
                    <dd>
                        <dl>
                            <dt>Can change to:</dt>
                            <dd>
                                <ul>
                                    <li>‘active’</li>
                                </ul>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt>‘import-pending’ - status while a dataset import is taking place</dt>
                    <dd>
                        <dl>
                            <dt>Can change to:</dt>
                            <dd>
                                <ul>
                                    <li>‘active’</li>
                                </ul>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt>‘delete-pending’ - status while the database is being deleted</dt>
                    <dd>
                        <dl>
                            <dt>Can change to:</dt>
                            <dd>
                                <ul>
                                    <li>Not applicable</li>
                                </ul>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </li>
            <li>‘recovery’ - not relevant, intended for future use.</li>
        </ul>
        <img src="..images/rs/diagram-bdb-status.png" alt="digraph bdb_status {
pending -&gt; active;
pending -&gt; &quot;creation-failed&quot;;
active -&gt; &quot;active-change-pending&quot;;
active -&gt; &quot;import-pending&quot;;
active -&gt; &quot;delete-pending&quot;;
&quot;active-change-pending&quot; -&gt; active;
&quot;import-pending&quot; -&gt; active;
recovery;
}" />
    </div>
    <div id="bdb-replica-sync">
        <h3>bdb -&gt; replica_sync</h3>
        <p>The bdb replica_sync field is related to the “Replica of” feature which enables enables creating a
            Redis database (single or multi shard) that keeps synchronizing data from another Redis database
            (single or multi shard). You can read more about the replica of concepts, statuses, and errors, in the
            <a
                href="https://redislabs.com/redis-enterprise-documentation/database-configuration/replica-of">Replica
                of documentation</a>.</p>
        <p>The bdb crdt_sync field has a similar purpose for the Redis CRDB.</p>
        <p>The field represents the replica of sync process and using it you can enable, disable or pause the
            process.</p>
        <p>The bdb sync field can have one of the following possible values:</p>
        <ul>
            <li>
                <dl>
                    <dt>‘disabled’ - default value. Used to disable the sync process and represents that no sync is
                        currently configured or running.</dt>
                    <dd>Can change to:<ul>
                            <li>‘enabled’</li>
                        </ul>
                    </dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt>‘enabled’ - used to enable the sync process and represents that the process is currently
                        active.</dt>
                    <dd>Can change to:<ul>
                            <li>‘stopped’</li>
                            <li>‘paused’</li>
                        </ul>
                    </dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt>‘paused’ - used to pause the sync process and represents that the process is configured but is
                        currently not executing the sync commands.</dt>
                    <dd>Can change to:<ul>
                            <li>‘enabled’</li>
                            <li>‘stopped’</li>
                        </ul>
                    </dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt>‘stopped’ - represents that an unrecoverable error occurred in the sync process that caused
                        the sync to be stopped by the system.</dt>
                    <dd>Can change to:<ul>
                            <li>‘enabled’</li>
                        </ul>
                    </dd>
                </dl>
            </li>
        </ul>
        <img src="..images/rs/diagram-bdb-replica-sync.png" alt="digraph bdb_replica_sync {
disabled -&gt; enabled;
enabled -&gt; stopped;
enabled -&gt; paused;
paused -&gt; enabled;
paused -&gt; stopped;
stopped -&gt; enabled;
}" />
        <p>When the sync is in ‘stopped’ or ‘paused’ state, then the the last_error field in the relevant source
            entry in the sync_sources “status” field holds the specific error message.</p>
    </div>
    <div id="bdb-replica-sources-status">
        <h3>bdb -&gt; replica_sources -&gt; “status”</h3>
        <p>The status field is related to the “Replica of” feature which enables enables creating a Redis
            database (single or multi shard) that keeps synchronizing data from another Redis database (single or
            multi shard). You can read more about the replica of concepts, statuses, and errors, in the <a
               
                href="https://redislabs.com/redis-enterprise-documentation/database-configuration/replica-of">Replica
                of documentation</a>.</p>
        <p>The field represents the replica of sync process for a specific sync source and can have one of the
            following possible values:</p>
        <ul>
            <li>
                <dl>
                    <dt>’out-of-sync’ - temporary status when the sync process is disconnected from source and trying
                        reconnect</dt>
                    <dd>
                        <dl>
                            <dt>Can change to:</dt>
                            <dd>
                                <ul>
                                    <li>‘syncing’</li>
                                </ul>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt>‘syncing’ - temporary status when the sync process is running the initial sync and valid until
                        the initial sync is done</dt>
                    <dd>Can change to:<ul>
                            <li>‘in-sync’</li>
                            <li>’out-of-sync’</li>
                        </ul>
                    </dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt>‘in-sync’ - initial sync process finished successfully and currently new commands are syncing
                        on a regular basis.</dt>
                    <dd>Can change to:<ul>
                            <li>‘syncing’</li>
                            <li>’out-of-sync’</li>
                        </ul>
                    </dd>
                </dl>
            </li>
        </ul>
        <img src="..images/rs/diagram-bdb-replica-sources-status.png" alt="digraph bdb_replica_sources_status {
&quot;out-of-sync&quot; -&gt; syncing;
syncing -&gt; &quot;in-sync&quot;;
syncing -&gt; &quot;out-of-sync&quot;;
&quot;in-sync&quot; -&gt; syncing;
&quot;in-sync&quot; -&gt; &quot;out-of-sync&quot;;
}" />
    </div>
</div>
<div id="bdb-backup-location-bdbs-int-uid-actions-export-export-location">
    <span id="backup-location">
    <h2>bdb -&gt; backup_location, bdbs/(int: uid)/actions/export -&gt; export_location</h2>
    <p>You can backup or export a database’s dataset to one of the following location types:</p>
    <ul>
        <li>FTP/S</li>
        <li>Amazon S3</li>
        <li>Microsoft Azure Storage</li>
        <li>Google Cloud Storage</li>
        <li>OpenStack Object Storage (“Swift”)</li>
        <li>SFTP</li>
        <li>NAS/Local Storage</li>
    </ul>
    <p>Each of these location types requires a different set of parameters to be sent.</p>
    <p>First you need to define the location type by setting the “type” (string) field to one of the following
        possible values:.</p>
    <ul>
        <li>“url” - for FTP/S</li>
        <li>“s3” - for Amazon S3</li>
        <li>“abs” - for Microsoft Azure Storage</li>
        <li>“gs” - for Google Cloud Storage</li>
        <li>“swift” - OpenStack Object Storage (“Swift”)</li>
        <li>“sftp” - for SFTP</li>
        <li>“mount_point” - for NAS/Local Storage</li>
    </ul>
    <p>Then, depending on the option you are using there is a different set of values you need to provide:</p>
    <ul>
        <li>
            <dl>
                <dt>FTP</dt>
                <dd>
                    <ul>
                        <li>“url” (string) - a uri representing FTP/S location with the following format: <a
                               
                                href="ftp://user:password&#64;host:port/path/">ftp://user:password&#64;host:port/path/</a>.
                            The user and password can be omitted if not needed.</li>
                    </ul>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>AWS S3</dt>
                <dd>
                    <ul>
                        <li>“bucket_name” (string) - S3 bucket name</li>
                        <li>“subdir” (string) - (Optional) Path to the backup directory in the S3 bucket</li>
                        <li>“access_key_id” (string) - The AWS Access Key ID with access to the bucket</li>
                        <li>“secret_access_key” (string) - The AWS Secret Access Key that matches the Access Key ID</li>
                    </ul>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>Azure Blob Storage</dt>
                <dd>
                    <ul>
                        <li>“container” (string) - Blob Storage container name</li>
                        <li>“subdir” (string) - (Optional) Path to the backup directory in the Blob Storage container
                        </li>
                        <li>“account_name” (string) - Storage account name with access to the container</li>
                        <li>“account_key” (string) - Access key for the storage account</li>
                    </ul>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>Google Cloud Storage</dt>
                <dd>
                    <ul>
                        <li>“bucket_name” (string) - Cloud Storage bucket name</li>
                        <li>“subdir” (string) - (Optional) Path to the backup directory in the Cloud Storage bucket</li>
                        <li>“client_id” (string) - Cloud Storage client ID with access to the Cloud Storage bucket</li>
                        <li>“client_email” (string) - Email address for the Cloud Storage client ID</li>
                        <li>“private_key_id” (string) - Cloud Storage private key ID with access to the Cloud Storage
                            bucket</li>
                        <li>“private_key” (string) - Cloud Storage private key that matches the private key ID</li>
                    </ul>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>Swift</dt>
                <dd>
                    <ul>
                        <li>“auth_url” (string) - Swift service authentication URL.</li>
                        <li>“user” (string) - Swift service username to use to access the storage.</li>
                        <li>“key” (string) - Swift service key corresponding to the username to use to access the
                            storage.</li>
                        <li>“container” (string) - Swift object store container name to backup to.</li>
                        <li>“prefix” (string) - (Optional) Swift path used a prefix for the file name for the backup
                            files to be created.</li>
                    </ul>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>SFTP</dt>
                <dd>
                    <ul>
                        <li>“sftp_url” (string) - SFTP URL in the format
                            ‘sftp://user:password&#64;host[:port][/path/]’). The default port number is 22 and the
                            default
                            path is ‘/’.</li>
                        <li>“key” (string) - (Optional) SSH private key to secure the SFTP server connection. If you do
                            not specify an SSH private key, the auto-generated private key of the cluster is used, and
                            you
                            must add the SSH public key of the cluster to the SFTP server configuration.</li>
                    </ul>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>NAS/Local Storage</dt>
                <dd>
                    <ul>
                        <li>“path” (string) - Path to the local mount point. You must create the mount point on all
                            nodes, and the redislabs:redislabs user must have read and write permissions on the local
                            mount point.</li>
                    </ul>
                </dd>
            </dl>
        </li>
    </ul>
</div>
<div id="bdbs-int-uid-actions-import-dataset-import-sources">
    <span id="import-sources">
    <h2>bdbs/(int: uid)/actions/import -&gt; dataset_import_sources
    </h2>
    <p>You can import data to a database from one of the following location types:</p>
    <ul>
        <li>HTTP/S</li>
        <li>FTP</li>
        <li>Amazon S3</li>
        <li>Microsoft Azure Storage</li>
        <li>Google Cloud Storage</li>
        <li>OpenStack Object Storage (“Swift”)</li>
        <li>SFTP</li>
        <li>NAS/Local Storage</li>
    </ul>
    <p>Each of these location types requires a different set of parameters to be sent.</p>
    <p>The file to import from should be in the RDB format. It can also be in a compressed (gz) RDB file.
        You can import data to a database from multiple files by supplying an array of the object described
        below.</p>
    <p>First you need to define the location type by setting the “type” (string) field to one of the following
        possible values:.</p>
    <ul>
        <li>“url” - for FTP/S</li>
        <li>“s3” - for Amazon S3</li>
        <li>“abs” - for Microsoft Azure Storage</li>
        <li>“gs” - for Google Cloud Storage</li>
        <li>“swift” - OpenStack Object Storage (“Swift”)</li>
        <li>“sftp” - for SFTP</li>
        <li>“mount_point” - for NAS/Local Storage</li>
    </ul>
    <p>Then, depending on the option you are using there is a different set of values you need to provide:</p>
    <ul>
        <li>
            <dl>
                <dt>FTP</dt>
                <dd>
                    <ul>
                        <li>“url” (string) - a uri representing FTP/S location with the following format: <a
                               
                                href="ftp://user:password&#64;host:port/path/">ftp://user:password&#64;host:port/path/</a>.
                            The user and password can be omitted if not needed.</li>
                    </ul>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>AWS S3</dt>
                <dd>
                    <ul>
                        <li>“bucket_name” (string) - S3 bucket name</li>
                        <li>“subdir” (string) - (Optional) Path to the backup directory in the S3 bucket</li>
                        <li>“access_key_id” (string) - The AWS Access Key ID with access to the bucket</li>
                        <li>“secret_access_key” (string) - The AWS Secret Access that matches the Access Key ID</li>
                    </ul>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>Azure Blob Storage</dt>
                <dd>
                    <ul>
                        <li>“container” (string) - Blob Storage container name</li>
                        <li>“subdir” (string) - (Optional) Path to the backup directory in the Blob Storage container
                        </li>
                        <li>“account_name” (string) - Storage account name with access to the container</li>
                        <li>“account_key” (string) - Access key for the storage account</li>
                    </ul>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>Google Cloud Storage</dt>
                <dd>
                    <ul>
                        <li>“bucket_name” (string) - Cloud Storage bucket name</li>
                        <li>“subdir” (string) - (Optional) Path to the backup directory in the Cloud Storage bucket</li>
                        <li>“client_id” (string) - Cloud Storage client ID with access to the Cloud Storage bucket</li>
                        <li>“client_email” (string) - Email address for the Cloud Storage client ID</li>
                        <li>“private_key_id” (string) - Cloud Storage private key ID with access to the Cloud Storage
                            bucket</li>
                        <li>“private_key” (string) - Private key for the Cloud Storage matching the private key ID</li>
                    </ul>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>Swift</dt>
                <dd>
                    <ul>
                        <li>“auth_url” (string) - Swift service authentication URL.</li>
                        <li>“user” (string) - Swift service username to use to access the storage.</li>
                        <li>“key” (string) - Swift service key corresponding to the username to use to access the
                            storage.</li>
                        <li>“container” (string) - Swift object store container name holding the file to be imported.
                        </li>
                        <li>“objname” (string) - Swift object name (file name) of the file to be imported.</li>
                        <li>“prefix” (string) - (Optional) Swift path used a prefix to the object name for the file be
                            imported.</li>
                    </ul>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>SFTP</dt>
                <dd>
                    <ul>
                        <li>“sftp_url” (string) - SFTP URL in the format of
                            ‘sftp://user:password&#64;host[:port]/path/filename.rdb’). The default port number is 22 and
                            the default path is ‘/’.</li>
                        <li>“key” (string) - (Optional) SSH private key to secure the SFTP server connection. If you do
                            not specify an SSH private key, the auto-generated private key of the cluster is used, and
                            you
                            must add the SSH public key of the cluster to the SFTP server configuration.</li>
                    </ul>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>NAS/Local Storage</dt>
                <dd>
                    <ul>
                        <li>“path” (string) - Path to the locally mounted file name to import. You must create the mount
                            point on all nodes, and the redislabs:redislabs user must have read permissions on the local
                            mount point.</li>
                    </ul>
                </dd>
            </dl>
        </li>
    </ul>
</div>
<div id="statistics">
    <h2>Statistics</h2>
    <div id="statistics-overview">
        <h3>Statistics Overview</h3>
        <p>Statistics returned from API calls will always have the following fields:</p>
        <ul>
            <li><strong>interval</strong> – a string the time interval represented in this result. This can be one
                of the following values: 1sec / 10sec / 5min / 15min / 1hour / 12hour / 1week.</li>
            <li><strong>stime</strong> – a timestamp representing the beginning of the interval. Format is:
                “2015-05-27T12:00:00Z”.</li>
            <li><strong>etime</strong> – a timestamp representing the end of the interval. Format is:
                “2015-05-27T12:00:00Z”.</li>
        </ul>
        <p>The difference between the stime and the etime is equal to the interval.</p>
        <p>In addition, there is a set of fields representing the values of the different metrics for this
            interval and object. The set of metrics relevant to each object is different, and listed below for
            each object type.</p>
        <p>Optionally, you can pass an stime and/or an etime to the different GET stats calls. When provided,
            the returned results will fall within the range provided, meaning no earlier than the provided stime,
            and no later than the provided etime.</p>
        <p>For each interval type (1sec / 10sec / 5min / 15min / 1hour / 12hour / 1week) there is a maximum
            number of samples (X) kept in the system, see the exact maximum number of values available for each
            interval type in the table below. These X samples are kept from the most current sample back.</p>
        <p>The actual number of samples returned by a stats GET call can vary depending on the number of samples
            available in the system, and the number of samples that fall between stime and the etime, if provided.
            For example, if an object (Cluster / Node / DB / Shard) was just created, not all samples will be
            available yet, depending on how much time elapsed since creation. Or, if the stime and etime provided
            are pretty close, only samples that fall within this range, out of all the available samples, will be
            returned.</p>
        <p>An exception to the above is that in order to reduce load generated by stats collection, for
            relatively inactive DBs or Shards (less than 5 ops/sec), 1sec stats are not collected at a 1sec
            interval. For those inactive DBs or shards 1sec stats are collected at a reduced interval of once
            every 2 to 5 seconds, but the same number of maximum number of samples (X) is kept.</p>
        <p><strong>Note</strong>: There are certain statistics that are returned from the API that are intended
            for internal use. These statistics are not documented below and should be ignored.</p>
        <p><strong>Note</strong>: There are certain statistics that are not always returned by the API, but are
            returned only when they are relevant, see more details in the specific statistics below. You should
            not expect all statistics to always be returned.</p>
    </div>
    <div id="maximum-number-of-samples-per-interval">
        <h3>Maximum number of samples per interval</h3>
        <table>
            <colgroup>
                <col width="20%" />
                <col width="80%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Interval</th>
                    <th>Maximum available number of samples</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>1sec</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>10sec</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>5min</td>
                    <td>12</td>
                </tr>
                <tr>
                    <td>15min</td>
                    <td>96</td>
                </tr>
                <tr>
                    <td>1hour</td>
                    <td>168</td>
                </tr>
                <tr>
                    <td>12hour</td>
                    <td>62</td>
                </tr>
                <tr>
                    <td>1week</td>
                    <td>53</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="object-metrics">
        <h3>Object Metrics
        </h3>
        <p><strong>Cluster Metrics</strong></p>
        <table>
            <colgroup>
                <col width="28%" />
                <col width="54%" />
                <col width="18%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Metric Name</th>
                    <th>Description</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>free_memory</td>
                    <td>sum of free memory in all cluster nodes (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>available_memory</td>
                    <td>sum of available_memory in all nodes (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>provisional_memory</td>
                    <td>sum of provisional_memory in all nodes (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>available_flash</td>
                    <td>sum of available_flash in all nodes (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>provisional_flash</td>
                    <td>sum of provisional_flash in all nodes (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>cpu_user</td>
                    <td>cpu time portion spent by users-pace processes
                        on cluster, the value is weighted between all
                        nodes based on number of cores in each node
                        (0-1, multiply by 100 to get percent)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>cpu_system</td>
                    <td>cpu time portion spent in kernel on cluster, the
                        value is weighted between all nodes based on
                        number of cores in each node (0-1, multiply by
                        100 to get percent)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>cpu_idle</td>
                    <td>cpu idle time portion, , the value is weighted
                        between all nodes based on number of cores in
                        each node (0-1, multiply by 100 to get percent)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>ephemeral_storage_avail</td>
                    <td>sum of disk space available to RLEC processes on
                        configured ephemeral disk on all cluster nodes
                        (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>persistent_storage_avail</td>
                    <td>sum of disk space available to RLEC processes on
                        configured persistent disk on all cluster nodes
                        (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>ephemeral_storage_free</td>
                    <td>sum of free disk space on configured ephemeral
                        disk on all cluster nodes (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>persistent_storage_free</td>
                    <td>sum of free disk space on configured persistent
                        disk on all cluster nodes (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>total_req</td>
                    <td>request rate handled by all endpoints on cluster
                        (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>avg_latency</td>
                    <td>average latency of requests handled by all
                        cluster endpoints (micro-sec); returned only
                        when there is traffic</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>conns</td>
                    <td>total number of clients connected to all
                        cluster endpoints</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>ingress_bytes</td>
                    <td>sum of rate of incoming network traffic on all
                        cluster nodes (bytes/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>egress_bytes</td>
                    <td>sum of rate of outgoing network traffic on all
                        cluster nodes (bytes/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_kv_ops</td>
                    <td>rate of value read/write operations against
                        back-end flash for all shards which are part of
                        a flash based DB (BigRedis) in cluster (ops/sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_iops</td>
                    <td>rate of i/o operations against back-end flash
                        for all shards which are part of a flash based
                        DB (BigRedis) in cluster (ops/sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_throughput</td>
                    <td>throughput i/o operations against back-end flash
                        for all shards which are part of a flash based
                        DB (BigRedis) in cluster (bytes/sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_free</td>
                    <td>sum of free space of back-end flash (used by
                        flash DB’s [BigRedis]) on all cluster nodes
                        (bytes); returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
            </tbody>
        </table>
        <p><strong>Node Metrics</strong></p>
        <table>
            <colgroup>
                <col width="28%" />
                <col width="54%" />
                <col width="18%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Metric Name</th>
                    <th>Description</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>free_memory</td>
                    <td>free memory in node (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>available_memory</td>
                    <td>available ram in node (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>provisional_memory</td>
                    <td>amount of ram available for new shards on this
                        node, taking into account overbooking, max redis
                        servers, reserved memory and provision and
                        migration thresholds (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>available_flash</td>
                    <td>available flash in node (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>provisional_flash</td>
                    <td>amount of flash available for new shards on this
                        node, taking into account overbooking, max redis
                        servers, reserved flash and provision and
                        migration thresholds (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>cpu_user</td>
                    <td>cpu time portion spent by users-pace processes
                        (0-1, multiply by 100 to get percent)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>cpu_system</td>
                    <td>cpu time portion spent in kernel (0-1, multiply
                        by 100 to get percent)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>cpu_idle</td>
                    <td>cpu idle time portion (0-1, multiply by 100 to
                        get percent)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>ephemeral_storage_avail</td>
                    <td>disk space available to RLEC processes on
                        configured ephemeral disk (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>persistent_storage_avail</td>
                    <td>disk space available to RLEC processes on
                        configured persistent disk (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>ephemeral_storage_free</td>
                    <td>free disk space on configured ephemeral disk
                        (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>persistent_storage_free</td>
                    <td>free disk space on configured persistent disk
                        (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>total_req</td>
                    <td>request rate handled by endpoints on node
                        (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>avg_latency</td>
                    <td>average latency of requests handled by endpoints
                        on node (micro-sec);
                        returned only when there is traffic</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>conns</td>
                    <td>number of clients connected to endpoints on node</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>ingress_bytes</td>
                    <td>rate of incoming network traffic to node
                        (bytes/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>egress_bytes</td>
                    <td>rate of outgoing network traffic to node
                        (bytes/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_kv_ops</td>
                    <td>rate of value read/write operations against
                        back-end flash for all shards which are part of
                        a flash based DB (BigRedis) on node (ops/sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_iops</td>
                    <td>rate of i/o operations against back-end flash
                        for all shards which are part of a flash based
                        DB (BigRedis) on node (ops/sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_throughput</td>
                    <td>throughput of i/o operations against back-end
                        flash for all shards which are part of a flash
                        based DB (BigRedis) on node (bytes/sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_free</td>
                    <td>free space of back-end flash (used by flash DB’s
                        [BigRedis]) (bytes)
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>cur_aof_rewrites</td>
                    <td>number of aof rewrites that are currently
                        performed by shards on this node</td>
                    <td>float</td>
                </tr>
            </tbody>
        </table>
        <p><strong>DB Metrics</strong></p>
        <table>
            <colgroup>
                <col width="30%" />
                <col width="0%" />
                <col width="52%" />
                <col width="18%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Metric Name</th>
                    <th colspan="2">Description</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>no_of_keys</td>
                    <td colspan="2">number of keys in DB</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>evicted_objects</td>
                    <td colspan="2">rate of key evictions from DB (evictions/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>expired_objects</td>
                    <td colspan="2">rate keys expired in DB (expirations/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>instantaneous_ops_per_sec</td>
                    <td colspan="2">request rate handled by all shards of DB
                        (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>read_hits</td>
                    <td colspan="2">rate of read operations accessing an existing
                        key (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>read_misses</td>
                    <td colspan="2">rate of read operations accessing a non-existing
                        key (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>write_hits</td>
                    <td colspan="2">rate of write operations accessing an existing
                        key (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>write_misses</td>
                    <td colspan="2">rate of write operations accessing a non-
                        existing key (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>pubsub_channels</td>
                    <td colspan="2">Count the pub/sub channels with subscribed
                        clients.</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>pubsub_patterns</td>
                    <td colspan="2">Count the pub/sub patterns with subscribed
                        clients.</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>mem_frag_ratio</td>
                    <td colspan="2">RAM fragmentation ratio (RSS / allocated RAM)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>disk_frag_ratio</td>
                    <td colspan="2">Flash fragmentation ratio (used / required)
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_kv_ops</td>
                    <td colspan="2">rate of value read/write/del operations against
                        back-end flash for all shards of DB (BigRedis)
                        (key access / sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_iops</td>
                    <td colspan="2">rate of i/o operations against back-end flash
                        for all shards of DB (BigRedis) (ops/sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_throughput</td>
                    <td colspan="2">throughput of i/o operations against back-end
                        flash for all shards of DB (BigRedis) (bytes/sec)
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td colspan="3">
                        <dl>
                            <dt>big_fetch_ram | rate of key reads / updates for keys that happen</dt>
                            <dd>
                                <div>
                                    <div>to be in ram (bigredis) (key access / sec);</div>
                                    <div>returned only when BigRedis is enabled</div>
                                </div>
                            </dd>
                        </dl>
                    </td>
                    <td>float</td>
                </tr>
                <tr>
                    <td colspan="3">
                        <dl>
                            <dt>big_fetch_flash | rate of key reads / updates for keys that happen</dt>
                            <dd>
                                <div>
                                    <div>to be on flash (bigredis) (key access / sec);</div>
                                    <div>returned only when BigRedis is enabled</div>
                                </div>
                            </dd>
                        </dl>
                    </td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>big_write_ram</td>
                    <td colspan="2">rate of key writes for keys that happen
                        to be in ram (bigredis) (key access / sec);
                        this includes write misses (new keys created);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>big_write_flash</td>
                    <td colspan="2">rate of key writes for keys that happen
                        to be on flash (bigredis) (key access / sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>big_del_ram</td>
                    <td colspan="2">rate of key deletes for keys that happen
                        to be in ram (bigredis) (key access / sec);
                        this includes write misses (new keys created);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>big_del_flash</td>
                    <td colspan="2">rate of key deletes for keys that happen
                        to be on flash (bigredis) (key access / sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>big_io_ratio_redis</td>
                    <td colspan="2">rate of redis operations on keys. can be used
                        to compute ratio of io operations) (key access /
                        sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>big_io_ratio_flash</td>
                    <td colspan="2">rate of key operations on flash. can be used to
                        compute ratio of io operations (key access /
                        sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_io_reads</td>
                    <td colspan="2">rate of key reads from flash (key access / sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_io_writes</td>
                    <td colspan="2">rate of key writes from flash (key access / sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_io_dels</td>
                    <td colspan="2">rate of key deletions from flash (key access /
                        sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_io_read_bytes</td>
                    <td colspan="2">throughput of i/o read operations against
                        back-end flash for all shards of DB (BigRedis)
                        (bytes/sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_io_write_bytes</td>
                    <td colspan="2">throughput of i/o write operations against
                        back-end flash for all shards of DB (BigRedis)
                        (bytes/sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>ram_overhead</td>
                    <td colspan="2">Non values RAM overhead (bigredis) (bytes)
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_objs_ram</td>
                    <td colspan="2">value count in ram (bigredis)
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_objs_flash</td>
                    <td colspan="2">value count on flash (bigredis)
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>used_memory</td>
                    <td colspan="2">memory used by db (in bigredis this includes
                        flash) (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>mem_size_lua</td>
                    <td colspan="2">redis lua scripting heap size (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>used_ram</td>
                    <td colspan="2">RAM used by db (bigredis) (bytes)
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>used_bigstore</td>
                    <td colspan="2">Flash used by db (bigredis) (bytes)
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>last_req_time</td>
                    <td colspan="2">last request time received to DB (ISO format
                        2015-07-05T22:16:18Z”)”;
                        when not available returns 1/1/1970</td>
                    <td>date,
                        ISO_8601 format</td>
                </tr>
                <tr>
                    <td>last_res_time</td>
                    <td colspan="2">last response time received from DB (ISO format
                        2015-07-05T22:16:18Z”)”;
                        when not available returns 1/1/1970</td>
                    <td>date,
                        ISO_8601 format</td>
                </tr>
                <tr>
                    <td>conns</td>
                    <td colspan="2">number of client connections to DB’s endpoints.</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>total_connections_received</td>
                    <td colspan="2">rate of new client connections to DB
                        (connections/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>ingress_bytes</td>
                    <td colspan="2">rate of incoming network traffic to DB’s
                        endpoint (bytes/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>egress_bytes</td>
                    <td colspan="2">rate of outgoing network traffic to DB’s
                        endpoint (bytes/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>read_req</td>
                    <td colspan="2">rate of read requests on DB (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>read_res</td>
                    <td colspan="2">rate of read responses on DB (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>write_req</td>
                    <td colspan="2">rate of write requests on DB (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>write_res</td>
                    <td colspan="2">rate of write responses on DB (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>other_req</td>
                    <td colspan="2">rate of other (non read/write) requests on DB
                        (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>other_res</td>
                    <td colspan="2">rate of other (non read/write) responses on DB
                        (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>total_req</td>
                    <td colspan="2">rate of all requests on DB (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>total_res</td>
                    <td colspan="2">rate of all responses on DB (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>monitor_sessions_count</td>
                    <td colspan="2">number of client connected in monitor mode to
                        the DB</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>avg_read_latency</td>
                    <td colspan="2">average latency of read operations (microsecond);
                        returned only when there is traffic</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>avg_write_latency</td>
                    <td colspan="2">average latency of write operations
                        (microsecond); returned only when
                        there is traffic</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>avg_other_latency</td>
                    <td colspan="2">average latency of other (non read/write)
                        operations (microsecond); returned only when
                        there is traffic</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>avg_latency</td>
                    <td colspan="2">average latency of operations on the DB
                        (microsecond); returned only when
                        there is traffic</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>shard_cpu_user</td>
                    <td colspan="2">% cores utilization in user mode for the
                        redis shard process</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>shard_cpu_system</td>
                    <td colspan="2">% cores utilization in system mode for all
                        redis shard processes of this database</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>main_thread_cpu_user</td>
                    <td colspan="2">% cores utilization in user mode for all
                        redis shard main threads of this database</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>main_thread_cpu_system</td>
                    <td colspan="2">% cores utilization in system mode for all
                        redis shard main threads of this database</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>fork_cpu_user</td>
                    <td colspan="2">% cores utilization in user mode for all
                        redis shard fork child processes of this database</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>fork_cpu_system</td>
                    <td colspan="2">% cores utilization in system mode for all
                        redis shard fork child processes of this database</td>
                    <td>float</td>
                </tr>
            </tbody>
        </table>
        <p><strong>Shard Metrics</strong></p>
        <table>
            <colgroup>
                <col width="30%" />
                <col width="52%" />
                <col width="18%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Metric Name</th>
                    <th>Description</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>aof_rewrite_inprog</td>
                    <td>The number of simultaneous AOF rewrites that are
                        in progress.</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>avg_ttl</td>
                    <td>Estimated average time to live of a random key
                        (msec).</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_iops</td>
                    <td>rate of i/o operations against back-end flash
                        for all shards of DB (BigRedis) (ops/sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_throughput</td>
                    <td>throughput of i/o operations against back-end
                        flash for all shards of DB (BigRedis) (bytes/sec)
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_kv_ops</td>
                    <td>rate of value read/write/del operations against
                        back-end flash for all shards of DB (BigRedis)
                        (key access / sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_objs_flash</td>
                    <td>key count on flash (bigredis);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_objs_ram</td>
                    <td>key count in ram (bigredis);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>big_fetch_ram</td>
                    <td>rate of key reads / updates for keys that happen
                        to be in ram (bigredis) (key access / sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>big_fetch_flash</td>
                    <td>rate of key reads / updates for keys that happen
                        to be on flash (bigredis) (key access / sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>big_write_ram</td>
                    <td>rate of key writes for keys that happen
                        to be in ram (bigredis) (key access / sec);
                        this includes write misses (new keys created);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>big_write_flash</td>
                    <td>rate of key writes for keys that happen
                        to be on flash (bigredis) (key access / sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>big_del_ram</td>
                    <td>rate of key deletes for keys that happen
                        to be in ram (bigredis) (key access / sec);
                        this includes write misses (new keys created);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>big_del_flash</td>
                    <td>rate of key deletes for keys that happen
                        to be on flash (bigredis) (key access / sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>big_io_ratio_redis</td>
                    <td>rate of redis operations on keys. can be used
                        to compute ratio of io operations) (key access /
                        sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>big_io_ratio_flash</td>
                    <td>rate of key operations on flash. can be used to
                        compute ratio of io operations (key access /
                        sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_io_reads</td>
                    <td>rate of key reads from flash (key access / sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_io_writes</td>
                    <td>rate of key writes from flash (key access / sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_io_dels</td>
                    <td>rate of key deletions from flash (key access /
                        sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_io_read_bytes</td>
                    <td>throughput of i/o read operations against
                        back-end flash for all shards of DB (BigRedis)
                        (bytes/sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>bigstore_io_write_bytes</td>
                    <td>throughput of i/o write operations against
                        back-end flash for all shards of DB (BigRedis)
                        (bytes/sec);
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>blocked_clients</td>
                    <td>Count the clients waiting on a blocking call.</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>connected_clients</td>
                    <td>number of client connections to the specific
                        shard.</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>evicted_objects</td>
                    <td>rate of key evictions from DB (evictions/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>expired_objects</td>
                    <td>rate keys expired in DB (expirations/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>last_save_time</td>
                    <td>Time of the last RDB save.</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>used_memory</td>
                    <td>memory used by shard (in bigredis this includes
                        flash) (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>mem_size_lua</td>
                    <td>redis lua scripting heap size (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>used_memory_peak</td>
                    <td>The largest amount of memory used by this shard
                        (bytes).</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>used_memory_rss</td>
                    <td>resident set size of this shard (bytes)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>no_of_keys</td>
                    <td>number of keys in DB</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>pubsub_channels</td>
                    <td>Count the pub/sub channels with subscribed
                        clients.</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>pubsub_patterns</td>
                    <td>Count the pub/sub patterns with subscribed
                        clients.</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>rdb_changes_since_last_save</td>
                    <td>Count changes since last RDB save.</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>read_hits</td>
                    <td>rate of read operations accessing an existing
                        key (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>read_misses</td>
                    <td>rate of read operations accessing a non-existing
                        key (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>total_req</td>
                    <td>rate of operations on DB (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>write_hits</td>
                    <td>rate of write operations accessing an existing
                        key (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>write_misses</td>
                    <td>rate of write operations accessing a non-
                        existing key (ops/sec)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>mem_frag_ratio</td>
                    <td>RAM fragmentation ratio (RSS / allocated RAM)</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>disk_frag_ratio</td>
                    <td>Flash fragmentation ratio (used / required)
                        returned only when BigRedis is enabled</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>no_of_expires</td>
                    <td>number of volatile keys on the shard</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>shard_cpu_user</td>
                    <td>% cores utilization in user mode for the
                        redis shard process</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>shard_cpu_system</td>
                    <td>% cores utilization in system mode for the
                        redis shard process</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>main_thread_cpu_user</td>
                    <td>% cores utilization in user mode for the
                        redis shard main thread</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>main_thread_cpu_system</td>
                    <td>% cores utilization in system mode for the
                        redis shard main thread</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>fork_cpu_user</td>
                    <td>% cores utilization in user mode for the
                        redis shard fork child process</td>
                    <td>float</td>
                </tr>
                <tr>
                    <td>fork_cpu_system</td>
                    <td>% cores utilization in system mode for the
                        redis shard fork child process</td>
                    <td>float</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<div id="actions">
    <h2>Actions</h2>
    <p id="rest-api-actions">The cluster provides support for invoking general maintenance actions such as
        rebalance cluster, take a node offline by moving all of its entities to other
        nodes, etc.</p>
    <p>Actions are implemented in the cluster as tasks. Every task has a a
        unique <cite>task_id</cite> which is assigned by the cluster, a task name which describes
        the task, status, and additional task-specific parameters.</p>
    <p>The REST API provides a simplified interface that allows callers to invoke
        actions and query their status without explicitly <cite>task_id</cite> handles. This is
        described in detail on a per-request basis.</p>
    <p>Action life-cycle is based on the following status and status transitions:</p>
    <img src="..images/rs/diagram-task-id-status.png" alt="digraph status {
queued -&gt; cancelled;
queued -&gt; starting;
starting -&gt; running;
running -&gt; completed;
running -&gt; cancelling -&gt; cancelled;
running -&gt; failed;
}" />
    <table>
        <colgroup>
            <col width="25%" />
            <col width="75%" />
        </colgroup>
        <thead valign="bottom">
            <tr>
                <th>Field</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody valign="top">
            <tr>
                <td>status</td>
                <td>
                    <ul>
                        <li><cite>queued</cite>: operation was requested and is waiting
                            to start.</li>
                        <li><cite>starting</cite>: operating was picked up from the queue
                            and processing begins.</li>
                        <li><cite>running</cite>: operation is currently executing.</li>
                        <li>
                            <dl>
                                <dt><cite>cancelling</cite>: operation cancel was requested and</dt>
                                <dd>is in progress.</dd>
                            </dl>
                        </li>
                        <li><cite>cancelled</cite>: operation was cancelled.</li>
                        <li><cite>completed</cite>: operation has completed.</li>
                        <li><cite>failed</cite>: operation has failed.</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td>progress</td>
                <td>Integer (0-100) representing percentage completed.</td>
            </tr>
        </tbody>
    </table>
    <p>When a task is failed, the <cite>error_code</cite> and <cite>error_message</cite> fields may be
        present in order to describe the encountered error.</p>
    <p>The following <cite>error_code</cite> field value are used:</p>
    <table>
        <colgroup>
            <col width="33%" />
            <col width="67%" />
        </colgroup>
        <thead valign="bottom">
            <tr>
                <th>Value</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody valign="top">
            <tr>
                <td><cite>internal_error</cite></td>
                <td>An internal error that cannot be mapped to a more
                    precise error code has been encountered.</td>
            </tr>
            <tr>
                <td><cite>insufficient_resources</cite></td>
                <td>The cluster does not have sufficient resources to
                    complete the required operation.</td>
            </tr>
        </tbody>
    </table>
</div>
<div id="alerts">
    <h2>Alerts</h2>
    <p id="rest-api-alerts">The cluster supports getting, configuring and enabling various alerts. Alerts can
        go on or off depending on the state of the cluster. And alert is bound to a cluster
        object (such as a bdb or node). Alerts objects are retrieved and in JSON format.
        The following table describes the Alert json object:</p>
    <table>
        <colgroup>
            <col width="18%" />
            <col width="71%" />
            <col width="11%" />
        </colgroup>
        <thead valign="bottom">
            <tr>
                <th>Field</th>
                <th>Description</th>
                <th>Writable</th>
            </tr>
        </thead>
        <tbody valign="top">
            <tr>
                <td><cite>enabled</cite></td>
                <td>true if alert is enabled.</td>
                <td>x</td>
            </tr>
            <tr>
                <td><cite>state</cite></td>
                <td>true if alert is currently triggered.</td>
                <td>&#160;</td>
            </tr>
            <tr>
                <td><cite>threshold</cite></td>
                <td>String representing an alert threshold when applicable.</td>
                <td>x</td>
            </tr>
            <tr>
                <td><cite>change_time</cite></td>
                <td>Timestamp when alert state last changed.</td>
                <td>&#160;</td>
            </tr>
            <tr>
                <td><cite>severity</cite></td>
                <td>The alert’s severity: DEBUG, INFO, WARNING, ERROR, CRITICAL</td>
                <td>&#160;</td>
            </tr>
            <tr>
                <td><cite>change_value</cite></td>
                <td>object containing data relevant to the evaluation time when the
                    alert went on/off (thresholds/sampled values/etc.).</td>
                <td>&#160;</td>
            </tr>
        </tbody>
    </table>
</div>
<div id="supported-requests">
    <h2>Supported Requests</h2>
    <dl>
        <dt id="get--v1-cluster-certificates">
            <code>GET </code><code>/v1/cluster/certificates</code>
        </dt>
        <dd>
            <p>Get the clusters certificates.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /cluster/certificates HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;api_cert&quot;: &quot;-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----&quot;,
&quot;api_key&quot;: &quot;-----BEGIN RSA PRIVATE KEY-----...-----END RSA PRIVATE KEY-----&quot;
// additional certificates...
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_cluster_info</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="put--v1-cluster-update_cert">
            <code>PUT </code><code>/v1/cluster/update_cert</code>
        </dt>
        <dd>
            <p>Replaces specified cluster certificate with given one,
                the new certificate will be replaced on all nodes within the cluster.
                This end point will make sure given certificate is valid before actually
                updaing the cluster.</p>
            <p>We respond with 200 OK if we’ve managed to replace certifiacte across the entire cluster
                403/4 otherwise, it is highly recommanded to retry updating the certificate incase
                of a faiuler as the cluster might be in undesired state.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4">403
                                        Forbidden</a> – failed, unknown certificate.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – failed, invalid certificate.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – failed, not all nodes been updated.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-bdbs">
            <code>GET </code><code>/v1/bdbs</code></dt>
        <dd>
            <p>Get all databases in the cluster.</p>
            <p>The response body contains a JSON array with all databases, represented
                as bdb objects.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /bdbs HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

[
{
&quot;uid&quot;: 1,
&quot;name&quot;: &quot;name of database #1&quot;,
// additional fields...
},
{
&quot;uid&quot;: 2,
&quot;name&quot;: &quot;name of database #2&quot;,
// additional fields...
}
]
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_all_bdbs_info</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-bdbs-(int-uid)">
            <code>GET </code><code>/v1/bdbs/</code>(<em>int: </em><em>uid</em>)</dt>
        <dd>
            <p>Get single database (bdb object) as json.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> (<em>int</em>) – The unique ID of the database requested.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /bdb/1 HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;uid&quot;: 1,
&quot;name&quot;: &quot;name of database #1&quot;,
// additional fields...
}
</pre>
                </div>
            </div>
            <p>See <a href="#id1">Object
                        Attributes</a> for more details on additional db parameters</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – database uid does not exist</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_bdb_info</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-bdbs">
            <code>POST </code><code>/v1/bdbs</code></dt>
        <dd>
            <p>Create a new database in the cluster.</p>
            <p>The request must contain a single JSON bdb object with the configuration
                parameters for the new database.</p>
            <p>If passed with the dry_run URL query string, the function will validate the bdb object, but will
                not invoke the
                state machine that will create it.</p>
            <p>The cluster will use default configuration for any missing bdb field. The
                databases’s uid will be created by the cluster if it is missing.</p>
            <p>The response includes the newly created bdb object.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>POST /bdbs HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json

{
&quot;name&quot;: &quot;test database&quot;,
&quot;type&quot;: &quot;redis&quot;,
&quot;memory_size&quot;: 1073741824
}
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;uid&quot;: 1,
&quot;name&quot;: &quot;test database&quot;,
&quot;type&quot;: &quot;redis&quot;,
&quot;memory_size&quot;: 1073741824,
// additional fields...
}
</pre>
                </div>
            </div>
            <p>The above request is an attempt to create a Redis database with a user-
                specified name and a memory limit of 1GB.</p>
            <p>The uid of the database is auto-assigned by the cluster because it was
                not explicitly listed in the request. If you specify the database ID (uid)
                then you must specify the database ID for every subsequent database and you
                must make sure that the database ID does not conflict with an existing database.
                If you do not specify the database ID, then the database ID is automatically
                assigned in sequential order.</p>
            <p>Defaults are used for all other configuration parameters.</p>
            <p>See <a href="#id1">Object
                        Attributes</a> for more details on additional db parameters</p>
            <p>When errors are reported, the server may return a JSON object with
                <cite>error_code</cite> and <cite>message</cite> field that provide additional information. The
                following are possible error_code values:</p>
            <table>
                <colgroup>
                    <col width="41%" />
                    <col width="59%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>uid_exists</td>
                        <td>The specified database UID is already in use.</td>
                    </tr>
                    <tr>
                        <td>missing_db_name</td>
                        <td>DB name is a required property.</td>
                    </tr>
                    <tr>
                        <td>missing_memory_size</td>
                        <td>Memory Size is a required property.</td>
                    </tr>
                    <tr>
                        <td>missing_module</td>
                        <td>Modules missing from the cluster</td>
                    </tr>
                    <tr>
                        <td>port_unavailable</td>
                        <td>The specified database port is reserved or already
                            in use.</td>
                    </tr>
                    <tr>
                        <td>invalid_sharding</td>
                        <td>Invalid sharding configuration was specified.</td>
                    </tr>
                    <tr>
                        <td>bad_shards_blueprint</td>
                        <td>The sharding blueprint is broken.</td>
                    </tr>
                    <tr>
                        <td>not_rack_aware</td>
                        <td>Cluster is not rack aware and a rack aware database
                            was requested.</td>
                    </tr>
                    <tr>
                        <td>invalid_version</td>
                        <td>An invalid database version was requested.</td>
                    </tr>
                    <tr>
                        <td>busy</td>
                        <td>The request failed because another request is being
                            processed at the same time on the same database.</td>
                    </tr>
                    <tr>
                        <td>invalid_data_persistence</td>
                        <td>Invalid data persistence configuration.</td>
                    </tr>
                    <tr>
                        <td>invalid_proxy_policy</td>
                        <td>Invalid proxy_policy value.</td>
                    </tr>
                    <tr>
                        <td>invalid_sasl_credentials</td>
                        <td>SASL credentials are missing or invalid.</td>
                    </tr>
                    <tr>
                        <td>invalid_replication</td>
                        <td>Not enough nodes to perform replication.</td>
                    </tr>
                    <tr>
                        <td>insufficient_resources</td>
                        <td>Not enough resources in cluster to host the database.</td>
                    </tr>
                    <tr>
                        <td>rack_awareness_violation</td>
                        <td>
                            <ul>
                                <li>Rack awareness violation.</li>
                                <li>Not enough nodes in unique racks.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>invalid_ssl_configuration</td>
                        <td>
                            <ul>
                                <li>SSL client certificate is missing.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>replication_violation</td>
                        <td>CRDT database must use replication.</td>
                    </tr>
                    <tr>
                        <td>eviction_policy_violation</td>
                        <td>
                            <ul>
                                <li>CRDT database do not support eviction.</li>
                                <li>lfu eviction policy is not supported
                                    on bdb version&lt;4</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>invalid_oss_cluster_configuration</td>
                        <td>BDB configuration does not meet the requirements for
                            oss cluster mode</td>
                    </tr>
                    <tr>
                        <td>memcached_cannot_use_modules</td>
                        <td>Cannot create a memcached database with modules</td>
                    </tr>
                    <tr>
                        <td>missing_backup_interval</td>
                        <td>BDB backup is enabled but backup interval is missing.</td>
                    </tr>
                    <tr>
                        <td>wrong_cluster_state_id</td>
                        <td>The given CLUSTER-STATE-ID does not match the
                            current one</td>
                    </tr>
                    <tr>
                        <td>invalid_bdb_tags</td>
                        <td>Tag objects with the same key parameter were passed.</td>
                    </tr>
                    <tr>
                        <td>unsupported_module_capabilities</td>
                        <td>Not all modules configured for the database support
                            the capabilities needed for the database
                            configuration</td>
                    </tr>
                    <tr>
                        <td>redis_acl_unsupported</td>
                        <td>Redis ACL is not supported for this database</td>
                    </tr>
                </tbody>
            </table>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4">403
                                        Forbidden</a> – redislabs license expired.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10">409
                                        Conflict</a> – database with the same uid already exists.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – invalid configuration parameters provided.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    success, database is being created.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>create_bdb</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="put--v1-bdbs-(int-uid)">
            <code>PUT </code><code>/v1/bdbs/</code>(<em>int: </em><em>uid</em>)</dt>
        <dd>
            <p>Update the configuration of an active database. This is the simplified
                version of the update request which contains no additional action.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the database for which update is requested.
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>PUT /bdb/1 HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json

{
&quot;replication&quot;: true,
&quot;data_persistence&quot;: &quot;aof&quot;
}
</pre>
                </div>
            </div>
            <p>The above request attempts to modify a database configuration to enable
                in-memory data replication and Append-Only File data persistence.</p>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;uid&quot;: 1,
&quot;replication&quot;: true,
&quot;data_persistence&quot;: &quot;aof&quot;,
// additional fields...
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – the
                                    request is accepted and is being processed. The
                                    database state will be ‘active-change-pending’ until the request has
                                    been fully processed.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – attempting to change a non-existing database.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – the requested configuration is invalid.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10">409
                                        Conflict</a> – attempting to change a database while it is busy with
                                    another configuration change. In this context, this is a temporary
                                    condition and the request should be re-attempted later.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>update_bdb</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="put--v1-bdbs-(int-uid)-(action)">
            <code>PUT </code><code>/v1/bdbs/</code>(<em>int:
            </em><em>uid</em>)<code>/</code>(<em>action</em>)</dt>
        <dd>
            <p>Update the configuration of an active database.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the database for which update is requested.
                                </li>
                                <li><strong>action</strong> – Additional action to perform. Currently the supported
                                    actions are: <cite>flush</cite>, <cite>reset_admin_pass</cite>.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>If passed with the dry_run URL query string, the function will validate the bdb object against the
                existing bdb,
                but will not invoke the state machine that will update it.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>PUT /bdb/1 HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json

{
&quot;replication&quot;: true,
&quot;data_persistence&quot;: &quot;aof&quot;
}
</pre>
                </div>
            </div>
            <p>The above request attempts to modify a database configuration to enable
                in-memory data replication and Append-Only File data persistence.</p>
            <p><em>Note</em>: Changing the shard hashing policy requires flushing all keys from the database.</p>
            <p>When errors are reported, the server may return a JSON object with
                <cite>error_code</cite> and <cite>message</cite> field that provide additional information. The
                following are possible error_code values:</p>
            <table>
                <colgroup>
                    <col width="36%" />
                    <col width="3%" />
                    <col width="61%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Code</th>
                        <th colspan="2">Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>rack_awareness_violation</td>
                        <td colspan="2">
                            <ul>
                                <li>Non rack aware cluster.</li>
                                <li>Not enough nodes in unique racks.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>invalid_ssl_configuration</td>
                        <td colspan="2">
                            <ul>
                                <li>SSL client certificate is missing.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>insufficient_resources</td>
                        <td colspan="2">Shards count exceeds shards limit per bdb.</td>
                    </tr>
                    <tr>
                        <td>not_supported_action_on_crdt</td>
                        <td colspan="2">reset_admin_pass action is not allowed on CRDT enabled BDB.</td>
                    </tr>
                    <tr>
                        <td>name_violation</td>
                        <td colspan="2">CRDT database name can not be changed.</td>
                    </tr>
                    <tr>
                        <td>bad_shards_blueprint</td>
                        <td colspan="2">The sharding blueprint is broken or doesn’t fit the BDB.</td>
                    </tr>
                    <tr>
                        <td>replication_violation</td>
                        <td colspan="2">CRDT database must use replication.</td>
                    </tr>
                    <tr>
                        <td>eviction_policy_violation</td>
                        <td colspan="2">
                            <ul>
                                <li>CRDT database do not support eviction.</li>
                                <li>lfu eviction policy is not supported on bdb version&lt;4</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>replication_node_violation</td>
                        <td colspan="2">Not enough nodes for replication.</td>
                    </tr>
                    <tr>
                        <td>replication_size_violation</td>
                        <td colspan="2">Database limit too small for replication</td>
                    </tr>
                    <tr>
                        <td>invalid_oss_cluster_configuration</td>
                        <td colspan="2">BDB configuration does not meet the requirements for
                            oss cluster mode</td>
                    </tr>
                    <tr>
                        <td>missing_backup_interval</td>
                        <td colspan="2">BDB backup is enabled but backup interval is missing.</td>
                    </tr>
                    <tr>
                        <td>crdt_sharding_violation</td>
                        <td colspan="2">CRDB created without sharding cannot be changed to
                            use sharding</td>
                    </tr>
                    <tr>
                        <td>invalid_proxy_policy</td>
                        <td colspan="2">Invalid proxy_policy value.</td>
                    </tr>
                    <tr>
                        <td>invalid_bdb_tags</td>
                        <td colspan="2">Tag objects with the same key parameter were passed</td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <dl>
                                <dt>unsupported_module_capabilities | Not all modules configured for the database
                                    support
                                    the</dt>
                                <dd>
                                    <div>
                                        <div>capabilities needed for the database configuration</div>
                                    </div>
                                </dd>
                            </dl>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">redis_acl_unsupported | Redis ACL is not supported for this database</td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK
Content-Length: 0
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – the
                                    request is accepted and is being processed. The
                                    database state will be ‘active-change-pending’ until the request has
                                    been fully processed.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4">403
                                        Forbidden</a> – redislabs license expired.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – attempting to change a non-existing database.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – the requested configuration is invalid.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10">409
                                        Conflict</a> – attempting to change a database while it is busy with
                                    another configuration change. In this context, this is a temporary
                                    condition and the request should be re-attempted later.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>update_bdb_with_action</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="delete--v1-bdbs-(int-uid)">
            <code>DELETE </code><code>/v1/bdbs/</code>(<em>int: </em><em>uid</em>)</dt>
        <dd>
            <p>Delete an active database.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the database to delete.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>DELETE /bdb/1 HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p>The above request attempts to completely delete database with unique ID 1.</p>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK
Content-Length: 0
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – the
                                    request is accepted and is being processed. The
                                    database state will be ‘delete-pending’ until the request has been
                                    fully processed.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4">403
                                        Forbidden</a> – attempting to delete an internal database.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – attempting to delete a non-existing database.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – the database is not in ‘active’ state and cannot be
                                    deleted.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10">409
                                        Conflict</a> – attempting to change a database while it is busy with
                                    another configuration change. In this context, this is a temporary
                                    condition and the request should be re-attempted later.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>delete_bdb</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-bdbs-(int-uid)-actions-export">
            <code>POST </code><code>/v1/bdbs/</code>(<em>int:
            </em><em>uid</em>)<code>/actions/export</code></dt>
        <dd>
            <p>Initiate a database export.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the database</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>The request body should contain a JSON object, with the following
                export parameters:</p>
            <ul>
                <li>
                    <dl>
                        <dt><cite>export_location</cite> - details for the export destination. GET /jsonschema on the
                            bdb object and review the</dt>
                        <dd>backup_location field to retrieve the object’s structure.</dd>
                    </dl>
                </li>
                <li><cite>email_notification</cite> - optional, when true an email on
                    failure/completion will be sent when export is done.</li>
            </ul>
            <p>See <a href="#backup-location">Backup
                        Location</a> for more details on the backup location types.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>POST /bdbs/1/actions/export HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json

{
&quot;export_location&quot;: {&quot;type&quot;: &quot;url&quot;, &quot;url&quot;: &quot;ftp://...&quot;},
&quot;email_notification&quot;: true
}
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK
Content-Length: 0
</pre>
                </div>
            </div>
            <p>The above request initates an export operation to the specified location.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – the
                                    request is accepted and is being processed. In
                                    order to monitor progress, the BDB’s <cite>export_status</cite>,
                                    <cite>export_progress</cite> and
                                    <cite>export_failure_reason</cite> attributes can be consulted.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – attempting to perform a action on a non-existing database.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – not all the modules loaded to the database support
                                    ‘backup_restore’
                                    capability</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10">409
                                        Conflict</a> – database is currently busy with another action. In this
                                    context, this is a temporary condition and the request should be
                                    re-attempted later.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>start_bdb_export</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="put--v1-bdbs-(int-uid)-actions-export_reset_status">
            <code>PUT </code><code>/v1/bdbs/</code>(<em>int:
            </em><em>uid</em>)<code>/actions/export_reset_status</code></dt>
        <dd>
            <p>Reset database current export status (export_status) to idle if not in progress.
                As well clear exiting export_failure_reason if exits</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the database</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>PUT /bdbs/1/actions/export_reset_status HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK
Content-Length: 0
</pre>
                </div>
            </div>
            <p>The above request resets export_status to idle value and clear failure reason message if exist
                from export_failure_reason.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – the
                                    request is accepted and is being processed.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – attempting to perform a action on a non-existing database.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – not all the modules loaded to the database support
                                    ‘backup_restore’
                                    capability</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10">409
                                        Conflict</a> – database is currently busy with another action. In this
                                    context, this is a temporary condition and the request should be
                                    re-attempted later.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>reset_bdb_current_export_status</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="put--v1-bdbs-(int-uid)-actions-backup_reset_status">
            <code>PUT </code><code>/v1/bdbs/</code>(<em>int:
            </em><em>uid</em>)<code>/actions/backup_reset_status</code></dt>
        <dd>
            <p>Reset database current backup status (backup_status) to idle if not in progress.
                As well clear exiting backup_failure_reason if exits</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the database</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>PUT /bdbs/1/actions/backup_reset_status HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK
Content-Length: 0
</pre>
                </div>
            </div>
            <p>The above request resets backup_status to idle value and clear failure reason message if exist
                from backup_failure_reason.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – the
                                    request is accepted and is being processed.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – attempting to perform a action on a non-existing database.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – not all the modules loaded to the database support
                                    ‘backup_restore’
                                    capability</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10">409
                                        Conflict</a> – database is currently busy with another action. In this
                                    context, this is a temporary condition and the request should be
                                    re-attempted later.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>reset_bdb_current_backup_status</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-bdbs-(int-uid)-actions-import">
            <code>POST </code><code>/v1/bdbs/</code>(<em>int:
            </em><em>uid</em>)<code>/actions/import</code></dt>
        <dd>
            <p>Initiate a manual import process.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the database</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>The request <strong>may</strong> contain a subset of the bdb JSON object, which
                includes the following import-related attributes:</p>
            <ul>
                <li>
                    <dl>
                        <dt><cite>dataset_import_sources</cite> - details for the import sources. GET /jsonschema on the
                            bdb object and review the</dt>
                        <dd>dataset_import_sources field to retrieve the object’s structure.</dd>
                    </dl>
                </li>
                <li><cite>email_notification</cite> - optional, when true an email on
                    failure/completion will be sent when import is done.</li>
            </ul>
            <p>See <a href="#import-sources">Import
                        Sources</a> for more details on the import location types.</p>
            <p>Other attributes are not allowed and will fail the request.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>POST /bdbs/1/actions/import HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
Content-Length: 0

{
&quot;dataset_import_sources&quot;: [{&quot;type&quot;: &quot;url&quot;, &quot;url&quot;: &quot;http://...&quot;}, {&quot;type&quot;: &quot;url&quot;, &quot;url&quot;: &quot;redis://...&quot;}],
&quot;email_notification&quot;: true
}
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK
Content-Length: 0
</pre>
                </div>
            </div>
            <p>The above request initiates an import process using
                <cite>dataset_import_sources</cite> values that were previously configured for the
                database.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – the
                                    request is accepted and is being processed. In
                                    order to monitor progress, the <cite>import_status</cite>,
                                    <cite>import_progress</cite>
                                    and
                                    <cite>import_failure_reason</cite> attributes can be consulted.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – attempting to perform a action on a non-existing database.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – not all the modules loaded to the database support
                                    ‘backup_restore’
                                    capability</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10">409
                                        Conflict</a> – database is currently busy with another action. In this
                                    context, this is a temporary condition and the request should be
                                    re-attempted later.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>start_bdb_import</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-bdbs-(int-uid)-actions-recover">
            <code>POST </code><code>/v1/bdbs/</code>(<em>int:
            </em><em>uid</em>)<code>/actions/recover</code></dt>
        <dd>
            <p>Initiate recovery for a database in recovery state.</p>
            <p>The request body may be empty, in which case the database will be recovered
                automatically:</p>
            <ul>
                <li>Databases with no persistence are recovered with no data.</li>
                <li>Persistent files (aof, rdb) will be loaded from their expected storage
                    locations (i.e. where slave or master shards were last active).</li>
                <li>If persistent files are not found where expected but can be located on
                    other cluster nodes, they will be used.</li>
            </ul>
            <p>In addition, the request may include a request body with an explicit
                recovery plan.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the database to recover.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – the
                                    request is accepted and is being processed. When the
                                    database is recovered, its status will become <cite>active</cite>.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – attempting to perform a action on a non-existing database.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10">409
                                        Conflict</a> – database is currently busy with another action (e.g.
                                    recovery already in progress) or is not in recoverable state.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request, no recovery plan</strong>:</p>
            <div>
                <div>
                    <pre>POST /bdbs/1/actions/recover HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example request, detailed recovery plan</strong>:</p>
            <div>
                <div>
                    <pre>POST /bdbs/1/actions/recover HTTP/1.1
Host: cnm.cluster.fqdn
Content-Type: application/json

{
&quot;data_files&quot;: [
{
  &quot;filename&quot;: &quot;appendonly-1.aof&quot;,
  &quot;node_uid&quot;: &quot;1&quot;,
  &quot;shard_slots&quot;: &quot;1-2048&quot;
},
{   &quot;filename&quot;: &quot;appendonly-2.aof&quot;,
  &quot;node_uid&quot;: &quot;2&quot;,
  &quot;shard_slots&quot;: &quot;2049-4096&quot;
}
],
&quot;ignore_errors&quot;: false,
&quot;recover_without_data&quot;: false
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>start_bdb_recovery</td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-bdbs-(int-uid)-actions-recover">
            <code>GET </code><code>/v1/bdbs/</code>(<em>int:
            </em><em>uid</em>)<code>/actions/recover</code></dt>
        <dd>
            <p>Fetch the recovery plan for a database in recovery mode. The recovery
                plan provides information about the recovery status (if it is possible)
                and specific detail on which available files to recovery from have been
                found.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the database for which recovery plan is
                                    required. The database must be in recovery mode.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_bdb_recovery_plan</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-bdbs-(int-uid)-command">
            <code>POST </code><code>/v1/bdbs/</code>(<em>int:
            </em><em>uid</em>)<code>/command</code></dt>
        <dd>
            <p>Execute a redis/memcached command, per the db type.</p>
            <p>The request must contain a redis command JSON representation consists of a ‘command’ field.
                It may also consist of an ‘args’ array.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> (<em>int</em>) – The uid of the db on which the command will be
                                    performed.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>1. Redis Example request</strong>:</p>
            <div>
                <div>
                    <pre>POST /bdbs/&lt;int:uid&gt;/command HTTP/1.1
Accept: application/json

{
&quot;command&quot;: &quot;INFO&quot;
}
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;response&quot;: {
&quot;aof_current_rewrite_time_sec&quot;: -1,
&quot;aof_enabled&quot;: 0,
&quot;aof_last_bgrewrite_status&quot;: &quot;ok&quot;,

// Additional fields
}
}
</pre>
                </div>
            </div>
            <p><strong>2. Redis Example request</strong>:</p>
            <div>
                <div>
                    <pre>POST /bdbs/&lt;int:uid&gt;/command HTTP/1.1
Accept: application/json

{
&quot;command&quot;: &quot;HSET&quot;,
&quot;args&quot;: [&quot;myhash&quot;, &quot;foo&quot;, &quot;bar&quot;]
}
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;response&quot;: 1
}
</pre>
                </div>
            </div>
            <p><strong>2. Memcached Example request</strong>:</p>
            <div>
                <div>
                    <pre>POST /bdbs/&lt;int:uid&gt;/command HTTP/1.1
Accept: application/json

{
&quot;command&quot;: &quot;flush_all&quot;
}
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;response&quot;: true
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – OK
                                </li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1">400 Bad
                                        Request</a> – Malformed or bad command</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.4">503
                                        Service
                                        Unavailable</a> – Redis connection error, service unavailable</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.1">500
                                        Internal
                                        Server Error</a> – Internal error</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>execute_redis_or_memcached_command</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-bdbs-alerts">
            <code>GET </code><code>/v1/bdbs/alerts</code></dt>
        <dd>
            <p>Get all alert states for all bdbs.</p>
            <p>Returns a hash of alert uid’s and the alerts states for each BDB.</p>
            <p>See <a href="#rest-api-alerts">REST API alerts
                        overview</a> for a description
                of the alert state object.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the database</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /bdbs/alerts HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;1&quot;: {
&quot;bdb_size&quot;: {
  &quot;enabled&quot;: true,
  &quot;state&quot;: true,
  &quot;threshold&quot;: &quot;80&quot;,
  &quot;change_time&quot;: &quot;2014-08-29T11:19:49Z&quot;,
  &quot;severity&quot;: &quot;WARNING&quot;,
  &quot;change_value&quot;: {
      &quot;state&quot;: true,
      &quot;threshold&quot;: &quot;80&quot;,
      &quot;memory_util&quot;: 81.2
  }
},
...
},
...
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_all_bdbs_alerts</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-bdbs-alerts-(int-uid)">
            <code>GET </code><code>/v1/bdbs/alerts/</code>(<em>int: </em><em>uid</em>)</dt>
        <dd>
            <p>Get all alert states for bdb.</p>
            <p>Returns a hash of alert objects and their state.
                See <a href="#rest-api-alerts">REST API alerts
                        overview</a> for a description
                of the alert state object.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /bdbs/alerts/1 HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;bdb_size&quot;: {
&quot;enabled&quot;: true,
&quot;state&quot;: true,
&quot;threshold&quot;: &quot;80&quot;,
&quot;severity&quot;: &quot;WARNING&quot;,
&quot;change_time&quot;: &quot;2014-08-29T11:19:49Z&quot;,
&quot;change_value&quot;: {
  &quot;state&quot;: true,
  &quot;threshold&quot;: &quot;80&quot;,
  &quot;memory_util&quot;: 81.2
}
},
...
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – specified bdb does not exist</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_bdb_alerts</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-bdbs-alerts-(int-uid)-(alert)">
            <code>GET </code><code>/v1/bdbs/alerts/</code>(<em>int:
            </em><em>uid</em>)<code>/</code>(<em>alert</em>)</dt>
        <dd>
            <p>Get bdb alert state.</p>
            <p>See <a href="#rest-api-alerts">REST API alerts
                        overview</a> for a description
                of the alert state object.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the database</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /bdbs/alerts/1/bdb_size HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;enabled&quot;: true,
&quot;state&quot;: true,
&quot;threshold&quot;: &quot;80&quot;,
&quot;severity&quot;: &quot;WARNING&quot;,
&quot;change_time&quot;: &quot;2014-08-29T11:19:49Z&quot;,
&quot;change_value&quot;: {
&quot;state&quot;: true,
&quot;threshold&quot;: &quot;80&quot;,
&quot;memory_util&quot;: 81.2
}
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1">400 Bad
                                        Request</a> – bad request</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – specified alert or bdb does not exist</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_bdb_alerts</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-bdbs-alerts-(int-uid)">
            <code>POST </code><code>/v1/bdbs/alerts/</code>(<em>int: </em><em>uid</em>)</dt>
        <dd>
            <p>Updates database’s one or many alerts configuration</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> (<em>int</em>) – the database ID</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>The request must contain a single JSON bdb object with one or many database alert objects in it.
                Each alert configuration object must be according to the following schema</p>
            <div>
                <div>
                    <pre>{
&quot;enabled&quot;: {
&quot;description&quot;: &quot;Alert enabled or disabled&quot;,
&quot;type&quot;: &quot;string&quot;,
&quot;enum&quot;: [ &quot;enabled&quot;, &quot;disabled&quot; ]
},
&quot;threshold&quot;: {
&quot;description&quot;: &quot;Threshold for alert to indicate when it should turn on or off&quot;,
&quot;type&quot;: &quot;string&quot;
}
}
</pre>
                </div>
            </div>
            <p>The response includes the updated database alerts.</p>
            <p><strong>Example request for database with ID=1</strong>:</p>
            <div>
                <div>
                    <pre>POST /bdbs/alerts/1 HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json

{
&quot;bdb_size&quot;:{
&quot;threshold&quot;:&quot;80&quot;,
&quot;enabled&quot;:true
},
&quot;bdb_high_syncer_lag&quot;:{
&quot;threshold&quot;:&quot;&quot;,
&quot;enabled&quot;:false
},
&quot;bdb_low_throughput&quot;:{
&quot;threshold&quot;:&quot;1&quot;,
&quot;enabled&quot;:true
},
&quot;bdb_high_latency&quot;:{
&quot;threshold&quot;:&quot;3000&quot;,
&quot;enabled&quot;:true
},
&quot;bdb_high_throughput&quot;:{
&quot;threshold&quot;:&quot;1&quot;,
&quot;enabled&quot;:true
},
&quot;bdb_backup_delayed&quot;:{
&quot;threshold&quot;:&quot;1800&quot;,
&quot;enabled&quot;:true
}
}
</pre>
                </div>
            </div>
            <p>The above request is an attempt to modify 6 different alerts for database with ID=1.</p>
            <p>See <a href="#id1">Object
                        Attributes</a> for more details on additional database alert types</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – specified database was not found.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – invalid configuration parameters provided.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    success, database alerts updated.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>update_bdb_alerts</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-nodes-alerts">
            <code>GET </code><code>/v1/nodes/alerts</code></dt>
        <dd>
            <p>Get all alert states for all nodes.</p>
            <p>Returns a hash of node uid’s and the alerts states for each node.</p>
            <p>See <a href="#rest-api-alerts">REST API alerts
                        overview</a> for a description
                of the alert state object.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>ignore_settings</strong> – Optional retrieve updated alert state regardless
                                    if
                                    alert is
                                    enabled in cluster’s alert_settings. When not present a disabled alert will always
                                    be retrieved as disabled with a false state.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /nodes/alerts HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;1&quot;: {
&quot;node_cpu_utilization&quot;: {
  &quot;change_time&quot;: &quot;2014-12-22T10:42:00Z&quot;,
  &quot;change_value&quot;: {
      &quot;cpu_util&quot;: 2.500000000145519,
      &quot;global_threshold&quot;: &quot;1&quot;,
      &quot;state&quot;: true
  },
  &quot;enabled&quot;: true,
  &quot;state&quot;: true,
  &quot;severity&quot;: &quot;WARNING&quot;
},
...
},
...
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_all_nodes_alerts</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-nodes-alerts-(int-uid)">
            <code>GET </code><code>/v1/nodes/alerts/</code>(<em>int: </em><em>uid</em>)</dt>
        <dd>
            <p>Get all alert states for a node.</p>
            <p>Returns a hash of alert objects and their state.
                See <a href="#rest-api-alerts">REST API alerts
                        overview</a> for a description
                of the alert state object.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>ignore_settings</strong> – Optional retrieve updated alert state regardless
                                    if
                                    alert is
                                    enabled in cluster’s alert_settings. When not present a disabled alert will always
                                    be retrieved as disabled with a false state.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /nodes/alerts/1 HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;node_cpu_utilization&quot;: {
&quot;change_time&quot;: &quot;2014-12-22T10:42:00Z&quot;,
&quot;change_value&quot;: {
  &quot;cpu_util&quot;: 2.500000000145519,
  &quot;global_threshold&quot;: &quot;1&quot;,
  &quot;state&quot;: true
},
&quot;enabled&quot;: true,
&quot;state&quot;: true
&quot;severity&quot;: &quot;WARNING&quot;,
},
...
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – specified node does not exist</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_node_alerts</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-nodes-alerts-(int-uid)-(alert)">
            <code>GET </code><code>/v1/nodes/alerts/</code>(<em>int:
            </em><em>uid</em>)<code>/</code>(<em>alert</em>)</dt>
        <dd>
            <p>Get node alert state.</p>
            <p>See <a href="#rest-api-alerts">REST API alerts
                        overview</a> for a description
                of the alert state object.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>ignore_settings</strong> – Optional retrieve updated alert state regardless
                                    if
                                    alert is
                                    enabled in cluster’s alert_settings. When not present a disabled alert will always
                                    be retrieved as disabled with a false state.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /nodes/alerts/1/node_cpu_utilization HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;change_time&quot;: &quot;2014-12-22T10:42:00Z&quot;,
&quot;change_value&quot;: {
&quot;cpu_util&quot;: 2.500000000145519,
&quot;global_threshold&quot;: &quot;1&quot;,
&quot;state&quot;: true
},
&quot;enabled&quot;: true,
&quot;state&quot;: true
&quot;severity&quot;: &quot;WARNING&quot;,
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – specified alert or node does not exist</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_node_alerts</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="put--v1-cluster">
            <code>PUT </code><code>/v1/cluster</code></dt>
        <dd>
            <p>Update cluster settings.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>PUT /cluster HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json

{
&quot;email_alerts&quot;: true,
&quot;alert_settings&quot;: {
&quot;node_failed&quot;: true,
&quot;node_memory&quot;: {
  &quot;enabled&quot;: true,
  &quot;threshold&quot;: &quot;80&quot;
}
}
}
</pre>
                </div>
            </div>
            <p>The above request will enable email alerts and alert reporting for
                node failures and node removals.</p>
            <p>When errors are reported, the server may return a JSON object with
                <cite>error_code</cite> and <cite>message</cite> field that provide additional information. The
                following are possible error_code values:</p>
            <table>
                <colgroup>
                    <col width="35%" />
                    <col width="65%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>bad_nginx_conf</td>
                        <td>
                            <ul>
                                <li>Designated port is already bound.</li>
                                <li>nginx configuration is illegal.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>bad_debuginfo_path</td>
                        <td>
                            <ul>
                                <li>Debuginfo path doesn’t exist.</li>
                                <li>Debuginfo path is inaccessible.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>config_edit_conflict</td>
                        <td>Cluster config was edited by another source simultaneously.</td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;name&quot;: &quot;mycluster.mydomain.com&quot;,
&quot;email_alerts&quot;: true,
&quot;alert_settings&quot;: {
&quot;node_failed&quot;: true,
&quot;node_memory&quot;: {
  &quot;enabled&quot;: true,
  &quot;threshold&quot;: &quot;80&quot;
}
},
// additional fields...
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1">400 Bad
                                        Request</a> – bad content provided.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10">409
                                        Conflict</a> – attempting to configure the cluster while it is busy with
                                    another configuration change. In this context, this is a temporary
                                    condition and the request should be re-attempted later.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>update_cluster</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-cluster-alerts">
            <code>GET </code><code>/v1/cluster/alerts</code></dt>
        <dd>
            <p>Get all alert states for the cluster object.</p>
            <p>Returns a hash of alert objects and their state.
                See <a href="#rest-api-alerts">REST API alerts
                        overview</a> for a description
                of the alert state object.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>ignore_settings</strong> – Optional retrieve updated alert state regardless
                                    if
                                    alert is
                                    enabled in cluster’s alert_settings. When not present a disabled alert will always
                                    be retrieved as disabled with a false state.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /cluster/alerts HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;cluster_too_few_nodes_for_replication&quot;: {
&quot;change_time&quot;: &quot;2014-12-22T11:48:00Z&quot;,
&quot;change_value&quot;: {
  &quot;state&quot;: false
},
&quot;enabled&quot;: true,
&quot;state&quot;: &quot;off&quot;
&quot;severity&quot;: &quot;WARNING&quot;,
},
...
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_cluster_alerts</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-cluster-alerts-(alert)">
            <code>GET </code><code>/v1/cluster/alerts/</code>(<em>alert</em>)</dt>
        <dd>
            <p>Get cluster alert state.</p>
            <p>See <a href="#rest-api-alerts">REST API alerts
                        overview</a> for a description
                of the alert state object.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>ignore_settings</strong> – Optional retrieve updated alert state regardless
                                    if
                                    alert is
                                    enabled in cluster’s alert_settings. When not present a disabled alert will always
                                    be retrieved as disabled with a false state.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /cluster/alerts/cluster_too_few_nodes_for_replication HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;change_time&quot;: &quot;2014-12-22T11:48:00Z&quot;,
&quot;change_value&quot;: {
&quot;state&quot;: false
},
&quot;enabled&quot;: true,
&quot;state&quot;: &quot;off&quot;
&quot;severity&quot;: &quot;WARNING&quot;,
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – specified alert does not exist</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_cluster_alerts</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-nodes">
            <code>GET </code><code>/v1/nodes</code></dt>
        <dd>
            <p>Get all cluster nodes.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /nodes HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

[
{
&quot;uid&quot;: 1,
&quot;status&quot;: &quot;active&quot;,
&quot;uptime&quot;: 262735,
&quot;total_memory&quot;: 6260334592,
&quot;software_version&quot;: &quot;0.90.0-1&quot;,
&quot;ephemeral_storage_size&quot;: 20639797248.0,
&quot;persistent_storage_path&quot;: &quot;/var/opt/redislabs/persist&quot;,
&quot;persistent_storage_size&quot;: 20639797248.0,
&quot;os_version&quot;: &quot;Ubuntu 14.04.2 LTS&quot;,
&quot;ephemeral_storage_path&quot;: &quot;/var/opt/redislabs/tmp&quot;,
&quot;architecture&quot;: &quot;x86_64&quot;,
&quot;shard_count&quot;: 23,
&quot;public_addr&quot;: &quot;&quot;,
&quot;cores&quot;: 4,
&quot;rack_id&quot;: &quot;&quot;,
&quot;supported_database_versions&quot;: [
  {
    &quot;db_type&quot;: &quot;memcached&quot;,
    &quot;version&quot;: &quot;1.4.17&quot;
  },
  {
    &quot;db_type&quot;: &quot;redis&quot;,
    &quot;version&quot;: &quot;2.6.16&quot;
  },
  {
    &quot;db_type&quot;: &quot;redis&quot;,
    &quot;version&quot;: &quot;2.8.19&quot;
  }
],
shard_list&quot;: [1, 3, 4]
&quot;addr&quot;: &quot;10.0.3.61&quot;
},
{
&quot;uid&quot;: 1,
&quot;status&quot;: &quot;active&quot;,
// additional fields...
}
]
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_all_nodes_info</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-nodes-(int-uid)">
            <code>GET </code><code>/v1/nodes/</code>(<em>int: </em><em>uid</em>)</dt>
        <dd>
            <p>Get single cluster node.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the node requested.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /nodes/1 HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;uid&quot;: 1,
&quot;name&quot;: &quot;node:1&quot;,
// additional fields...
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – node uid does not exist</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_node_info</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-cluster">
            <code>GET </code><code>/v1/cluster</code></dt>
        <dd>
            <p>Get cluster info.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /cluster HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;name&quot;: &quot;my-rlec-cluster&quot;,
&quot;alert_settings&quot;: { ... },
&quot;created_time&quot;: &quot;2015-04-29T09:09:25Z&quot;,
&quot;email_alerts&quot;: false,
&quot;email_from&quot;: &quot;&quot;,
&quot;rack_aware&quot;: false,
&quot;smtp_host&quot;: &quot;&quot;,
&quot;smtp_password&quot;: &quot;&quot;,
&quot;smtp_port&quot;: 25,
&quot;smtp_tls_mode&quot;: &quot;none&quot;,
&quot;smtp_username&quot;: &quot;&quot;
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_cluster_info</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-bdbs-stats-(int-uid)">
            <code>GET </code><code>/v1/bdbs/stats/</code>(<em>int: </em><em>uid</em>)</dt>
        <dd>
            <p>Get stats for BDB.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the BDB requested.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>interval</strong> – Optional time interval for for which we want stats:
                                    1sec/10sec/5min/15min/1hour/12hour/1week</li>
                                <li><strong>stime</strong> – Optional start time from which we want the stats. Should
                                    comply
                                    with the
                                    <a
                                        href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                    format</li>
                                <li><strong>etime</strong> – <p>Optional end time after which we don’t want the stats.
                                        Should comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /bdbs/stats/1?interval=1hour&amp;stime=2014-08-28T10:00:00Z HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;uid&quot;: &quot;1&quot;,
&quot;intervals&quot;: [
{
&quot;interval&quot;: &quot;1hour&quot;,
&quot;stime&quot;: &quot;2015-05-27T12:00:00Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T12:59:59Z&quot;,
&quot;avg_latency&quot;: 0.0,
&quot;conns&quot;: 0.0,
&quot;egress_bytes&quot;: 0.0,
&quot;evicted_objects&quot;: 0.0,
&quot;pubsub_channels&quot;: 0,
&quot;pubsub_patterns&quot;: 0,
&quot;expired_objects&quot;: 0.0,
&quot;ingress_bytes&quot;: 0.0,
&quot;instantaneous_ops_per_sec&quot;: 0.00011973180076628352,
&quot;last_req_time&quot;: &quot;1970-01-01T00:00:00Z&quot;,
&quot;last_res_time&quot;: &quot;1970-01-01T00:00:00Z&quot;,
&quot;used_memory&quot;: 5656299.362068966,
&quot;mem_size_lua&quot;: 35840.0,
&quot;monitor_sessions_count&quot;: 0.0,
&quot;no_of_keys&quot;: 0.0,
&quot;other_req&quot;: 0.0,
&quot;other_res&quot;: 0.0,
&quot;read_hits&quot;: 0.0,
&quot;read_misses&quot;: 0.0,
&quot;read_req&quot;: 0.0,
&quot;read_res&quot;: 0.0,
&quot;total_connections_received&quot;: 0.0,
&quot;total_req&quot;: 0.0,
&quot;total_res&quot;: 0.0,
&quot;write_hits&quot;: 0.0,
&quot;write_misses&quot;: 0.0,
&quot;write_req&quot;: 0.0,
&quot;write_res&quot;: 0.0
},
{
&quot;interval&quot;: &quot;1hour&quot;,
&quot;stime&quot;: &quot;2015-05-27T13:00:00Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T13:59:59Z&quot;,

// additional fields...
}
]
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – bdb does not exist</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – bdb isn’t currently active</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.4">503
                                        Service
                                        Unavailable</a> – bdb is in recovery state</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_bdb_stats</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-bdbs-stats">
            <code>GET </code><code>/v1/bdbs/stats</code></dt>
        <dd>
            <p>Get stats for all BDBs.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>interval</strong> – Optional time interval for for which we want stats:
                                    1sec/10sec/5min/15min/1hour/12hour/1week</li>
                                <li><strong>stime</strong> – <p>Optional start time from which we want the stats. Should
                                        comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                                <li><strong>etime</strong> – <p>Optional end time after which we don’t want the stats.
                                        Should comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /bdbs/stats?interval=1hour&amp;stime=2014-08-28T10:00:00Z HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

[
{
&quot;uid&quot;: &quot;1&quot;,
&quot;intervals&quot;: [
{
&quot;interval&quot;: &quot;1hour&quot;,
&quot;stime&quot;: &quot;2015-05-27T12:00:00Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T12:59:59Z&quot;,
&quot;avg_latency&quot;: 0.0,
&quot;conns&quot;: 0.0,
&quot;egress_bytes&quot;: 0.0,
&quot;etime&quot;: &quot;2015-05-28T00:00:00Z&quot;,
&quot;evicted_objects&quot;: 0.0,
&quot;expired_objects&quot;: 0.0,
&quot;ingress_bytes&quot;: 0.0,
&quot;instantaneous_ops_per_sec&quot;: 0.00011973180076628352,
&quot;last_req_time&quot;: &quot;1970-01-01T00:00:00Z&quot;,
&quot;last_res_time&quot;: &quot;1970-01-01T00:00:00Z&quot;,
&quot;used_memory&quot;: 5656299.362068966,
&quot;mem_size_lua&quot;: 35840.0,
&quot;monitor_sessions_count&quot;: 0.0,
&quot;no_of_keys&quot;: 0.0,
&quot;other_req&quot;: 0.0,
&quot;other_res&quot;: 0.0,
&quot;read_hits&quot;: 0.0,
&quot;read_misses&quot;: 0.0,
&quot;read_req&quot;: 0.0,
&quot;read_res&quot;: 0.0,
&quot;total_connections_received&quot;: 0.0,
&quot;total_req&quot;: 0.0,
&quot;total_res&quot;: 0.0,
&quot;write_hits&quot;: 0.0,
&quot;write_misses&quot;: 0.0,
&quot;write_req&quot;: 0.0,
&quot;write_res&quot;: 0.0
},
{
&quot;interval&quot;: &quot;1hour&quot;,
&quot;interval&quot;: &quot;1hour&quot;,
&quot;stime&quot;: &quot;2015-05-27T13:00:00Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T13:59:59Z&quot;,
&quot;avg_latency&quot;: 599.08,
// additional fields...
}
]
},
{
&quot;uid&quot;: &quot;2&quot;,
&quot;intervals&quot;: [
{
&quot;interval&quot;: &quot;1hour&quot;,
&quot;stime&quot;: &quot;2015-05-27T12:00:00Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T12:59:59Z&quot;,
&quot;avg_latency&quot;: 0.0,
// additional fields...
},
{
&quot;interval&quot;: &quot;1hour&quot;,
&quot;stime&quot;: &quot;2015-05-27T13:00:00Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T13:59:59Z&quot;,

// additional fields...
}
]
}
]
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – no bdbs exist</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_all_bdb_stats</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-bdbs-stats-last-(int-uid)">
            <code>GET </code><code>/v1/bdbs/stats/last/</code>(<em>int: </em><em>uid</em>)
        </dt>
        <dd>
            <p>Get the most recent statistic information for BDB.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the requested BDB.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>metrics</strong> – Optional comma separated list of metric names for which
                                    we
                                    want statistics (default is all).</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /bdbs/stats/last/1?metrics=no_of_keys,used_memory HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;1&quot;: {
&quot;etime&quot;: &quot;2015-06-23T12:05:08Z&quot;,
&quot;used_memory&quot;: 5651576.0,
&quot;no_of_keys&quot;: 0.0,
&quot;stime&quot;: &quot;2015-06-23T12:05:03Z&quot;
}
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – bdb does not exist</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – bdb isn’t currently active</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.4">503
                                        Service
                                        Unavailable</a> – bdb is in recovery state</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_bdb_stats</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-bdbs-stats-last">
            <code>GET </code><code>/v1/bdbs/stats/last</code></dt>
        <dd>
            <p>Get the most recent statistic information for all BDBs.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>metrics</strong> – Optional comma separated list of metric names for which
                                    we
                                    want statistics (default is all).</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>1. Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /bdbs/stats/last HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;1&quot;: {
&quot;stime&quot;: &quot;2015-05-28T08:06:37Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:06:44Z&quot;,
&quot;conns&quot;: 0.0,
&quot;egress_bytes&quot;: 0.0,
&quot;etime&quot;: &quot;2015-05-28T08:06:44Z&quot;,
&quot;evicted_objects&quot;: 0.0,
&quot;expired_objects&quot;: 0.0,
&quot;ingress_bytes&quot;: 0.0,
&quot;instantaneous_ops_per_sec&quot;: 0.0,
&quot;last_req_time&quot;: &quot;1970-01-01T00:00:00Z&quot;,
&quot;last_res_time&quot;: &quot;1970-01-01T00:00:00Z&quot;,
&quot;used_memory&quot;: 5651336.0,
&quot;mem_size_lua&quot;: 35840.0,
&quot;monitor_sessions_count&quot;: 0.0,
&quot;no_of_keys&quot;: 0.0,
&quot;other_req&quot;: 0.0,
&quot;other_res&quot;: 0.0,
&quot;read_hits&quot;: 0.0,
&quot;read_misses&quot;: 0.0,
&quot;read_req&quot;: 0.0,
&quot;read_res&quot;: 0.0,
&quot;total_connections_received&quot;: 0.0,
&quot;total_req&quot;: 0.0,
&quot;total_res&quot;: 0.0,
&quot;write_hits&quot;: 0.0,
&quot;write_misses&quot;: 0.0,
&quot;write_req&quot;: 0.0,
&quot;write_res&quot;: 0.0
},
&quot;2&quot;: {
&quot;stime&quot;: &quot;2015-05-28T08:06:37Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:06:44Z&quot;,

// additional fields...
},

// Additional BDBs...
}
</pre>
                </div>
            </div>
            <p><strong>2. Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /bdbs/stats/last?metrics=no_of_keys,used_memory HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;1&quot;: {
&quot;etime&quot;: &quot;2015-05-28T08:06:44Z&quot;,
&quot;used_memory&quot;: 5651576.0,
&quot;no_of_keys&quot;: 0.0,
&quot;stime&quot;: &quot;2015-05-28T08:06:37Z&quot;&quot;
},
&quot;2&quot;: {
&quot;etime&quot;: &quot;2015-05-28T08:06:44ZZ&quot;,
&quot;used_memory&quot;: 5651440.0,
&quot;no_of_keys&quot;: 0.0,
&quot;stime&quot;: &quot;2015-05-28T08:06:37Z&quot;
},

// Additional BDBs..
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – no bdbs exist</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_all_bdb_stats</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-shards-stats-(int-uid)">
            <code>GET </code><code>/v1/shards/stats/</code>(<em>int: </em><em>uid</em>)</dt>
        <dd>
            <p>Get stats for a specific shard.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the shard requested.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>interval</strong> – Optional time interval for which we want stats:
                                    1sec/10sec/5min/15min/1hour/12hour/1week</li>
                                <li><strong>stime</strong> – <p>Optional start time from which we want the stats. Should
                                        comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                                <li><strong>etime</strong> – <p>Optional end time after which we don’t want the stats.
                                        Should comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /shards/stats/1?interval=1hour&amp;stime=2014-08-28T10:00:00Z HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;uid&quot;: &quot;1&quot;,
&quot;status&quot;: &quot;active&quot;,
&quot;node_uid&quot;: &quot;1&quot;,
&quot;role&quot;: &quot;master&quot;,,
&quot;intervals&quot;: [
{
&quot;interval&quot;: &quot;1sec&quot;,
&quot;stime&quot;: &quot;2015-05-28T08:24:13Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:24:18Z&quot;,
&quot;avg_ttl&quot;: 0.0,
&quot;blocked_clients&quot;: 0.0,
&quot;connected_clients&quot;: 9.0,
&quot;etime&quot;: &quot;2015-05-28T08:24:18Z&quot;,
&quot;evicted_objects&quot;: 0.0,
&quot;expired_objects&quot;: 0.0,
&quot;last_save_time&quot;: 1432541051.0,
&quot;used_memory&quot;: 5651440.0,
&quot;mem_size_lua&quot;: 35840.0,
&quot;used_memory_peak&quot;: 5888264.0,
&quot;used_memory_rss&quot;: 5888264.0,
&quot;no_of_expires&quot;: 0.0,
&quot;no_of_keys&quot;: 0.0,
&quot;pubsub_channels&quot;: 0.0,
&quot;pubsub_patterns&quot;: 0.0,
&quot;rdb_changes_since_last_save&quot;: 0.0,
&quot;read_hits&quot;: 0.0,
&quot;read_misses&quot;: 0.0,
&quot;stime&quot;: &quot;2015-05-28T08:24:13Z&quot;,
&quot;sync_full&quot;: 0.0,
&quot;sync_partial_err&quot;: 0.0,
&quot;sync_partial_ok&quot;: 0.0,
&quot;total_req&quot;: 0.0,
&quot;write_hits&quot;: 0.0,
&quot;write_misses&quot;: 0.0
},
{
interval&quot;: &quot;1sec&quot;,
&quot;stime&quot;: &quot;2015-05-28T08:24:18Z&quot;,,
&quot;etime&quot;: &quot;2015-05-28T08:24:23Z&quot;,

// additional fields...
}
]
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – shard does not exist</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – shard isn’t currently active</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_shard_stats</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-shards-stats">
            <code>GET </code><code>/v1/shards/stats</code></dt>
        <dd>
            <p>Get stats for all shards.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>parent_uid</strong> – Optional return only shard from the given BDB ID.</li>
                                <li><strong>interval</strong> – Optional time interval for which we want stats:
                                    1sec/10sec/5min/15min/1hour/12hour/1week</li>
                                <li><strong>stime</strong> – <p>Optional start time from which we want the stats. Should
                                        comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                                <li><strong>etime</strong> – <p>Optional end time after which we don’t want the stats.
                                        Should comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                                <li><strong>metric</strong> – Optional comma separated list of metric names for which we
                                    want statistics (default is all).</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /shards/stats?interval=1hour&amp;stime=2014-08-28T10:00:00Z HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

[
{
&quot;status&quot;: &quot;active&quot;,
&quot;uid&quot;: &quot;1&quot;,
&quot;node_uid&quot;: &quot;1&quot;,
&quot;assigned_slots&quot;: &quot;0-8191&quot;,
&quot;intervals&quot;: [
{
&quot;interval&quot;: &quot;1sec&quot;,
&quot;stime&quot;: &quot;2015-05-28T08:27:35Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:27:40Z&quot;,
&quot;used_memory_peak&quot;: 5888264.0,
&quot;used_memory_rss&quot;: 5888264.0,
&quot;read_hits&quot;: 0.0,
&quot;pubsub_patterns&quot;: 0.0,
&quot;no_of_keys&quot;: 0.0,
&quot;mem_size_lua&quot;: 35840.0,
&quot;last_save_time&quot;: 1432541051.0,
&quot;sync_partial_ok&quot;: 0.0,
&quot;connected_clients&quot;: 9.0,
&quot;avg_ttl&quot;: 0.0,
&quot;write_misses&quot;: 0.0,
&quot;used_memory&quot;: 5651440.0,
&quot;sync_full&quot;: 0.0,
&quot;expired_objects&quot;: 0.0,
&quot;total_req&quot;: 0.0,
&quot;blocked_clients&quot;: 0.0,
&quot;pubsub_channels&quot;: 0.0,
&quot;evicted_objects&quot;: 0.0,
&quot;no_of_expires&quot;: 0.0,
&quot;interval&quot;: &quot;1sec&quot;,
&quot;write_hits&quot;: 0.0,
&quot;read_misses&quot;: 0.0,
&quot;sync_partial_err&quot;: 0.0,
&quot;rdb_changes_since_last_save&quot;: 0.0
},
{
&quot;interval&quot;: &quot;1sec&quot;,
&quot;stime&quot;: &quot;2015-05-28T08:27:40Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:27:45Z&quot;,
// additional fields...
}
]
},
{
&quot;uid&quot;: &quot;2&quot;,
&quot;status&quot;: &quot;active&quot;,
&quot;node_uid&quot;: &quot;1&quot;,
&quot;assigned_slots&quot;: &quot;8192-16383&quot;
&quot;intervals&quot;: [
{
&quot;interval&quot;: &quot;1sec&quot;,
&quot;stime&quot;: &quot;2015-05-28T08:27:35Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:27:40Z&quot;,,
// additional fields...
},
{
&quot;interval&quot;: &quot;1sec&quot;,
&quot;stime&quot;: &quot;2015-05-28T08:27:40Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:27:45Z&quot;,
// additional fields...
}
]
}
]
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – no shards exist</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_all_shard_stats</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-nodes-stats-(int-uid)">
            <code>GET </code><code>/v1/nodes/stats/</code>(<em>int: </em><em>uid</em>)</dt>
        <dd>
            <p>Get stats for node.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the node requested.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>interval</strong> – Optional time interval for which we want stats:
                                    1sec/10sec/5min/15min/1hour/12hour/1week</li>
                                <li><strong>stime</strong> – <p>Optional start time from which we want the stats. Should
                                        comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                                <li><strong>etime</strong> – <p>Optional end time after which we don’t want the stats.
                                        Should comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /nodes/stats/1?interval=1hour&amp;stime=2014-08-28T10:00:00Z HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;uid&quot;: &quot;1&quot;,
&quot;intervals&quot;: [
{
&quot;interval&quot;: &quot;1sec&quot;,
&quot;stime&quot;: &quot;2015-05-28T08:40:11Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:40:12Z&quot;,
&quot;conns&quot;: 0.0,
&quot;cpu_idle&quot;: 0.5499999999883585,
&quot;cpu_system&quot;: 0.03499999999985448,
&quot;cpu_user&quot;: 0.38000000000101863,
&quot;egress_bytes&quot;: 0.0,
&quot;ephemeral_storage_avail&quot;: 2929315840.0,
&quot;ephemeral_storage_free&quot;: 3977830400.0,
&quot;free_memory&quot;: 893485056.0,
&quot;ingress_bytes&quot;: 0.0,
&quot;persistent_storage_avail&quot;: 2929315840.0,
&quot;persistent_storage_free&quot;: 3977830400.0,
&quot;total_req&quot;: 0.0.
},
{
&quot;interval&quot;: &quot;1sec&quot;,
&quot;stime&quot;: &quot;2015-05-28T08:40:12Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:40:13Z&quot;,
&quot;cpu_idle&quot;: 1.2,
// additional fields...
}
]
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – node does not exist</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – node isn’t currently active</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.4">503
                                        Service
                                        Unavailable</a> – node is in recovery state</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_node_stats</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-nodes-stats">
            <code>GET </code><code>/v1/nodes/stats</code></dt>
        <dd>
            <p>Get stats for all nodes.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>interval</strong> – Optional time interval for which we want stats:
                                    1sec/10sec/5min/15min/1hour/12hour/1week</li>
                                <li><strong>stime</strong> – <p>Optional start time from which we want the stats. Should
                                        comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                                <li><strong>etime</strong> – <p>Optional end time after which we don’t want the stats.
                                        Should comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /nodes/stats?interval=1hour&amp;stime=2014-08-28T10:00:00Z HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

[
{
&quot;uid&quot;: &quot;1&quot;,
&quot;intervals&quot;: [
{
&quot;interval&quot;: &quot;1sec&quot;,
&quot;stime&quot;: &quot;2015-05-28T08:40:11Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:40:12Z&quot;,
&quot;conns&quot;: 0.0,
&quot;cpu_idle&quot;: 0.5499999999883585,
&quot;cpu_system&quot;: 0.03499999999985448,
&quot;cpu_user&quot;: 0.38000000000101863,
&quot;egress_bytes&quot;: 0.0,
&quot;ephemeral_storage_avail&quot;: 2929315840.0,
&quot;ephemeral_storage_free&quot;: 3977830400.0,
&quot;free_memory&quot;: 893485056.0,
&quot;ingress_bytes&quot;: 0.0,
&quot;persistent_storage_avail&quot;: 2929315840.0,
&quot;persistent_storage_free&quot;: 3977830400.0,
&quot;total_req&quot;: 0.0.
},
{
&quot;interval&quot;: &quot;1sec&quot;,
&quot;stime&quot;: &quot;2015-05-28T08:40:12Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:40:13Z&quot;,
&quot;cpu_idle&quot;: 1.2,
// additional fields...
}
]
},
{
&quot;uid&quot;: &quot;2&quot;,
&quot;intervals&quot;: [
{
&quot;interval&quot;: &quot;1sec&quot;,
&quot;stime&quot;: &quot;2015-05-28T08:40:11Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:40:12Z&quot;,
&quot;conns&quot;: 0.0,
&quot;cpu_idle&quot;: 0.5499999999883585,
&quot;cpu_system&quot;: 0.03499999999985448,
&quot;cpu_user&quot;: 0.38000000000101863,
&quot;egress_bytes&quot;: 0.0,
&quot;ephemeral_storage_avail&quot;: 2929315840.0,
&quot;ephemeral_storage_free&quot;: 3977830400.0,
&quot;free_memory&quot;: 893485056.0,
&quot;ingress_bytes&quot;: 0.0,
&quot;persistent_storage_avail&quot;: 2929315840.0,
&quot;persistent_storage_free&quot;: 3977830400.0,
&quot;total_req&quot;: 0.0.
},
{
&quot;interval&quot;: &quot;1sec&quot;,
&quot;stime&quot;: &quot;2015-05-28T08:40:12Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:40:13Z&quot;,
&quot;cpu_idle&quot;: 1.2,
// additional fields...
}
]
}
]
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – no nodes exist</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_all_nodes_stats</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-cluster-stats">
            <code>GET </code><code>/v1/cluster/stats</code></dt>
        <dd>
            <p>Get cluster stats.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>interval</strong> – Optional time interval for which we want stats:
                                    1sec/10sec/5min/15min/1hour/12hour/1week</li>
                                <li><strong>stime</strong> – <p>Optional start time from which we want the stats. Should
                                        comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format.</p>
                                </li>
                                <li><strong>etime</strong> – <p>Optional end time after which we don’t want the stats.
                                        Should comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /cluster/stats/1?interval=1hour&amp;stime=2014-08-28T10:00:00Z HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;intervals&quot;: [
{
&quot;interval&quot;: &quot;1hour&quot;,
&quot;stime&quot;: &quot;2015-05-27T12:00:00Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T12:59:59Z&quot;,
&quot;conns&quot;: 0.0,
&quot;cpu_idle&quot;: 0.8533959401503577,
&quot;cpu_system&quot;: 0.01602159448549579,
&quot;cpu_user&quot;: 0.08721123782294203,
&quot;egress_bytes&quot;: 1111.2184745131947,
&quot;ephemeral_storage_avail&quot;: 3406676307.1449075,
&quot;ephemeral_storage_free&quot;: 4455091440.360014,
&quot;free_memory&quot;: 2745470765.673594,
&quot;ingress_bytes&quot;: 220.84083194769272,
&quot;interval&quot;: &quot;1week&quot;,
&quot;persistent_storage_avail&quot;: 3406676307.1533995,
&quot;persistent_storage_free&quot;: 4455091440.088265,
&quot;total_req&quot;: 0.0
},
{
&quot;interval&quot;: &quot;1hour&quot;,
&quot;stime&quot;: &quot;2015-05-27T13:00:00Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T13:59:59Z&quot;,
// additional fields...
}
]
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.1">500
                                        Internal
                                        Server Error</a> – Internal Server Error</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_cluster_stats</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-bootstrap">
            <code>GET </code><code>/v1/bootstrap</code></dt>
        <dd>
            <p>Get the local node’s bootstrap status.</p>
            <p>This request is accepted as soon the cluster software is installed, and
                before the node is part of an active cluster.</p>
            <p>Once the node is part of an active cluster autentication is required.</p>
            <p>The JSON response object contains two other objects: <cite>bootstrap_status</cite>
                which is described below, and <cite>local_node_info</cite> which is a subset of a
                node object that provides information about the node configuration.</p>
            <p id="bootstrap-status">The <cite>bootstrap_status</cite> object contains the following fields:</p>
            <table>
                <colgroup>
                    <col width="25%" />
                    <col width="75%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Field</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td><cite>state</cite></td>
                        <td>Current bootstrap state.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td><cite>idle</cite>: No bootstrapping started.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td><cite>initiated</cite>: Bootstrap request received.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td><cite>creating_cluster</cite>: In the process of creating a new
                            cluster.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td><cite>joining_cluster</cite>: In the process of joining an
                            existing cluster.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td><cite>error</cite>: The last bootstrap action failed.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td><cite>completed</cite>: The last bootstrap action completed
                            successfully.</td>
                    </tr>
                    <tr>
                        <td><cite>start_time</cite></td>
                        <td>Bootstrap process start time</td>
                    </tr>
                    <tr>
                        <td><cite>end_time</cite></td>
                        <td>Bootstrap process end time</td>
                    </tr>
                    <tr>
                        <td><cite>error_code</cite></td>
                        <td>If <cite>state</cite> is <cite>error</cite>, this is an error code that
                            describes the type of error encountered.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td><cite>config_error</cite>: An error related to the bootstrap
                            configuration provided (e.g. bad JSON).</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td><cite>connect_error</cite>: Failed to connect to cluster (e.g.
                            FQDN DNS could not resolve, no/wrong node IP
                            provided, etc.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td><cite>access_denied</cite>: Invalid credentials supplied.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td><cite>invalid_license</cite>: The license string provided is
                            invalid. Additional info can be fetched from the
                            <cite>error_details</cite> object, which includes the
                            violation code in case the license is valid but
                            it terms are violated.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td><cite>repair_required</cite>: Cluster is in degraded mode and
                            can only accept replacement nodes. When this
                            happens, <cite>error_details</cite> contains two fields:
                            <cite>failed_nodes</cite> and ‘replace_candidate’.
                            The <cite>failed_nodes</cite> field is an array of objects,
                            each describing a failed node with at least a <cite>uid</cite>
                            field and an optional <cite>rack_id</cite>.
                            <cite>replace_candidate</cite> is the uid of the node most
                            suitable for replacement.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>‘insufficient_node_memory’: An attempt to replace a
                            dead node fails because the replaced node does not
                            have enough memory. When this happens,
                            <cite>error_details</cite> contains a <cite>required_memory</cite> field
                            which indicates the node memory requirement.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>‘insufficient_node_flash’: An attempt to replace a
                            dead node fails because the replaced node does not
                            have enough flash. When this happens,
                            <cite>error_details</cite> contains a <cite>required_flash</cite> field
                            which indicates the node flash requirement.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>‘time_not_sync’: An attempt to join a node with
                            system time not synchronized with the rest of the
                            cluster.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>‘rack_id_required’: An attempt to join a node with
                            no rack_id in a rack-aware cluster. In addition,
                            a ‘current_rack_ids’ field will include an array of
                            currently used rack ids.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>‘socket_directory_mismatch’: An attempt to join a
                            node with a socket directory setting that differs
                            from the cluster</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>‘node_config_mismatch’: An attempt to join a node
                            with a configuration setting (e.g. confdir, osuser,
                            installdir) that differs from the cluster</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td><cite>path_error</cite>: A needed path does not exist or is
                            not accessable.</td>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td><cite>internal_error</cite>: A different, unspecified internal
                            error was encountered.</td>
                    </tr>
                    <tr>
                        <td><cite>error_details</cite></td>
                        <td>An error-specific object that may contain additional
                            information about the error. A common field in use
                            is <cite>message</cite> which provides a more verbose error
                            message.</td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong></p>
            <div>
                <div>
                    <pre>GET /bootstrap HTTP/1.1
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;bootstrap_status&quot;: {
&quot;start_time&quot;: &quot;2014-08-29T11:19:49Z&quot;,
&quot;end_time&quot;: &quot;2014-08-29T11:19:49Z&quot;,
&quot;state&quot;: &quot;completed&quot;
},
&quot;local_node_info&quot;: {
&quot;uid&quot;: 3,
&quot;software_version&quot;: &quot;0.90.0-1&quot;,
&quot;cores&quot;: 2,
&quot;ephemeral_storage_path&quot;: &quot;/var/opt/redislabs/tmp&quot;,
&quot;ephemeral_storage_size&quot;: 1018889.8304,
&quot;os_version&quot;: &quot;Ubuntu 14.04 LTS&quot;,
&quot;persistent_storage_path&quot;: &quot;/var/opt/redislabs/persist/redis&quot;,
&quot;persistent_storage_size&quot;: 1018889.8304,
&quot;total_memory&quot;: 24137,
&quot;uptime&quot;: 50278,
&quot;available_addrs&quot;: [{
                        &#39;address&#39;: &#39;172.16.50.122&#39;,
                        &#39;format&#39;: &#39;ipv4&#39;,
                        &#39;if_name&#39;: &#39;eth0&#39;,
                        &#39;private&#39;: True
                    },
                    {
                        &#39;address&#39;: &#39;10.0.3.1&#39;,
                        &#39;format&#39;: &#39;ipv4&#39;,
                        &#39;if_name&#39;: &#39;lxcbr0&#39;,
                        &#39;private&#39;: True
                    },
                    {
                        &#39;address&#39;: &#39;172.17.0.1&#39;,
                        &#39;format&#39;: &#39;ipv4&#39;,
                        &#39;if_name&#39;: &#39;docker0&#39;,
                        &#39;private&#39;: True
                    },
                  {
                        &#39;address&#39;: &#39;2001:db8:0:f101::1&#39;,
                        &#39;format&#39;: &#39;ipv6&#39;,
                        &#39;if_name&#39;: &#39;eth0&#39;,
                        &#39;private&#39;: False
                  }]
}
}
</pre>
                </div>
            </div>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-bootstrap-(action)">
            <code>POST </code><code>/v1/bootstrap/</code>(<em>action</em>)</dt>
        <dd>
            <p>Initiate bootstrapping.</p>
            <p>The request must contain a bootstrap configuration JSON object, as
                described in <a href="python/node.html#node.Bootstrap"
                    title="node.Bootstrap"><code
                       >node.Bootstrap</code></a>
                or a minimal subset.</p>
            <p>Bootstrapping is permitted only when the current bootstrap state is
                <cite>idle</cite> or <cite>error</cite> (in which case the process will restart with the
                new configuration).</p>
            <p>This request is asynchronous - once the request has been accepted, the
                caller is expected to poll bootstrap status waiting for it to complete</p>
            <p><strong>1. Example request- Join Cluster</strong>:</p>
            <div>
                <div>
                    <pre>POST /bootstrap/join_cluster HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json

{
&quot;action&quot;: &quot;join_cluster&quot;,
&quot;cluster&quot;: {
&quot;nodes&quot;:[ &quot;1.1.1.1&quot;, &quot;2.2.2.2&quot; ]
},
&quot;node&quot;: {
&quot;paths&quot;: {
&quot;persistent_path&quot;: &quot;/path/to/persistent/storage&quot;,
&quot;ephemeral_path&quot;: &quot;/path/to/ephemeral/storage&quot;
&quot;bigstore_path&quot;: &quot;/path/to/bigstore/storage&quot;
},
&quot;bigstore_driver&quot;: &quot;rocksdb&quot;
&quot;identity&quot;: {
&quot;addr&quot;:&quot;1.2.3.4&quot;
&quot;external_addr&quot;:[&quot;2001:0db8:85a3:0000:0000:8a2e:0370:7334&quot;, &quot;3.4.5.6&quot;]
}
},
&quot;credentials&quot;: {
&quot;username&quot;: &quot;my_username&quot;,
&quot;password&quot;: &quot;my_password&quot;
}
}
</pre>
                </div>
            </div>
            <p><strong>2. Example request- Create Cluster</strong>:</p>
            <div>
                <div>
                    <pre>POST /bootstrap/create_cluster HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json

{
&quot;action&quot;: &quot;create_cluster&quot;,
&quot;cluster&quot;: {
&quot;nodes&quot;: [],
&quot;name&quot;: &quot;my.cluster&quot;
},
&quot;node&quot;: {
&quot;paths&quot;: {
&quot;persistent_path&quot;: &quot;/path/to/persistent/storage&quot;,
&quot;ephemeral_path&quot;: &quot;/path/to/ephemeral/storage&quot;
&quot;bigstore_path&quot;: &quot;/path/to/bigredis/storage&quot;
},
&quot;identity&quot;: {
&quot;addr&quot;:&quot;1.2.3.4&quot;
&quot;external_addr&quot;:[&quot;2001:0db8:85a3:0000:0000:8a2e:0370:7334&quot;, &quot;3.4.5.6&quot;]
},
&quot;bigstore_driver&quot;: &quot;rocksdb&quot;
},
&quot;license&quot;: &quot;&quot;,
&quot;credentials&quot;: {
&quot;username&quot;: &quot;my_username&quot;,
&quot;password&quot;: &quot;my_password&quot;
}
}
</pre>
                </div>
            </div>
            <p>See <a href="#id1">Object
                        Attributes</a> for more details on the Bootstrap object properties.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    request received and processing begins.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10">409
                                        Conflict</a> – bootstrap already in progress (check state)&gt;</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-cluster-actions-(action)">
            <code>POST </code><code>/v1/cluster/actions/</code>(<em>action</em>)</dt>
        <dd>
            <p>Initiate a cluster-wide action.</p>
            <p>The API allows only a single instance of any action type to be invoked
                at the same time, and violations of this requirement will result with a
                <cite>409 CONFLICT</cite> response.</p>
            <p>The caller is expected to query and process the results of the previously
                executed instance of the same action, which will be removed as soon as the
                new one is submitted.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>action</strong> – The name of the action required.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>The body content may provide additional action details. Currently it is
                not used.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error, action was initiated.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1">400 Bad
                                        Request</a> – bad action or content provided.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10">409
                                        Conflict</a> – a conflicting action is already in progress.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>start_cluster_action</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-cluster-actions-(action)">
            <code>GET </code><code>/v1/cluster/actions/</code>(<em>action</em>)</dt>
        <dd></dd>
    </dl>

    <dl>
        <dt id="get--v1-cluster-actions">
            <code>GET </code><code>/v1/cluster/actions</code></dt>
        <dd>
            <p>Get the status of a currently executing, queued or completed cluster action.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>action</strong> – The action to check.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>If no <cite>action</cite> is specified, a JSON array of actions is returned, contained
                in an object such as this:</p>
            <div>
                <div>
                    <pre>{
&quot;actions&quot;: [
{
  &quot;name&quot;: &quot;action_name&quot;,
  &quot;status&quot;: &quot;queued&quot;,
  &quot;progress&quot;: 0.0
}
]
}
</pre>
                </div>
            </div>
            <p>The response body for the action is a JSON object, as
                described in <a href="#rest-api-actions">REST
                        API actions overview</a>.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error, response provides about an on-going action.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – action does not exist (i.e. not currently running and
                                    no available status of last run).</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_status_of_cluster_action</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="delete--v1-cluster-actions-(action)">
            <code>DELETE </code><code>/v1/cluster/actions/</code>(<em>action</em>)</dt>
        <dd>
            <p>Cancel a queued or executing cluster action, or remove the status of a
                previously executed and completed action.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>action</strong> – The name of the action to cancel, currently no actions are
                                    supported.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    action will be cancelled when possible.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – action unknown or not currently running.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>cancel_cluster_action</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-logs">
            <code>GET </code><code>/v1/logs</code></dt>
        <dd>
            <p>Get cluster events log.
                Returns an array of events.</p>
            <p id="event-object">The following table describes the event object:</p>
            <table>
                <colgroup>
                    <col width="25%" />
                    <col width="75%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Field</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td><cite>time</cite></td>
                        <td>Timestamp when event happened.</td>
                    </tr>
                    <tr>
                        <td><cite>type</cite></td>
                        <td>Event type. Based on this additional fields may be
                            available.</td>
                    </tr>
                    <tr>
                        <td>additional fields</td>
                        <td>Additional fields may be present based on event type.</td>
                    </tr>
                </tbody>
            </table>
            <p>Each event contains a timestamp, and event code. Based
                on the code the event object may contain additional fields describing the event.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>stime</strong> – Optional start time before which we don’t want events.</li>
                                <li><strong>etime</strong> – Optional end time after which we don’t want events.</li>
                                <li><strong>order</strong> – desc/asc - get events in descending or ascending order.
                                    Defaults to asc.</li>
                                <li><strong>limit</strong> – Optional maximum number of events to return.</li>
                                <li><strong>offset</strong> – Optional. Skip offset events before returning first one
                                    (useful for pagination).</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /logs?order=desc HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

[
{
&quot;time&quot;: &quot;2014-08-29T11:19:49Z&quot;,
&quot;type&quot;: &quot;bdb_name_updated&quot;,
&quot;severity&quot;: &quot;INFO&quot;,
&quot;bdb_uid&quot;: &quot;1&quot;
&quot;old_val&quot;: &quot;test&quot;,
&quot;new_val&quot;: &quot;test123&quot;
},
{
&quot;time&quot;: &quot;2014-08-29T11:18:48Z&quot;,
&quot;type&quot;: &quot;cluster_bdb_created&quot;,
&quot;severity&quot;: &quot;INFO&quot;,
&quot;bdb_uid&quot;: &quot;1&quot;,
&quot;bdb_name&quot;: &quot;test&quot;
},
{
&quot;time&quot;: &quot;2014-08-29T11:17:49Z&quot;,
&quot;type&quot;: &quot;cluster_node_joined&quot;,
&quot;severity&quot;: &quot;INFO&quot;,
&quot;node_uid&quot;: 2
}
]
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_logged_events</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-jsonschema">
            <code>GET </code><code>/v1/jsonschema</code></dt>
        <dd>
            <p>Get the jsonschema of RLEC objects.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>object</strong> – Optional. The RLEC object name: ‘cluster’, ‘node’, ‘bdb’
                                    etc.
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /jsonschema?object=bdb HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;type&quot;: &quot;object&quot;,
&quot;description&quot;: &quot;An API object that represents a managed database in the cluster.&quot;,
&quot;properties&quot;: {
    ....

}

....
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    success.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – Invalid object.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="put--v1-bdbs-(int-uid)-actions-import_reset_status">
            <code>PUT </code><code>/v1/bdbs/</code>(<em>int:
            </em><em>uid</em>)<code>/actions/import_reset_status</code></dt>
        <dd>
            <p>Reset database current import status (import_status) to idle if not in progress.
                As well clear exiting import_failure_reason if exits</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the database</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>PUT /bdbs/1/actions/import_reset_status HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK
Content-Length: 0
</pre>
                </div>
            </div>
            <p>The above request resets import_status to idle value if not in progress and clear
                failure reason message if exist from import_failure_reason.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – the
                                    request is accepted and is being processed.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – attempting to perform a action on a non-existing database.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – not all the modules loaded to the database support
                                    ‘backup_restore’
                                    capability</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10">409
                                        Conflict</a> – database is currently busy with another action. In this
                                    context, this is a temporary condition and the request should be
                                    re-attempted later.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>reset_bdb_current_import_status</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-nodes-(node_uid)-actions-(action)">
            <code>POST </code><code>/v1/nodes/</code>(<em>node_uid</em>)<code>/actions/</code>(<em>action</em>)
        </dt>
        <dd>
            <p>Initiate a node action.</p>
            <p>The API allows only a single instance of any action type to be invoked
                at the same time, and violations of this requirement will result with a
                <cite>409 CONFLICT</cite> response.</p>
            <p>The caller is expected to query and process the results of the previously
                executed instance of the same action, which will be removed as soon as the
                new one is submitted.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>action</strong> – <p>The name of the action required. Currently supported
                                        actions are:</p>
                                    <dl>
                                        <dt><cite>remove</cite>: removes the node from the cluster after migrating</dt>
                                        <dd>all bound resources to other nodes.</dd>
                                    </dl>
                                    <p><cite>maintenance_on</cite>: creates a snapshot of the node, migrate shards to
                                        other
                                        nodes
                                        and makes sure it can undergo maintenance.</p>
                                    <blockquote>
                                        <div>If there aren’t enough resources to migrate shards out of the maintained
                                            node,
                                            set <cite>“keep_slave_shards”: true</cite> to keep the slave shards in place
                                            but
                                            demote any master shards.</div>
                                    </blockquote>
                                    <dl>
                                        <dt><cite>maintenance_off</cite>: restores node to the state it was before
                                            maintenance
                                            started.</dt>
                                        <dd>By default it uses the latest node snapshot. Using <cite>“snapshot_name”:
                                                “…”</cite>
                                            can be used to restore from a different snapshot.
                                            To avoid restoring shards at the node, use <cite>“skip_shards_restore”:
                                                true</cite>.
                                        </dd>
                                    </dl>
                                    <p><cite>enslave_node</cite>: enslave all bound resources.</p>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>The body content may provide additional action details. Currently it is
                not used.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>start_node_action</td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-nodes-(node_uid)-actions-(action)">
            <code>GET </code><code>/v1/nodes/</code>(<em>node_uid</em>)<code>/actions/</code>(<em>action</em>)
        </dt>
        <dd></dd>
    </dl>

    <dl>
        <dt id="get--v1-nodes-(node_uid)-actions">
            <code>GET </code><code>/v1/nodes/</code>(<em>node_uid</em>)<code>/actions</code>
        </dt>
        <dd>
            <p id="nodes-node-uid-actions">Get the status of a currently executing, queued or completed action, or
                all
                actions, on a specific node.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>action</strong> – The action to check.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>If no <cite>action</cite> is specified, an array with all actions for the specified
                node is returned, encapsualted in a JSON object as follows:</p>
            <div>
                <div>
                    <pre>{
&quot;actions&quot;: [
{
  &quot;name&quot;: &quot;remove_node&quot;,
  &quot;node_uid&quot;: &quot;1&quot;,
  &quot;status&quot;: &quot;running&quot;,
  &quot;progress&quot;: 10
}
]
}
</pre>
                </div>
            </div>
            <p>In this form, if no actions are available the response will include an
                empty array.</p>
            <p>See <a href="#rest-api-actions">REST API
                        actions overview</a> for more details on
                action status and error codes.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error, response provides about an on-going action.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – action does not exist (i.e. not currently running and
                                    no available status of last run).</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_status_of_node_action</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-nodes-actions">
            <code>GET </code><code>/v1/nodes/actions</code></dt>
        <dd>
            <p>Get the status of all currently executing, pending or completed actions on
                all nodes.</p>
            <p>See <a href="#nodes-node-uid-actions">/nodes/(node_uid)/actions</a> for
                reference.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error, response provides about an on-going action.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_status_of_all_node_actions</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="delete--v1-nodes-(node_uid)-actions-(action)">
            <code>DELETE </code><code>/v1/nodes/</code>(<em>node_uid</em>)<code>/actions/</code>(<em>action</em>)
        </dt>
        <dd>
            <p>Cancel a queued or executing node action, or remove the status of a
                previously executed and completed action.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>action</strong> – The name of the action to cancel.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    action will be cancelled when possible.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – action unknown or not currently running.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>cancel_node_action</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-license">
            <code>GET </code><code>/v1/license</code></dt>
        <dd>
            <p>Returns the license details, including license string, expiration, and supported features.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /license HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;license&quot;: &quot;----- LICENSE START -----\ndi+iK...KniI9\n----- LICENSE END -----\n&quot;,
&quot;expired&quot;: true,
&quot;activation_date&quot;:&quot;2018-12-31T00:00:00Z&quot;,
&quot;expiration_date&quot;:&quot;2019-12-31T00:00:00Z&quot;
&quot;shards_limit&quot;: 300,
&quot;features&quot;: [&quot;bigstore&quot;]
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    license is returned in the response body.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – no license is installed.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_license</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="put--v1-license">
            <code>PUT </code><code>/v1/license</code></dt>
        <dd>
            <p>Install a new license string.</p>
            <p>The license is being validated on this call and if not acceptable, an
                error is immediately returned.</p>
            <p>The request must be a JSON object with a single key named “license”.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>PUT /license HTTP/1.1
Accept: application/json

{
&quot;license&quot;: &quot;----- LICENSE START -----\ndi+iK...KniI9\n----- LICENSE END -----\n&quot;
}
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    license installed successfully.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1">400 Bad
                                        Request</a> – invalid request, either bad JSON object or corrupted license was
                                    supplied.
                                </li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – license violation. A response body provides more details on the
                                    specific cause.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>install_new_license</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="put--v1-nodes-(int-uid)">
            <code>PUT </code><code>/v1/nodes/</code>(<em>int: </em><em>uid</em>)</dt>
        <dd>
            <p>Update a node object.</p>
            <p>Currently this operation supports editing the following attributes:</p>
            <p># addr</p>
            <p># external_addr</p>
            <p># recovery_path</p>
            <p># accept_servers</p>
            <p>The <cite>addr</cite> attribute can only be updated for offline nodes and an
                error will be returned otherwise.</p>
            <p>If an error status is returned, the body may contain a JSON object that
                describes the error.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>PUT /nodes/1 HTTP/1.1
Host: cluster.fqdn
Accept: application/json
Content-Type: application/json

{ &quot;addr&quot;: &quot;10.0.0.1&quot; }
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 406 UNACCEPTABLE
Content-Type: application/json

{ &quot;error_code&quot;: &quot;node_not_offline&quot;, &quot;description&quot;: &quot;Attempted to change node address while it is online&quot; }
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the updated node.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error, the request has been processed.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – update request cannot be processed.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1">400 Bad
                                        Request</a> – bad content provided.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>update_node</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-bootstrap-validate-(action)">
            <code>POST </code><code>/v1/bootstrap/validate/</code>(<em>action</em>)</dt>
        <dd>
            <p>Perform bootstrap validation.</p>
            <p>The request must contain a bootstrap configuration JSON object similar to
                the one used for actual bootstrapping.</p>
            <p>Unlike actual bootstrapping, this request blocks and immediately returns
                with a response.</p>
            <p>When an error is encountered, a <a
                    href="python/http_services.cluster_api.html#bootstrap-status">bootstrap
                        status JSON object</a> is returned.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error, validation was successful.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – validation failed, bootstrap status is returned as body.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-debuginfo-all">
            <code>GET </code><code>/v1/debuginfo/all</code></dt>
        <dd>
            <p>Fetch debuginfo from all nodes.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /debuginfo/all HTTP/1.1
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK
Content-Type: application/x-gzip
Content-Length: 653350
Content-Disposition: attachment; filename=debuginfo.tar.gz
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    success.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.1">500
                                        Internal
                                        Server Error</a> – failed to get debuginfo.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_debugging_info</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-debuginfo-all-bdb-(int-bdb_uid)">
            <code>GET </code><code>/v1/debuginfo/all/bdb/</code>(<em>int:
            </em><em>bdb_uid</em>)</dt>
        <dd>
            <p>Fetch debuginfo from all nodes that are relevent to given bdb uid.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /debuginfo/all/bdb/1 HTTP/1.1
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK
Content-Type: application/x-gzip
Content-Length: 653350
Content-Disposition: attachment; filename=debuginfo.tar.gz
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    success.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.1">500
                                        Internal
                                        Server Error</a> – failed to get debuginfo.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_debugging_info</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-cluster-stats-last">
            <code>GET </code><code>/v1/cluster/stats/last</code>
        </dt>
        <dd>
            <p>Get the last cluster stat.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>interval</strong> – Optional time interval for which we want stats:
                                    1sec/10sec/5min/15min/1hour/12hour/1week.
                                    Default: 1sec.</li>
                                <li><strong>stime</strong> – <p>Optional start time from which we want the stats. Should
                                        comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                                <li><strong>etime</strong> – <p>Optional end time after which we don’t want the stats.
                                        Should comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /cluster/stats/1?interval=1sec&amp;stime=2015-10-14T06:44:00Z HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;conns&quot;: 0.0,
&quot;cpu_idle&quot;: 0.8424999999988358,
&quot;cpu_system&quot;: 0.01749999999992724,
&quot;cpu_user&quot;: 0.08374999999978172,
&quot;egress_bytes&quot;: 7403.0,
&quot;ephemeral_storage_avail&quot;: 151638712320.0,
&quot;ephemeral_storage_free&quot;: 162375925760.0,
&quot;etime&quot;: &quot;2015-10-14T06:44:01Z&quot;,
&quot;free_memory&quot;: 5862400000.0,
&quot;ingress_bytes&quot;: 7469.0,
&quot;interval&quot;: &quot;1sec&quot;,
&quot;persistent_storage_avail&quot;: 151638712320.0,
&quot;persistent_storage_free&quot;: 162375925760.0,
&quot;stime&quot;: &quot;2015-10-14T06:44:00Z&quot;,
&quot;total_req&quot;: 0.0
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.1">500
                                        Internal
                                        Server Error</a> – Internal Server Error</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_cluster_stats</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-shards-stats-last-(int-uid)">
            <code>GET </code><code>/v1/shards/stats/last/</code>(<em>int: </em><em>uid</em>)
        </dt>
        <dd>
            <p>Get stats for a specific shard.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the shard requested.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>interval</strong> – Optional time interval for which we want stats:
                                    1sec/10sec/5min/15min/1hour/12hour/1week.
                                    Default: 1sec.</li>
                                <li><strong>stime</strong> – <p>Optional start time from which we want the stats. Should
                                        comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                                <li><strong>etime</strong> – <p>Optional end time after which we don’t want the stats.
                                        Should comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /shards/stats/last/1?interval=1sec&amp;stime=2015-05-28T08:27:35Z HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;1&quot;: {
&quot;interval&quot;: &quot;1sec&quot;,
&quot;stime&quot;: &quot;2015-05-28T08:27:35Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:27:36Z&quot;,
&quot;used_memory_peak&quot;: 5888264.0,
&quot;used_memory_rss&quot;: 5888264.0,
&quot;read_hits&quot;: 0.0,
&quot;pubsub_patterns&quot;: 0.0,
&quot;no_of_keys&quot;: 0.0,
&quot;mem_size_lua&quot;: 35840.0,
&quot;last_save_time&quot;: 1432541051.0,
&quot;sync_partial_ok&quot;: 0.0,
&quot;connected_clients&quot;: 9.0,
&quot;avg_ttl&quot;: 0.0,
&quot;write_misses&quot;: 0.0,
&quot;used_memory&quot;: 5651440.0,
&quot;sync_full&quot;: 0.0,
&quot;expired_objects&quot;: 0.0,
&quot;total_req&quot;: 0.0,
&quot;blocked_clients&quot;: 0.0,
&quot;pubsub_channels&quot;: 0.0,
&quot;evicted_objects&quot;: 0.0,
&quot;no_of_expires&quot;: 0.0,
&quot;interval&quot;: &quot;1sec&quot;,
&quot;write_hits&quot;: 0.0,
&quot;read_misses&quot;: 0.0,
&quot;sync_partial_err&quot;: 0.0,
&quot;rdb_changes_since_last_save&quot;: 0.0
}
}

:statuscode 200: no error
:statuscode 404: shard does not exist
:statuscode 406: shard isn&#39;t currently active
:statuscode 406: shard isn&#39;t currently active

:required permissions: view_shard_stats
</pre>
                </div>
            </div>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-shards-stats-last">
            <code>GET </code><code>/v1/shards/stats/last</code></dt>
        <dd>
            <p>Get last stats for all shards.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>interval</strong> – Optional time interval for which we want stats:
                                    1sec/10sec/5min/15min/1hour/12hour/1week.
                                    Default: 1sec.</li>
                                <li><strong>stime</strong> – <p>Optional start time from which we want the stats. Should
                                        comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                                <li><strong>etime</strong> – <p>Optional end time after which we don’t want the stats.
                                        Should comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /shards/stats/last?interval=1sec&amp;stime=015-05-27T08:27:35Z HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;1&quot;: {
&quot;interval&quot;: &quot;1sec&quot;,
&quot;stime&quot;: &quot;2015-05-28T08:27:35Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:28:36Z&quot;,
&quot;used_memory_peak&quot;: 5888264.0,
&quot;used_memory_rss&quot;: 5888264.0,
&quot;read_hits&quot;: 0.0,
&quot;pubsub_patterns&quot;: 0.0,
&quot;no_of_keys&quot;: 0.0,
&quot;mem_size_lua&quot;: 35840.0,
&quot;last_save_time&quot;: 1432541051.0,
&quot;sync_partial_ok&quot;: 0.0,
&quot;connected_clients&quot;: 9.0,
&quot;avg_ttl&quot;: 0.0,
&quot;write_misses&quot;: 0.0,
&quot;used_memory&quot;: 5651440.0,
&quot;sync_full&quot;: 0.0,
&quot;expired_objects&quot;: 0.0,
&quot;total_req&quot;: 0.0,
&quot;blocked_clients&quot;: 0.0,
&quot;pubsub_channels&quot;: 0.0,
&quot;evicted_objects&quot;: 0.0,
&quot;no_of_expires&quot;: 0.0,
&quot;interval&quot;: &quot;1sec&quot;,
&quot;write_hits&quot;: 0.0,
&quot;read_misses&quot;: 0.0,
&quot;sync_partial_err&quot;: 0.0,
&quot;rdb_changes_since_last_save&quot;: 0.0
},
&quot;2&quot;: {
&quot;interval&quot;: &quot;1sec&quot;,
&quot;stime&quot;: &quot;2015-05-28T08:27:40Z&quot;,
&quot;etime&quot;: &quot;2015-05-28T08:28:45Z&quot;,
// additional fields...
}
}

:statuscode 200: no error
:statuscode 404: no shards exist

:required permissions: view_all_shard_stats
</pre>
                </div>
            </div>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-nodes-stats-last-(int-uid)">
            <code>GET </code><code>/v1/nodes/stats/last/</code>(<em>int: </em><em>uid</em>)
        </dt>
        <dd>
            <p>Get the last stats of a node.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The unique ID of the node requested.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>interval</strong> – Optional time interval for which we want stats:
                                    1sec/10sec/5min/15min/1hour/12hour/1week.
                                    Default: 1sec.</li>
                                <li><strong>stime</strong> – <p>Optional start time from which we want the stats. Should
                                        comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                                <li><strong>etime</strong> – <p>Optional end time after which we don’t want the stats.
                                        Should comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /nodes/stats/last/1?interval=1sec&amp;stime=2015-10-13T09:01:54Z HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;1&quot;: {
&quot;conns&quot;: 0.0,
&quot;cpu_idle&quot;: 0.8049999999930151,
&quot;cpu_system&quot;: 0.02750000000014552,
&quot;cpu_user&quot;: 0.12000000000080036,
&quot;cur_aof_rewrites&quot;: 0.0,
&quot;egress_bytes&quot;: 2169.0,
&quot;ephemeral_storage_avail&quot;: 75920293888.0,
&quot;ephemeral_storage_free&quot;: 81288900608.0,
&quot;etime&quot;: &quot;2015-10-13T09:01:55Z&quot;,
&quot;free_memory&quot;: 3285381120.0,
&quot;ingress_bytes&quot;: 3020.0,
&quot;interval&quot;: &quot;1sec&quot;,
&quot;persistent_storage_avail&quot;: 75920293888.0,
&quot;persistent_storage_free&quot;: 81288900608.0,
&quot;stime&quot;: &quot;2015-10-13T09:01:54Z&quot;,
&quot;total_req&quot;: 0.0
}
}

:statuscode 200: no error
:statuscode 404: node does not exist
:statuscode 406: node isn&#39;t currently active
:statuscode 503: node is in recovery state

:required permissions: view_node_stats
</pre>
                </div>
            </div>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-nodes-stats-last">
            <code>GET </code><code>/v1/nodes/stats/last</code></dt>
        <dd>
            <p>Get stats for all nodes.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Query Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>interval</strong> – Optional time interval for which we want stats:
                                    1sec/10sec/5min/15min/1hour/12hour/1week.
                                    Default: 1sec.</li>
                                <li><strong>stime</strong> – <p>Optional start time from which we want the stats. Should
                                        comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                                <li><strong>etime</strong> – <p>Optional end time after which we don’t want the stats.
                                        Should comply with the
                                        <a
                                            href="https://en.wikipedia.org/wiki/ISO_8601">ISO_8601</a>
                                        format</p>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /nodes/stats/last?interval=1sec&amp;stime=2015-10-14T06:29:43Z HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;1&quot;: {
&quot;conns&quot;: 0.0,
&quot;cpu_idle&quot;: 0.922500000015134,
&quot;cpu_system&quot;: 0.007499999999708962,
&quot;cpu_user&quot;: 0.01749999999810825,
&quot;cur_aof_rewrites&quot;: 0.0,
&quot;egress_bytes&quot;: 7887.0,
&quot;ephemeral_storage_avail&quot;: 75821363200.0,
&quot;ephemeral_storage_free&quot;: 81189969920.0,
&quot;etime&quot;: &quot;2015-10-14T06:29:44Z&quot;,
&quot;free_memory&quot;: 2956963840.0,
&quot;ingress_bytes&quot;: 4950.0,
&quot;interval&quot;: &quot;1sec&quot;,
&quot;persistent_storage_avail&quot;: 75821363200.0,
&quot;persistent_storage_free&quot;: 81189969920.0,
&quot;stime&quot;: &quot;2015-10-14T06:29:43Z&quot;,
&quot;total_req&quot;: 0.0
},
&quot;2&quot;: {
&quot;conns&quot;: 0.0,
&quot;cpu_idle&quot;: 0.922500000015134,
// additional fields...
}
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – no nodes exist</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_all_nodes_stats</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-users">
            <code>POST </code><code>/v1/users</code></dt>
        <dd>
            <p>Create a new RLEC user.</p>
            <p>The request must contain a single JSON user object, with an email and a password:</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>POST /users HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json

{
&quot;email&quot;: &quot;user@redislabs.com&quot;,
&quot;password&quot;: &quot;my-password&quot;,
&quot;name&quot;: &quot;John Doe&quot;,
&quot;email_alerts&quot;: true,
&quot;bdbs_email_alerts&quot;: [&quot;1&quot;,&quot;2&quot;],
&quot;role&quot;: &quot;db_viewer&quot;,
&quot;auth_method&quot;: &quot;regular&quot;
}
</pre>
                </div>
            </div>
            <p>Note that with RBAC-enabled clusters the role is replaced with role_uids.</p>
            <p>“email_alerts” can be configured either as:
                true - user will receive alerts for all databases configured in “bdbs_email_alerts” or for all the
                databases if
                “bdbs_email_alerts” is not configured. “bdbs_email_alerts” cab be a list of databases uids or
                [‘all’] meaning all
                databases.
                false - user will not receive alerts for any databases
                The response includes the newly created user object.</p>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;uid&quot;: 1,
&quot;password_issue_date&quot;: &quot;2017-03-07T15:11:08Z&quot;,
&quot;email&quot;: &quot;user@redislabs.com&quot;,
&quot;name&quot;: &quot;Jane Poe&quot;,
&quot;email_alerts&quot;: true,
&quot;bdbs_email_alerts&quot;: [&quot;1&quot;,&quot;2&quot;],
&quot;role&quot;: &quot;db_viewer&quot;,
&quot;auth_method&quot;: &quot;regular&quot;
}
</pre>
                </div>
            </div>
            <p>When errors are reported, the server may return a JSON object with
                <cite>error_code</cite> and <cite>message</cite> field that provide additional information. The
                following are possible error_code values:</p>
            <table>
                <colgroup>
                    <col width="33%" />
                    <col width="68%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>password_not_complex</td>
                        <td>The given password is not complex enough (Only work
                            when the password_complexity feature is enabled).</td>
                    </tr>
                    <tr>
                        <td>email_already_exists</td>
                        <td>The given email is already taken.</td>
                    </tr>
                    <tr>
                        <td>name_already_exists</td>
                        <td>The given name is already taken.</td>
                    </tr>
                </tbody>
            </table>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    success, user is created.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1">400 Bad
                                        Request</a> – bad or missing configuration parameters.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10">409
                                        Conflict</a> – user with the same email already exists.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>create_new_user</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="put--v1-users-(int-uid)">
            <code>PUT </code><code>/v1/users/</code>(<em>int: </em><em>uid</em>)</dt>
        <dd>
            <p>Update a RLEC user configuration.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The RLEC user unique ID.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>PUT /users/1 HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json

{
&quot;name&quot;: &quot;Jane Poe&quot;,
&quot;email_alerts&quot;: false
}
</pre>
                </div>
            </div>
            <p>The response includes the updated user object.</p>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;uid&quot;: 1,
&quot;password_issue_date&quot;: &quot;2017-03-07T15:11:08Z&quot;,
&quot;email&quot;: &quot;user@redislabs.com&quot;,
&quot;name&quot;: &quot;Jane Poe&quot;,
&quot;email_alerts&quot;: false,
&quot;role&quot;: &quot;db_viewer&quot;,
&quot;auth_method&quot;: &quot;regular&quot;
}
</pre>
                </div>
            </div>
            <p>Note that with RBAC-enabled clusters the role is replaced with role_uids.</p>
            <p>When errors are reported, the server may return a JSON object with
                <cite>error_code</cite> and <cite>message</cite> field that provide additional information. The
                following are possible error_code values:</p>
            <table>
                <colgroup>
                    <col width="41%" />
                    <col width="59%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>password_not_complex</td>
                        <td>The given password is not complex enough (Only work
                            when the password_complexity feature is enabled).</td>
                    </tr>
                    <tr>
                        <td>new_password_same_as_current</td>
                        <td>The given new password is identical to the
                            old password.</td>
                    </tr>
                    <tr>
                        <td>email_already_exists</td>
                        <td>The given email is already taken.</td>
                    </tr>
                    <tr>
                        <td>change_last_admin_role_not_allowed</td>
                        <td>At least one user with admin role should exist.</td>
                    </tr>
                </tbody>
            </table>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    success, the user is updated.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1">400 Bad
                                        Request</a> – bad or missing configuration parameters.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – attempting to change a non-existing user.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – the requested configuration is invalid.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>update_user (Although any user can change his own name, password or
                                alerts)</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="delete--v1-users-(int-uid)">
            <code>DELETE </code><code>/v1/users/</code>(<em>int: </em><em>uid</em>)</dt>
        <dd>
            <p>Delete a RLEC user.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The RLEC user unique ID.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>DELETE /users/1 HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p>The above request attempts to completely delete a user with unique ID 1.</p>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK
Content-Length: 0
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    success, the user is deleted.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – the request is not acceptable.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>delete_user</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-users-(int-uid)">
            <code>GET </code><code>/v1/users/</code>(<em>int: </em><em>uid</em>)</dt>
        <dd>
            <p>Get a single RLEC user.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The RLEC user unique ID.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /users/1 HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;uid&quot;: 1,
&quot;password_issue_date&quot;: &quot;2017-03-07T15:11:08Z&quot;,
&quot;role&quot;: &quot;db_viewer&quot;,
&quot;email_alerts&quot;: true,
&quot;bdbs_email_alerts&quot;: [&quot;1,&quot;2&quot;],
&quot;email&quot;: &quot;user@redislabs.com&quot;,
&quot;name&quot;: &quot;John Doe&quot;,
&quot;auth_method&quot;: &quot;regular&quot;
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    success.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4">403
                                        Forbidden</a> – operation is forbidden.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – user does not exist.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_user_info</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-users">
            <code>GET </code><code>/v1/users</code></dt>
        <dd>
            <p>Get all RLEC users.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /users HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

[
{
&quot;uid&quot;: 1,
&quot;password_issue_date&quot;: &quot;2017-03-02T09:43:34Z&quot;,
&quot;email&quot;: &quot;user@redislabs.com&quot;,
&quot;name&quot;: &quot;John Doe&quot;,
&quot;email_alerts&quot;: true,
&quot;bdbs_email_alerts&quot;: [&quot;1&quot;,&quot;2&quot;],
&quot;role&quot;: &quot;admin&quot;,
&quot;auth_method&quot;: &quot;regular&quot;
},
{
&quot;uid&quot;: 2,
&quot;password_issue_date&quot;: &quot;2017-03-02T09:43:34Z&quot;,
&quot;email&quot;: &quot;user2@redislabs.com&quot;,
&quot;name&quot;: &quot;Jane Poe&quot;,
&quot;email_alerts&quot;: true,
&quot;role&quot;: &quot;db_viewer&quot;,
&quot;auth_method&quot;: &quot;external&quot;
}
]
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_all_users_info</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-users-authorize">
            <code>POST </code><code>/v1/users/authorize</code></dt>
        <dd>
            <p>Authorize a RLEC user.</p>
            <p>In order to use the rest-api a user must be authorized using JSON Web Token (JWT)
                In order to obtain a valid token a request should be made to <strong>/users/authorize</strong> with
                a valid username and password.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">JSON Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>username</strong> – The RLEC user’s username.</li>
                                <li><strong>password</strong> – The RLEC user’s password.</li>
                                <li><strong>ttl</strong> – Time To Live - The amount of time in seconds the token will
                                    be
                                    valid</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>POST /users/authorize HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json

{
&quot;username&quot;: &quot;user@redislabs.com&quot;,
&quot;password&quot;: &quot;my_password&quot;
}
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK
Content-Type&#39;: &#39;application/json
{
&quot;access_token&quot;: &quot;eyJ5bGciOiKIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXViOjE0NjU0NzU0ODYsInVpZFI1IjEiLCJleHAiOjE0NjU0Nz30OTZ9.2xYXumd1rDoE0edFzcLElMOHsshaqQk2HUNgdsUKxMU&quot;
}
</pre>
                </div>
            </div>
            <p>When errors are reported, the server may return a JSON object with
                <cite>error_code</cite> and <cite>message</cite> field that provide additional information. The
                following are possible error_code values:</p>
            <table>
                <colgroup>
                    <col width="36%" />
                    <col width="64%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>password_expired</td>
                        <td>The password has expired and must be changed.</td>
                    </tr>
                </tbody>
            </table>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – the
                                    user is authorized.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1">400 Bad
                                        Request</a> – the request could not be understood by the server due to malformed
                                    syntax.
                                </li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2">401
                                        Unauthorized</a> – the user is unauthorized.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="put--v1-users-password">
            <code>PUT </code><code>/v1/users/password</code></dt>
        <dd>
            <p>Change the password of an existing RLEC user.</p>
            <p>The request must contain a single JSON with the username, current password and a new password:</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>POST /users HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json

{
&quot;username&quot;: &quot;johnsmith&quot;
&quot;new_password&quot;: &quot;my_old_pass&quot;,
&quot;old_password&quot;: &quot;my_new_pass&quot;,
}
</pre>
                </div>
            </div>
            <p>When errors are reported, the server may return a JSON object with
                <cite>error_code</cite> and <cite>message</cite> field that provide additional information. The
                following are possible error_code values:</p>
            <table>
                <colgroup>
                    <col width="36%" />
                    <col width="64%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>password_not_complex</td>
                        <td>The given password is not complex enough (Only work
                            when the password_complexity feature is enabled).</td>
                    </tr>
                    <tr>
                        <td>new_password_same_as_current</td>
                        <td>The given new password is identical to the
                            old password.</td>
                    </tr>
                </tbody>
            </table>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    success, user is created.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1">400 Bad
                                        Request</a> – bad or missing parameters.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2">401
                                        Unauthorized</a> – the user is unauthorized.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – attempting to change a non-existing user.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-users-refresh_jwt">
            <code>POST </code><code>/v1/users/refresh_jwt</code>
        </dt>
        <dd>
            <p>Get a new authentication token.</p>
            <p>Takes a valid token and returns a token that is issued at the time of the request.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">JSON Parameters:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <ul>
                                <li><strong>ttl</strong> – Time To Live - The amount of time in seconds the token will
                                    be
                                    valid</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>POST /users/refresh_jwt HTTP/1.1
Host: cnm.cluster.fqdn
Authorization: JWT eyJ5bGciOiKIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXViOjE0NjU0NzU0ODYsInVpZFI1IjEiLCJleHAiOjE0NjU0Nz30OTZ9.2xYXumd1rDoE0edFzcLElMOHsshaqQk2HUNgdsUKxMU
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK
Content-Type&#39;: &#39;application/json
{
&quot;access_token&quot;: &quot;eyJ5bGciOiKIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXViOjE0NjU0NzU0ODYsInVpZFI1IjEiLCJleHAiOjE0NjU0Nz30OTZ9.2xYXumd1rDoE0edFzcLElMOHsshaqQk2HUNgdsUKxMU&quot;
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – A
                                    new token is given.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2">401
                                        Unauthorized</a> – the token is invalid or password has expired.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-suffixes">
            <code>GET </code><code>/v1/suffixes</code></dt>
        <dd>
            <p>Get all DNS suffixes in the cluster.</p>
            <p>The response body contains a JSON array with all suffixes, represented
                as suffix objects.</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /suffixes HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

[
{
&quot;name&quot;: &quot;cluster.fqdn&quot;,
// additional fields...
},
{
&quot;name&quot;: &quot;internal.cluster.fqdn&quot;,
// additional fields...
}
]
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-suffix-(string-name)">
            <code>GET </code><code>/v1/suffix/</code>(<em>string: </em><em>name</em>)</dt>
        <dd>
            <p>Get single DNS suffix.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>name</strong> (<em>string</em>) – The unique Name of the suffix requested.
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /suffix/cluster.fqdn HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;name&quot;: &quot;cluster.fqdn&quot;,
// additional fields...
}
</pre>
                </div>
            </div>
            <p>See <a href="#id1">Object
                        Attributes</a> for more details on additional suffix parameters</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> – no
                                    error</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – suffix name does not exist</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-modules">
            <code>GET </code><code>/v1/modules</code></dt>
        <dd>
            <p>List available modules, i.e. modules stored within the CCS
                <strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>
</pre>
                </div>
            </div>
            <p>GET /modules HTTP/1.1
                Host: 127.0.0.1:9443
                Accept: <em>/</em></p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – attempting to get a non-existing module.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>view_cluster_modules</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-modules-(string-uid)">
            <code>GET </code><code>/v1/modules/</code>(<em>string: </em><em>uid</em>)</dt>
        <dd>
            <p>Get specific available modules, i.e. modules stored within the CCS
                <strong>Example request</strong>:</p>
            <p>curl -k -u &lt;CREDS&gt; <a
                    href="https:/">https:/</a>/&lt;HOST&gt;/modules/10682975ad54eed67391cde5bb98f93e97298008d77410ad1548e45784f3c604
                .. sourcecode:: http</p>
            <p>GET /modules HTTP/1.1
                Host: 127.0.0.1:9443
                User-Agent: curl/7.51.0
                Accept: <em>/</em></p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>view_cluster_modules</td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="delete--v1-modules-(string-uid)">
            <code>DELETE </code><code>/v1/modules/</code>(<em>string: </em><em>uid</em>)</dt>
        <dd>
            <p>Delete a Module.</p>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Parameters:</th>
                        <td>
                            <ul>
                                <li><strong>uid</strong> – The Module unique ID.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>DELETE /module/1 HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json
</pre>
                </div>
            </div>
            <p>The above request attempts to completely delete a module with unique ID.</p>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK
Content-Length: 0
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    success, the module is deleted.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – attempting to delete a non-existing module.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – the request is not acceptable.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>update_cluster</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="get--v1-cluster-module-capabilities">
            <code>GET </code><code>/v1/cluster/module-capabilities</code></dt>
        <dd>
            <p>List possible redis module capabilities
                <strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>GET /cluster/module-capabilities HTTP/1.1
Host: cnm.cluster.fqdn
Accept: */*
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;all_capabilities&quot;: [
{&quot;name&quot;: &quot;types&quot;, &quot;desc&quot;: &quot;module has its own types and not only operate on existing redis types&quot;},
{&quot;name&quot;: &quot;no_multi_key&quot;, &quot;desc&quot;: &quot;module has no methods that operate on multiple keys&quot;}
// additional capabilities...
]
}
</pre>
                </div>
            </div>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>view_cluster_modules</td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-modules">
            <code>POST </code><code>/v1/modules</code></dt>
        <dd>
            <p>Uploads a new module into the CCS</p>
            <p>The request must contain a Redis module bundled using RedisModule Packer.
                <a
                    href="https://github.com/RedisLabs/RAMP">https://github.com/RedisLabs/RAMP</a></p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>POST /modules HTTP/1.1
Host: 127.0.0.1:9443
Accept: */*
Content-Length: 865
Expect: 100-continue
Content-Type: multipart/form-data; boundary=------------------------4751ac3b332ace13
</pre>
                </div>
            </div>
            <p>When errors are reported, the server may return a JSON object with
                <cite>error_code</cite> and <cite>message</cite> field that provide additional information. The
                following are possible error_code values:</p>
            <table>
                <colgroup>
                    <col width="38%" />
                    <col width="62%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>no_module</td>
                        <td>module wasn’t provided</td>
                    </tr>
                    <tr>
                        <td>invalid_module</td>
                        <td>Module either corrupted or packaged files are wrong</td>
                    </tr>
                    <tr>
                        <td>module_exists</td>
                        <td>Module already in system</td>
                    </tr>
                    <tr>
                        <td>min_redis_pack_version</td>
                        <td>Module isn’t supported yet in this redis pack</td>
                    </tr>
                    <tr>
                        <td>unsupported_module_capabilities</td>
                        <td>The module does not support required capabilities</td>
                    </tr>
                    <tr>
                        <td>os_not_supported</td>
                        <td>This module is only supported with these
                            operating systems: &lt;list supported OSs&gt;</td>
                    </tr>
                </tbody>
            </table>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1">400 Bad
                                        Request</a> – either missing module file, or an invalid module file.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>update_cluster</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-bdbs-(string-uid)-modules-upgrade">
            <code>POST </code><code>/v1/bdbs/</code>(<em>string:
            </em><em>uid</em>)<code>/modules/upgrade</code></dt>
        <dd></dd>
    </dl>

    <dl>
        <dt id="post--v1-modules-upgrade-bdb-(string-uid)">
            <code>POST </code><code>/v1/modules/upgrade/bdb/</code>(<em>string:
            </em><em>uid</em>)</dt>
        <dd>
            <p>Upgrades module version on specific BDB</p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>POST /bdbs/1/modules/upgrade HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json

{
&quot;modules&quot;: [
{&quot;module_name&quot;: &quot;ReJson&quot;,
&quot;current_semantic_version&quot;: &quot;2.2.1&quot;,
&quot;new_module&quot;: &quot;aa3648d79bd4082d414587c42ea0b234&quot;}
],
// Optional fields to fine-tune restart and failover behavior:
&quot;preserve_roles&quot;: True,
&quot;may_discard_data&quot;: False
}
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK

{
&quot;uid&quot;: 1,
&quot;name&quot;: &quot;name of database #1&quot;,
&quot;module_id&quot;: &quot;aa3648d79bd4082d414587c42ea0b234&quot;,
&quot;module_name&quot;: &quot;ReJson&quot;,
&quot;semantic_version&quot;: &quot;2.2.2&quot;
// additional fields...
}
</pre>
                </div>
            </div>
            <p>See <a href="#id1">Object
                        Attributes</a> for more details on additional db parameters</p>
            <p>When errors are reported, the server may return a JSON object with
                <cite>error_code</cite> and <cite>message</cite> field that provide additional information. The
                following are possible error_code values:</p>
            <table>
                <colgroup>
                    <col width="36%" />
                    <col width="64%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>missing_module</td>
                        <td>Module is not present in cluster.</td>
                    </tr>
                    <tr>
                        <td>module_downgrade_unsupported</td>
                        <td>Module downgrade is not allowed.</td>
                    </tr>
                    <tr>
                        <td>redis_incompatible_version</td>
                        <td>Module min_redis_version is bigger the current redis
                            version.</td>
                    </tr>
                    <tr>
                        <td>redis_pack_incompatible_version</td>
                        <td>Module min_redis_pack_version is bigger the current
                            Redis Enterprise version.</td>
                    </tr>
                    <tr>
                        <td>unsupported_module_capabilities</td>
                        <td>New version of module does support all the
                            capabilities needed for the database configuration</td>
                    </tr>
                </tbody>
            </table>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    success, module updated on bdb.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – bdb or node not found.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1">400 Bad
                                        Request</a> – bad or missing configuration parameters.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – the requested configuration is invalid.</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>edit_bdb_module</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

    <dl>
        <dt id="post--v1-bdbs-(string-uid)-modules-config">
            <code>POST </code><code>/v1/bdbs/</code>(<em>string:
            </em><em>uid</em>)<code>/modules/config</code></dt>
        <dd></dd>
    </dl>

    <dl>
        <dt id="post--v1-modules-config-bdb-(string-uid)">
            <code>POST </code><code>/v1/modules/config/bdb/</code>(<em>string:
            </em><em>uid</em>)</dt>
        <dd>
            <p>Use module runtime configuration command (if defined) to configure new arguments for the module.
            </p>
            <p><strong>Example request</strong>:</p>
            <div>
                <div>
                    <pre>POST /bdbs/1/modules/upgrade HTTP/1.1
Host: cnm.cluster.fqdn
Accept: application/json

{
&quot;module_name&quot;: &quot;ft&quot;,
&quot;module_args&quot;: &quot;MINPREFIX 3 MAXEXPANSIONS 1000&quot;
}
</pre>
                </div>
            </div>
            <p><strong>Example response</strong>:</p>
            <div>
                <div>
                    <pre>HTTP/1.1 200 OK
Content-Length: 0
</pre>
                </div>
            </div>
            <p>When errors are reported, the server may return a JSON object with
                <cite>error_code</cite> and <cite>message</cite> field that provide additional information. The
                following are possible error_code values:</p>
            <table>
                <colgroup>
                    <col width="36%" />
                    <col width="64%" />
                </colgroup>
                <thead valign="bottom">
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody valign="top">
                    <tr>
                        <td>db_not_exist</td>
                        <td>Database with given uid doesn’t exist in cluster.</td>
                    </tr>
                    <tr>
                        <td>missing_field</td>
                        <td>“module_name” or “module_args” are not defined in request</td>
                    </tr>
                    <tr>
                        <td>invalid_schema</td>
                        <td>json object received is not a dict object</td>
                    </tr>
                    <tr>
                        <td>param_error</td>
                        <td>“module_args” parameter was not parsed properly</td>
                    </tr>
                    <tr>
                        <td>module_not_exist</td>
                        <td>Module with given “module_name” does not exist for the
                            database</td>
                    </tr>
                </tbody>
            </table>
            <table frame="void" rules="none">
                <col />
                <col />
                <tbody valign="top">
                    <tr>
                        <th>Status Codes:</th>
                        <td>
                            <ul>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1">200
                                        OK</a> –
                                    success, module updated on bdb.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">404 Not
                                        Found</a> – bdb not found.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1">400 Bad
                                        Request</a> – bad or missing configuration parameters.</li>
                                <li><a
                                        href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7">406 Not
                                        Acceptable</a> – module does not support runtime configuration of arguments.
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">Required permissions:</th>
                    </tr>
                    <tr>
                        <td>&#160;</td>
                        <td>
                            <p>edit_bdb_module</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </dd>
    </dl>

</div>
<div id="roles">
    <h2>Roles</h2>
    <p id="users-roles">Each user in the cluster has a role assigned to it, which defines the permissions the
        user holds.
        There are 5 types of roles:</p>
    <ul>
        <li><strong>Db_viewer</strong> - Can view bdbs related info.</li>
        <li><strong>Db_member</strong> - Can create and modify bdbs, and view bdbs related info.</li>
        <li><strong>Cluster_viewer</strong> - Can view cluster and bdbs related info.</li>
        <li><strong>Cluster_member</strong> - Can create and modify bdbs, and view bdbs and cluster related
            info.</li>
        <li><strong>Admin</strong> - Can modify all view and modify all elements of the cluster.</li>
    </ul>
    <span id="module-roles_doc">
    <div id="permissions-list-for-each-role">
        <h3>Permissions list for each role.</h3>
        <table>
            <colgroup>
                <col width="2%" />
                <col width="98%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Role name</th>
                    <th>Permissions</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>none</td>
                    <td>&#160;</td>
                </tr>
                <tr>
                    <td>db_member</td>
                    <td>view_all_nodes_stats, view_all_nodes_alerts, view_status_of_node_action, start_bdb_export,
                        update_crdb, view_all_bdbs_info, view_all_shard_stats, create_bdb,
                        reset_bdb_current_export_status, view_bdb_alerts, update_bdb_with_action, update_bdb_alerts,
                        view_cluster_info, view_license, view_endpoint_stats, view_redis_pass, create_crdb, delete_crdb,
                        view_all_bdbs_alerts, flush_crdb, view_all_bdb_stats, view_status_of_all_node_actions,
                        view_logged_events, reset_bdb_current_import_status, view_status_of_cluster_action,
                        view_shard_stats, purge_instance, view_bdb_info, view_node_check, migrate_shard, view_crdb,
                        view_crdb_list, reset_bdb_current_backup_status, view_node_stats, view_all_nodes_info,
                        view_node_alerts, edit_bdb_module, update_bdb, view_cluster_alerts, view_bdb_stats, delete_bdb,
                        view_cluster_modules, start_bdb_import, view_cluster_stats, view_node_info,
                        view_all_nodes_checks</td>
                </tr>
                <tr>
                    <td>admin</td>
                    <td>update_user, view_all_nodes_stats, view_all_nodes_alerts, view_status_of_node_action,
                        view_user_info, delete_user, delete_cluster_module, view_all_nodes_info, update_crdb,
                        view_all_bdbs_info, cancel_node_action, update_cluster, view_all_shard_stats, create_bdb,
                        view_all_data_permissions_info, reset_bdb_current_export_status, update_data_permissions,
                        view_bdb_alerts, update_bdb_with_action, update_bdb_alerts, view_cluster_info, view_license,
                        update_ldap_mapping, view_redis_pass, create_crdb, delete_crdb, view_all_roles_info,
                        start_cluster_action, view_all_bdbs_alerts, flush_crdb, update_node, cancel_cluster_action,
                        view_all_bdb_stats, view_all_users_info, view_status_of_all_node_actions, view_cluster_stats,
                        view_logged_events, reset_bdb_current_import_status, view_status_of_cluster_action,
                        create_ldap_mapping, start_node_action, view_shard_stats, start_bdb_import, create_new_user,
                        view_endpoint_stats, view_node_check, migrate_shard, create_role, view_crdb, view_crdb_list,
                        create_data_permissions, delete_data_permissions, reset_bdb_current_backup_status,
                        view_node_stats, view_ldap_mapping_info, view_all_ldap_mappings_info, add_cluster_module,
                        view_node_alerts, edit_bdb_module, update_bdb, view_cluster_alerts, view_role_info,
                        view_bdb_stats, delete_role, delete_bdb, delete_ldap_mapping, view_data_permissions_info,
                        update_role, view_cluster_modules, purge_instance, install_new_license, start_bdb_export,
                        view_node_info, view_bdb_info, view_all_nodes_checks</td>
                </tr>
                <tr>
                    <td>db_viewer</td>
                    <td>view_all_nodes_stats, view_all_nodes_alerts, view_status_of_node_action, view_all_bdbs_info,
                        view_all_shard_stats, view_bdb_alerts, view_cluster_info, view_license, view_all_bdbs_alerts,
                        view_node_alerts, view_status_of_all_node_actions, view_status_of_cluster_action,
                        view_shard_stats, view_bdb_info, view_node_check, view_crdb, view_crdb_list, view_node_stats,
                        view_all_nodes_info, view_all_bdb_stats, view_cluster_alerts, view_bdb_stats,
                        view_endpoint_stats, view_cluster_modules, view_cluster_stats, view_node_info,
                        view_all_nodes_checks</td>
                </tr>
                <tr>
                    <td>cluster_member</td>
                    <td>view_all_nodes_stats, view_all_nodes_alerts, view_status_of_node_action, start_bdb_export,
                        update_crdb, view_all_bdbs_info, view_all_shard_stats, create_bdb,
                        reset_bdb_current_export_status, view_bdb_alerts, update_bdb_with_action, update_bdb_alerts,
                        view_cluster_info, view_license, view_endpoint_stats, view_redis_pass, create_crdb, delete_crdb,
                        view_all_bdbs_alerts, flush_crdb, view_all_bdb_stats, view_status_of_all_node_actions,
                        view_logged_events, reset_bdb_current_import_status, view_status_of_cluster_action,
                        view_shard_stats, purge_instance, view_bdb_info, view_node_check, migrate_shard, view_crdb,
                        view_crdb_list, reset_bdb_current_backup_status, view_node_stats, view_all_nodes_info,
                        view_node_alerts, edit_bdb_module, update_bdb, view_cluster_alerts, view_bdb_stats, delete_bdb,
                        view_cluster_modules, start_bdb_import, view_cluster_stats, view_node_info,
                        view_all_nodes_checks</td>
                </tr>
                <tr>
                    <td>cluster_viewer</td>
                    <td>view_all_nodes_stats, view_all_nodes_alerts, view_status_of_node_action, view_all_bdbs_info,
                        view_all_shard_stats, view_bdb_alerts, view_cluster_info, view_license, view_all_bdbs_alerts,
                        view_node_alerts, view_status_of_all_node_actions, view_logged_events,
                        view_status_of_cluster_action, view_shard_stats, view_bdb_info, view_node_check, view_crdb,
                        view_crdb_list, view_node_stats, view_all_nodes_info, view_all_bdb_stats, view_cluster_alerts,
                        view_bdb_stats, view_endpoint_stats, view_cluster_modules, view_cluster_stats, view_node_info,
                        view_all_nodes_checks</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="roles-list-per-permission">
        <h3>Roles list per permission</h3>
        <table>
            <colgroup>
                <col width="37%" />
                <col width="63%" />
            </colgroup>
            <thead valign="bottom">
                <tr>
                    <th>Permission name</th>
                    <th>Roles</th>
                </tr>
            </thead>
            <tbody valign="top">
                <tr>
                    <td>add_cluster_module</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>cancel_cluster_action</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>cancel_node_action</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>create_bdb</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>create_crdb</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>create_data_permissions</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>create_ldap_mapping</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>create_new_user</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>create_role</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>delete_bdb</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>delete_cluster_module</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>delete_crdb</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>delete_data_permissions</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>delete_ldap_mapping</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>delete_role</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>delete_user</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>edit_bdb_module</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>flush_crdb</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>install_new_license</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>migrate_shard</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>purge_instance</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>reset_bdb_current_backup_status</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>reset_bdb_current_export_status</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>reset_bdb_current_import_status</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>start_bdb_export</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>start_bdb_import</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>start_cluster_action</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>start_node_action</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>update_bdb</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>update_bdb_alerts</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>update_bdb_with_action</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>update_cluster</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>update_crdb</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>update_data_permissions</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>update_ldap_mapping</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>update_node</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>update_role</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>update_user</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>view_all_bdb_stats</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_all_bdbs_alerts</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_all_bdbs_info</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_all_data_permissions_info</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>view_all_ldap_mappings_info</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>view_all_nodes_alerts</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_all_nodes_checks</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_all_nodes_info</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_all_nodes_stats</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_all_roles_info</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>view_all_shard_stats</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_all_users_info</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>view_bdb_alerts</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_bdb_info</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_bdb_stats</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_cluster_alerts</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_cluster_info</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_cluster_modules</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_cluster_stats</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_crdb</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_crdb_list</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_data_permissions_info</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>view_endpoint_stats</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_ldap_mapping_info</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>view_license</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_logged_events</td>
                    <td>admin, cluster_member, cluster_viewer, db_member</td>
                </tr>
                <tr>
                    <td>view_node_alerts</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_node_check</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_node_info</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_node_stats</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_redis_pass</td>
                    <td>admin, cluster_member, db_member</td>
                </tr>
                <tr>
                    <td>view_role_info</td>
                    <td>admin</td>
                </tr>
                <tr>
                    <td>view_shard_stats</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_status_of_all_node_actions</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_status_of_cluster_action</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_status_of_node_action</td>
                    <td>admin, cluster_member, cluster_viewer, db_member, db_viewer</td>
                </tr>
                <tr>
                    <td>view_user_info</td>
                    <td>admin</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>