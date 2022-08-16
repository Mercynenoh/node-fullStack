import dotenv from 'dotenv'

dotenv.config()
 
export const sqlConfig= {
    user: process.env.DB_USER as string,
    password : process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    server:'localhost',
    pool:{
        max:10,
        min:0,
        idleTimeoutMillis:3000
    },
    options:{
        encrypt:false,
        trustServerCertificate:false
    }
}