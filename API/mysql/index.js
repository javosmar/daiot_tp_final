const mysql = require('mysql');
const configPool = require('../mysql/keys.js');

const pool = mysql.createPool(configPool);

pool.getConnection((err,conexion) => {
    if(err){
        switch(err.code){
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('Se ha perdido la conexión a la DB.');
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('Se ha superado el número de conexiones permitidas a la DB.');
                break;
            case 'ECONNREFUSED':
                console.error('La conexión a la DB fue rechazada.');
                break;
            default:
                console.error(err.code);
                break;
        }
    }
    if(conexion){
        console.log('Conexión exitosa a la DB.')
        conexion.release();
    }
    return;
});

module.exports = pool;