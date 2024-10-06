import express from 'express'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import colors from 'colors'
import router from './router'
import path from 'path'
import db from './config/db'
import swaggerUI from 'swagger-ui-express'
import swaggerSpect, { swaggerUiOptions } from './config/swagger'

//conectar a base de datops
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue("Conexion existosa a la db"))
    } catch (error) {
        console.log(colors.red.bold("Hubo un error al conectar a la BD"))
    }
}

connectDB()

//  Instancia de express
const server = express()

//permitir conexiones
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error("Error de cors"))
        }
    }
}
server.use(cors(corsOptions))

//leer datos de formularios - habilitar lectura de jsons
server.use(express.json())

server.use(morgan('dev'))
server.use('/api/products', router)

// Sirve archivos estáticos desde la carpeta 'public'
server.use(express.static(path.join(__dirname, '..', 'public')));

// Docs 
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpect, swaggerUiOptions))

export default server