---
Title: PingIdentity SAML integration guide
linkTitle: PingIdentity integration
description: This integration guide shows how to set up PingIndentity as a SAML single sign-on provider for your Redis Cloud account.
weight: 10
alwaysopen: false
categories: ["RC"]
---

This guide shows how to configure [PingIdentity](https://docs.pingidentity.com/p/en-us/makeitwork#top) as a SAML single sign-on identity provider (IdP) for your Redis Cloud account.

To learn more about Redis Cloud support for SAML, see [SAML single sign-on]({{<relref "/rc/security/access-control/saml-sso">}}).

## Step 1: Set up your identity provider (IdP)

### Add the `redisAccountMapping` attribute

1. Log in into your Ping Identity account. Open **Administrators > Identities > User Attributes** and select **Add Attribute**.

    {{<image filename="images/rc/saml/ping_identity_saml_1.png" alt="" >}}{{</image>}}

2. Select the **DECLARED** attribute type.

    {{<image filename="images/rc/saml/ping_identity_saml_2.png" alt="" >}}{{</image>}}

3. Fill in the fields with the following values:

    * **Name**: `redisAccountMapping`
    * **Display name**: `redisAccountMapping`
    * **Description**: `redisAccountMapping`

    {{<image filename="images/rc/saml/ping_identity_saml_3.png" alt="" >}}{{</image>}}

    Select **Save and Close**. Then, verify that the attribute was created successfully.

    {{<image filename="images/rc/saml/ping_identity_saml_4.png" alt="" >}}{{</image>}}

### Add the user who will activate SAML in Service Manager (Redis Cloud)

1. Go to **Administrators > Identities > Users** and select **Add User**.

    {{<image filename="images/rc/saml/ping_identity_saml_5.png" alt="" >}}{{</image>}}

1. Fill in the following information:

    * **redisAccountMapping**: `{accountID}={role}`
     
    **accountID** is the account ID from [account settings]({{<relref "rc/accounts/account-settings">}}) and **role** represents the role that the user will be assigned in Redis Cloud console (owner, member, manager, billing_admin, or viewer):

    {{<image filename="images/rc/saml/ping_identity_saml_6.png" alt="" >}}{{</image>}}

    Save and check that the user was added successfully.

### Create the Ping Identity SAML application

1. Go to **Administrators > Connections > Applications** and select **+** to add a new application.

    {{<image filename="images/rc/saml/ping_identity_saml_7.png" alt="" >}}{{</image>}}

1. Choose a name for the application, select **SAML Application Type** and select **Configure**.

    {{<image filename="images/rc/saml/ping_identity_saml_8.png" alt="" >}}{{</image>}}

1. In the ACS URLs and Entity ID field add for now some dummy data, like https://example.com
   
    * This data will be updated with the correct data in a subsequent step.

    {{<image filename="images/rc/saml/ping_identity_saml_9.png" alt="" >}}{{</image>}}

    Select **Save**.

1. Go to the **Configuration** tab and save the following information:
   
    * Issuer ID
    * Single Logout Service
    * Single Signon Service

    This information will be needed once we configure SAML in the Redis Cloud console.

    * Select **Download Metadata**. An XML file will be downloaded. Open it and copy the certificate, which is required for the configuration in Redis Cloud console.

    {{<image filename="images/rc/saml/ping_identity_saml_10.png" alt="" >}}{{</image>}}

5. Go to the **Attribute Mappings** tab. Add the following attributes:

    * saml_subject
    * Email
    * FirstName
    * LastName
    * redisAccountMapping

    {{<image filename="images/rc/saml/ping_identity_saml_11.png" alt="" >}}{{</image>}}

## Step 2: Configure SAML support in Redis Cloud

Now that we have our Ping Identity IdP server ready, we need to configure support for SAML in Redis Cloud.

### Sign in to Redis Cloud console

Log in to [Redis Cloud console](https://app.redislabs.com/#/login)

### Activate SAML in access management

To activate SAML, you must have a local user (or social sign-on user) with the **owner** role. If you have the correct permissions, you will see the **Single Sign-On** tab.

1. Fill in the information you copied previously, including:

    * **Issuer (IdP Entity ID)**: `Issuer ID`
    * **IdP server URL**: `Single Signon Service`
    * **Single logout URL**: `Single Logout Service`
    * **Assertion signing certificate**: Certificate info you copied from the Ping Identity XML file

    Also add:

    * **Email domain binding**: The domain used in your company's email addresses

    {{<image filename="images/rc/saml/ping_identity_saml_12.png" alt="" >}}{{</image>}}

    Select **Enable** and wait a few seconds for the status to change.

1. You will then be able to **Download** the service provider (SP) metadata. Save the file to your local hard disk.

    {{<image filename="images/rc/saml/ping_identity_saml_18.png" alt="" >}}{{</image>}}

1. Open the file in any text editor. Save the following text from the metadata:

    * **EntityID**: The unique name of the service provider (SP)

    {{<image filename="images/rc/saml/sm_saml_4.png" alt="" >}}{{</image>}}

    * **Location**: The location of the assertion consumer service

    {{<image filename="images/rc/saml/sm_saml_5.png" alt="" >}}{{</image>}}

## Step 3: Finish SAML configuration in Ping Identity

1. In Ping Identity, go to **Administrators > Connections > Applications** and select your application name. Select the **Configuration** tab and select **Edit**.

    This is where we had entered mock data. We will now enter the correct data for this step:

    * Paste **EntityID** information in the **Entity ID** field.

    * Paste **Location** link in the ACS URLS field.

    * For the **Sign on URL** field, add URL `https://app.redislabs.com/#/login/?idpId=`, where you need to add the ID from the Reply URL ID, for example, `https://app.redislabs.com/#/login/?idpId=0oa5pwatz2JfpfCb91d7`.

    Select **Save**.

    {{<image filename="images/rc/saml/ping_identity_saml_13.png" alt="" >}}{{</image>}}

1. Select the slider to enable the app.

    {{<image filename="images/rc/saml/ping_identity_saml_14.png" alt="" >}}{{</image>}}

## Step 4: Return to Redis Cloud console

1. Return to the Redis Cloud console and select **Activate**.

    {{<image filename="images/rc/saml/ping_identity_saml_19.png" alt="" >}}{{</image>}}

1. A popup appears, explaining that to test the SAML connection, you need to log in with credentials of a user defined in Ping Federate.

    {{<image filename="images/rc/saml/sm_saml_13.png" alt="" >}}{{</image>}}

1. The Ping Federate login screen will appear. Enter the credentials and select **Sign In**.

    {{<image filename="images/rc/saml/ping_identity_saml_20.png" alt="" >}}{{</image>}}

1. If the test has succeeded, you will see the following screen. Your local account is now considered a SAML account. To log in to Redis Cloud console going forward, select the **Sign in with SSO** button.

    {{<image filename="images/rc/saml/sm_saml_11.png" alt="" >}}{{</image>}}

1. In the screen, enter your SAML email and select *Login*.

    {{<image filename="images/rc/saml/ad_saml_21.png" alt="" >}}{{</image>}}

   You have successfully configured SAML as an identity provider.

    {{<image filename="images/rc/saml/ping_identity_saml_15.png" alt="" >}}{{</image>}}

## IdP-initiated SSO

`https://app.redislabs.com/#/login/?idpId=`

1. In Ping Identity, go to **Administrators > Connections > Applications** and select your application name. Select the **Configuration** tab and select **Edit**.

1. Go to **Target Application URL** and enter: **https://{enviroment}/#/login/?idpId={idpId}**, where idpId is the ID found in the Location field, after the last '/'

1. Select **Save**.

    {{<image filename="images/rc/saml/ping_identity_saml_16.png" alt="" >}}{{</image>}}

1. Go to **https://apps.pingone.com/{environment}/myapps/#**, where environment is the environment ID, found in **Administrators -> Environment** for your app.

    {{<image filename="images/rc/saml/ping_identity_saml_17.png" alt="" >}}{{</image>}}

   You are redirected to the Redis Cloud console.

