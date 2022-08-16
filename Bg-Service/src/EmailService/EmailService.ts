import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/config'
dotenv.config()
import sendMail from '../Helpers/Email'
interface Task{
    UsersId:string
    username:string
    email:string
    role:string
    password:string
    issent:string
}


const SendEmails= async()=>{
const pool = await mssql.connect(sqlConfig)
const tasks:Task[]= await(await pool.request().query(`
SELECT * FROM UsersTable WHERE issent='0'`)).recordset
 for(let task of tasks){

    ejs.renderFile('template/welcome.ejs',{username:task.username} ,async(error,data)=>{

        let messageoption={
            from:process.env.EMAIL,
            to:task.email,
            subject:"Welcome to our website",
            html:data,
            attachments:[
                {
                    filename:'task.txt',
                }
            ]
        }

        try {
            
            await sendMail(messageoption)
            await pool.request().query(`UPDATE UsersTable SET issent='1' WHERE UsersId = '${task.UsersId}'`)
            console.log('Email is Sent');
            console.log(task.UsersId)
            
        } catch (error) {
            console.log(error);
            
        }


    })
console.log(task)
 }


}


export default  SendEmails


