import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config()

//console.log(process.env.DATABASE_URL)
const db = new Sequelize(process.env.DATABASE_URL!, { // o ?ssl=true
    models: [__dirname + '/../models/**/*.ts']
    ,
    dialectOptions: {
        ssl: {
            require: false
        }
    },
    logging: false
})

export default db