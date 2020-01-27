In some cases, pods do not terminate when the statefulSet is scaled down as part of the cluster recovery.
If pods are stuck in `terminating` or `crashLoopBack` and do not terminate gracefully, cluster recovery can stop.

In that case, delete the pods manually with:

```src
kubectl delete pods <pod> --grace-period=0 --force
```