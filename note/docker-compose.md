```
  # centos7 host
nginx:
  image: nginx:1.13-alpine
  restart: always
  ports:
    - "8280:80"
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
    #- /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
  links:
    - etcd3:etcd3.host
    - filepool:filepool.go.host
    - modou:modou.go.host
    - mall:mall.go.host

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


# etcd3
etcd3:
  image: centos:7
  restart: always
  expose:
    - "2379"
    - "2379/udp"
  ports:
    - "22379:2379"
    - "22379:2379/udp"
  volumes:
    - ./etcd3/etcd:/etcd:ro
    - ./etcd3/data/:/app/
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
    - APP_KEY=
  working_dir: "/app/"
  command: ["/etcd", "--listen-client-urls", "http://0.0.0.0:2379", "--advertise-client-urls", "http://0.0.0.0:2379"]


# mall.serve
mall:
  image: centos:7
  restart: always
  expose:
    - "8287"
    - "8297"
  volumes:
    - ./mall/run/:/app/
    - ./mall/serve:/serve
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
    - DB_HOST=malldata.host
    - DB_DATABASE=${DB_DATABASE}
    - DB_USERNAME=${DB_USERNAME}
    - DB_PASSWORD=${DB_PASSWORD}
    - ETCD_CLIENT=etcd.host
    - RPC_SECURE=${RPC_SECURE}
    - RPC_BUFFERED=${RPC_BUFFERED}
    - RPC_FRAMED=${RPC_FRAMED}
  links:
    - malldata:malldata.host
    - modou:modou.host
    - etcd3:etcd.host
  working_dir: "/app/"
  command: ["/run.sh"]

# mall.data
malldata:
  image: postgres:9-alpine
  restart: always
  ports:
    - "54357:5432"
  volumes:
    - ./mall/data:/var/lib/postgresql/data
    # - ./mall/postgresql.conf:/var/lib/postgresql/data/postgresql.conf
    - ./init-user-db.sh:/docker-entrypoint-initdb.d/init-user-db.sh
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
    - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# modou.serve
modou:
  image: centos:7
  restart: always
  ports:
    - "8396":"8296"
  expose:
    - "8286"
    - "8296"
  volumes:
    - ./modou/run/:/app/
    - ./modou/serve:/serve
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
    - DB_HOST=modoudata.host
    - DB_DATABASE=${DB_DATABASE}
    - DB_USERNAME=${DB_USERNAME}
    - DB_PASSWORD=${DB_PASSWORD}
    - ETCD_CLIENT=etcd.host
    - RPC_SECURE=${RPC_SECURE}
    - RPC_BUFFERED=${RPC_BUFFERED}
    - RPC_FRAMED=${RPC_FRAMED}
  links:
    - modoudata:modoudata.host
    - etcd3:etcd.host
  working_dir: "/app/"
  command: ["/run.sh"]

# modou.data
modoudata:
  image: postgres:9-alpine
  restart: always
  ports:
    - "54356:5432"
  volumes:
    - ./modou/data:/var/lib/postgresql/data
    # - ./modou/postgresql.conf:/var/lib/postgresql/data/postgresql.conf
    - ./init-user-db.sh:/docker-entrypoint-initdb.d/init-user-db.sh
    - /etc/localtime:/etc/localtime:ro
  environment:
    - TZ=${TZ}
    - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}


```
