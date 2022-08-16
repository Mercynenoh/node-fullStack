import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import {sqlConfig} from '../Config/config'
dotenv.config()
import sendMail from '../Helpers/Email'
interface Project{
    ProjectsId:string
    name:string
    description:string
    enddate:string
    email:string
    assigned:string
    complete:string
}


const Sendadmin= async()=>{
const pool = await mssql.connect(sqlConfig)
const projects:Project[]= await(await pool.request().query(`
SELECT * FROM Projects WHERE complete ='1'`)).recordset
 for(let project of projects){
    ejs.renderFile('template/admin.ejs',{email:project.email,name:project.name } ,async(error,data)=>{
        let messageoption={
            from:process.env.EMAIL,
            to:'mercynenoh22@gmail.com',
            subject:"completed task",
            html:data,
        }

        try {
            
            await sendMail(messageoption)
            await pool.request().query(`UPDATE Projects SET complete='2' WHERE ProjectsId = '${project.ProjectsId}'`)
            console.log('Email is Sent');
            
            
        } catch (error) {
            console.log(error);
            
        }


    })

 }


}


export default  Sendadmin


