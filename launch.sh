#!/bin/bash

cd API
docker-compose up -d
cd ../frontend
npm install && npm run start
