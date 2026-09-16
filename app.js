const express = require('express');
const paqueteRoutes = require('./routers/incidencias.js');

const app = express();
const port = 3124;

app.use(express.json());
app.use('/api/paquetes', paquetesRoutes);

app.listen(port, () => {
    console.log('Servidor escuchando en http://localhost:${port}');
})

