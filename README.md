Autor: Ing. Martin Acosta - 2020
# Proyecto Final DAM
## Introducción 🚀
El siguiente repositorio es la presentación del trabajo final de la asignatura Desarrollo de Aplicaciones Multiplataforma, para la Carrera de Especialización en Internet de las Cosas de la Facultad de Ingeniería de la Universidad de Buenos Aires (CEIoT - FIUBA).
## Descripción 📋
El proyecto es un prototipo de dashboard para el control sobre un sistema de riego en distintos ambientes de una casa, pudiendo realizar la lectura de sensores y accionar electroválvulas. También cuenta con un log de lecturas y accionamientos.
## Captura de la aplicación 📸
![alt text](https://i.ibb.co/gJDVbJ4/screencast2.gif)
## Correr la aplicación ▶️
Para correr la aplicación deberá clonar o descargar el repositorio y ejecutar el script launch
```sh
git clone https://github.com/javosmar/dam_tp_final.git
dam_tp_final/launch.sh
```
## Terminar la ejecución ⏹
Para detener la aplicación, se deberá terminar la ejecución de los contenedores mediante el siguiente comando:
```sh
docker stop nodejs-container phpadmin mysql-server
```
## Construido con 🛠️
* [Ionic](https://ionicframework.com/)
* [NodeJS](https://nodejs.org/)
## Contribuir 🖇️
Para contribuir realizar un pull request con las sugerencias.
## Licencia 📄
GPL