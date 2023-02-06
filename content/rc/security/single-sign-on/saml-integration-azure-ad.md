---
Title: Azure Active Directory SAML integration guide
linkTitle: Azure AD integration
description: This integration guide shows how to set up Microsoft Azure Active Directory (Azure AD) as a SAML single sign on provider for your Redis Cloud account.
weight: 54
alwaysopen: false
categories: ["RC"]
---

This guide shows how to configure [Microsoft Azure Active Directory](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-architecture) (Azure AD) as a SAML single sign on identity provider (IdP) for your Redis Cloud account.

To learn more about Redis Cloud support for SAML, see [SAML single sign on]({{<relref "/rc/security/single-sign-on/saml-sso">}}).

## Step 1 - Set up your identity provider (IdP)

### Create the Azure AD SAML Toolkit integration application

1. Sign in to Microsoft Azure account.

1.  From the main menu, select **Azure Active Directory → Enterprise Applications**

    {{<image filename="/images/rc/saml/ad_saml_1.png" alt="" >}}{{</image>}}

2. Add a **New Application** → search for Azure AD SAML Toolkit

    {{<image filename="/images/rc/saml/ad_saml_2.png" alt="" >}}{{</image>}}

3. Provide a name for the Application and **Create** it

    {{<image filename="/images/rc/saml/ad_saml_3.png" alt="" >}}{{</image>}}

4. Once the Application is created → select Properties and update the Redis logo (you can download anyone on the Internet), once done click on the **Save** button

    {{<image filename="/images/rc/saml/ad_saml_17.png" alt="" >}}{{</image>}}

    {{<image filename="/images/rc/saml/ad_saml_18.png" alt="" >}}{{</image>}}

5. Once the Application is created → **Set up single sign on**

    {{<image filename="/images/rc/saml/ad_saml_4.png" alt="" >}}{{</image>}}

6. Select **SAML** as the single sign-on method

    {{<image filename="/images/rc/saml/ad_saml_5.png" alt="" >}}{{</image>}}

7. Scroll down to **Step 4** in the configuration screen, and note down or copy the following information :

* **Login URL** -> Will be used as the "IdP server URL" in the SAML configuration in SM
* **Azure AD Identifier** -> Will be used as the "Issuer (IdP Entity ID)" in the SAML configuration in SM
  
    {{<image filename="/images/rc/saml/ad_saml_6.png" alt="" >}}{{</image>}}

8. Scroll up to **Step 3** in the configuration screen

* Certificate (Base 64) is needed in order to complete the SAML configuration in SM

    {{<image filename="/images/rc/saml/ad_saml_7.png" alt="" >}}{{</image>}}

9. Scroll up to **Step 1** in the configuration screen and enter some **dummy data** in the Required fields → **Save**

    {{<image filename="/images/rc/saml/ad_saml_8.png" alt="" >}}{{</image>}}

10. Once the dummy data has been entered, the **Certificate** becomes available for download

* Click the link and download the certificate to your hard drive

    {{<image filename="/images/rc/saml/ad_saml_9.png" alt="" >}}{{</image>}}

## Step 2 - Configuring SAML support in Redis Cloud

Now that we have our AD IdP server ready, we need to configure support for SAML in Redis Cloud.

### Login to your Redis Cloud SM account

Login to your SM account at [https://app.redislabs.com/#/login](https://app.redislabs.com/#/login)

### Activate SAML in Access Management

In order to activate SAML, you must have a local user (or social sign-on user) with the **owner** role. If you have the correct permissions, you will see the **Single Sign-On** tab.

1. Fill in the information you saved previously in the **setup** form. This includes :

* **Issuer (IdP Entity ID)** -> Azure AD Identifier
* **IdP server URL** -> Login URL
* **Assertion signing certificate** - drag and drop the certificate file you downloaded to disk in the form textarea

You will also have to add :

* **Email domain binding** - The domain used in your company's email addresses

    {{<image filename="/images/rc/saml/sm_saml_1.png" alt="" >}}{{</image>}}

Once you click the **enable** button, wait a few seconds for the status to change.

2. You will then be able to **download** the service provider (SP) metadata. Save the file to your local hard disk.

    {{<image filename="/images/rc/saml/ad_saml_10.png" alt="" >}}{{</image>}}

3. Open the file in any text editor, and there are 2 pieces of information that you need to copy and mark down:

* **EntityID** : The unique name of the service provider (SP)

    {{<image filename="/images/rc/saml/sm_saml_4.png" alt="" >}}{{</image>}}


* **Location** : The location of the assertion consumer service

    {{<image filename="/images/rc/saml/sm_saml_5.png" alt="" >}}{{</image>}}


## Step 3 - Finish SAML configuration in Azure AD

1. Go back to Azure setup and **Edit** the Basic SAML Configuration in **Step 1**. 
   
This is where we had entered dummy data, we will now enter the correct data for this step:

> **NOTE**: For the **EntityID** and **Location** fields below you can direct upload the metadata file using the option at the top of the page. However, you will still need to manually add the **Sign on URL**

* Paste **EntityID** information in the: 
  * Identifier (Entity ID) field
  

* Paste **Location** link in Reply URL (Assertion Consumer Service URL) field


* For the **Sign on URL** field, add the following URL: **https://app.redislabs.com/#/login/?idpId=** where you need to add the ID from the Reply URL’s ID. eg. https://app.redislabs.com/#/login/?idpId=0oa5pwatz2JfpfCb91d7

Once done, click on the **Save** button

{{<image filename="/images/rc/saml/ad_saml_23.png" alt="" >}}{{</image>}}

2. We will now scroll down to **Step 2** which is the Attributes & Claims section and click on the **Edit** button

{{<image filename="/images/rc/saml/ad_saml_24.png" alt="" >}}{{</image>}}

3. We need to configure certain different attributes and claims

* Modify Unique User Identifier (Name ID) to **user.mail**
  

* Modify Additional Claims to match SAML assertion as follows:
  
  * **Email** : user.mail
  * **FirstName** : user.givenname
  * **LastName** : user.surname
  * **redisAccountMapping** : "98072=owner"
    * -> Redis Cloud account IDs and user roles pairs, e.g. 123456=owner,987654=viewer

{{<image filename="/images/rc/saml/ad_saml_14.png" alt="" >}}{{</image>}}

4. In order to add a user to the application, we begin by clicking on **User and Groups** in the left hand menu and click on the **Add user/group** button.

{{<image filename="/images/rc/saml/ad_saml_15.png" alt="" >}}{{</image>}}

5. Next, we add the user and click on the **Assign** button

{{<image filename="/images/rc/saml/ad_saml_16.png" alt="" >}}{{</image>}}

## Step 4 - Return to Redis Cloud SM

1. Return to Redis Cloud SM, and now click on the **Activate** button

    {{<image filename="/images/rc/saml/sm_saml_8.png" alt="" >}}{{</image>}}

2. A popup will appear, explaining that in order to test the SAML connection, that we need to login with credentials of a user defined in Azure AD.

    {{<image filename="/images/rc/saml/sm_saml_9.png" alt="" >}}{{</image>}}

3. The Microsoft AD login screen will appear, enter the credentials and click **Sign In**

    {{<image filename="/images/rc/saml/ad_saml_19.png" alt="" >}}{{</image>}}

4. If the test has succeeded, you will see the following screen. Your local account is now considered a SAML account. In order to login to SM going forward, you click on the **Sign in with SSO** button.

    {{<image filename="/images/rc/saml/sm_saml_11.png" alt="" >}}{{</image>}}

5. In the screen, enter your SAML email and click *Login*

    {{<image filename="/images/rc/saml/ad_saml_21.png" alt="" >}}{{</image>}}

6. **Congratulations!!!** You have successfully configured SAML as an identification provider

    {{<image filename="/images/rc/saml/ad_saml_22.png" alt="" >}}{{</image>}}

## Claim conditions and user groups

Assuming that the users will be part of different Groups, you can create a Claim Condition for redisAccountMapping attribute :

{{<image filename="/images/rc/saml/ad_saml_20.png" alt="" >}}{{</image>}}


## IdP initiated SSO

``https://app.redislabs.com/#/login/?idpId=`

By default, the SAML application will appear on user’s **My Apps** panel

{{<image filename="/images/rc/saml/ad_saml_25.png" alt="" >}}{{</image>}}

While assigning the user to the app, there’s also a notification shown 

{{<image filename="/images/rc/saml/ad_saml_26.png" alt="" >}}{{</image>}}

Therefore, if you sign into into `https://myapplications.microsoft.com/`, the application will be available.

If the app is not available, make sure that the App is registered (it should be done automatically)

{{<image filename="/images/rc/saml/ad_saml_27.png" alt="" >}}{{</image>}}

{{<image filename="/images/rc/saml/ad_saml_28.png" alt="" >}}{{</image>}}

You can also access the app directly by using the **User access Url** from the App Properties