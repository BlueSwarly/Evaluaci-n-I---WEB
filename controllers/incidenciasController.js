
const incidencias = [];
let contadorID = 1;

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
        id: contadorID++, //Generamos una identificacion para el objeto
        empleado: empleado.trim(),
        area: area.trim(),
        descripcion: descripcion.trim(),
        prioridad: prioridad.trim(),
        estado: "Pendiente" //Asignamos un estado por defecto al objeto
    };

    incidencias.push(nuevaIncidencia);

    res.status(200).json({ mensaje: "Incidencia registrada correctamente" });
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

const CambiarEstado = (req, res) => {
    const id = parseInt(req.params.id);
    const { estado } = req.body;

    if (!estado || typeof estado !== 'string' || estado.trim() === "") {
        return res.status(400).json({ mensaje: "El estado es requerido." });
    }
    
    const incidencia = incidencias.find((inc) => inc.id === id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    const estadoLimpio = estado.trim().toLowerCase();
    let nuevoEstado = "";

    switch (estadoLimpio) {
        case "pendiente":
            nuevoEstado = "Pendiente";
            break;
        case "en proceso":
            nuevoEstado = "En Proceso";
            break;
        case "resuelta":
            nuevoEstado = "Resuelta";
            break;
        case "cancelada":
            nuevoEstado = "Cancelada";
            break;
        default:
            return res.status(400).json({
                mensaje: "Estado invalido. Permitidos: Pendiente, En Proceso, Resuelta, Cancelada"
            });
    }

    incidencia.estado = nuevoEstado;
    return res.status(200).json({
        mensaje: "Estado actualizado correctamente",
        incidencia
    });
};

//Se necesita para utilizar las funciones desde las rutas
module.exports = {
    CrearIncidencia,
    ListarIncidencias,
    BuscarIncidenciasPorId,
    CambiarEstado
};
