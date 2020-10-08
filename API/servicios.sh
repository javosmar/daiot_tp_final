#!/bin/bash

#contenedores = docker ps -a -q
#docker stop $contenedores
docker network create --driver bridge mysql-net
./start_mysql.sh mysql-net "$PWD"/db
./run_phpadmin.sh mysql-net mysql-server 8085
./serve_node_app_net.sh "$PWD" src/index.js 3000 mysql-net
