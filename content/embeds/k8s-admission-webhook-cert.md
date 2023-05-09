1. Verify the `admission-tls` secret exists .

    ```sh
     kubectl get secret admission-tls
    ```
  
    The output will look similar to
  
    ```
     NAME            TYPE     DATA   AGE
     admission-tls   Opaque   2      2m43s
    ```

1. Save the certificate to a local environment variable.

    ```sh
    CERT=`kubectl get secret admission-tls -o jsonpath='{.data.cert}'`
    ```

1. Create a patch file for the Kubernetes validating webhook.

    ```sh
    sed 's/NAMESPACE_OF_SERVICE_ACCOUNT/demo/g' admission/webhook.yaml | kubectl create -f -

    cat > modified-webhook.yaml <<EOF
    webhooks:
    - name: redisenterprise.admission.redislabs
      clientConfig:
        caBundle: $CERT
      admissionReviewVersions: ["v1beta1"]
    EOF
    ```

1. Patch the webhook with the certificate.

    ```sh
    kubectl patch ValidatingWebhookConfiguration \
      redis-enterprise-admission --patch "$(cat modified-webhook.yaml)"
    ```

  For releases before 6.4.2-4, use this command instead:

  ```sh
    kubectl patch ValidatingWebhookConfiguration \
      redb-admission --patch "$(cat modified-webhook.yaml)"
  ```

  Releases prior to [6.2.4]({{<relref "/kubernetes/release-notes/6-4-2-releases/6-4-2-5.md">}}) use the ValidatingWebhookConfiguration named `redb-admission`.
