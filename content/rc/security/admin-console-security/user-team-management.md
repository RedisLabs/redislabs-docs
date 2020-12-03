---
Title: User management
description:
weight: 10
alwaysopen: false
categories: ["RC"]
---
Redis Enterprise Cloud uses role-based access control to help give users only the access that they need.

## User Management

To manage the team of people who have access to the account, click on
the "Team" tab and you will be presented with the current list of team
members on this account.

- To add more team members, click ![Add](/images/rs/icon_add.png#no-click "Add").
- To edit an existing team member, click ![Edit](/images/rc/icon_edit.png#no-click "Edit").

Team members can have different roles to the account:

- **Owner**: Can view, create, and edit any settings in the account
- **Member**: Can view, create, and edit databases
- **Viewer**: Can view all databases and their configurations (including database secrets)

### User and Team Management for GCP Marketplace customers

If you subscribed to Redis Cloud using GCP Marketplace, you can manage your team from the IAM section of the GCP console.
To grant Redis Cloud access to a GCP user, assign one of these roles to the user:

- **Viewer**: serviceusage.serviceUsageViewer and redisenterprisecloud.viewer
- **Owner**:  serviceusage.serviceUsageViewer and redisenterprisecloud.admin

Users must log in using SSO to Redis Cloud at least once for them to be added to the team.
