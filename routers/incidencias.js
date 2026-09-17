const express = require('express');
const router = express.Router();

const {
    CrearIncidencia,
    ListarIncidencias,
    BuscarIncidenciasPorId
} = require('../controllers/incidenciasController');

router.post('/', CrearIncidencia);
//cuando llega una peticion get se ejecuta ListarIncidencias
router.get('/', ListarIncidencias);

router.get('/', BuscarIncidenciasPorId);

module.exports = router;