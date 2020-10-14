Autor: Ing. Martin Acosta - 2020
# Proyecto Final DAIoT
## Introducción 🚀
El siguiente repositorio es la presentación del trabajo final de la asignatura Desarrollo de Aplicaciones de Internet of Things, para la Carrera de Especialización en Internet de las Cosas de la Facultad de Ingeniería de la Universidad de Buenos Aires (CEIoT - FIUBA).
## Descripción 📋
El proyecto es un prototipo de sistema para el control sobre sensores y actuadores, pudiendo realizar las lecturas en tiempo real, visualizar gráficas temporales y accionar una salida. También cuenta con un log de lecturas, un log de accionamientos y la administración de dispositivos.
## Captura de la aplicación 📸
![alt text](https://i.ibb.co/kJkLYKy/tp-daiot2.gif)
## Correr la aplicación ▶️
En primer lugar se debe clonar o descargar el repositorio
```sh
git clone https://github.com/javosmar/daiot_tp_final.git
```
Dentro de la carpeta *mosquitto_files* se encuentra el archivo de configuración para Mosquitto, al igual que dentro de la carpeta *node-red_files* se encuentra el archivo con el flujo de Node-RED.
Para correr la aplicación se debe ejecutar el script *launch.sh* en la carpeta raiz del proyecto.
## Cliente ESP32
Para ejecutar el cliente en una ESP32 se debe crear en la carpeta *src* un archivo *keys.h*, siguiendo el template y completando con los datos de la red, el broker y un ClientID único.
## Terminar la ejecución ⏹
Para detener la aplicación, se deberá terminar la ejecución de los contenedores mediante el siguiente comando:
```sh
docker stop node_docker nodered_docker phpmyadmin_docker mosquitto_docker mysql-server
```
## Construido con 🛠️
* [Docker](https://www.docker.com/)
* [Ionic](https://ionicframework.com/)
* [NodeJS](https://nodejs.org/)
* [ChartJS](https://www.chartjs.org/)
* [MQTT](https://mosquitto.org/)
* [Node-RED](https://nodered.org/)

## Contribuir 🖇️
Para contribuir realizar un pull request con las sugerencias.
## Licencia 📄
GPL