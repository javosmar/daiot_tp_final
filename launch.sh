#!/bin/bash

cd daiot_tp_final/API
docker-compose up -d
cd ../frontend
npm install && npm run start