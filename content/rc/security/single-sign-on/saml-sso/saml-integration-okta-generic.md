---
Title: Okta SAML integration guide (Generic)
linkTitle: Okta integration (Generic)
description: This integration guide shows how to set up Okta as a SAML single sign on provider for your Redis Cloud account.
weight: 52
alwaysopen: false
categories: ["RC"]
---

This guide shows how to configure [Okta](https://help.okta.com/en-us/Content/Topics/Security/Identity_Providers.htm) as a SAML single sign on identity provider (IdP) for your Redis Cloud account.

This guide shows how to use the Generic application template; you can also use the [Org2Org]({{<relref "/rc/security/single-sign-on/saml-sso/saml-integration-okta-org2org">}}) application template.

To learn more about Redis Cloud support for SAML, see [SAML single sign on]({{<relref "/rc/security/single-sign-on/saml-sso">}}).

## Step 1 - Setup your demo identity provider (IdP)

### Create the OKTA SAML integration application

1. Once you are logged into the OKTA admin console, we will first need to **create a SAML app integration**.

* Click "Applications" in the left hand menu

* Click the "Create App Integration" button

    {{<image filename="images/rc/saml/okta_saml_app_int_1.png" alt="" >}}{{</image>}}

2. In the following screen, select **SAML 2.0** and click on the **Next** button.

    {{<image filename="images/rc/saml/okta_saml_app_int_2.png" alt="" >}}{{</image>}}

3. Enter the following fields for the SAML application "General Settings" section:

    * App name : **Redis Cloud**

    * App logo : Upload a [Redis icon](https://saml-integration-logo.s3.amazonaws.com/redis-cube-red_white-rgb.png)

    * Click the **Next** button

    {{<image filename="images/rc/saml/okta_saml_app_int_3.png" alt="" >}}{{</image>}}

4. In the **Configure SAML** tab, we will start by entering the following data under the **general** section :

    * Single sign on URL : **http://www.fake.com** -> This is a temporary fake url we will modify later
    * Audience URI (SP Entity ID) : **http://www.fake.com** -> This is a temporary fake url we will modify later
  
    > NOTE : Only fill in the **Default RelayState** field if you need your SAML flow to be IdP initiated

    * Default RelayState : **https://app.redislabs.com/#/login/?idpId=XXXXXX** -> We will need to complete this url with the idpId later. 
  
    * Name ID format : **Unspecified**
    * Application username : **Okta username**
    * Update application username on : **Create and update**

    {{<image filename="images/rc/saml/okta_saml_app_int_4.png" alt="" >}}{{</image>}}

    Next, we need to add **Attribute Statements** which are needed for the configuration :

    First Attribute

    * Name : **redisAccountMapping**
    * Name Format : **Basic**
    * Value : **appuser.redisAccountMapping**

    Second Attribute
    * Name : **FirstName**
    * Name Format : **Basic**
    * Value : **user.firstName**

    Third Attribute
    * Name : **LastName**
    * Name Format : **Basic**
    * Value : **user.lastName**

    Fourth Attribute
    * Name : **Email**
    * Name Format : **Basic**
    * Value : **user.login**

    {{<image filename="images/rc/saml/okta_saml_app_int_5.png" alt="" >}}{{</image>}}

    Once you are done entering the information, click on the **Next** button.

5. The last step is an optional feedback step for Okta the **I'm an Okta customer adding an internal app** and click the **Finish** button.

    {{<image filename="images/rc/saml/okta_saml_app_int_6.png" alt="" >}}{{</image>}}

6. Next, scroll down the page of your newly created app integration and click on the **View Setup Instructions** button. This will open a new browser window and will give us the information needed to configure the IdP in Redis Cloud.

    {{<image filename="images/rc/saml/okta_saml_app_int_7.png" alt="" >}}{{</image>}}

   Scroll down to section 6 in the page, and note down the following information :
   
    * **Identity Provider Single Sign-On URL**
    * **Identity Provider Issuer**
    * **X.509 Certificate**

    {{<image filename="images/rc/saml/okta_saml_app_int_8.png" alt="" >}}{{</image>}}

   Once you have the information noted, you can close the window.

### Modify the application user profile

1. Click on "Directory" -> "Profile Editor" in the left hand menu, and choose the **Redis Cloud User**.

    {{<image filename="images/rc/saml/okta_saml_app_int_9.png" alt="" >}}{{</image>}}

2. We need to **add the custom attribute** to our user profile, this attribute will specify what Redis Cloud role the user has and on what SM account. Click on the **Add Attribute** button

    {{<image filename="images/rc/saml/okta_saml_app_int_10.png" alt="" >}}{{</image>}}

3. Fill in the following information for the new custom attribute.

    * Data type : **string array**
    * Display name : **redisAccountMapping**
    * Variable name : **redisAccountMapping**
    * Description : **redisAccountMapping**
    * Attribute required: **Yes**
    * Group priority : **Combine values across groups**

    {{<image filename="images/rc/saml/okta_saml_app_int_11.png" alt="" >}}{{</image>}}

4. Once the attribute has been added, it will appear in the list of attributes for the profile.

    {{<image filename="images/rc/saml/okta_saml_9.png" alt="" >}}{{</image>}}

## <a name="createtestuser">Step 2</a> - Create a group and assign the application

Now that our SAML IdP is configured, we need to create an OKTA group and assign the "Redis Cloud" application.

### Create the group

1. Click on "Directory" -> "Groups" in the left hand menu, and click on the **Add group** button.

    {{<image filename="images/rc/saml/okta_saml_group_1.png" alt="" >}}{{</image>}}

2. In the Add group popup, fill in the following information :
 
    * **Name**
    * **Description**

    {{<image filename="images/rc/saml/okta_saml_group_2.png" alt="" >}}{{</image>}}

    {{<image filename="images/rc/saml/okta_saml_group_3.png" alt="" >}}{{</image>}}

### Assign your users to the group

1. Click on the group and then click the "Assign people" button.

    {{<image filename="images/rc/saml/okta_saml_group_4.png" alt="" >}}{{</image>}}

2. For each user you wish to add to the group, highlight the user in the table and click on the **"+"** button. You can also use the "Add all" button if needed. Once you have added all the people to your group, click on the **"Save"** button.

    {{<image filename="images/rc/saml/okta_saml_group_5.png" alt="" >}}{{</image>}}


### Assign the application to the group

Now that your group is populated with its users, it is time to assign the SAML integration application to your group. From the menu "Applications" -> "Applications" -> "Redis Cloud" :

1. Click on the **Assign to groups** menu item.

    {{<image filename="images/rc/saml/okta_saml_group_6.png" alt="" >}}{{</image>}}

2. In the "Redis Cloud User Group" click on the "Assign" link.

    {{<image filename="images/rc/saml/okta_saml_group_7.png" alt="" >}}{{</image>}}

3. You will now define the redis account mapping string default for this group and click **"Save and go back"**. The key-value pair consists of the **lower-cased role name** (ie owner, member, manager, or viewer) AND your **Redis Cloud Account ID** found in the [account settings]({{<relref "rc/accounts/account-settings">}}). Click **"Done"**.

    {{<image filename="images/rc/saml/okta_saml_group_8.png" alt="" >}}{{</image>}}

4. The mapping field has now been defined as a default for each member of the group.

    {{<image filename="images/rc/saml/okta_saml_group_9.png" alt="" >}}{{</image>}}

### Editing the mapping field for the group

To modify the Redis mapping field, select the pencil icon of the Redis Cloud group in the "Redis Cloud" application screen.

{{<image filename="images/rc/saml/okta_saml_group_10.png" alt="" >}}{{</image>}}

You can modify the mapping field for the whole group on the edit screen that appears.

{{<image filename="images/rc/saml/okta_saml_group_11.png" alt="" >}}{{</image>}}

### Editing the mapping field for a specific user

It is also possible to override the Redis mapping field at an individual user level. In order to do so, click on the "People" menu of the screen, and then on the "pencil" icon of the person you wish to modify the field for.

{{<image filename="images/rc/saml/okta_saml_group_15.png" alt="" >}}{{</image>}}

Next, we need to set the user's "Assignment master" to "Administrator". This will allow us to override the group's policy. We then click on the **"Save"** button.

{{<image filename="images/rc/saml/okta_saml_group_13.png" alt="" >}}{{</image>}}

The user's **Type** is set to **Individual**.

{{<image filename="images/rc/saml/okta_saml_group_14.png" alt="" >}}{{</image>}}

Select the pencil icon of the user to modify the Redis mapping field on the screen that appears.

{{<image filename="images/rc/saml/okta_saml_group_15.png" alt="" >}}{{</image>}}

{{<image filename="images/rc/saml/okta_saml_group_16.png" alt="" >}}{{</image>}}

## Step 3 - Configuring SAML support in Redis Cloud

Now that we have a test IdP server ready and our user group, we need to configure support for SAML in Redis Cloud.

### Sign in to your Redis Cloud SM account

Sign in to your SM account at [https://app.redislabs.com/#/login](https://app.redislabs.com/#/login)

### Activate SAML in Access Management

To activate SAML, you must have a local user (or social sign-on user) with the **owner** role. If you have the correct permissions, you will see the **Single Sign-On** tab.

1. Fill in the information you saved in [step 6 previously](#step6) in the **setup** form. This includes :

    * **Identity Provider Single Sign-On URL:**
    * **Identity Provider Issuer**
    * **X.509 Certificate**

    {{<image filename="images/rc/saml/sm_saml_1.png" alt="" >}}{{</image>}}

    {{<image filename="images/rc/saml/sm_saml_2.png" alt="" >}}{{</image>}}

2. Once you click the **enable** button, wait a few seconds for the status to change. You will then be able to **download** the service provider (SP) metadata. Save the file to your local hard disk.

    {{<image filename="images/rc/saml/sm_saml_3.png" alt="" >}}{{</image>}}

3. Open the file in any text editor, and there are 2 pieces of information that you need to copy and mark down:

    * **EntityID** : The unique name of the service provider (SP)

    {{<image filename="images/rc/saml/sm_saml_4.png" alt="" >}}{{</image>}}

    * **Location** : The location of the assertion consumer service

    {{<image filename="images/rc/saml/sm_saml_5.png" alt="" >}}{{</image>}}

4. Return to OKTA, select **Applications > Redis Cloud > General** and select **Edit**.

    {{<image filename="images/rc/saml/okta_saml_app_int_12.png" alt="" >}}{{</image>}}

5. Then, navigate to **Configure SAML** (step 2) and update the following information:

    * SAML Settings General

        * **Single sign on URL** : Use the information that you copied for **Location**
        * **Audience URI (SP Entity ID)** : Use the information that you copied for **EntityID**
        * **Default RelayState** : **Only needed if you want to have an IdP initiated flow**. Take the ID from the location URL in step 3 (the content after the last forward slash "/") and append to the url (ex: https://app.redislabs.com/#/login/?idpId=YOUR_LOCATION_ID).

    {{<image filename="images/rc/saml/okta_saml_app_int_13.png" alt="" >}}{{</image>}}

    Once you have entered the information, click on the **Next** button, and finally click on the **Finish** button in feedback step.

### Return to Redis Cloud SM

1. Return to Redis Cloud SM, and now click on the **Activate** button

    {{<image filename="images/rc/saml/sm_saml_8.png" alt="" >}}{{</image>}}

2. A popup will appear, explaining that in order to test the SAML connection, that we need to login with OKTA credentials of a user defined in the Redis Cloud group. This is a user who is part of the group that we assigned the Redis Cloud application to.

    {{<image filename="images/rc/saml/sm_saml_9.png" alt="" >}}{{</image>}}

3. The OKTA login screen will appear, enter the credentials and click **Sign In**

    {{<image filename="images/rc/saml/okta_saml_app_int_14.png" alt="" >}}{{</image>}}

4. If the test has succeeded, you will see the following screen. Your local account is now considered a SAML account. In order to login to SM going forward, you click on the **Sign in with SSO** button.

    {{<image filename="images/rc/saml/sm_saml_11.png" alt="" >}}{{</image>}}

5. In the screen, enter your SAML email and click *Login*

    {{<image filename="images/rc/saml/okta_saml_app_int_15.png" alt="" >}}{{</image>}}

6. If there is only one user defined in the SM account, you will get the following popup window. Click on the **confirm** to convert the local user to a SAML user. 

    * The user will be converted into a SAML user, and thus it is a good practice to have one more local user other than a SAML user.

    {{<image filename="images/rc/saml/okta_saml_app_int_16.png" alt="" >}}{{</image>}}

7. **Congratulations!!!** You have successfully configured SAML as an identity provider.

    {{<image filename="images/rc/saml/okta_saml_app_int_17.png" alt="" >}}{{</image>}}

    {{<image filename="images/rc/saml/okta_saml_app_int_18.png" alt="" >}}{{</image>}}
