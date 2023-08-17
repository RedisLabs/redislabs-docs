---
Title: Assign roles to users
linkTitle: Assign roles to users
description: Assign access control roles to users.
weight: 40
alwaysopen: false
categories: ["RS"]
aliases: 
---

Assign a role, associated with specific databases and access control lists (ACLs), to a user to grant database access:

1. From the **Access Control > Users** tab in the admin console, you can:

    - Point to an existing user and select <img src="/images/rs/buttons/edit-button.png#no-click" alt="The Edit button" width="25px"> to edit the user.
    
    - Select **+ Add user** to [create a new user]({{<relref "/rs/security/access-control/manage-users/add-users">}}).

1. Select a role to assign to the user.

1. Select **Save**.

## Next steps

Depending on the type of the user's assigned role (cluster management role or data access role), the user can now:

- [Connect to a database]({{<relref "/rs/databases/connect">}}) associated with the role and run limited Redis commands, depending on the role's Redis ACLs.

- Sign in to the Redis Enterprise Software admin console.

- Make a [REST API]({{<relref "/rs/references/rest-api">}}) request.
