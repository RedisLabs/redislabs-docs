---
Title: Azure Active Directory SAML integration guide
linkTitle: Azure AD integration
description: This integration guide shows how to set up Microsoft Azure Active Directory (Azure AD) as a SAML single sign on provider for your Redis Cloud account.
weight: 10
alwaysopen: false
categories: ["RC"]
---

This guide shows how to configure [Microsoft Azure Active Directory](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-architecture) (Azure AD) as a SAML single sign-on identity provider (IdP) for your Redis Cloud account.

To learn more about Redis Cloud support for SAML, see [SAML single sign on]({{<relref "/rc/security/access-control/saml-sso">}}).

## Step 1: Set up your identity provider (IdP)

To create the Azure AD SAML Toolkit integration application:

1. Sign in to Microsoft Azure account.

1. From the main menu, select **Azure Active Directory > Enterprise Applications**

    {{<image filename="images/rc/saml/ad_saml_1.png" alt="" >}}{{</image>}}

1. Add a **New Application > Azure AD SAML Toolkit**.

    {{<image filename="images/rc/saml/ad_saml_2.png" alt="" >}}{{</image>}}

1. Provide an application name and select **Create**.

    {{<image filename="images/rc/saml/ad_saml_3.png" alt="" >}}{{</image>}}

1. Select **Properties** and upload the Redis logo. Select **Save**.

    {{<image filename="images/rc/saml/ad_saml_17.png" alt="" >}}{{</image>}}

    {{<image filename="images/rc/saml/ad_saml_18.png" alt="" >}}{{</image>}}

1. Once the application is created, select **Set up single sign on**.

    {{<image filename="images/rc/saml/ad_saml_4.png" alt="" >}}{{</image>}}

1. Select **SAML** as the single sign-on method.

    {{<image filename="images/rc/saml/ad_saml_5.png" alt="" >}}{{</image>}}

1. Scroll down to **Step 4** in the configuration screen, and note down or copy the following information:

   * **Login URL** is used as the "IdP server URL" in the SAML configuration in admin console.
   * **Azure AD Identifier** is used as the "Issuer (IdP Entity ID)" in the SAML configuration in admin console.
  
    {{<image filename="images/rc/saml/ad_saml_6.png" alt="" >}}{{</image>}}

1. Scroll up to **Step 3** in the configuration screen.

   * Certificate (Base 64) is required to complete the SAML configuration in admin console.

     {{<image filename="images/rc/saml/ad_saml_7.png" alt="" >}}{{</image>}}

1. Scroll up to **Step 1** in the configuration screen and enter some mock data in the required fields. Select **Save**.

    {{<image filename="images/rc/saml/ad_saml_8.png" alt="" >}}{{</image>}}

   The certificate is available for download. Select Download to save the certificate to your hard drive.

## Step 2: Configure SAML support in Redis Cloud

Now that you have your AD IdP server ready, configure support for SAML in Redis Cloud.

### Log in to your Redis Cloud account

[Log in](https://app.redislabs.com/#/login) to your account.

### Activate SAML in access management

To activate SAML, you must have a local user (or social sign-on user) with the **owner** role. If you have the correct permissions, you will see the **Single Sign-On** tab.

1. Fill in the information you saved previously in the **setup** form. This includes :

   * **Issuer (IdP Entity ID)**: Azure AD Identifier
   * **IdP server URL**: Login URL
   * **Assertion signing certificate**: Drag-and-drop the certificate file you downloaded to disk in the form text area

   Also add:

   * **Email domain binding**: The domain used in your company's email addresses

     {{<image filename="images/rc/saml/sm_saml_1.png" alt="" >}}{{</image>}}

   Once you click the **enable** button, wait a few seconds for the status to change.

1. You will then be able to **download** the service provider (SP) metadata. Save the file to your local hard disk.

    {{<image filename="images/rc/saml/ad_saml_10.png" alt="" >}}{{</image>}}

1. Open the file in any text editor. Save the following text from the metadata:

   * **EntityID**: The unique name of the service provider (SP)

    {{<image filename="images/rc/saml/sm_saml_4.png" alt="" >}}{{</image>}}

   * **Location**: The location of the assertion consumer service

    {{<image filename="images/rc/saml/sm_saml_5.png" alt="" >}}{{</image>}}

## Step 3: Finish SAML configuration in Azure AD

1. Go back to Azure setup and **Edit** the Basic SAML Configuration in **Step 1**. 
   
   This is where you entered mock data. Let's now enter the correct data for this step.

   {{< note >}}
   For the `EntityID` and `Location` fields below you can directly upload the metadata file using the option at the top of the page. However, you will still need to manually    add the **Sign on URL**.
   {{< /note >}}

    * Paste `EntityID` information in the `Identifier (Entity ID)` field.
  
    * Paste `Location` link in `Reply URL (Assertion Consumer Service URL)` field.

    * For the `Sign on URL` field, add URL `https://app.redislabs.com/#/login/?idpId=` where you need to add the ID from the Reply URL ID, for example,    `https://app.redislabs.com/#/login/?idpId=0oa5pwatz2JfpfCb91d7`.

    Select **Save**.

      {{<image filename="images/rc/saml/ad_saml_23.png" alt="" >}}{{</image>}}

1. Go to step 2, **Attributes & Claims** and select **Edit**.

    {{<image filename="images/rc/saml/ad_saml_24.png" alt="" >}}{{</image>}}

1. Configure these attributes and claims:

    * Modify Unique User Identifier (Name ID) to **user.mail**
  
    * Modify additional claims to match SAML assertion as follows:
  
        * **Email**: user.mail
        * **FirstName**: user.givenname
        * **LastName**: user.surname
        * **redisAccountMapping**: "YOUR_SM_ACCOUNT_ID=owner"
        * Redis Cloud account IDs and user roles pairs. The key-value pair consists of the lowercase role name (owner, member, manager, billing_admin, or viewer) and your **Redis Cloud Account ID** found in the [account settings]({{<relref "rc/accounts/account-settings">}}).

          {{<image filename="images/rc/saml/ad_saml_14.png" alt="" >}}{{</image>}}

1. To add a user to the application, select **User and Groups > Add user/group**.

    {{<image filename="images/rc/saml/ad_saml_15.png" alt="" >}}{{</image>}}

1. Add the user and select **Assign**.

    {{<image filename="images/rc/saml/ad_saml_16.png" alt="" >}}{{</image>}}

## Step 4: Return to Redis Cloud console

1. Return to Redis Cloud console and select **Activate**.

    {{<image filename="images/rc/saml/sm_saml_8.png" alt="" >}}{{</image>}}

1. A popup appears, explaining that to test the SAML connection, you need to log in with the credentials of a user defined in Azure AD.

    {{<image filename="images/rc/saml/sm_saml_9.png" alt="" >}}{{</image>}}

1. The Microsoft AD login screen will appear. Enter the credentials and click **Sign In**.

    {{<image filename="images/rc/saml/ad_saml_19.png" alt="" >}}{{</image>}}

1. If the test has succeeded, you will see the following screen. Your local account is now considered a SAML account. To log in to Redis Cloud console going forward, select **Sign in with SSO**.

    {{<image filename="images/rc/saml/sm_saml_11.png" alt="" >}}{{</image>}}

1. Enter your SAML email and click **Login**.

    {{<image filename="images/rc/saml/ad_saml_21.png" alt="" >}}{{</image>}}

   You have successfully configured SAML as an identification provider.

    {{<image filename="images/rc/saml/ad_saml_22.png" alt="" >}}{{</image>}}

## Claim conditions and user groups

If your users are going to be part of different Groups, you can create a Claim Condition for the `redisAccountMapping` attribute.

{{<image filename="images/rc/saml/ad_saml_20.png" alt="" >}}{{</image>}}

## IdP initiated SSO

If you correctly set the up the **Sign on URL**, the SAML application appears by default on the user's **My Apps** panel.

{{<image filename="images/rc/saml/ad_saml_25.png" alt="" >}}{{</image>}}

While assigning the user to the app, a notification will appear:

{{<image filename="images/rc/saml/ad_saml_26.png" alt="" >}}{{</image>}}

Therefore, if you sign into `https://myapplications.microsoft.com/`, the application will be available.

If the app is not available, make sure that the App is registered. It should be done automatically.

{{<image filename="images/rc/saml/ad_saml_27.png" alt="" >}}{{</image>}}

{{<image filename="images/rc/saml/ad_saml_28.png" alt="" >}}{{</image>}}

You can also access the app directly by using the **User access Url** from App Properties.
