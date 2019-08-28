```
 # centos7 host
nginx:
  image: nginx:1.13-alpine
  restart: always
  ports:
    - "127.0.0.1:8080:80"
  volumes:
    # web files
    - ./html:/var/www/html
    - ./nginx/html:/data/www/html:ro
    - ./filepool/upload/:/data/www/upload/:ro
    # nginx configs
    - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    - ./nginx/conf.d/:/etc/nginx/conf.d/:ro
    # log
    - ./nginx/log/:/var/log/nginx/
    # certificates
    #- ./nginx/ca/server.crt/:/etc/nginx/server.crt:ro
    #- ./nginx/ca/server.key/:/etc/nginx/server.key:ro
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
  links:
    - etcd3:etcd3.host
    - filepool:filepool.go.host
    - user:user.go.host
    - online:online.go.host
    - cms:cms.go.host
    - msg:msg.go.host
    - wallet:wallet.go.host
    - i18n:i18n.go.host
    - chat:chat.go.host

# etcd3
etcd3:
  image: centos:7
  restart: always
  expose:
    - "2379"
    - "2379/udp"
  ports:
    - "12379:2379"
    - "12379:2379/udp"
  volumes:
    - ./etcd3/etcd:/etcd:ro
    - ./etcd3/data/:/app/
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
    - APP_KEY=
  working_dir: "/app/"
  command: ["/etcd", "--listen-client-urls", "http://0.0.0.0:2379", "--advertise-client-urls", "http://0.0.0.0:2379"]

# filepool.serve
filepool:
  image: tudyzhb/ffmpeg:4.1-go
  restart: always
  expose:
    - "8070"
  volumes:
    - ./filepool/run/:/app/
    - ./filepool/serve:/serve
    - ./filepool/upload:/app/upload
    - ./run.sh:/run.sh:ro
    - ./lang:/app/lang:ro
  environment:
    - TZ=${TZ}
    - IS_PRODUCT=${IS_PRODUCT}
    - APP_HOST=${APP_HOST}
    - APP_KEY=${APP_KEY}
    - APP_PREFIX=${APP_PREFIX}
    - ETCD_CLIENT=etcd.host
  working_dir: "/app/"
  command: ["/run.sh"]

# user.data
userdata:
  image: postgres:9-alpine
  restart: always
  ports:
    - "54350:5432"
  volumes:
    - ./user/data:/var/lib/postgresql/data
    #- ./user/postgresql.conf:/var/lib/postgresql/data/postgresql.conf
    - ./init-user-db.sh:/docker-entrypoint-initdb.d/init-user-db.sh
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
    - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# user.serve
user:
  image: centos:7
  restart: always
  ports:
    - "8290:8090"
  expose:
    - "8080"
    - "8090"
  volumes:
    - ./user/run/:/app/
    - ./user/serve:/serve
    - ./run.sh:/run.sh:ro
    - ./user.pub:/app/user.pub:ro
    - ./admin.pub:/app/admin.pub:ro
    - ./user.key:/app/user.key:ro
    - ./admin.key:/app/admin.key:ro
    - ./lang:/app/lang:ro
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
    - IS_PRODUCT=${IS_PRODUCT}
    - APP_HOST=${APP_HOST}
    - APP_KEY=${APP_KEY}
    - APP_PREFIX=${APP_PREFIX}
    - DB_HOST=userdata.host
    - DB_DATABASE=${DB_DATABASE}
    - DB_USERNAME=${DB_USERNAME}
    - DB_PASSWORD=${DB_PASSWORD}
    - RPC_SECURE=${RPC_SECURE}
    - RPC_BUFFERED=${RPC_BUFFERED}
    - RPC_FRAMED=${RPC_FRAMED}
    - ETCD_CLIENT=etcd.host
  links:
    - etcd3:etcd.host
    - userdata:userdata.host
  working_dir: "/app/"
  command: ["/run.sh"]

# online.serve
online:
  image: centos:7
  restart: always
  ports:
    - "8291:8091"
  expose:
    - "8081"
    - "8091"
  volumes:
    - ./online/run/:/app/
    - ./online/serve:/serve
    - ./run.sh:/run.sh:ro
    - ./user.pub:/app/user.pub:ro
    - ./admin.pub:/app/admin.pub:ro
    - ./lang:/app/lang:ro
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
    - IS_PRODUCT=${IS_PRODUCT}
    - APP_HOST=${APP_HOST}
    - APP_KEY=${APP_KEY}
    - APP_PREFIX=${APP_PREFIX}
    - ETCD_CLIENT=etcd.host
    - USER_HOST=user.go.host
    - RPC_SECURE=${RPC_SECURE}
    - RPC_BUFFERED=${RPC_BUFFERED}
    - RPC_FRAMED=${RPC_FRAMED}
  links:
    - etcd3:etcd.host
    - user:user.go.host
  working_dir: "/app/"
  command: ["/run.sh"]

# cms.data
cmsdata:
  image: postgres:9-alpine
  restart: always
  ports:
    - "54351:5432"
  volumes:
    - ./cms/data:/var/lib/postgresql/data
    #- ./cms/postgresql.conf:/var/lib/postgresql/data/postgresql.conf
    - ./init-user-db.sh:/docker-entrypoint-initdb.d/init-user-db.sh
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
    - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# cms.serve
cms:
  image: centos:7
  restart: always
  expose:
    - "8082"
    - "8092"
  ports:
    - "8292:8092"
  volumes:
    - ./cms/run/:/app/
    - ./cms/serve:/serve
    - ./run.sh:/run.sh:ro
    - ./user.pub:/app/user.pub:ro
    - ./admin.pub:/app/admin.pub:ro
    - ./lang:/app/lang:ro
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
    - IS_PRODUCT=${IS_PRODUCT}
    - APP_HOST=${APP_HOST}
    - APP_KEY=${APP_KEY}
    - APP_PREFIX=${APP_PREFIX}
    - DB_HOST=cmsdata.host
    - DB_DATABASE=${DB_DATABASE}
    - DB_USERNAME=${DB_USERNAME}
    - DB_PASSWORD=${DB_PASSWORD}
    - ETCD_CLIENT=etcd.host
    - USER_HOST=user.go.host
    - ONLINE_HOST=online.go.host
    - RPC_SECURE=${RPC_SECURE}
    - RPC_BUFFERED=${RPC_BUFFERED}
    - RPC_FRAMED=${RPC_FRAMED}
  links:
    - etcd3:etcd.host
    - cmsdata:cmsdata.host
    - user:user.go.host
    - online:online.go.host
  working_dir: "/app/"
  command: ["/run.sh"]

# msg.data
msgdata:
  image: postgres:9-alpine
  restart: always
  ports:
    - "54352:5432"
  volumes:
    - ./msg/data:/var/lib/postgresql/data
    #- ./msg/postgresql.conf:/var/lib/postgresql/data/postgresql.conf
    - ./init-user-db.sh:/docker-entrypoint-initdb.d/init-user-db.sh
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
    - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# msg.serve
msg:
  image: centos:7
  restart: always
  expose:
    - "8083"
    - "8093"
  ports:
    - "8293:8093"
  volumes:
    - ./msg/run/:/app/
    - ./msg/serve:/serve
    - ./run.sh:/run.sh:ro
    - ./user.pub:/app/user.pub:ro
    - ./admin.pub:/app/admin.pub:ro
    - ./lang:/app/lang:ro
    - /etc/localtime:/etc/localtime:ro
    - ./filepool/upload:/upload:ro
  environment:
    - TZ=${TZ}
    - IS_PRODUCT=${IS_PRODUCT}
    - APP_HOST=${APP_HOST}
    - APP_KEY=${APP_KEY}
    - APP_PREFIX=${APP_PREFIX}
    - DB_HOST=msgdata.host
    - DB_DATABASE=${DB_DATABASE}
    - DB_USERNAME=${DB_USERNAME}
    - DB_PASSWORD=${DB_PASSWORD}
    - ETCD_CLIENT=etcd.host
    - USER_HOST=user.go.host
    - ONLINE_HOST=online.go.host
    - RPC_SECURE=${RPC_SECURE}
    - RPC_BUFFERED=${RPC_BUFFERED}
    - RPC_FRAMED=${RPC_FRAMED}
  links:
    - etcd3:etcd.host
    - msgdata:msgdata.host
    - user:user.go.host
    - online:online.go.host
  working_dir: "/app/"
  command: ["/run.sh"]

# wallet.data
walletdata:
  image: postgres:9-alpine
  restart: always
  ports:
    - "54353:5432"
  volumes:
    - ./wallet/data:/var/lib/postgresql/data
    # - ./wallet/postgresql.conf:/var/lib/postgresql/data/postgresql.conf
    - ./init-user-db.sh:/docker-entrypoint-initdb.d/init-user-db.sh
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
    - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# wallet.serve
wallet:
  image: centos:7
  restart: always
  expose:
    - "8084"
    - "8094"
  ports:
    - "8294:8094"
  volumes:
    - ./wallet/run/:/app/
    - ./wallet/serve:/serve
    - ./run.sh:/run.sh:ro
    - ./user.pub:/app/user.pub:ro
    - ./admin.pub:/app/admin.pub:ro
    - ./lang:/app/lang:ro
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
    - IS_PRODUCT=${IS_PRODUCT}
    - APP_HOST=${APP_HOST}
    - APP_KEY=${APP_KEY}
    - APP_PREFIX=${APP_PREFIX}
    - DB_HOST=walletdata.host
    - DB_DATABASE=${DB_DATABASE}
    - DB_USERNAME=${DB_USERNAME}
    - DB_PASSWORD=${DB_PASSWORD}
    - ETCD_CLIENT=etcd.host
    - USER_HOST=user.go.host
    - ONLINE_HOST=online.go.host
    - RPC_SECURE=${RPC_SECURE}
    - RPC_BUFFERED=${RPC_BUFFERED}
    - RPC_FRAMED=${RPC_FRAMED}
  links:
    - etcd3:etcd.host
    - walletdata:walletdata.host
    - user:user.go.host
    - online:online.go.host
  working_dir: "/app/"
  command: ["/run.sh"]

# i18n.data
i18ndata:
  image: postgres:9-alpine
  restart: always
  ports:
    - "54354:5432"
  volumes:
    - ./i18n/data:/var/lib/postgresql/data
    # - ./i18n/postgresql.conf:/var/lib/postgresql/data/postgresql.conf
    - ./init-user-db.sh:/docker-entrypoint-initdb.d/init-user-db.sh
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
    - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# i18n.serve
i18n:
  image: centos:7
  restart: always
  expose:
  - "8181"
  - "8191"
  volumes:
  - ./i18n/run/:/app/
  - ./i18n/serve:/serve
  - ./run.sh:/run.sh:ro
  - ./user.pub:/app/user.pub:ro
  - ./admin.pub:/app/admin.pub:ro
  - ./lang:/app/lang:ro
  - /etc/localtime:/etc/localtime:ro
  environment:
  - TZ=${TZ}
  - IS_PRODUCT=${IS_PRODUCT}
  - APP_HOST=${APP_HOST}
  - APP_KEY=${APP_KEY}
  - APP_PREFIX=${APP_PREFIX}
  - DB_HOST=i18ndata.host
  - DB_DATABASE=${DB_DATABASE}
  - DB_USERNAME=${DB_USERNAME}
  - DB_PASSWORD=${DB_PASSWORD}
  - ETCD_CLIENT=etcd.host
  - USER_HOST=user.go.host
  - ONLINE_HOST=online.go.host
  - WALLET_HOST=wallet.go.host
  - RPC_SECURE=${RPC_SECURE}
  - RPC_BUFFERED=${RPC_BUFFERED}
  - RPC_FRAMED=${RPC_FRAMED}
  links:
  - etcd3:etcd.host
  - i18ndata:i18ndata.host
  - user:user.go.host
  - online:online.go.host
  - wallet:wallet.go.host
  working_dir: "/app/"
  command: ["/run.sh"]

# chat.data
chatdata:
  image: postgres:9-alpine
  restart: always
  ports:
    - "54355:5432"
  volumes:
    - ./chat/data:/var/lib/postgresql/data
    # - ./chat/postgresql.conf:/var/lib/postgresql/data/postgresql.conf
    - ./init-user-db.sh:/docker-entrypoint-initdb.d/init-user-db.sh
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
    - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# chat.serve
chat:
  image: centos:7
  restart: always
  expose:
    - "8085"
    - "8095"
  volumes:
    - ./chat/run/:/app/
    - ./chat/serve:/serve
    - ./run.sh:/run.sh:ro
    - ./user.pub:/app/user.pub:ro
    - ./admin.pub:/app/admin.pub:ro
    - ./lang:/app/lang:ro
    - /etc/localtime:/etc/localtime:ro
    - ./filepool/upload:/upload:ro
  environment:
    - TZ=${TZ}
    - IS_PRODUCT=${IS_PRODUCT}
    - APP_HOST=${APP_HOST}
    - APP_KEY=${APP_KEY}
    - APP_PREFIX=${APP_PREFIX}
    - DB_HOST=chatdata.host
    - DB_DATABASE=${DB_DATABASE}
    - DB_USERNAME=${DB_USERNAME}
    - DB_PASSWORD=${DB_PASSWORD}
    - ETCD_CLIENT=etcd.host
    - USER_HOST=user.go.host
    - ONLINE_HOST=online.go.host
    - WALLET_HOST=wallet.go.host
    - RPC_SECURE=${RPC_SECURE}
    - RPC_BUFFERED=${RPC_BUFFERED}
    - RPC_FRAMED=${RPC_FRAMED}
  links:
    - etcd3:etcd.host
    - chatdata:chatdata.host
    - user:user.go.host
    - online:online.go.host
    - wallet:wallet.go.host
    - cms:cms.go.host
    - msg:msg.go.host
  working_dir: "/app/"
  command: ["/run.sh"]

# ad.data
addata:
  image: postgres:9-alpine
  restart: always
  ports:
    - "54358:5432"
  volumes:
    - ./ad/data:/var/lib/postgresql/data
    # - ./ad/postgresql.conf:/var/lib/postgresql/data/postgresql.conf
    - ./init-user-db.sh:/docker-entrypoint-initdb.d/init-user-db.sh
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
    - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# ad.serve
ad:
  image: centos:7
  restart: always
  expose:
    - "8187"
    - "8197"
  volumes:
    - ./ad/run/:/app/
    - ./ad/serve:/serve
    - ./run.sh:/run.sh:ro
    - ./user.pub:/app/user.pub:ro
    - ./admin.pub:/app/admin.pub:ro
    - ./lang:/app/lang:ro
    - /etc/localtime:/etc/localtime:ro
    - ./filepool/upload:/upload:ro
  environment:
    - TZ=${TZ}
    - IS_PRODUCT=${IS_PRODUCT}
    - APP_HOST=${APP_HOST}
    - APP_KEY=${APP_KEY}
    - APP_PREFIX=${APP_PREFIX}
    - DB_HOST=addata.host
    - DB_DATABASE=${DB_DATABASE}
    - DB_USERNAME=${DB_USERNAME}
    - DB_PASSWORD=${DB_PASSWORD}
    - ETCD_CLIENT=etcd.host
    - USER_HOST=user.go.host
    - ONLINE_HOST=online.go.host
    - RPC_SECURE=${RPC_SECURE}
    - RPC_BUFFERED=${RPC_BUFFERED}
    - RPC_FRAMED=${RPC_FRAMED}
  links:
    - etcd3:etcd.host
    - addata:addata.host
    - user:user.go.host
    - online:online.go.host
  working_dir: "/app/"
  command: ["/run.sh"]



```
