---
Title: Access control
LinkTitle: Access control
description: Control who can access the Redis Cloud console and databases.
weight: 5
alwaysopen: false
toc: "true"
categories: ["RC"]
aliases: 
---

Redis Cloud offers you a few different ways to control who can access and make changes to your databases.

## [Access Management]({{<relref "/rc/security/access-control/access-management">}})

Control who can make changes to your databases using the [Redis Cloud console](https://app.redislabs.com/).

## [SAML SSO]({{<relref "/rc/security/access-control/saml-sso">}})

Redis Cloud supports both IdP-initiated and SP-initiated [single sign-on (SSO)](https://en.wikipedia.org/wiki/Single_sign-on) with [SAML (Security Assertion Markup Language)](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language).

You can use any identity provider to integrate with Redis Cloud as long as it supports the SAML protocol. You can also refer to these integration guides for several popular identity providers:

  - [Auth0 SAML integration]({{<relref "/rc/security/access-control/saml-sso/saml-integration-auth0">}})
  - [AWS IAM Identity Center SAML integration]({{<relref "/rc/security/access-control/saml-sso/saml-integration-aws-identity-center">}})
  - [Azure Active Directory SAML integration]({{<relref "/rc/security/access-control/saml-sso/saml-integration-azure-ad">}})
  - [Google Workspace integration]({{<relref "/rc/security/access-control/saml-sso/saml-integration-google">}}) 
  - [Okta SAML integration (Generic)]({{<relref "/rc/security/access-control/saml-sso/saml-integration-okta-generic">}})
  - [Okta SAML integration (Org2Org)]({{<relref "/rc/security/access-control/saml-sso/saml-integration-okta-org2org">}})
  - [PingIdentity SAML integration]({{<relref "/rc/security/access-control/saml-sso/saml-integration-ping-identity">}})

## [Multi-factor authentication]({{<relref "/rc/security/access-control/multi-factor-authentication">}})

Redis Cloud supports multi-factor authentication to reduce the risk of unauthorized Redis Cloud console access. 

## [Data Access control]({{<relref "/rc/security/access-control/data-access-control">}})

Control who can access your databases using the [default user database password]({{<relref "/rc/security/access-control/data-access-control/default-user">}}) and [role-based access control]({{<relref "/rc/security/access-control/data-access-control/role-based-access-control.md">}}).



