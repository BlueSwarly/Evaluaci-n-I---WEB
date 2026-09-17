const express = require('express');
const router = express.Router();

const {
    CrearIncidencia,
    ListarIncidencias,
    BuscarIncidenciasPorId,
    CambiarEstado,
    EliminarIncidencia,
    ObtenerEstadisticasIncidencias,
    ClasificarIncidenciaPorId
} = require('../controllers/incidenciasController');

router.get('/estadisticas', ObtenerEstadisticasIncidencias);

router.post('/', CrearIncidencia);
//cuando llega una peticion get se ejecuta ListarIncidencias
router.get('/', ListarIncidencias);

router.get('/:id', BuscarIncidenciasPorId);

router.put('/:id/estado' , CambiarEstado);

router.delete('/:id', EliminarIncidencia);

router.get('/:id/clasificacion/', ClasificarIncidenciaPorId);
module.exports = router;