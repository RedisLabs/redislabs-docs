Before creating a Redis Cloud database, you need to [create an account]({{< relref "rc/rc-quickstart.md" >}}).

To create a database in your Redis Cloud account:

1. Sign in to the [Redis Cloud console](https://app.redislabs.com).

2. Select the **New database** button.

    {{<image filename="images/rc/button-database-new.png" alt="The New Database button creates a new database." width="120px">}}{{< /image >}}

    This displays the **Create database** screen.

3. Select your Redis use case. There are four pre-defined use cases:

    {{<image filename="images/rc/create-database-redis-use-cases.png" alt="The Redis Use case panel" width="120px">}}{{< /image >}}

    - **Cache**: Stores short-term or volatile data. Can be used for session management, semantic cache, session store, and other uses where data is short-lived.
    - **Database**: Stores durable and consistent data. Can be used for document databases, feature storage, gaming leaderboards, durable caches, and other uses where your data needs to be highly available and persistent.
    - **Vector search**: Manages and manipulates vector data. Can be used for Generative AI, recommendation systems, visual search, and other uses where you can search and query your data.
    - **Custom**: If your Redis use case doesn't match any of the other use cases, you can choose this option to customize all of your settings.

    Select the use case that best matches your Redis use case. You can always change the settings later. See [Use case settings](#use-case-settings) to view the settings for each use case.