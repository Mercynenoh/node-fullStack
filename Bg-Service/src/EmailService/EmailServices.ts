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
}
const SendEmail= async()=>{
    const pool = await mssql.connect(sqlConfig)
    const projects:Project[]= await(await pool.request().query(`
    SELECT * FROM Projects WHERE assigned='0'`)).recordset
     for(let project of projects){
        // let result = await pool
        // .request()
        // .input("email", project.email)
        // .execute(`getAssignedEmails`);
        // let emailRes = result.recordset[0];
        ejs.renderFile('template/project.ejs',{email:project.email,project:`${project.name} and description is ${project.description}`} ,async(error,data)=>{
    
            let messageoption={
                from:process.env.EMAIL,
                to:project.email,
                subject:"Project team",
                html:data,
                attachments:[
                    {
                        filename:'project.txt',
                        content:`You have been assigned a project : '${project.name}', '${project.description}'`
                    }
                ]
            }
    
            try {
                
                await sendMail(messageoption)
                await pool.request().query(`UPDATE Projects SET 
                assigned='1' WHERE email='${project.email}'`)
                // console.log('Email is Sent');
                
            } catch (error) {
                console.log(error);
                
            }
    
    
        })
    console.log(project)
     }
    
    
    }
    
    export default  SendEmail