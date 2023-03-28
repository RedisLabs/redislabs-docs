---
Title: Single sign-on
linkTitle: Single sign-on
description: Single sign-on (SSO) integration with Redis Cloud.
weight: 60
alwaysopen: false
categories: ["RC"]
---

As an alternative to the traditional email/password account authentication method, you can create a Redis Cloud account and sign in to the [admin console](https://app.redislabs.com/new/) using single sign-on (SSO). This lets you use one set of credentials managed by your identity provider to access multiple websites.

## Supported SSO methods

- [SAML SSO]({{<relref "/rc/security/single-sign-on/saml-sso">}})

  See these guides for supported integrations:

  - [Auth0 SAML integration]({{<relref "/rc/security/single-sign-on/saml-sso/saml-integration-auth0">}})
  - [AWS IAM Identity Center SAML integration]({{<relref "/rc/security/single-sign-on/saml-sso/saml-integration-aws-identity-center">}})
  - [Azure Active Directory SAML integration]({{<relref "/rc/security/single-sign-on/saml-sso/saml-integration-azure-ad">}}) 
  - [Okta SAML integration (Generic)]({{<relref "/rc/security/single-sign-on/saml-sso/saml-integration-okta-generic">}})
  - [Okta SAML integration (Org2Org)]({{<relref "/rc/security/single-sign-on/saml-sso/saml-integration-okta-org2org">}})
  - [PingIdentity SAML integration]({{<relref "/rc/security/single-sign-on/saml-sso/saml-integration-ping-identity">}})

- [Social login]({{<relref "/rc/security/single-sign-on/social-login">}})

  Redis Enterprise Cloud provides social login as a single sign-on (SSO) option. Social login lets you use an existing social media account to create or sign in to your Redis Cloud account.

