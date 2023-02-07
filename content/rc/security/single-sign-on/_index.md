---
Title: Single sign-on
linkTitle: Single sign-on
description: Single sign-on (SSO) integration with Redis Cloud.
weight: 60
alwaysopen: false
categories: ["RC"]
---

As an alternative to the traditional email/password account authentication method, you can create a Redis Cloud account and sign in to the [admin console](https://app.redislabs.com/new/) with [single sign-on (SSO)](https://en.wikipedia.org/wiki/Single_sign-on). This lets you use one set of credentials, managed by your [identity provider](https://en.wikipedia.org/wiki/Identity_provider), to access multiple websites.

## Supported SSO methods

- [SAML SSO]({{<relref "/rc/security/single-sign-on/saml-sso">}})

    Integration guides are available for the following identity providers (IdP):

    - [Okta]({{<relref "/rc/security/single-sign-on/saml-integration-okta">}})
    - [Microsoft Azure Active Directory]({{<relref "/rc/security/single-sign-on/saml-integration-azure-ad">}}) (Azure AD)
    - [PingIdentity]({{<relref "/rc/security/single-sign-on/saml-integration-ping-identity">}})
    - [Auth0]({{<relref "/rc/security/single-sign-on/saml-integration-auth0">}})

- [Social login]({{<relref "/rc/security/single-sign-on/social-login">}})
