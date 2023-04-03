---
Title: Google Workspace SAML integration guide
linkTitle: Google workspace integration
description: This integration guide shows how to configure Google Workspace as a SAML single sign on provider for your Redis Cloud account.
weight: 10
alwaysopen: false
categories: ["RC"]
---

This guide shows how to configure [Google Workspace](https://workspace.google.com/) as a SAML single sign-on identity provider (IdP) for your Redis Cloud account.

To learn more about Redis Cloud support for SAML, see [SAML single sign-on]({{<relref "/rc/security/single-sign-on/saml-sso">}}).

## Step 1: Set up your identity provider (IdP)

### Create the Google Workspace SAML application

1. Sign in to your [Google Workspace admin account](https://admin.google.com/).

1. From the main menu, select **Apps** then **Web and mobile apps**.

   {{<image filename="images/rc/saml/google_workspace_saml_0.png" alt="" >}}{{</image>}}

1. Once in Web and mobile apps, select **Add custom SAML app** from the dropdown list.

   {{<image filename="images/rc/saml/google_workspace_saml_1.png" alt="" >}}{{</image>}}

1. To begin, change the **App name** and **Description** to **Redis Cloud**. You can also choose an **App icon** for the application. We suggest you upload a [Redis icon](https://saml-integration-logo.s3.amazonaws.com/redis-cube-red_white-rgb.png). Once complete, select **Continue**.

   {{<image filename="images/rc/saml/google_workspace_saml_2.png" alt="" >}}{{</image>}}

1. In the next screen, you will find all of the information needed to configure SAML in Redis Cloud. Select the **copy** button for the following information sections:

* SSO URL
* Entity ID
* Certificate

   {{<image filename="images/rc/saml/google_workspace_saml_3.png" alt="" >}}{{</image>}}

Once complete, select **Continue**.

## Step 2: Configure SAML support in Redis Cloud

Now that you have your Google Workspace IdP server information, configure support for SAML in Redis Cloud.

### Log in to your Redis Cloud account

Log in to your account at [Redis admin console](https://app.redislabs.com/#/login)

### Activate SAML in Access Management

To activate SAML, you must have a local user (or social sign-on user) with the `owner` role. If you have the correct permissions, you will see the **Single Sign-On** tab.

{{<image filename="images/rc/saml/aws_iam_identity_center_saml_7.png" alt="" >}}{{</image>}}

1. Add the information you saved previously in the **Google identity provider details** screen. This includes:

    * **Issuer (IdP Entity ID)**: `Entity ID`.
    * **IdP server URL**: `SSO URL`.
    * **Assertion signing certificate**: `Certificate`.

   Also add:

    * **Email domain binding**: The domain used in your company's email addresses.

      {{<image filename="images/rc/saml/google_workspace_saml_4.png" alt="" >}}{{</image>}}

   Select **Enable** and wait a few seconds for the status to change.

1. Select **Download** to get the service provider (SP) metadata. Save the file to your local hard disk.

   {{<image filename="images/rc/saml/google_workspace_saml_5.png" alt="" >}}{{</image>}}

1. Open the file in any text editor. Save the following text from the metadata:

    * **EntityID**: The unique name of the service provider (SP).

      {{<image filename="images/rc/saml/sm_saml_4.png" alt="" >}}{{</image>}}

   * **Location**: The location of the assertion consumer service.

  {{<image filename="images/rc/saml/sm_saml_5.png" alt="" >}}{{</image>}}

## Step 3: Add a custom attribute to Google Workspace's user profile

1. From the main menu in Google Workspace, select **Directory** then **Users**, and from the **more options** dropdown select **Manage custom attributes**.
   
   {{<image filename="images/rc/saml/google_workspace_saml_7.png" alt="" >}}{{</image>}}

1. From the **Manage user attributes** screen, select **Add Custom Attribute**.

   {{<image filename="images/rc/saml/google_workspace_saml_8.png" alt="" >}}{{</image>}}

1. Add the following information for the new custom attribute:

   * **Category**: `Redis Cloud`
   * **Name**: `redisAccountMapping`
   * **Info type**: `Text`
   * **Visibility**: `Visible to user and admin`
   * **No. of values**: `Single`

   {{<image filename="images/rc/saml/google_workspace_saml_9.png" alt="" >}}{{</image>}}

   Once complete, select **Add**. The summary page now displays the new **redisAccountMapping** custom field.

   {{<image filename="images/rc/saml/google_workspace_saml_10.png" alt="" >}}{{</image>}}

1. From the main menu in Google Workspace, select **Directory** then **Users**, then select the user you wish to configure. 

   {{<image filename="images/rc/saml/google_workspace_saml_11.png" alt="" >}}{{</image>}}

1. Each user who needs to access Redis Cloud through SAML needs to define the **redisAccountMapping** attribute. The `redisAccountMapping` key-value pair consists of the lowercase role name (owner, member, manager, or viewer) and your Redis Cloud Account ID found in the [account settings]({{<relref "rc/accounts/account-settings">}}).

   {{<image filename="images/rc/saml/google_workspace_saml_12.png" alt="" >}}{{</image>}}

   Once complete, select **Save**.

   {{<image filename="images/rc/saml/google_workspace_saml_13.png" alt="" >}}{{</image>}}

   Repeat this step for each user who needs to define the `redisAccountMapping` attribute.

## Step 4: Finish SAML configuration in Google Workspace's Redis Cloud Application

1. Return to the **Service provider details** screen in Google Workspace, and add the following information:

   * **ACS URL**: The EntityID from the downloaded service provider (SP) metadata
   * **Entity Id**: The Location from the downloaded service provider (SP) metadata

   {{<image filename="images/rc/saml/google_workspace_saml_6.png" alt="" >}}{{</image>}}

   Leave the **Name ID** default information as it is. Once complete, select **Continue**.

1. Configure the **Redis Cloud** application's attribute mappings. Select **Add Mapping**.

   {{<image filename="images/rc/saml/google_workspace_saml_14.png" alt="" >}}{{</image>}}

   In the next screen, map these attributes:

   * **Primary Email**: `Email`
   * **First name**: `FirstName`
   * **Last name**: `LastName`
   * **redisAccountMapping**: `redisAccountMapping`

   {{<image filename="images/rc/saml/google_workspace_saml_15.png" alt="" >}}{{</image>}}

   Once complete, select **Finish**.

1. Next, we need to turn on the Redis Cloud service for all users, select **Web and mobile apps** -> **Redis Cloud** and then **service status**. Select **ON for everyone**. Once complete, select **Save**.

   {{<image filename="images/rc/saml/google_workspace_saml_16.png" alt="" >}}{{</image>}}

## Step 5: Activate SAML integration

The final step in our SAML integration with AWS IAM identity Center is to activate the SAML integration.

1. In the Single Sign-On screen, select **Activate**.

   {{<image filename="images/rc/saml/google_workspace_saml_17.png" alt="" >}}{{</image>}}

A logout notification screen displays, letting you know that you are redirected to Google's login screen.

1. Select the Google account you wish to login with.

   {{<image filename="images/rc/saml/google_workspace_saml_18.png" alt="" >}}{{</image>}}

1. If everything is configured correctly, you should get a **SAML activation succeeded** message. From this point forward, users need to click **SSO** to log in to the Redis Cloud admin console.

   {{<image filename="images/rc/saml/google_workspace_saml_19.png" alt="" >}}{{</image>}}

A message displays, stating that your local user is now converted to a SAML user. Select **Confirm**.

You have successfully configured Google Workspace as an identification provider.

{{<image filename="images/rc/saml/google_workspace_saml_20.png" alt="" >}}{{</image>}}
