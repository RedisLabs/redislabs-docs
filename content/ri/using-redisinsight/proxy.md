---
Title: Proxy
date: 2022-08-24 03:49:29 +0530
weight: 20
categories: ["RI"]
path: features/proxy/
---

## Trusted origins

By default, RedisInsight trusts only the origin to which RedisInsight binds to. If RedisInsight is run behind a proxy, the origin where the requests come from is not trusted if the proxy's origin is not the origin where RedisInsight binds to. While RedisInsight does start and is reachable, no operations are allowed. Because the origin of requests/proxy is always known, the trusted origins must be manually set via the `RITRUSTEDORIGINS` environment variable.

{{< note >}}
Values in the `RITRUSTEDORIGINS` setting must include the scheme (e.g. `http://` or `https://`) instead of only the hostname.

Also, values that started with a dot must also include an asterisk before the dot. For example, instead of `.example.com`, use `https://*.example.com`.

{{< /note >}}

### Example

Here's a sample Nginx docker-compose file:

```yml
version: "3.7"
services:
  redisinsight:
    image: redislabs/redisinsight:latest
    environment:
      - RITRUSTEDORIGINS=http://localhost:9000 # This is the proxy origin from browser
    networks:
      - redis-network

  nginx-basicauth:
    image: nginx
    ports:
      - "9000:9000"
    environment:
      - NGINX_PORT=9000
    volumes: # Your nginx.conf
      - ./nginx-basic-auth.conf.template:/etc/nginx/templates/nginx-basic-auth.conf.template
    depends_on:
      - redisinsight
    networks:
      - redis-network

networks:
  redis-network:
    driver: bridge
```

## Subpath proxy


You can enable subpath proxy by setting `RIPROXYENABLE` environment variable. Once enabled, either `RIPROXYPATH` or `RIPROXYPREFIX` must be set to path of the proxy subpath. Use `RIPROXYPATH` to set a static proxy subpath and `RIPROXYPREFIX` for a dynamic proxy subpath.


### RIPROXYPATH static subpath

When `RIPROXYPATH` is being set with a path, RedisInsight is accessible only on that subpath. The default routes are given the provided prefix subpath. There isn't a way to add another proxy behind this proxy unless the same subpath is used for the new proxy.

{{< note >}}
Once the static subpath is set, RedisInsight is only reachable on the provided subpath, both the one that is directly reachable via the binded origin and from the proxy server.

<br />

If no value is provided for `RIPROXYPATH`, RedisInsight assumes dynamic subpath and uses `RIPROXYPREFIX` variable to extract the proxy prefix from HTTP Headers at runtime.
{{< /note >}}

#### Example

```yml
version: "3.7"
services:
  redisinsight:
    image: redislabs/redisinsight:latest
    environment:
      - RITRUSTEDORIGINS=http://localhost:9000 # Trust the proxy origin
      - RIPROXYENABLE=t                        # Enable Subpath Proxy
      - RIPROXYPATH=/apps/redisinsight/        # Set static proxy subpath
    ports:
      - "8001:8001"
    networks:
      - redis-network

  nginx-subpath-proxy:
    image: nginx
    volumes: # Your nginx config
      - ./nginx-subpath-proxy.conf.template:/etc/nginx/templates/nginx-subpath-proxy.conf.template
    ports:
      - "9000:9000"
    environment:
      - NGINX_PORT=9000
      - NGINX_PROXY_PATH=/apps/redisinsight/
    command: # Redisinsight will now be available only in `/apps/redisinsight/`.
      - bash
      - -c
      - |
        printf "Visit <a href=\"$$NGINX_PROXY_PATH\">$$NGINX_PROXY_PATH</a> for redisinsight" > /etc/nginx/index.html
        /docker-entrypoint.sh nginx -g "daemon off;"
    depends_on:
      - redisinsight
    networks:
      - redis-network

networks:
  redis-network:
    driver: bridge
```

##### nginx config

```nginx
server {
 listen ${NGINX_PORT} default_server;

 root /etc/nginx;
 index index.html;

 location ${NGINX_PROXY_PATH} {                        # Subpath
     proxy_pass             http://redisinsight:8001/; # Assumes redisinsight runs in this host
     proxy_read_timeout     900;
     proxy_set_header       Host $host;
 }
}
```

![RIPROXYPATH](/images/ri/riproxypath.png)

### RIPROXYPREFIX dynamic subpath


When `RIPROXYPREFIX` is being set to a value, default being `X-Forwarded-Prefix`, RedisInsight extracts the path from this field in the HTTP Header. So the subpath is actually set by the proxy server and not RedisInsight and this variable just tells which HTTP header field to check for the proxy subpath. Using this approach, multiple proxies can send requests to same RedisInsight with different proxy subpaths.

{{< note >}}

When the dynamic subpath is used, RedisInsight is reachable both from the normal path, i.e., `localhost:8001` and the one from dynamic subpath.

{{< /note >}}

#### Example

Using the below `docker-compose` and `nginx.conf` file, same RedisInsight instance is reachable via:
- `http://localhost:8001` — Direct path to RedisInsight server
- `http://localhost:9000/tools/redisinsight/` — Proxy subpath 1 from the first proxy server.
- `http://localhost:9000/installed-tools/more/content/here/redisinsight/` — Proxy subpath 2 from the first proxy server.
- `http://localhost:9001/applications/redisinsight/` — Proxy subpath 1 from the second proxy server.
- `http://localhost:9001/helpers/tools/redisinsight/` — Proxy subpath 2 from the second proxy server.

##### docker-compose
```yml
version: "3.7"
services:
  redisinsight:
    image: redislabs/redisinsight-dev:master
    environment:
      - RIPORT=8001
      - RITRUSTEDORIGINS=http://localhost:9000,http://localhost:9001 # Trust multiple proxy origins
      - RIPROXYENABLE=t  # Enable subpath proxy
    ports:
      - "8001:8001"
    networks:
      - redis-network

  nginx-subpath-proxy-dynamic-1:
    image: nginx
    volumes: # Your first nginx proxy
      - ./nginx-subpath-proxy-dynamic.conf.template:/etc/nginx/templates/nginx-subpath-proxy-dynamic.conf.template
    ports:
      - "9000:9000"
    environment:
      - NGINX_PORT=9000
      - NGINX_PROXY_PATH=-/tools/redisinsight/
      - NGINX_PROXY_PATH_ADDITIONAL=/installed-tools/more/content/here/redisinsight/
    command:
      - bash
      - -c
      - |
        printf "Visit <a href=\"$$NGINX_PROXY_PATH\">$$NGINX_PROXY_PATH</a> or <a href=\"$$NGINX_PROXY_PATH_ADDITIONAL\">$$NGINX_PROXY_PATH_ADDITIONAL</a> for redisinsight" > /etc/nginx/index.html
        /docker-entrypoint.sh nginx -g "daemon off;"
    depends_on:
      - redisinsight
    networks:
      - redis-network

  nginx-subpath-proxy-dynamic-2:
    image: nginx
    volumes: # Your second nginx proxy
      - ./nginx-subpath-proxy-dynamic.conf.template:/etc/nginx/templates/nginx-subpath-proxy-dynamic.conf.template
    ports:
      - "9001:9001"
    environment:
      - NGINX_PORT=9001
      - NGINX_PROXY_PATH=/applications/redisinsight/
      - NGINX_PROXY_PATH_ADDITIONAL=/helpers/tools/redisinsight/
    command:
      - bash
      - -c
      - |
        printf "Visit <a href=\"$$NGINX_PROXY_PATH\">$$NGINX_PROXY_PATH</a> or <a href=\"$$NGINX_PROXY_PATH_ADDITIONAL\">$$NGINX_PROXY_PATH_ADDITIONAL</a> for redisinsight" > /etc/nginx/index.html
        /docker-entrypoint.sh nginx -g "daemon off;"
    depends_on:
      - redisinsight
    networks:
      - redis-network

networks:
  redis-network:
    driver: bridge
```


##### nginx config
```nginx

server {
 listen ${NGINX_PORT} default_server;

 root /etc/nginx;
 index index.html;

 location ${NGINX_PROXY_PATH} {  # Subpath one
     proxy_pass             http://redisinsight:8001/; # Assumes redisinsight runs in this host
     proxy_read_timeout     900;
     proxy_set_header       Host $host;
	 proxy_set_header       X-Forwarded-Prefix ${NGINX_PROXY_PATH}; # Dynamic subpath 1
 }

 location ${NGINX_PROXY_PATH_ADDITIONAL} { # Subpath two
	proxy_pass             http://redisinsight:8001/; # Assumes redisinsight runs in this host
	proxy_read_timeout     900;
	proxy_set_header       Host $host;
	proxy_set_header       X-Forwarded-Prefix ${NGINX_PROXY_PATH_ADDITIONAL}; # Dynamic subpath 2
 }
}
```
