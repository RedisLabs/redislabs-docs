---
Title: Billing & payments
linkTitle: Billing & payments
description: Describes how to view billing transactions and manage payment methods for Redis Enterprise Cloud subscriptions.   
weight: 39
alwaysopen: false
categories: ["RC"]
aliases: /rc/billing-and-payments/
         /rc/billing-and-payments.md
         /rv/administration/billing-history/
         /rc/administration/billing-history/
         /rc/administration/billing-history.md
         /rv/administration/payment-methods/
         /rc/administration/payment-methods/
         /rc/administration/payment-methods.md
---

The **Billing & Payments** screen:

- Shows recent transactions for your account
- Helps you manage your payment methods
- Applies coupon credits to your account

{{<image filename="images/rc/billing-billing-history-tab.png" alt="The Billing & Payments screen shows billing transactions and manage payment methods." >}}{{< /image >}}

The following tabs are available:

- The **Billing History** tab displays recent charges and payments.  Each transaction includes the following details:

    | Detail | Description | 
    |:-------|:------------|
    | Date   | Date the transaction was recorded |
    | Description | Description of the transaction |
    | Reference | Reference number |
    | Amount    | Transaction amount |

    When you select a billing transaction, a **Download** icon appears to the right of the amount.  

    {{<image filename="images/rc/icon-billing-download.png" width="30px" alt="Use the download icon to download a PDF for the selected invoice." >}}{{< /image >}}

    Select this to download a PDF invoice for the associated charge.

- The **Payment Methods** tab lists your current payment methods.  You can add a new payment method, associate different payment methods with specific subscriptions, and remove payment methods.

    {{<image filename="images/rc/billing-payment-method-tab.png" alt="The Payments Methods tab helps you manage payments for your subscriptions." >}}{{< /image >}}

    Select **Add Credit Card** to enter new credit card details.

- The **Credits** tab shows coupon credits that have been applied to your account, if any.

    {{<image filename="images/rc/billing-payments-credits-tab.png" alt="The Credits tab lets you apply coupons to your account and shows credits that have already been applied." >}}{{< /image >}}

    | Detail | Description | 
    |:-------|:------------|
    | Name   | Coupon name (code) |
    | Date added | Date applied to your account |
    | Amount    | Amount credited to your account |

    To apply a coupon, enter the code and then select the **Apply** button.

## Download invoice

To download an invoice:

1. Sign in to the Redis Cloud [admin portal](https://app.redislabs.com/).  (Create an account if you don't already have one.)

2.  Use the admin console menu to select **Billing & Payments** and then make sure the Billing History tab is selected. 

3.  Locate and select the invoice.

4.  Select the **Download invoice** icon displayed to the right of the invoice amount.

    {{<image filename="images/rc/icon-billing-download.png" width="50px" alt="Use the download icon to download a PDF for the selected invoice." >}}{{< /image >}}

The invoice is downloaded as an Acrobat PDF file.  Use your browser's download features to manage the file.

## Add payment method

To add a new payment method:

1. Sign in to the Redis Cloud [admin portal](https://app.redislabs.com/).  (Create an account if you don't already have one.)

2.  Use the admin console menu to select **Billing & Payments** and then select the **Payment Methods** tab.

3.  Select **Add credit card** and then provide the details.

    {{<image filename="images/rc/billing-add-credit-card.png" width="300px" alt="Select Add Credit Card to add a new payment method" >}}{{< /image >}}

4.  If your billing address is different from your account address, locate the **Billing address** section, deactivate **Use account address**, and then provide the appropriate details.

    {{<image filename="images/rc/billing-update-billing-address.png" width="300px" alt="Deactive the Use account address slider to specfy a different billing address." >}}{{< /image >}}

5.  Use the **Save Card** button to save your changes.

    {{<image filename="images/rc/button-billing-save-card.png" width="100px" alt="Use the Save Card button to save new payment details." >}}{{< /image >}}

## Apply coupon

Coupons apply credits to your Redis Enterprise Cloud account.  To redeem a coupon:

1. Sign in to the Redis Cloud [admin portal](https://app.redislabs.com/).  (Create an account if you don't already have one.)

2.  Use the admin console menu to select **Billing & Payments** and then select the **Credits** tab.

3.  Enter the coupon code and then select the **Apply** button.

    {{<image filename="images/rc/button-billing-payments-apply.png" width="80px" alt="Use the Apply button to redeem a coupon." >}}{{< /image >}}

The value of the coupon is applied to your account when accepted.  

For help, contact [Support](https://support.redislabs.com).


