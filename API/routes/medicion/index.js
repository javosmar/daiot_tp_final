const { Router } = require('express');
const router = Router();
const pool = require('../../mysql');

/**
 * Obtengo la última medición del dispositivo con el id recibido como parámetro
 * @param id ID del dispositivo
 */
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    pool.query('SELECT * FROM Mediciones WHERE dispositivoId=? ORDER BY fecha DESC', [id], function (err, result) {
        if (err) {
            res.status(500).send('Error en la consulta');
        }
        res.status(200).json(result[0]);
    });
});

/**
 * Obtengo todas las mediciones del dispositivo con el id recibido como parámetro
 * @param id ID del dispositivo
 */
router.get('/todas/:id', (req, res, next) => {
    const { id } = req.params;
    pool.query('SELECT * FROM Mediciones WHERE dispositivoId = ? ORDER BY fecha DESC', [id], function (err, result) {
        if (err) {
            res.status(500).send('Error en la consulta');
        }
        res.status(200).json(result);
    });
});

/**
 * Guardo en la tabla 'Mediciones' una nueva medición
 * @param {id, fecha, valor}
 */
router.post('/', (req, res, next) => {
    const { id, fecha, valor } = req.body;
    
    //  Convierto el formato de la fecha para guardar en la DB ( 2020-08-15T22:59:40.027Z -> 2020-08-15 22:59:40 )
    const newFecha = new Date(fecha).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    pool.query('INSERT INTO Mediciones (fecha, valor, dispositivoId) VALUES (?,?,?)', [newFecha, valor, id], function (err, result) {
        if (err) {
            res.status(500).json({ msg: 'Error en la consulta a la DB' });
        }
        res.status(200).json({ msg: 'Valores almacenados en la DB' });
    });
});

/**
 * Obtengo todos los cambios de la electroválvula con el id recibido como parámetro
 * @param id ID de la electroválvula
 */
router.get('/riegos/:id', (req, res, next) => {
    const { id } = req.params;
    pool.query('SELECT * FROM Log_Riegos WHERE electrovalvulaId = ? ORDER BY fecha DESC', [id], function (err, result) {
        if (err) {
            res.status(500).send('Error en la consulta');
        }
        res.status(200).json(result);
    });
});

// Export router
module.exports = router;