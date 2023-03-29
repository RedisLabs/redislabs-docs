---
Title: Auth0 SAML integration guide
linkTitle: Auth0 integration
description: This integration guide shows how to configure Auth0 as a SAML single sign on provider for your Redis Cloud account.
weight: 10
alwaysopen: false
categories: ["RC"]
---

This guide shows how to configure [Auth0](https://auth0.com/docs) as a SAML single sign-on identity provider (IdP) for your Redis Cloud account.

To learn more about Redis Cloud support for SAML, see [SAML single sign-on]({{<relref "/rc/security/single-sign-on/saml-sso">}}).

## Step 1: Set up your identity provider (IdP)

### Specify the SAML owner

1. Sign in to your Auth0 account and navigate to **User Management > Users**.
   * Select the SAML owner.
   * Verify the details.

    SAML assertion requires first and last name, which are not available in the default user profile. 

    > **Note**: Depending how they are created, users can have different profiles. 

    {{<image filename="images/rc/saml/auth0_saml_1.png" alt="" >}}{{</image>}}

1. Add `user_metadata` to fulfill the SAML assertion, then select **Save**. 
   
   {{<image filename="images/rc/saml/auth0_saml_2.png" alt="" >}}{{</image>}}

   The key-value pair of `redisAccountMapping` consists of a lowercase role name (owner, member, manager, or viewer) and your Redis Cloud Account ID found in the [account settings]({{<relref "rc/accounts/account-settings">}}).

    ```
    {
       "FirstName": "Test",
       "LastName": "User",
       "redisAccountMapping": "YOUR_REDIS_CLOUD_ID=owner"
    }
    ```

1. Open **Auth Pipeline > Rules** and select **Create**.

    {{<image filename="images/rc/saml/auth0_saml_3.png" alt="" >}}{{</image>}}

1. Pick a rule template then select **Empty rule**.

1. Provide a **name** for the rule and add the following script.

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

 1. Select **Save Changes**.

    {{<image filename="images/rc/saml/auth0_saml_4.png" alt="" >}}{{</image>}}

### Create and configure the SAML application

1. Open **Applications > Applications** and select **Create Application**.

    {{<image filename="images/rc/saml/auth0_saml_5.png" alt="" >}}{{</image>}}

1. Provide a **name** for the Application and select **Single Page Web Applications**. Select **Create**.

    {{<image filename="images/rc/saml/auth0_saml_6.png" alt="" >}}{{</image>}}

1. From the newly created application, go to **Settings > Advanced Settings > Certificates**.

    * Copy and save the **Signing Certificate**. You will need this information to configure SAML in admin console.

    {{<image filename="images/rc/saml/auth0_saml_7.png" alt="" >}}{{</image>}}

    * We suggest that you update the default logo of the application to the [Redis icon](https://saml-integration-logo.s3.amazonaws.com/redis-cube-red_white-rgb.png) for better visibility. 

1. From the newly created application, go to **Addons** and enable **SAML 2 WEB APP**.

    {{<image filename="images/rc/saml/auth0_saml_8.png" alt="" >}}{{</image>}}

1. From the **Usage** tab:

    * Copy and save the **Issuer** value.
    * Copy and save the **Identity Provider Login URL**.
    
    You will need both of these values, along with the certificate value you copied in the previous step, to configure SAML in admin console.

    {{<image filename="images/rc/saml/auth0_saml_9.png" alt="" >}}{{</image>}}

## Step 2: Configure SAML support in Redis Cloud

Now that you have you Auth0 IdP server ready, configure support for SAML in Redis Cloud.

### Log in to your Redis Cloud account

Log in to your account at [https://app.redislabs.com/#/login](https://app.redislabs.com/#/login)

### Activate SAML in Access Management

To activate SAML, you need to have a local user (or social sign-on user) with the **owner** role. If you have the correct permissions, you will see the **Single Sign-On** tab.

1. Fill in the information you saved previously in the **setup** form. This includes:

    * **Issuer (IdP Entity ID)**: Issuer value from Auth0
    * **IdP server URL**: Identity Provider Login URL from Auth0
    * **Assertion signing certificate**: Certificate value from Auth0

    You will also have to add:

    * **Email domain binding** - The domain used in your company's email addresses

    {{<image filename="images/rc/saml/auth0_saml_11.png" alt="" >}}{{</image>}}

    Once you click **Enable**, wait a few seconds for the status to change.

1. Download the service provider (SP) metadata. Save the file to your local hard disk.

    {{<image filename="images/rc/saml/auth0_saml_15.png" alt="" >}}{{</image>}}

1. Open the file in any text editor. Save the following text from the metadata:

    * **EntityID**: The unique name of the service provider (SP)

    {{<image filename="images/rc/saml/sm_saml_4.png" alt="" >}}{{</image>}}

    * **Location** : The location of the assertion consumer service

    {{<image filename="images/rc/saml/sm_saml_5.png" alt="" >}}{{</image>}}

## Step 3: Finish SAML configuration in Auth0

1. Return to the Auth0 SAML application and select **Addons > Settings**:

    {{<image filename="images/rc/saml/auth0_saml_10.png" alt="" >}}{{</image>}}

    * Paste the **Location** link in **Application Callback URL** field.

    * To update the **Settings** code area, add this code. Modify the `audience` variable with the `EntityID` value from the metadata file you downloaded. Also, modify the `recipient` variable with the `Location` value from the metadata file you downloaded.

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
    Scroll down and select **Save** to apply the configuration.

### IdP initiated SSO

To use IdP-initiated SSO with certain identity providers, you also need to set the `RelayState` parameter to this URL: 

`https://app.redislabs.com/#/login/?idpId=<ID>`

{{< note >}}
Replace `ID` so it matches the `AssertionConsumerService` Location URL ID (the content after the last forward slash "/"). To learn more about how to configure service provider apps, see your identity provider’s documentation.
{{</ note >}}

## Step 4: Return to the Redis Cloud admin console

1. Return to the Redis Cloud admin console and select **Activate**.

    {{<image filename="images/rc/saml/sm_saml_8.png" alt="" >}}{{</image>}}

   A popup appears, explaining that, in order to test the SAML connection, that we need to login with credentials of a user defined in Auth0.

    {{<image filename="images/rc/saml/sm_saml_9.png" alt="" >}}{{</image>}}

1. The Auth0 login screen appears. Enter the credentials and select **Sign In**.

    {{<image filename="images/rc/saml/auth0_saml_12.png" alt="" >}}{{</image>}}

1. If the test has succeeded, you will see the the admin console screen. Your local account is now considered a SAML account. To log in to the admin console from now on, click on **Sign in with SSO**.

1. Enter your SAML email and select **Login**. 

You have successfully configured SAML as an identification provider.

    {{<image filename="images/rc/saml/auth0_saml_14.png" alt="" >}}{{</image>}}

