---
Title: Using the API
description: 
weight: 40
alwaysopen: false
categories: ["RC Pro"]
---

You can access and use the API using a variety of tools:

## Swagger User Interface

The [Swagger UI](https://api-beta1-qa.redislabs.com/beta1/swagger-ui.html) is useful for initial introduction and learning about API operations, models and simulated usage via a web based user interface

### Authenticating

* **Open the [Swagger UI](https://api-beta1-qa.redislabs.com/beta1/swagger-ui.html) page in a browser**

![swagger-authorize-and-try-now](/images/rv/api/swagger-authorize-and-try-now.png)

* **Click on the `Authorize` button.** An "Available Authorizations"  dialog box appears, expecting two headers values that will be used for user authentication in all Swagger interactions

![swagger-authorizations](/images/rv/api/swagger-authorizations.png)

* **Insert the API Key values:** 
    * paste the [Account Key]({{< relref  "/rv/api/how-to/enable-your-account-to-use-api.md" >}}) into the `x-api-key` header textbox and click `Authorize`
    * paste the [Secret Key]({{< relref  "/rv/api/how-to/create-api-keys-for-your-team.md" >}}) into the `x-api-secret-key` header textbox and click `Authorize`
    * click `Close`
    * **NOTE:** refreshing or re-opening the Swagger UI page will cause the authorizations to be lost, and the keys will need to be re-inserted into the 

### Calling API operations

* After performing an authorization in the Swaager UI (you can tell that you have entered the authorization keys when the lock icon appears as a closed lock)

![swagger-closed-lock](/images/rv/api/swagger-closed-lock.png)

* Open a category and select an API operation (for example, the `Account` category and the `GET /payment-methods` operation)

![swagger-payment-methods-try-it-now](/images/rv/api/swagger-payment-methods-try-it-now.png)

* Click on "`Try it out`" and "`Execute`"

* the response is displayed in the `Responses` section of the UI
* Note that the results also contain an example of a `cURL` command that illustrates how the API query can be formed in a stabdard command line using `cURL`

![swagger-query-results](/images/rv/api/swagger-query-results.png)

#### Setting parameters in an API operations

* When an API operation requires URI parameters (such as "get subscription by subscriptin id") the parameters are displayed in the UI as follows:

![swagger-parameters](/images/rv/api/swagger-parameters.png)

* For API operations that require a JSON request body, you can use the **model display** to review the expected JSON structure and parameters 

![swagger-post-body-model](/images/rv/api/swagger-post-body-model.png)

* For API operations that require a JSON request body, you can use the "`Try it now`" sample JSON created by Swagger as a base template that you can edit and execute

![swagger-post-edit-body](/images/rv/api/swagger-post-edit-body.png)


## Creating an API client

Using [Swagger Codegen](https://swagger.io/tools/swagger-codegen/) you can generate an API HTTP client in a variety of programming languages, or roll-your-own client by wrapping the API REST calls in a programming language of your choice.


## Using the `cURL` HTTP client

`cURL` is a popular command line tool used to perform HTTP requests, in an ad-hoc manner, or within shell scripts (mostly Linux Bash). For an introduction to `cURL` see "[How to start using cURL and why: a hands-on introduction](https://medium.freecodecamp.org/how-to-start-using-cURL-and-why-a-hands-on-introduction-ea1c913caaaa)"


**This API documentation uses `cURL` and Linux shell scripts to provide examples on using the API.**

For example, a standard API call to get System Log information looks like this in `cURL`:

```bash
curl -s -X GET "https://$HOST/logs" \
    -H "accept: application/json" \
    -H "x-api-key: $ACCOUNT_KEY" \
    -H "x-api-secret-key: $SECRET_KEY" \
    | jq -r .
```

**Notes on the above example:**

1. The example expects several variables to be set in the Linux shell:
    * **`$HOST`** - the URI of the Redis Labs API. i.e. `api-beta1-qa.redislabs.com/beta1`
    * **`$ACCOUNT_KEY`** - the Account key value (see "[Enable your Account to use API]({{< relref  "/rv/api/how-to/enable-your-account-to-use-api.md" >}})")
    * **`$SECRET_KEY`** - the perosnal secret key value (see "[Create API Keys for your team]({{< relref  "/rv/api/how-to/create-api-keys-for-your-team.md" >}})")
1. The line "`| jq -r .`" means that the HTTP response will be piped (forwarded) to the `jq` JSON command line processor, and it will display only the raw output (`-r`) or the root element (`.`)
1. You can set the variables using a shell commands like the following:









