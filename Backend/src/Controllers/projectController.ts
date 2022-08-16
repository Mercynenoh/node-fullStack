import { Request, RequestHandler, Response } from 'express'
import mssql from 'mssql'
import { v4 as uid } from 'uuid'
import { sqlConfig } from '../Config/config'


export const addProject:RequestHandler = async (req, res) => {
  try {
    const ProjectsId = uid()
    const { name, description,enddate, email } = req.body as {name:string, description:string, enddate:string, email:string}
    const pool = await mssql.connect(sqlConfig)
    await pool
      .request()
      .input('ProjectsId', mssql.VarChar, ProjectsId)
      .input('name', mssql.VarChar, name)
      .input('description', mssql.VarChar, description)
      .input('enddate', mssql.VarChar, enddate)
      .input('email', mssql.VarChar, email)
      .execute('insertProject')

    res.json({ message: 'Project Inserted Successfully' })
  } catch (error) {
    res.json({ error })
  }
}


export const getProjects: RequestHandler = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig)
    const projects = await pool.request().execute('getProjects')
    const { recordset } = projects
    res.json(recordset)
  } catch (error) {
    res.json({ error })
  }
}

export const getProject: RequestHandler<{ ProjectsId: string }> = async (req, res) => {
  try {
    const ProjectsId = req.params.ProjectsId
    const pool = await mssql.connect(sqlConfig)
    const projects = await pool
      .request()
      .input('ProjectsId', mssql.VarChar, ProjectsId)
      .execute('getProject')
    const { recordset } = projects
    if (!projects.recordset[0]) {
      res.json({ message: 'Project Not Found' })
    } else {
      res.json(recordset)
    }
  } catch (error) {
    res.json({ error })
  }
}

export const getuserProject: RequestHandler<{ email: string }> = async (req, res) => {
  try {
    const email = req.params.email
    const pool = await mssql.connect(sqlConfig)
    const projects = await pool
      .request()
      .input('email', mssql.VarChar, email)
      .execute('getuserProject')
    const { recordset } = projects
    if (!projects.recordset[0]) {
      res.json({ message: 'Project Not Found' })
    } else {
      res.json(recordset)
    }
  } catch (error) {
    res.json({ error })
  }
}

export const updateComplete: RequestHandler<{ ProjectsId: string }> = async (
  req,
  res,
) => {
  try {
    const ProjectsId =req.params.ProjectsId
    const pool = await mssql.connect(sqlConfig)
  
      const projects = await pool
      .request()
      .input('ProjectsId', mssql.VarChar, ProjectsId)
      .execute('getProject')
      if(!projects.recordset[0]){
         res.json({ message: 'Project Not Found' })
      }else{

        await pool.request()
          .input('Project_id', mssql.VarChar, ProjectsId)
          .execute('updateComplete')
          res.json({message:'Project Updated ...'})
      }
 

  } catch (error:any) {
      res.json({ error })
  }
}



export const deleteProject:RequestHandler<{ProjectsId:string}> =async(req,res)=>{
    try {
        const ProjectsId = req.params.ProjectsId
        const pool = await mssql.connect(sqlConfig)
      
        const projects = await pool
      .request()
      .input('ProjectsId', mssql.VarChar, ProjectsId)
      .execute('getProject')
      if(!projects.recordset[0]){
         res.json({ message: 'Project Not Found' })
      }else{
        await pool.request()
        .input('ProjectsId', mssql.VarChar, ProjectsId)
        .execute('deleteProject')
        res.json({message:'Project Deleted'})
      }
    } catch (error:any) {
       res.json({ error }) 
    }
}

