const pool = require("./dbConfig");

// Función para ejecutar una consulta SQL
async function consultaSQL() {
    // Obtenemos una conexión de la pool
    try {
        const client = await pool.connect();
        // Ejecutamos la consulta SQL
        const result = await client.query("SELECT * FROM canciones");
        // Mostramos los resultados
        console.log(result.rows);
        return result.rows;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
    } finally {
        // Liberamos la conexión
        client.release();
    }
}

// Función para insertar un usuario
const agregarCancion = async (titulo, artista, tono) => {
    const client = await pool.connect();
    const text =
        "INSERT INTO canciones(titulo, artista, tono) VALUES($1, $2, $3)";
    const values = [titulo, artista, tono];

    try {
        const response = await client.query(text, values);
        console.log("Canción agregada", response);
    } catch (error) {
        console.error("Error agregando canción:", error);
    } finally {
        client.release();
    }
};

//Funcion para editar cancion
const editarCancion = async (titulo, artista, tono, id) => {
    const client = await pool.connect();
    const text =
        "UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4";
    const values = [titulo, artista, tono, id];
    try {
        const res = await client.query(text, values);
        console.log("Cancion actualizada", res);
    } catch (err) {
        console.error("Error actualizando la cancion : ", err);
    } finally {
        client.release();
    }
};

// Función para eliminar cancion
const eliminarCancion = async (id) => {
    const client = await pool.connect();
    const text = "DELETE FROM canciones WHERE id = $1";
    const values = [id];
    try {
        const response = await client.query(text, values);
        console.log("Cancion eliminada ", response);
    } catch (error) {
        console.error("Error eliminando canción:", error);
    } finally {
        client.release();
    }
};

module.exports = {
    consultaSQL,
    agregarCancion,
    editarCancion,
    eliminarCancion,
};
