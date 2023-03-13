---
Title: Auth0 SAML integration guide
linkTitle: Auth0 integration
description: This integration guide shows how to configure Auth0 as a SAML single sign on provider for your Redis Cloud account.
weight: 58
alwaysopen: false
categories: ["RC"]
---

This guide shows how to configure [Auth0](https://auth0.com/docs) as a SAML single sign-on identity provider (IdP) for your Redis Cloud account.

To learn more about Redis Cloud support for SAML, see [SAML single sign-on]({{<relref "/rc/security/single-sign-on/saml-sso">}}).

## Step 1 - Set up your identity provider (IdP)

### Specify the SAML owner

1. Sign in to your Auth0 account and navigate to **User Management > Users**.
   * Select the SAML owner.
   * Verify the details

    SAML assertion requires first and last name, which are not available in the default user profile. 

    > **Note**: Depending how they are created, users can have different profiles. See Sample User Profiles.

    {{<image filename="images/rc/saml/auth0_saml_1.png" alt="" >}}{{</image>}}

2. Add **user_metadata** to fulfill the SAML assertion then click the **Save** button. The key-value pair of **redisAccountMapping** consists of the **lower-cased role name** (owner, member, manager, or viewer) AND your **Redis Cloud Account ID** found in the [account settings]({{<relref "rc/accounts/account-settings">}}).

    ```
    {
       "FirstName": "Test",
       "LastName": "User",
       "redisAccountMapping": "98072=owner"
    }
    ```

    {{<image filename="images/rc/saml/auth0_saml_2.png" alt="" >}}{{</image>}}

3. Open **Auth Pipeline → Rules** and click the **Create** button

    {{<image filename="images/rc/saml/auth0_saml_3.png" alt="" >}}{{</image>}}

4. Pick a rule template → **Empty rule**

5. Provide a **name** for the rule and add the following script:

    ```
    function mapSamlAttributes(user, context, callback) {
      user.user_metadata = user.user_metadata || {};
      context.samlConfiguration.mappings = {
         "Email": "email",
         "LastName":  "user_metadata.LastName",
         "FirstName": "user_metadata.FirstName",
         "redisAccountMapping": "user_metadata.redisAccountMapping"
      };
      callback(null, user, context);
    }
    ```

    Once done, click on the **Save Changes** button

    {{<image filename="images/rc/saml/auth0_saml_4.png" alt="" >}}{{</image>}}

### Create and configure the SAML application

6. Open **Applications → Applications** and click on the **Create Application** button

    {{<image filename="images/rc/saml/auth0_saml_5.png" alt="" >}}{{</image>}}

7. Provide a **nam**e for the Application and select the  **Single Page Web Applications** type. Once done click the **Create** button.

    {{<image filename="images/rc/saml/auth0_saml_6.png" alt="" >}}{{</image>}}

8. From the newly created application, go to **Settings → Advanced Settings → Certificates**

    * Copy the **Signing Certificate** and save it for later, this information will be needed to configure SAML in SM.

    {{<image filename="images/rc/saml/auth0_saml_7.png" alt="" >}}{{</image>}}

    * We suggest that you update the default logo of the application to the [Redis icon](https://saml-integration-logo.s3.amazonaws.com/redis-cube-red_white-rgb.png) for better visibility. 

9. From the newly created application, go to **Addons** and enable **SAML 2 WEB APP**

    {{<image filename="images/rc/saml/auth0_saml_8.png" alt="" >}}{{</image>}}

10. From the **Usage** tab :

    * Copy and save the **Issuer** value 
    * Copy and save the **Identity Provider Login URL**
    
    Both of these values, along with the certificate value you copied in the previous step will be needed to configure SAML in SM.

    {{<image filename="images/rc/saml/auth0_saml_9.png" alt="" >}}{{</image>}}

## Step 2 - Configuring SAML support in Redis Cloud

Now that we have our Auth0 IdP server ready, we need to configure support for SAML in Redis Cloud.

### Login to your Redis Cloud SM account

Login to your SM account at [https://app.redislabs.com/#/login](https://app.redislabs.com/#/login)

### Activate SAML in Access Management

In order to activate SAML, you must have a local user (or social sign-on user) with the **owner** role. If you have the correct permissions, you will see the **Single Sign-On** tab.

1. Fill in the information you saved previously in the **setup** form. This includes :

    * **Issuer (IdP Entity ID)** -> Issuer value from Auth0
    * **IdP server URL** -> Identity Provider Login URL from Auth0
    * **Assertion signing certificate** - Certificate value from Auth0

    You will also have to add :

    * **Email domain binding** - The domain used in your company's email addresses

    {{<image filename="images/rc/saml/auth0_saml_11.png" alt="" >}}{{</image>}}

    Once you click the **enable** button, wait a few seconds for the status to change.

2. You will then be able to **download** the service provider (SP) metadata. Save the file to your local hard disk.

    {{<image filename="images/rc/saml/auth0_saml_15.png" alt="" >}}{{</image>}}

3. Open the file in any text editor, and there are 2 pieces of information that you need to copy and mark down:

    * **EntityID** : The unique name of the service provider (SP)

    {{<image filename="images/rc/saml/sm_saml_4.png" alt="" >}}{{</image>}}

    * **Location** : The location of the assertion consumer service

    {{<image filename="images/rc/saml/sm_saml_5.png" alt="" >}}{{</image>}}

## Step 3 - Finish SAML configuration in Auth0

1. Go back to the Auth0 SAML application and select **Addons -> Settings**:

    {{<image filename="images/rc/saml/auth0_saml_10.png" alt="" >}}{{</image>}}

    * Paste **Location** link in **Application Callback URL** field

    * Update the **Settings** code area and add this code. Please make sure to modify the **audience** variable with the **EntityID** value from the metadata file you downloaded. Also, modify the **recipient** variable with the **Location** value from the metadata file you downloaded.

    ```
    {
      "audience": "ENTITYID VALUE FROM FILE",
      "recipient": "LOCATION VALUE FROM FILE",
      "passthroughClaimsWithNoMapping": false,
      "nameIdentifierProbes": [
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ]
    }
    ```

    Scroll down and **Save** the configuration


### IdP initiated SSO

To use IdP-initiated SSO with certain identity providers, you also need to set the RelayState parameter to the following URL:

`https://app.redislabs.com/#/login/?idpId=<ID>`

> **Note**: Replace <ID> so it matches the AssertionConsumerService Location URL’s ID (the content after the last forward slash "/"). To learn more about how to configure service provider apps, see your identity provider’s documentation.


## Step 4 - Return to Redis Cloud SM

1. Return to Redis Cloud SM, and now click on the **Activate** button

    {{<image filename="images/rc/saml/sm_saml_8.png" alt="" >}}{{</image>}}

2. A popup will appear, explaining that in order to test the SAML connection, that we need to login with credentials of a user defined in Auth0.

    {{<image filename="images/rc/saml/sm_saml_9.png" alt="" >}}{{</image>}}

3. The Auth0 login screen will appear, enter the credentials and click **Sign In**

    {{<image filename="images/rc/saml/auth0_saml_12.png" alt="" >}}{{</image>}}

4. If the test has succeeded, you will see the following screen. Your local account is now considered a SAML account. In order to login to SM going forward, you click on the **Sign in with SSO** button.

    {{<image filename="images/rc/saml/sm_saml_11.png" alt="" >}}{{</image>}}

5. In the screen, enter your SAML email and click *Login*

    {{<image filename="images/rc/saml/auth0_saml_13.png" alt="" >}}{{</image>}}

6. **Congratulations!!!** You have successfully configured SAML as an identification provider

    {{<image filename="images/rc/saml/auth0_saml_14.png" alt="" >}}{{</image>}}

