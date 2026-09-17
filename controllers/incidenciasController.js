const { generarId } = require('../utils/helpers');

const incidencias = [];

const CrearIncidencia = (req, res) => {

    const { empleado, area, descripcion, prioridad } = req.body;
    const nuevoPaquete = { empleado, area, descripcion, prioridad };

    if (!empleado || !area || !descripcion || !prioridad) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' })
        //te falto tirarle datos al sistema
    }

    //Vamos a hacer una validacion con .trim() para evitar que se visaree el sistema
    //por espacios en blanco
    else if (empleado.trim().length === 0 || area.trim().length === 0 || descripcion.trim().length === 0 || prioridad.trim().length === 0) {
        return res.status(400).json({ error: 'No se aceptan espacios vacios' })
    }

    //Validacion para evitar que el usuario se ponga muchas mas o menos prioridad de la que
    //en realidad existe
    else if (prioridad !== "Alta" && prioridad !== "Media" && prioridad !== "Baja") {
        return res.status(400).json({ error: 'Tipo de prioridad no valida' })
    }

    const nuevaIncidencia = {
        id: generarId(), //Generamos una identificacion para el objeto
        empleado: empleado.trim(),
        area: area.trim(),
        descripcion: descripcion.trim(),
        prioridad: prioridad.trim(),
        estado: "Pendiente" //Asignamos un estado por defecto al objeto
    };

    incidencias.push(nuevaIncidencia);

    res.status(400).json({ mensaje: "Incidencia registrada correctamente" });
}

const ListarIncidencias = (req, res) => {
    //Responde dando el arreglo incidencias en json
    return res.status(200).json(incidencias);
};

const BuscarIncidenciasPorId = (req, res) => {
    //Se reconoce el id
    const id= Number(req.params.id);
    //Busca el id de la incidencia en el arreglo
    const IncidenciaHallada = incidencias.find(
        (incidencia) => incidencia.id === id
    );
    if (!IncidenciaHallada){
        return res.status(404).json({
            message: "Incidencia no encontrada"
        });
    }
    return res.status(200).json(IncidenciaHallada);
};

//Se necesita para utilizar las funciones desde las rutas
module.exports = {
    CrearIncidencia,
    ListarIncidencias,
    BuscarIncidenciasPorId
};
