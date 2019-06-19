| heading 1 | heading 2 | heading 3 |
| :-----| :-----: |-----: |
| cell 1x1  | cell 1x2  | cell 1x3  |
| cell 2x1  | cell 2x2  | cell 2x3  |

{{%expand "Do I need to deploy a Redis Enterprise Operator per namespace?" %}}
Yes, one Operator per namespace, each managing a single Redis Enterprise Cluster.

Each Redis Enterprise Cluster can run multiple databases while maintaining high capacity and performance.
{{% /expand%}}