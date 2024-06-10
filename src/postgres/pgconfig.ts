import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
import credentials from '../common/credentials';

dotenv.config();

const sequelize = new Sequelize({
    username:credentials.postgres.USERNAME,
    password:credentials.postgres.PASSWORD,
    database: credentials.postgres.DATABASE,
    host: credentials.postgres.HOST,
    port: credentials.postgres.DBPORT,
    dialect: credentials.postgres.DIALECT as 'postgres'
    
});

sequelize.authenticate().then(()=>{
    console.log("Database is connected")
}).catch((error)=>{
    console.log("error occured while connecting to DB", error)
})

sequelize.sync().then(()=>{
    console.log("DB is Synchronized")
}).catch((error)=>{
    console.log("error while Synchronizing", error)
})

export default sequelize;