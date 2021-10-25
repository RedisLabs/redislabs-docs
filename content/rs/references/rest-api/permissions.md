---
Title: Permissions
linkTitle: Permissions
description: Documents the permissions used with Redis Enterprise Software REST API calls.
weight: 60
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/permissions/

---

Some Redis Enterprise [REST API requests]({{<relref "/rs/references/rest-api/requests">}}) may require the user to have specific permissions.

Administrators can assign a predefined role to a user via the [admin console]({{<relref "/rs/security/admin-console-security/user-security">}}) or a [<nobr>`PUT /users/{uid}`</nobr> API request]({{<relref "/rs/references/rest-api/requests/users#put-user">}}) in order to grant necessary permissions to them.

## Roles

Each user in the cluster has an assigned role, which defines the permissions granted to the user.

Available roles include:

- **db_viewer**: Can view database info.
- **db_member**: Can create or modify databases and view their info.
- **cluster_viewer**: Can view cluster and database info.
- **cluster_member**: Can modify the cluster and databases and view their info.
- **admin**: Can view and modify all elements of the cluster.

## Permissions list for each role

| Role | Permissions |
|------|-------------|
| none |             |
| db_viewer | [view_all_nodes_stats](#view_all_nodes_stats), view_all_nodes_alerts, view_status_of_node_action, view_all_bdbs_info, view_all_shard_stats, view_redis_acl_info, view_bdb_alerts, view_cluster_info, view_license, view_all_redis_acls_info, view_all_roles_info, view_all_bdbs_alerts, view_proxy_info, view_all_bdb_stats, view_status_of_all_node_actions, view_status_of_cluster_action, view_all_proxies_info, view_shard_stats, view_bdb_info, view_node_check, view_crdb, view_crdb_list, view_node_stats, view_all_nodes_info, view_node_alerts, view_role_info, view_cluster_alerts, view_bdb_stats, view_endpoint_stats, view_cluster_modules, view_cluster_stats, view_node_info, view_all_nodes_checks |
| db_member | view_all_nodes_stats, view_all_nodes_alerts, view_status_of_node_action, start_bdb_export, update_crdb, view_all_bdbs_info, view_all_shard_stats, create_bdb, reset_bdb_current_export_status, view_redis_acl_info, view_bdb_alerts, update_bdb_with_action, update_bdb_alerts, view_cluster_info, view_license, view_all_redis_acls_info, view_endpoint_stats, view_redis_pass, create_crdb, delete_crdb, view_all_roles_info, view_all_bdbs_alerts, flush_crdb, view_proxy_info, view_all_bdb_stats, view_status_of_all_node_actions, view_logged_events, reset_bdb_current_import_status, view_status_of_cluster_action, view_all_proxies_info, view_shard_stats, purge_instance, view_bdb_info, view_node_check, migrate_shard, view_crdb, view_crdb_list, reset_bdb_current_backup_status, view_node_stats, view_all_nodes_info, view_node_alerts, edit_bdb_module, update_bdb, view_cluster_alerts, view_role_info, view_bdb_stats, delete_bdb, view_cluster_modules, start_bdb_import, view_cluster_stats, view_node_info, view_all_nodes_checks |
| cluster_viewer | view_all_nodes_stats, view_all_nodes_alerts, view_status_of_node_action, view_all_bdbs_info, view_all_shard_stats, view_redis_acl_info, view_bdb_alerts, view_cluster_info, view_license, view_all_redis_acls_info, view_all_roles_info, view_all_bdbs_alerts, view_proxy_info, view_all_bdb_stats, view_status_of_all_node_actions, view_logged_events, view_status_of_cluster_action, view_all_proxies_info, view_shard_stats, view_bdb_info, view_node_check, view_crdb, view_crdb_list, view_node_stats, view_all_nodes_info, view_node_alerts, view_role_info, view_cluster_alerts, view_bdb_stats, view_endpoint_stats, view_cluster_modules, view_cluster_stats, view_node_info, view_all_nodes_checks |
| cluster_member | view_all_nodes_stats, view_all_nodes_alerts, view_status_of_node_action, view_logged_events, update_crdb, view_all_bdbs_info, view_all_shard_stats, create_bdb, reset_bdb_current_export_status, view_redis_acl_info, view_bdb_alerts, update_bdb_with_action, update_bdb_alerts, view_cluster_info, view_license, view_all_redis_acls_info, view_endpoint_stats, view_redis_pass, create_crdb, delete_crdb, view_all_roles_info, view_all_bdbs_alerts, flush_crdb, view_proxy_info, start_bdb_export, view_all_bdb_stats, view_status_of_all_node_actions, view_cluster_keys, reset_bdb_current_import_status, view_status_of_cluster_action, view_all_proxies_info, view_shard_stats, purge_instance, view_bdb_info, view_node_check, migrate_shard, view_crdb, view_crdb_list, reset_bdb_current_backup_status, view_node_stats, view_all_nodes_info, view_node_alerts, edit_bdb_module, update_bdb, view_cluster_alerts, view_role_info, view_bdb_stats, delete_bdb, view_cluster_modules, start_bdb_import, view_cluster_stats, view_node_info, view_all_nodes_checks |
| admin | create_bdb, create_redis_acl, update_user, view_all_nodes_stats, view_all_nodes_alerts, view_status_of_node_action, view_user_info, view_logged_events, delete_user, delete_cluster_module, view_all_nodes_info, update_crdb, view_all_bdbs_info, cancel_node_action, view_all_shard_stats, config_ldap, update_redis_acl, reset_bdb_current_export_status, create_ldap_mapping, view_redis_acl_info, view_bdb_alerts, update_bdb_with_action, update_bdb_alerts, view_cluster_info, view_license, view_all_redis_acls_info, update_ldap_mapping, view_redis_pass, create_crdb, delete_crdb, view_all_roles_info, start_cluster_action, view_all_bdbs_alerts, flush_crdb, start_node_action, update_node, view_proxy_info, cancel_cluster_action, view_all_bdb_stats, view_all_users_info, update_role, view_status_of_all_node_actions, view_cluster_stats, view_cluster_keys, reset_bdb_current_import_status, view_status_of_cluster_action, view_all_proxies_info, create_new_user, view_shard_stats, start_bdb_import, delete_redis_acl, view_endpoint_stats, view_node_check, migrate_shard, create_role, view_crdb, view_crdb_list, update_cluster, reset_bdb_current_backup_status, view_node_stats, view_ldap_mapping_info, view_all_ldap_mappings_info, update_proxy, add_cluster_module, view_node_alerts, edit_bdb_module, update_bdb, view_cluster_alerts, view_role_info, view_bdb_stats, delete_role, delete_bdb, delete_ldap_mapping, view_all_nodes_checks, view_cluster_modules, purge_instance, install_new_license, start_bdb_export, view_node_info, view_bdb_info, view_ldap_config |

## Roles list per permission

| Permission | Roles |
|------------|-------|
| <a name="add_cluster_module" style="display: block; height: 80px; margin-top: -80px;"></a>add_cluster_module| admin |
| <a name="cancel_cluster_action" style="display: block; height: 80px; margin-top: -80px;"></a>cancel_cluster_action | admin |
| <a name="cancel_node_action" style="display: block; height: 80px; margin-top: -80px;"></a>cancel_node_action | admin |
| <a name="config_ldap" style="display: block; height: 80px; margin-top: -80px;"></a>config_ldap | admin |
| <a name="create_bdb" style="display: block; height: 80px; margin-top: -80px;"></a>create_bdb | admin<br />cluster_member<br />db_member |
| <a name="create_crdb" style="display: block; height: 80px; margin-top: -80px;"></a>create_crdb | admin<br />cluster_member<br />db_member |
| <a name="create_ldap_mapping" style="display: block; height: 80px; margin-top: -80px;"></a>create_ldap_mapping | admin |
| <a name="create_new_user" style="display: block; height: 80px; margin-top: -80px;"></a>create_new_user | admin |
| <a name="create_redis_acl" style="display: block; height: 80px; margin-top: -80px;"></a>create_redis_acl | admin |
| <a name="create_role" style="display: block; height: 80px; margin-top: -80px;"></a>create_role | admin |
| <a name="delete_bdb" style="display: block; height: 80px; margin-top: -80px;"></a>delete_bdb | admin<br />cluster_member<br />db_member |
| <a name="delete_cluster_module" style="display: block; height: 80px; margin-top: -80px;"></a>delete_cluster_module | admin |
| <a name="delete_crdb" style="display: block; height: 80px; margin-top: -80px;"></a>delete_crdb | admin<br />cluster_member<br />db_member |
| <a name="delete_ldap_mapping" style="display: block; height: 80px; margin-top: -80px;"></a>delete_ldap_mapping | admin |
| <a name="delete_redis_acl" style="display: block; height: 80px; margin-top: -80px;"></a>delete_redis_acl | admin |
| <a name="delete_role" style="display: block; height: 80px; margin-top: -80px;"></a>delete_role | admin |
| <a name="delete_user" style="display: block; height: 80px; margin-top: -80px;"></a>delete_user | admin |
| <a name="edit_bdb_module" style="display: block; height: 80px; margin-top: -80px;"></a>edit_bdb_module | admin<br />cluster_member<br />db_member |
| <a name="flush_crdb" style="display: block; height: 80px; margin-top: -80px;"></a>flush_crdb | admin<br />cluster_member<br />db_member |
| <a name="install_new_license" style="display: block; height: 80px; margin-top: -80px;"></a>install_new_license | admin |
| <a name="migrate_shard" style="display: block; height: 80px; margin-top: -80px;"></a>migrate_shard | admin<br />cluster_member<br />db_member |
| <a name="purge_instance" style="display: block; height: 80px; margin-top: -80px;"></a>purge_instance | admin<br />cluster_member<br />db_member |
| <a name="reset_bdb_current_backup_status" style="display: block; height: 80px; margin-top: -80px;"></a>reset_bdb_current_backup_status | admin<br />cluster_member<br />db_member |
| <a name="reset_bdb_current_export_status" style="display: block; height: 80px; margin-top: -80px;"></a>reset_bdb_current_export_status | admin<br />cluster_member<br />db_member |
| <a name="reset_bdb_current_import_status" style="display: block; height: 80px; margin-top: -80px;"></a>reset_bdb_current_import_status | admin<br />cluster_member<br />db_member |
| <a name="start_bdb_export" style="display: block; height: 80px; margin-top: -80px;"></a>start_bdb_export | admin<br />cluster_member<br />db_member |
| <a name="start_bdb_import" style="display: block; height: 80px; margin-top: -80px;"></a>start_bdb_import | admin<br />cluster_member<br />db_member |
| <a name="start_cluster_action" style="display: block; height: 80px; margin-top: -80px;"></a>start_cluster_action | admin |
| <a name="start_node_action" style="display: block; height: 80px; margin-top: -80px;"></a>start_node_action | admin |
| <a name="update_bdb" style="display: block; height: 80px; margin-top: -80px;"></a>update_bdb | admin<br />cluster_member<br />db_member |
| <a name="update_bdb_alerts" style="display: block; height: 80px; margin-top: -80px;"></a>update_bdb_alerts | admin<br />cluster_member<br />db_member |
| <a name="update_bdb_with_action" style="display: block; height: 80px; margin-top: -80px;"></a>update_bdb_with_action | admin<br />cluster_member<br />db_member |
| <a name="update_cluster" style="display: block; height: 80px; margin-top: -80px;"></a>update_cluster | admin |
| <a name="update_crdb" style="display: block; height: 80px; margin-top: -80px;"></a>update_crdb | admin<br />cluster_member<br />db_member |
| <a name="update_ldap_mapping" style="display: block; height: 80px; margin-top: -80px;"></a>update_ldap_mapping | admin |
| <a name="update_node" style="display: block; height: 80px; margin-top: -80px;" style="display: block; height: 80px; margin-top: -80px;"></a>update_node | admin |
| <a name="update_proxy" style="display: block; height: 80px; margin-top: -80px;"></a>update_proxy | admin |
| <a name="update_redis_acl" style="display: block; height: 80px; margin-top: -80px;"></a>update_redis_acl | admin |
| <a name="update_role" style="display: block; height: 80px; margin-top: -80px;"></a>update_role | admin |
| <a name="update_user" style="display: block; height: 80px; margin-top: -80px;"></a>update_user | admin |
| <a name="view_all_bdb_stats" style="display: block; height: 80px; margin-top: -80px;"></a>view_all_bdb_stats | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_all_bdbs_alerts" style="display: block; height: 80px; margin-top: -80px;"></a>view_all_bdbs_alerts | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_all_bdbs_info" style="display: block; height: 80px; margin-top: -80px;"></a>view_all_bdbs_info | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_all_ldap_mappings_info" style="display: block; height: 80px; margin-top: -80px;"></a>view_all_ldap_mappings_info | admin |
| <a name="view_all_nodes_alerts" style="display: block; height: 80px; margin-top: -80px;"></a>view_all_nodes_alerts | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_all_nodes_checks" style="display: block; height: 80px; margin-top: -80px;"></a>view_all_nodes_checks | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_all_nodes_info" style="display: block; height: 80px; margin-top: -80px;"></a>view_all_nodes_info | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_all_nodes_stats" style="display: block; height: 80px; margin-top: -80px;"></a>view_all_nodes_stats | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_all_proxies_info" style="display: block; height: 80px; margin-top: -80px;"></a>view_all_proxies_info | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_all_redis_acls_info" style="display: block; height: 80px; margin-top: -80px;"></a>view_all_redis_acls_info | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_all_roles_info" style="display: block; height: 80px; margin-top: -80px;"></a>view_all_roles_info | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_all_shard_stats" style="display: block; height: 80px; margin-top: -80px;"></a>view_all_shard_stats | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_all_users_info" style="display: block; height: 80px; margin-top: -80px;"></a>view_all_users_info | admin |
| view_bdb_alerts | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_bdb_info" style="display: block; height: 80px; margin-top: -80px;"></a>view_bdb_info | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_bdb_stats" style="display: block; height: 80px; margin-top: -80px;"></a>view_bdb_stats | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_cluster_alerts" style="display: block; height: 80px; margin-top: -80px;"></a>view_cluster_alerts | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_cluster_info" style="display: block; height: 80px; margin-top: -80px;"></a>view_cluster_info | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_cluster_keys" style="display: block; height: 80px; margin-top: -80px;"></a>view_cluster_keys | admin<br />cluster_member |
| <a name="view_cluster_modules" style="display: block; height: 80px; margin-top: -80px;"></a>view_cluster_modules | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_cluster_stats" style="display: block; height: 80px; margin-top: -80px;"></a>view_cluster_stats | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_crdb" style="display: block; height: 80px; margin-top: -80px;"></a>view_crdb | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_crdb_list" style="display: block; height: 80px; margin-top: -80px;"></a>view_crdb_list | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_endpoint_stats" style="display: block; height: 80px; margin-top: -80px;"></a>view_endpoint_stats | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_ldap_config" style="display: block; height: 80px; margin-top: -80px;"></a>view_ldap_config | admin |
| <a name="view_ldap_mapping_info" style="display: block; height: 80px; margin-top: -80px;"></a>view_ldap_mapping_info | admin |
| <a name="view_license" style="display: block; height: 80px; margin-top: -80px;"></a>view_license | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_logged_events" style="display: block; height: 80px; margin-top: -80px;"></a>view_logged_events | admin<br />cluster_member<br />cluster_viewer<br />db_member |
| <a name="view_node_alerts" style="display: block; height: 80px; margin-top: -80px;"></a>view_node_alerts | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_node_check" style="display: block; height: 80px; margin-top: -80px;"></a>view_node_check | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_node_info" style="display: block; height: 80px; margin-top: -80px;"></a>view_node_info | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_node_stats" style="display: block; height: 80px; margin-top: -80px;"></a>view_node_stats | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_proxy_info" style="display: block; height: 80px; margin-top: -80px;"></a>view_proxy_info | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_redis_acl_info" style="display: block; height: 80px; margin-top: -80px;"></a>view_redis_acl_info | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_redis_pass" style="display: block; height: 80px; margin-top: -80px;"></a>view_redis_pass | admin<br />cluster_member<br />db_member |
| <a name="view_role_info" style="display: block; height: 80px; margin-top: -80px;"></a>view_role_info | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_shard_stats" style="display: block; height: 80px; margin-top: -80px;"></a>view_shard_stats | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_status_of_all_node_actions" style="display: block; height: 80px; margin-top: -80px;"></a>view_status_of_all_node_actions | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_status_of_cluster_action" style="display: block; height: 80px; margin-top: -80px;"></a>view_status_of_cluster_action | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_status_of_node_action" style="display: block; height: 80px; margin-top: -80px;"></a>view_status_of_node_action | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |
| <a name="view_user_info" style="display: block; height: 80px; margin-top: -80px;"></a>view_user_info | admin |
