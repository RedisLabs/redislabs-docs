1. Verify the `admission-tls` secret exists.

    ```sh
     kubectl get secret admission-tls
    ```
  
    The output should look similar to
  
    ```
     NAME            TYPE     DATA   AGE
     admission-tls   Opaque   2      2m43s
    ```

1. Save the certificate to a local environment variable.

    ```sh
    CERT=`kubectl get secret admission-tls -o jsonpath='{.data.cert}'`
    ```

1. Create a patch file for the Kubernetes validating webhook, replacing `<namespace>` with the namespace where the REC was installed.

    ```sh
    sed 's/NAMESPACE_OF_SERVICE_ACCOUNT/<namespace>/g' webhook.yaml | kubectl create -f -

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
