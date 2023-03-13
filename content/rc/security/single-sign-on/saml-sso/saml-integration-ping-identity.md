---
Title: PingIdentity SAML integration guide
linkTitle: PingIdentity integration
description: This integration guide shows how to set up PingIndentity as a SAML single sign on provider for your Redis Cloud account.
weight: 56
alwaysopen: false
categories: ["RC"]
---

This guide shows how to configure [PingIdentity](https://docs.pingidentity.com/p/en-us/makeitwork#top) as a SAML single sign on identity provider (IdP) for your Redis Cloud account.

To learn more about Redis Cloud support for SAML, see [SAML single sign on]({{<relref "/rc/security/single-sign-on/saml-sso">}}).

## Step 1 - Setup your identity provider (IdP)

### Add the "redisAccountMapping" attribute

1. Login into your Ping Identity account and open **Administrators -> Identities ->User Attributes** and click on **Add Attribute**

    {{<image filename="images/rc/saml/ping_identity_saml_1.png" alt="" >}}{{</image>}}

2. In the modal that opens choose **DECLARED**

    {{<image filename="images/rc/saml/ping_identity_saml_2.png" alt="" >}}{{</image>}}

3. Fill in the following fields with the following values:

    * Name : **redisAccountMapping**
    * Display name : **redisAccountMapping**
    * Description : **redisAccountMapping**

    {{<image filename="images/rc/saml/ping_identity_saml_3.png" alt="" >}}{{</image>}}

    Click the **Save and Close** button. Once done verify that the attribute was created successfully

    {{<image filename="images/rc/saml/ping_identity_saml_4.png" alt="" >}}{{</image>}}

### Add the user who will activate SAML in Service Manager (Redis Cloud)

1. Go to **Administrators -> Identities -> Users** and click on **Add User** button

    {{<image filename="images/rc/saml/ping_identity_saml_5.png" alt="" >}}{{</image>}}

2. In the modal that appears, fill in all the information needed:

    * redisAccountMapping : **{accountID}={role}**
     
    **accountID** is the account ID from SM and **role** represents the role that the user will be assigned in SM, (eg: owner, member, manager, viewer)

    {{<image filename="images/rc/saml/ping_identity_saml_6.png" alt="" >}}{{</image>}}

    Save and check that the user was added successfully

### Create the Ping Identity SAML application

1. Go to **Administrators -> Connections -> Applications** and click on the **+** button to add a new application

    {{<image filename="images/rc/saml/ping_identity_saml_7.png" alt="" >}}{{</image>}}

2. Choose a name for the application, select **SAML Application Type** and click the **Configure** button

    {{<image filename="images/rc/saml/ping_identity_saml_8.png" alt="" >}}{{</image>}}

3. In the ACS URLs and Entity ID field add for now some dummy data, like https://example.com
   
    * This data will be updated with the correct data from SM in a subsequent step

    {{<image filename="images/rc/saml/ping_identity_saml_9.png" alt="" >}}{{</image>}}

    Click on the **Save** button

4. Go to **Configuration** tab and copy the following information and note it down:
   
    * Issuer ID
    * Single Logout Service
    * Single Signon Service

    This information will be needed once we configure SAML in SM

    * Click on the **Download Metadata** button. A XML file will be downloaded. Open it and **copy the Certificate** - it will be needed for the configuration in SM.

    {{<image filename="images/rc/saml/ping_identity_saml_10.png" alt="" >}}{{</image>}}

5. Go to **Attribute Mappings** tab. Add the following attributes:

    * saml_subject
    * Email
    * FirstName
    * LastName
    * redisAccountMapping

    {{<image filename="images/rc/saml/ping_identity_saml_11.png" alt="" >}}{{</image>}}

## Step 2 - Configuring SAML support in Redis Cloud

Now that we have our Ping Identity IdP server ready, we need to configure support for SAML in Redis Cloud.

### Sign in to your Redis Cloud SM account

Login to your SM account at [https://app.redislabs.com/#/login](https://app.redislabs.com/#/login)

### Activate SAML in Access Management

In order to activate SAML, you must have a local user (or social sign-on user) with the **owner** role. If you have the correct permissions, you will see the **Single Sign-On** tab.

1. Fill in the information you copied previously. This includes :

    * **Issuer (IdP Entity ID)** -> Issuer ID
    * **IdP server URL** -> Single Signon Service
    * **Single logout URL** -> Single Logout Service
    * **Assertion signing certificate** - certificate info you copied from the Ping Identity XML file

    You will also have to add :

    * **Email domain binding** - The domain used in your company's email addresses

    {{<image filename="images/rc/saml/ping_identity_saml_12.png" alt="" >}}{{</image>}}

    Once you click the **enable** button, wait a few seconds for the status to change.

2. You will then be able to **download** the service provider (SP) metadata. Save the file to your local hard disk.

    {{<image filename="images/rc/saml/ping_identity_saml_18.png" alt="" >}}{{</image>}}

3. Open the file in any text editor, and there are 2 pieces of information that you need to copy and mark down:

    * **EntityID** : The unique name of the service provider (SP)

    {{<image filename="images/rc/saml/sm_saml_4.png" alt="" >}}{{</image>}}

    * **Location** : The location of the assertion consumer service

    {{<image filename="images/rc/saml/sm_saml_5.png" alt="" >}}{{</image>}}

## Step 3 - Finish SAML configuration in Ping Identity

1. Go in Ping Identity to **Administrators -> Connections -> Applications -> {AppName} -> Configuration** tab and click on the **Edit** button

    This is where we had entered dummy data, we will now enter the correct data for this step:

    * Paste **EntityID** information in the:
        * Entity ID field

    * Paste **Location** link in the ACS URLS field

    * For the **Sign on URL** field, add the following URL: **https://app.redislabs.com/#/login/?idpId=** where you need to add the ID from the Reply URL’s ID. eg. https://app.redislabs.com/#/login/?idpId=0oa5pwatz2JfpfCb91d7

    Once done, click on the **Save** button

    {{<image filename="images/rc/saml/ping_identity_saml_13.png" alt="" >}}{{</image>}}

2. Click on the slider that exists on the right side of the application name in Ping Identity, to enable the app.

    {{<image filename="images/rc/saml/ping_identity_saml_14.png" alt="" >}}{{</image>}}

## Step 4 - Return to Redis Cloud SM

1. Return to Redis Cloud SM, and now click on the **Activate** button

    {{<image filename="images/rc/saml/ping_identity_saml_19.png" alt="" >}}{{</image>}}

2. A popup will appear, explaining that in order to test the SAML connection, that we need to login with credentials of a user defined in Ping Federate.

    {{<image filename="images/rc/saml/sm_saml_13.png" alt="" >}}{{</image>}}

3. The Ping Federate login screen will appear, enter the credentials and click **Sign In**

    {{<image filename="images/rc/saml/ping_identity_saml_20.png" alt="" >}}{{</image>}}

4. If the test has succeeded, you will see the following screen. Your local account is now considered a SAML account. In order to login to SM going forward, you click on the **Sign in with SSO** button.

    {{<image filename="images/rc/saml/sm_saml_11.png" alt="" >}}{{</image>}}

5. In the screen, enter your SAML email and click *Login*

    {{<image filename="images/rc/saml/ad_saml_21.png" alt="" >}}{{</image>}}

6. **Congratulations!!!** You have successfully configured SAML as an identification provider

    {{<image filename="images/rc/saml/ping_identity_saml_15.png" alt="" >}}{{</image>}}

## IdP initiated SSO

`https://app.redislabs.com/#/login/?idpId=`

1. In Ping Identity, go to **Administrators > Connections > Applications** and select your application name. Select the **Configuration** tab and click **Edit**.

2. Go to **Target Application URL** and enter: **https://{enviroment}/#/login/?idpId={idpId}**, where idpId is the ID found in the Location field, after the last '/'

3. Click on the **Save** button

    {{<image filename="images/rc/saml/ping_identity_saml_16.png" alt="" >}}{{</image>}}

4. Go to **https://apps.pingone.com/{environment}/myapps/#**, where environment is the environment ID, found in **Administrators -> Environment** for your app.

    {{<image filename="images/rc/saml/ping_identity_saml_17.png" alt="" >}}{{</image>}}

5. You will be redirected to the Redis Cloud admin console.

