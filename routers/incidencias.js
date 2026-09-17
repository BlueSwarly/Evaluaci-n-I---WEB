const express = require('express');
const router = express.Router();

const {
    CrearIncidencia,
    ListarIncidencias
} = require('../controllers/incidenciasController');

router.post('/', CrearIncidencia);
//cuando llega una peticion get se ejecuta ListarIncidencias
router.get('/', ListarIncidencias);

module.exports = router;