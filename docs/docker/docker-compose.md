## YAPI 部署
```yaml
version: '3'
services:
  yapi-web:
    image: jayfong/yapi:latest
    container_name: yapi-web
    ports:
      - 40001:3000
    environment:
      - YAPI_ADMIN_ACCOUNT=test@168.com
      - YAPI_ADMIN_PASSWORD=111111
      - YAPI_CLOSE_REGISTER=true
      - YAPI_DB_SERVERNAME=yapi-mongo
      - YAPI_DB_PORT=27017
      - YAPI_DB_DATABASE=yapi
      - YAPI_MAIL_ENABLE=false
      - YAPI_LDAP_LOGIN_ENABLE=false
      - YAPI_PLUGINS=[]
    depends_on:
      - yapi-mongo
    links:
      - yapi-mongo
    restart: unless-stopped
  yapi-mongo:
    image: mongo:latest
    container_name: yapi-mongo
    volumes:
      - mongodata:/data/db
    expose:
      - 27017
    restart: unless-stopped
volumes:
  mongodata:

```