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

    Billing details may vary between regions.

    When you select a billing transaction, a **Download** icon appears to the right of the amount.  

    {{<image filename="images/rc/icon-billing-download.png" width="30px" alt="Use the download icon to download a PDF for the selected invoice." >}}{{< /image >}}

    Select this to download a PDF invoice for the associated charge.

    A **Pay Now** button appears in selected regions.

    {{<image filename="images/rc/billing-payments-pay-now.png" width="100px" alt="Use the Pay Now button to Pay your invoice in selected regions." >}}{{< /image >}} 
    
    Select this button to pay your invoice.

- The **Payment Methods** tab lists your current payment methods.  You can add a new payment method, associate different payment methods with specific subscriptions, and remove payment methods.

    {{<image filename="images/rc/billing-payment-method-tab.png" alt="The Payments Methods tab helps you manage payments for your subscriptions." >}}{{< /image >}}

    Select **Add Credit Card** to enter new credit card details.

- The **Credits** tab shows coupon credits that have been applied to your account, if any.

    {{<image filename="images/rc/billing-payments-credits-tab.png" alt="The Credits tab lets you apply coupons to your account and shows credits that have already been applied." >}}{{< /image >}}

    | Detail | Description |
    |:-------|:------------|
    | Code   | Coupon code |
    | Coupon Amount | Amount credited to your account |
    | Current Balance | Amount left |
    | Date added | Date applied to your account |
    | Expiration Date | Date the amount expires |

    To apply a coupon, enter the code and then select the **Apply** button.

## Download invoice

To download an invoice:

1. In the Redis Cloud [admin portal](https://app.redislabs.com/), select **Billing & Payments** and then make sure the Billing History tab is selected.

2.  Locate and select the invoice.

3.  Select the **Download invoice** icon displayed to the right of the invoice amount.

    {{<image filename="images/rc/icon-billing-download.png" width="50px" alt="Use the download icon to download a PDF for the selected invoice." >}}{{< /image >}}

The invoice is downloaded as an Acrobat PDF file.  Use your browser's download features to manage the file.

## Add payment method

To add a new payment method:

1. In the Redis Cloud [admin portal](https://app.redislabs.com/), select **Billing & Payments** and then select the **Payment Methods** tab.

2.  Select **Add credit card** and then provide the details.

    {{<image filename="images/rc/billing-add-credit-card.png" width="80%" alt="Select Add Credit Card to add a new payment method" >}}{{< /image >}}

3.  If you need to change the account billing address for this card, activate the **Change Address** slider and enter the new billing address.

    {{<image filename="images/rc/billing-update-billing-address.png" width="80%" alt="Deactivate the Use account address slider to specify a different billing address." >}}{{< /image >}}

    {{< note >}}
Changing the billing address to your account will remove any payment methods associated with the old billing address. 
    {{< /note >}}

4.  Select the **Add Credit Card** button to save your changes.

    {{<image filename="images/rc/button-billing-save-card.png" width="150px" alt="Use the Save Card button to save new payment details." >}}{{< /image >}}

## Edit billing address

To edit the account billing address:

1. In the Redis Cloud [admin portal](https://app.redislabs.com/), select **Billing & Payments** and then select the **Payment Methods** tab.

2. Select the **Credit Card options** menu on the upper-right hand corner of the payment method and select **Edit billing address**.

    {{<image filename="images/rc/billing-credit-card-options-menu.png" alt="The Credit Card options menu on the upper-right hand corner of the payment method." width="200px">}}{{< /image >}}

3. Enter the new billing address. You must re-enter your payment method details to confirm your address change.

    {{<image filename="images/rc/account-settings-change-billing-address.png" alt="The Edit account billing address screen." width="80%">}}{{< /image >}}

    {{< note >}}
Changing the billing address to your account will remove any payment methods associated with the old billing address. See [Add payment method](#add-payment-method) to learn how to add a payment method back to your account.
    {{< /note >}}

## Edit mailing address

To edit the mailing address associated with a payment method:

1. In the Redis Cloud [admin portal](https://app.redislabs.com/), select **Billing & Payments** and then select the **Payment Methods** tab.

2. Select the **Credit Card options** menu on the upper-right hand corner of the payment method and select **Edit mailing address**.

    {{<image filename="images/rc/billing-credit-card-options-menu.png" alt="The Credit Card options menu on the upper-right hand corner of the payment method." width="200px">}}{{< /image >}}

3. If the mailing address is different from the billing address, deactivate the **Use billing address** slider and enter the new mailing address. 

    {{<image filename="images/rc/billing-change-mailing-address.png" alt="The Edit mailing address screen." width="80%">}}{{< /image >}}

## Apply coupon

Coupons apply credits to your Redis Enterprise Cloud account.  To redeem a coupon:

1. In the Redis Cloud [admin portal](https://app.redislabs.com/), select **Billing & Payments** and then select the **Credits** tab.

2.  Enter the coupon code and then select the **Apply** button.

    {{<image filename="images/rc/button-billing-payments-apply.png" width="80px" alt="Use the Apply button to redeem a coupon." >}}{{< /image >}}

    The value of the coupon is applied to your account when accepted.  

For help, contact [Support](https://support.redislabs.com).
