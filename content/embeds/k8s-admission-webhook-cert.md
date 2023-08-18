1. Verify the `admission-tls` secret exists.

    ```sh
     kubectl get secret admission-tls
    ```
  
    The output should look similar to
  
    ```
     NAME            TYPE     DATA   AGE
     admission-tls   Opaque   2      2m43s
    ```

2. Save the certificate to a local environment variable.

    ```sh
    CERT=`kubectl get secret admission-tls -o jsonpath='{.data.cert}'`
    ```

3. Create a patch file for the Kubernetes validating webhook, replacing `<namespace>` with the namespace where the REC was installed.

  The `webhook.yaml` example is in [redis-enterprise-k8s-docs/admissiion](https://github.com/RedisLabs/redis-enterprise-k8s-docs/tree/master/admission)

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

4. Patch the webhook with the certificate.

    ```sh
    kubectl patch ValidatingWebhookConfiguration \
      redis-enterprise-admission --patch "$(cat modified-webhook.yaml)"
    ```
