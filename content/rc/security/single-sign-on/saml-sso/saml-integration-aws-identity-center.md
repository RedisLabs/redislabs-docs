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


## Step 2 - Configuring SAML support in Redis Cloud

Now that we have our IAM Identity Center IdP server information, we need to configure support for SAML in Redis Cloud.

### Login to your Redis Cloud SM account

Login to your SM account at [https://app.redislabs.com/#/login](https://app.redislabs.com/#/login)

### Activate SAML in Access Management

In order to activate SAML, you must have a local user (or social sign-on user) with the **owner** role. If you have the correct permissions, you will see the **Single Sign-On** tab.

{{<image filename="images/rc/saml/aws_iam_identity_center_saml_7.png" alt="" >}}{{</image>}}

1. Fill in the information you saved previously in the **Configuration setup** screen. This includes :

* **Issuer (IdP Entity ID)** -> IAM Identity Center SAML issuer URL
* **IdP server URL** -> IAM Identity Center sign-in URL
* **Assertion signing certificate** - drag and drop the certificate file you downloaded to disk in the form textarea

You will also have to add :

* **Email domain binding** - The domain used in your company's email addresses

  {{<image filename="images/rc/saml/aws_iam_identity_center_saml_8.png" alt="" >}}{{</image>}}

Once you click the **enable** button, wait a few seconds for the status to change.

2. You will then be able to **download** the service provider (SP) metadata. Save the file to your local hard disk.

   {{<image filename="images/rc/saml/aws_iam_identity_center_saml_9.png" alt="" >}}{{</image>}}

3. Open the file in any text editor, and there are 2 pieces of information that you need to copy and mark down:

* **EntityID** : The unique name of the service provider (SP)

  {{<image filename="images/rc/saml/sm_saml_4.png" alt="" >}}{{</image>}}

* **Location** : The location of the assertion consumer service

  {{<image filename="images/rc/saml/sm_saml_5.png" alt="" >}}{{</image>}}

## Step 3 - Finish SAML configuration in AWS IAM Identity Center's Redis Cloud Application

1. Go back to the **Configuration setup** screen in IAM identity Center. Scroll down to the bottom of the page and select the **Upload application SAML metadata file** option. Click on the **upload** button and choose the file that you downloaded in the SAML configuration screen in Redis Cloud. It should look like the screen below :

{{<image filename="images/rc/saml/aws_iam_identity_center_saml_10.png" alt="" >}}{{</image>}}

2. If you would like to also configure an IdP initiated workflow, then you need to fill in the **relay state** field in the **Application properties** section. Use the following URL **https://app.redislabs.com/#/login/?idpId=XXXXXX**. Take the ID from the location URL in step 3 (the content after the last forward slash "/") and append to the url. It should look like the screen below :

{{<image filename="images/rc/saml/aws_iam_identity_center_saml_11.png" alt="" >}}{{</image>}}

3. Once all the information has been filled in, it is time finish the application creation by clicking the **Submit** button.

{{<image filename="images/rc/saml/aws_iam_identity_center_saml_12.png" alt="" >}}{{</image>}}

4. Next, we need to configure the **Redis Cloud** application's attribute mappings. Click on the **Actions** menu and choose **Edit Attribute Mappings**. 

{{<image filename="images/rc/saml/aws_iam_identity_center_saml_13.png" alt="" >}}{{</image>}}   

In the next screen, add the following attributes :

* Subject : **${user:email}**, **unspecified**
* Email : **${user:email}**, **unspecified**
* FirstName : **${user:givenName}**, **unspecified**
* LastName : **${user:familyName}**, **unspecified**
* redisAccountMapping : **XXXXXXX=owner**, **unspecified**

The **redisAccountMapping** key-value pair consists of the **lower-cased role name** (ie owner, member, manager, or viewer) AND your **Redis Cloud Account ID** (you can find this information in the upper-right user menu at app.redislabs.com).

{{<image filename="images/rc/saml/aws_iam_identity_center_saml_14.png" alt="" >}}{{</image>}}

## Step 4 - Ensure that the SM account user has an IAM Identity Center user account


