const express = require('express');
const router = express.Router();

const {
    CrearIncidencia,
    ListarIncidencias,
    BuscarIncidenciasPorId,
    ObtenerEstadisticasIncidencias,
    ClasificarIncidenciaPorId
} = require('../controllers/incidenciasController');

router.post('/', CrearIncidencia);
//cuando llega una peticion get se ejecuta ListarIncidencias
router.get('/', ListarIncidencias);

router.get('/', BuscarIncidenciasPorId);

router.get('/', ObtenerEstadisticasIncidencias);

router.get('/:id/clasificar/', ClasificarIncidenciaPorId);
module.exports = router;