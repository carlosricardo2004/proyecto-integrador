import express from 'express';
import router from './router';
import db from './config/db';
//Conectar a la base de datos
async function connectDB() {
    try {
        await db.authenticate();
        db.sync()
        console.log("Conexión esitosa a la base de datos.");
    } catch (error) {
        console.log("Error al conectarse a la BS:");
        console.log(error);
    }
}
connectDB()
const server = express();
server.use(express.json())
server.use('/api/estacionamiento', router)

export default server;
