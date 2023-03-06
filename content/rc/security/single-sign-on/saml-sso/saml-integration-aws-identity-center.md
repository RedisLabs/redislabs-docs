---
Title: AWS IAM Identity Center SAML integration guide
linkTitle: AWS IAM Identity Center integration
description: This integration guide shows how to configure AWS IAM Identity Center as a SAML single sign on provider for your Redis Cloud account.
weight: 52
alwaysopen: false
categories: ["RC"]
---

This guide shows how to configure [AWS IAM Identity Center](https://aws.amazon.com/iam/identity-center/) as a SAML single sign on identity provider (IdP) for your Redis Cloud account.

To learn more about Redis Cloud support for SAML, see [SAML single sign on]({{<relref "/rc/security/single-sign-on/saml-sso">}}).

## Step 1 - Setup your identity provider (IdP)

### Create the AWS IAM Identity Center SAML application

1. Sign in to your AWS account.

2. From the main menu, search for **IAM Identity Center (successor to AWS Single Sign-On)**

    {{<image filename="images/rc/saml/aws_iam_identity_center_saml_1.png" alt="" >}}{{</image>}}

3. Once in IAM Identity Center, select the **Applications** menu item

   {{<image filename="images/rc/saml/aws_iam_identity_center_saml_2.png" alt="" >}}{{</image>}}

4. Next, click on the **Add application** button

   {{<image filename="images/rc/saml/aws_iam_identity_center_saml_3.png" alt="" >}}{{</image>}}

5. In the next screen, choose the **Add custom SAML 2.0 application** option, scroll down the page and click the **Next** button

   {{<image filename="images/rc/saml/aws_iam_identity_center_saml_4.png" alt="" >}}{{</image>}}

6. The **Configure Application** screen is where we will initially get the information needed to configure SAML in Redis Cloud. To begin, change the **Display name** and **Description** to **Redis Cloud**

   {{<image filename="images/rc/saml/aws_iam_identity_center_saml_5.png" alt="" >}}{{</image>}}

7. Next, scroll down the page to the **IAM Identity Center metadata** section. This information includes all of the information needed to configure SAML in Redis Cloud. This includes :

* IAM Identity Center sign-in URL
* IAM Identity Center SAML issuer URL
* IAM Identity Center Certificate

Make sure to the note down or copy the URLs and to download the certification information from the **download** link.

> **NOTE** : Both the IAM Identity Center sign-in URL and the IAM Identity Center SAML issuer URL are the same value. This is normal.

   {{<image filename="images/rc/saml/aws_iam_identity_center_saml_6.png" alt="" >}}{{</image>}}