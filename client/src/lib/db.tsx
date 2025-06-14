import mysql from "mysql2/promise";

let connection: mysql.Connection | null = null;

// Configuración de la conexión
const dbConfig = {
  host: "localhost", // Cambia esto si tu base de datos está en otro host
  user: "root", // Cambia "tu_usuario" por tu usuario de MySQL
  password: "", // Cambia "tu_contraseña" por tu contraseña de MySQL
  database: "estacionamiento", // Cambia "nombre_de_tu_base_de_datos" por el nombre de tu base de datos
  charset: "utf8mb4"
};

export async function connectToDatabase() {
  try {
    if (!connection) {
      connection = await mysql.createConnection(dbConfig);
      console.log("Conexión exitosa a MySQL");
    }
    return connection;
  } catch (error) {
    console.error("Error al conectar a MySQL:", error);
    throw error;
  }
}

export async function disconnectFromDatabase() {
  try {
    if (connection) {
      await connection.end();
      console.log("Conexión a MySQL cerrada");
      connection = null;
    }
  } catch (error) {
    console.error("Error al cerrar la conexión a MySQL:", error);
  }
}