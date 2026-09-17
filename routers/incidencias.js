const express = require('express');
const router = express.Router();

const {
    CrearIncidencia,
    ListarIncidencias,
    BuscarIncidenciasPorId,
    CambiarEstado
} = require('../controllers/incidenciasController');

router.post('/', CrearIncidencia);
//cuando llega una peticion get se ejecuta ListarIncidencias
router.get('/', ListarIncidencias);

router.get('/:id', BuscarIncidenciasPorId);

router.put('/:id/estado' , CambiarEstado)
module.exports = router;