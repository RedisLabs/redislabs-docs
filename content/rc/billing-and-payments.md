---
Title: Billing & payments
linkTitle: Billing & payments
description: Describes how to view billing transactions and manage payment methods for Redis Enterprise Cloud subscriptions.   
weight: 39
alwaysopen: false
categories: ["RC"]
aliases: /rc/billing-and-payments/
         /rc/billing-and-payments.md
---

The **Billing & Payments** screen shows the most recent transactions for your account and lets you mange your payment methods.

{{<image filename="images/rc/billing-billing-history-tab.png" alt="The Billing & Payments screen shows billing transactions and manage payment methods." >}}{{< /image >}}

Two tabs are available:

- The **Billing History** tab lists recent charges and payments.  Each transaction includes the following details:

    | Detail | Description | 
    |:-------|:------------|
    | Date   | Date the transaction was recorded |
    | Description | Description of the transaction |
    | Reference | Reference number |
    | Amount    | Transaction amount |

    When you select a charge transaction, a download icon appears to the right of the amount.  

    {{<image filename="images/rc/icon-billing-download.png" alt="Use the download icon to download a PDF for the selected invoice." >}}{{< /image >}}

    Select this to download a PDF invoice for the associated charge.

- The **Payment Methods** tab shows your current payment methods.  You can add a new payment method, associate different payment methods with specific subscriptions, and remove payment methods.

    {{<image filename="images/rc/billing-payment-method-tab.png" alt="The Payments Methods tab helps you manage payments for your subscriptions." >}}{{< /image >}}

    Select **Add Credit Card** to enter new credit card details.

## Download invoice

To download an invoice:

1. Sign in to the Redis Cloud [admin portal](https://app.redislabs.com/new/).  (Create an account if you don't already have one.)

2.  Use the admin console menu to select **Billing & Payments** and then make sure the Billing History tab is selected. 

3.  Locate and select the invoice.

4.  Select the **Download invoice** icon displayed to the right of the invoice amount.

    {{<image filename="images/rc/icon-billing-download.png" alt="Use the download icon to download a PDF for the selected invoice." >}}{{< /image >}}

The invoice is downloaded as an Acrobat PDF file.  Use your browser's download features to manage the file.

## Add payment method

To add a new payment method:

1. Sign in to the Redis Cloud [admin portal](https://app.redislabs.com/new/).  (Create an account if you don't already have one.)

2.  Use the admin console menu to select **Billing & Payments** and then select the **Payment Methods** tab.

3.  Select **Add credit card** and then provide the details.

    {{<image filename="images/rc/billing-add-credit-card.png" alt="Select Add Credit Card to add a new payment method" >}}{{< /image >}}

4.  If your billing address is different from your billing address, locate the **Billing address** section, deactivate **Use account address**, and then provide the appropriate details.

    {{<image filename="images/rc/billing-update-billing-address.png" alt="Deactive the Use account address slider to specfy a different billing address." >}}{{< /image >}}

5.  Use the **Save Card** button to save your changes.

    {{<image filename="images/rc/button-billing-save-card.png" alt="Use the Save Card button to save new payment details." >}}{{< /image >}}
