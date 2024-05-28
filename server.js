const express = require('express');
const app = express();
const PORT = 3000;

//Import funciones BD
const {
    consultaSQL,
    agregarCancion,
    editarCancion,
    eliminarCancion
} = require('./queries');

// Middleware para trabajar con JSON
app.use(express.json()); 

//Ruta index
app.get("/", async (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

//Ruta para agregar canción
app.put("/cancion/:id" , async (req, res) => {
    try {
         //Recibiendo datos desde el html
        const {id, titulo, artista, tono} = req.body;
        if (!titulo || !artista || !tono) {
            return res.status(400).json({ error: 'Debe proporcionar los datos de la canción.' })
        }
        //Llamando a funcion de la base  de datos
        await editarCancion(titulo, artista, tono, id);

        res.json({ message: 'Canción editada con exito.'});
    } catch (error) {
        console.error('Error editando la canción', error);
        res.status(500).json({ error: 'Error editando canción', error });
    } 
});

//Ruta para agregar canción
app.post("/cancion", async (req, res) => {
    try {
         //Recibiendo datos desde el html
        const { titulo, artista, tono } = req.body;
        //Llamando a funcion de la base  de datos
        await agregarCancion(titulo, artista, tono);

        res.status(200).json({ message: "Canción agregada con éxito" });
    } catch (error) {
        console.error("Error al agregar la canción", error);
        res.status(500).json({ error: "Error al agregar la canción" });
    }
});

//Ruta para eliminar canción
app.delete("/cancion", async (req, res) => {
    try {
        //recibiendo ID desde el html
        const { id } = req.query;      
        //Llamando a funcion de la base  de datos
        await eliminarCancion(id);      
        
        res.json({ message: 'Canción eliminada.' })
    } catch (error) {
        console.error('Error eliminando la cancion', error);        
    }
});

//Ruta caciones para recibir todas las canciones en formato JSON
app.get("/canciones", async (req, res) => {

    try {
        //Funcion consulta a la base  de datos
        const canciones = await consultaSQL();
        //Almacenar canciones como JSON
        res.json(canciones);
    } catch (error) {
        res.status(500).send("Error al obtener las canciones");
    }   
});

//Ruta error
app.get("*", async (req, res) => {
    res.send("Aqui no hay nada");
});

//Funcion para ejecutar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
