const express = require('express');
const app = express();
const cors = require('cors');

// Cors configuration
const corsConfig = { origin: '*', optionsSuccessStatus: 200 };

// Routes definition
const routerDispositivo = require('./routes/dispositivo');
const routerMedicion = require('./routes/medicion');

// Settings
app.set('PORT', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(cors(corsConfig));

// Routes asignation
app.use('/api/dispositivo', routerDispositivo);
app.use('/api/medicion', routerMedicion);

// Starting the server
app.listen(app.get('PORT'), function (req, res, next) {
    console.log(`API funcionando en puerto ${app.get('PORT')}`);
});