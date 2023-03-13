---
Title: Okta SAML integration guide (Org2Org)
linkTitle: Okta integration (Org2Org)
description: This integration guide shows how to set up Okta as a SAML single sign on provider for your Redis Cloud account.
weight: 53
alwaysopen: false
categories: ["RC"]
---

This guide shows how to configure [Okta](https://help.okta.com/en-us/Content/Topics/Security/Identity_Providers.htm) as a SAML single sign on identity provider (IdP) for your Redis Cloud account.

This guide shows how to use the Org2Org application template; you can also use the [Generic]({{<relref "/rc/security/single-sign-on/saml-sso/saml-integration-okta-generic">}}) application template.

To learn more about Redis Cloud support for SAML, see [SAML single sign on]({{<relref "/rc/security/single-sign-on/saml-sso">}}).


## Step 1 - Set up your identity provider 

### Create the OKTA SAML integration application

You need to create an Okta "Org2Org" SAML integration appliction.  To do so:

1. Sign in to the OKTA admin console.

1. From the menu on the left, select **Applications**.

1. Select **Browse App Catalog**.

1. Locate and select **Okta Org2Org**

    {{<image filename="images/rc/saml/okta_saml_1.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

2. Once you have found the application, click "Add".

    {{<image filename="images/rc/saml/okta_saml_2.png" alt="Data transformaiton Pipeline" >}}{{</image>}}

3. Enter the following fields for the **Org2Org** application **General Settings** section:

* Application label : **Redis Cloud**

* Click **Next**.

    {{<image filename="images/rc/saml/okta_saml_3.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}


4. Enter the following fields in the **Sign-On Options > Attributes** section:

    * Name : **redisAccountMapping**
    * Name Format : **Basic**
    * Value : **appuser.redisAccountMapping**

    {{< warning >}}
Make sure to fill in the value field correctly with **appuser.redisAccountMapping**. If this is not done, the role mapping will not take effect. It is easy to overlook this step.
    {{< /warning >}}

    {{<image filename="images/rc/saml/okta_saml_4.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

5. Next, select **View Setup Instructions**. This will open a new browser window and will give us the information needed to configure the IdP in Redis Cloud.

    {{<image filename="images/rc/saml/okta_saml_5.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

<a name="step6">6.</a> Scroll down to section 6 in the page, and note down the following information :

* **IdP Issuer URI**
* **IdP Single Sign-On Url**
* **IdP Signature Certificate**: Click the link and download the certificate to your hard drive

    {{<image filename="images/rc/saml/okta_saml_6.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

    Once you have the information noted, close the window, go back to the OKTA admin console, and select **Done**.

### Modify the application user profile

1. Click on **Directory > Profile Editor** in the left hand menu, and choose **Redis Cloud User**.

    {{<image filename="images/rc/saml/okta_saml_7_customer.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

2. We need to **add the custom attribute** to our user profile, this attribute will specify what Redis Cloud role the user has and on what SM account. Select **Add Attribute**.

    {{<image filename="images/rc/saml/okta_saml_7_5_customer.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

3. Fill in the following information for the new custom attribute:

* Data type : **string array**
* Display name : **redisAccountMapping**
* Variable name : **redisAccountMapping**
* Description : **redisAccountMapping**
* Attribute required: **Yes**
* Group priority : **Combine values across groups**

    {{<image filename="images/rc/saml/okta_saml_app_int_11.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}


4. Once the attribute has been added, it will appear in the list of attributes for the profile.

    {{<image filename="images/rc/saml/okta_saml_9.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

5. We suggest adding a Redis Cloud icon to the application since it will be easier for user's to identify to the application. Click on the "pencil" icon on the application logo and upload a Redis image following the steps below:

    {{<image filename="images/rc/saml/okta_saml_10_customer.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

    {{<image filename="images/rc/saml/okta_saml_11_customer.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

## Step 2 - Create a group and assign the application {#createtestuser}

Now that our SAML IdP is configured, we need to create an OKTA group and assign the "Redis Cloud" application.

### Create the group

1. Select **Directory > Groups** in the left hand menu, and click **Add group**.

    {{<image filename="images/rc/saml/okta_saml_group_1.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

2. Fill in the following information:

* **Name**
* **Description**

    {{<image filename="images/rc/saml/okta_saml_group_2.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

    {{<image filename="images/rc/saml/okta_saml_group_3.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

### Assign your users to the group

1. Click on the group and then select **Assign people**.

    {{<image filename="images/rc/saml/okta_saml_group_4.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

2. For each user you wish to add to the group, highlight the user in the table and click **+**. You can also select **Add all** to add all users. Once you have added all the users to your group, click **Save**.

    {{<image filename="images/rc/saml/okta_saml_group_5.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

### Assign the application to the group

Now that your group is populated with its users, it is time to assign the SAML integration application to your group. From the menu, select **Applications > Applications > Redis Cloud** :

1. Select **Assign to groups**.

    {{<image filename="images/rc/saml/okta_saml_group_6.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

2. In the **Redis Cloud User Group**, click **Assign**.

    {{<image filename="images/rc/saml/okta_saml_group_7.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

3. You will now define the redis account mapping string default for this group and click **"Save and go back"**. The key-value pair consists of the **lower-cased role name** (ie owner, member, manager, or viewer) AND your **Redis Cloud Account ID** found in the [account settings]({{<relref "rc/accounts/account-settings">}}). Click **"Done"**.

    {{<image filename="images/rc/saml/okta_saml_group_8.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

4. The mapping field has now been defined as a default for each member of the group. 

    {{<image filename="images/rc/saml/okta_saml_group_9.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

### Editing the mapping field for the group

To modify the Redis mapping field, select the pencil icon of the Redis Cloud group in the "Redis Cloud" application screen.

{{<image filename="images/rc/saml/okta_saml_group_10.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

You can modify the mapping field for the whole group on the edit screen that appears.

{{<image filename="images/rc/saml/okta_saml_group_11.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

### Editing the mapping field for a specific user

To override the Redis mapping field at an individual user level, select the **People** menu, and then on the pencil icon of the person you wish to modify the field for.

{{<image filename="images/rc/saml/okta_saml_group_12.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

Set the user's "Assignment master" to "Administrator". This will allow us to override the group's policy. Select **Save**.

{{<image filename="images/rc/saml/okta_saml_group_13.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

The user's **Type** is set to **Individual**.

{{<image filename="images/rc/saml/okta_saml_group_14.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

Select the pencil icon of the user to modify the Redis mapping field on the screen that appears.

{{<image filename="images/rc/saml/okta_saml_group_15.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

{{<image filename="images/rc/saml/okta_saml_group_16.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

## Step 3 - Configuring SAML support in Redis Cloud

Now that we have a test IdP server ready and our user group, we need to configure support for SAML in Redis Cloud.

### Login to your Redis Cloud SM account

Login to your SM account at [https://app.redislabs.com/#/login](https://app.redislabs.com/#/login)

### Activate SAML in Access Management

In order to activate SAML, you must have a local user (or social sign-on user) with the **owner** role. If you have the correct permissions, you will see the **Single Sign-On** tab.

1. Fill in the information you saved in [step 6 previously](#step6) in the **setup** form. This includes :

* **Issuer (IdP Entity ID)** - required
* **IdP server URL** - required
* **Assertion signing certificate** - drag and drop the file you downloaded to disk in the form textarea

    {{<image filename="images/rc/saml/sm_saml_1.png" alt="Use the Okta admin console to locate the Org2Org application template." >}}{{</image>}}

    {{<image filename="images/rc/saml/sm_saml_2.png" alt="" >}}{{</image>}}

2. Select **Enable** and wait a few seconds for the status to change. You will then be able to **Download** the service provider (SP) metadata. Save the file to your local hard disk.

    {{<image filename="images/rc/saml/sm_saml_3.png" alt="" >}}{{</image>}}

3. Open the file in any text editor. Save the following text from the metadata:

* **EntityID** : The unique name of the service provider (SP)

    {{<image filename="images/rc/saml/sm_saml_4.png" alt="" >}}{{</image>}}

* **Location** : The location of the assertion consumer service

    {{<image filename="images/rc/saml/sm_saml_5.png" alt="" >}}{{</image>}}


4. Return to OKTA, select **Applications > Redis Cloud > General** and select **Edit**.

    {{<image filename="images/rc/saml/sm_saml_6.png" alt="" >}}{{</image>}}

5. Update the following information:

* Advanced Sign-on Settings

    * **Hub ACS URL** : Use the information that you copied for **Location**
    * **Audience URI** : Use the information that you copied for **EntityID**

    {{<image filename="images/rc/saml/sm_saml_7.png" alt="" >}}{{</image>}}


Once you have entered the information, click on the **Save** button

### IdP initiated SSO

To use IdP-initiated SSO with certain identity providers, you also need to set the RelayState parameter to the following URL:

`https://app.redislabs.com/#/login/?idpId=<ID>`

{{< note >}}
Replace <ID> so it matches the AssertionConsumerService Location URL’s ID (the content after the last forward slash "/"). To learn more about how to configure service provider apps, see your identity provider’s documentation.
{{< /note >}}

### Return to Redis Cloud SM

1. Return to Redis Cloud SM and select **Activate**.

    {{<image filename="images/rc/saml/sm_saml_8.png" alt="" >}}{{</image>}}

2. A popup will appear, explaining that in order to test the SAML connection, that we need to login with OKTA credentials of a user defined in the Redis Cloud group. This is a user who is part of the group that we assigned the Redis Cloud application to.

    {{<image filename="images/rc/saml/sm_saml_9.png" alt="" >}}{{</image>}}

3. The OKTA login screen will appear. Enter the credentials and click **Sign In**.

    {{<image filename="images/rc/saml/sm_saml_10.png" alt="" >}}{{</image>}}

4. If the test has succeeded, you will see the following screen. Your local account is now considered a SAML account. In order to log in to SM going forward, select **Sign in with SSO**.

    {{<image filename="images/rc/saml/sm_saml_11.png" alt="" >}}{{</image>}}

5. Enter your SAML email and click **Login**

    {{<image filename="images/rc/saml/sm_saml_12.png" alt="" >}}{{</image>}}

6. **Congratulations!!!** You have successfully configured SAML as an identity provider.

    {{<image filename="images/rc/saml/sm_saml_13.png" alt="" >}}{{</image>}}