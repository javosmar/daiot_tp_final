#!/bin/bash
###############################################################################
# Project: FIUBA - CEIoT - DAIoT
# Date: June 2020
# Usage:
#       ./start_nodered.sh mysql-net "$PWD"/nodered -p 1881:1880
# 
###############################################################################

#########[ Settings & Data ]###################################################

CONTAINER_NAME=nodered-server
NETWORK_NAME=$1
DATA_DIR=$2

#########[ Script commands ]###################################################

#echo "Init MySQL 5.7 {container:$CONTAINER_NAME, network:$NETWORK_NAME, db:$DATABASE_DIR}"

# docker run -it -p 1880:1880 --name mynodered nodered/node-red

docker run \
--rm \
--detach \
--name $CONTAINER_NAME \
--network $NETWORK_NAME \
--volume $DATA_DIR/data:/data \
nodered/node-red

#########[ End of file ]#######################################################
