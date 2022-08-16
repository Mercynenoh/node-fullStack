import { Request, Response, RequestHandler } from "express";
import mssql from 'mssql';
import { sqlConfig } from "../Config/config";
import {v4 as uid} from 'uuid'
import bcrypt from 'bcrypt'
import { UserSchema } from '../Helper/UserValidator';
import { UserSchemas } from "../Helper/UserValidator";
import {User} from '../Interface/interface'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

import {Data} from '../Interface/interface'

interface Extended extends Request{
    info?:Data
}

interface ExtendedRequest extends Request{
    body:{
        username:string
        email:string
        password:string
    }
}
export const addUser=async( req:ExtendedRequest, res:Response)=>{
    try {
        const pool=await mssql.connect(sqlConfig)
        const UsersId =uid()
        const {username,email, password}= req.body
        const {error , value}= UserSchema.validate(req.body)
        if(error){
            return res.json({error:error.details[0].message})
        }
        const hashedpassword = await bcrypt.hash(password,10)
        await pool.request()
        . input('UsersId', mssql.VarChar, UsersId)
        . input('username', mssql.VarChar, username)
        . input('email', mssql.VarChar, email)
        . input('password', mssql.VarChar, hashedpassword)
        .execute('addUser')

      
        res.json({message:'Registered...'})
    } catch (error) {
        res.json({error})
    }

}


export const loginUser=async(req:ExtendedRequest, res:Response)=>{
       try {
          const {email, password }= req.body
          const pool =await mssql.connect(sqlConfig)
             const {error , value}= UserSchemas.validate(req.body)
                if(error){
                    return res.json({error:error.details[0].message})
                }
          const usersResult:User[]=await( await pool.request()
          .input('email', mssql.VarChar,email)
          .execute('getUser')).recordset

          const user = usersResult[0];

          if(!user){
            return res.json({message:'User Not Found'})
          }

          const validPassword = await bcrypt.compare(password,user.password)
          if(!validPassword){
            return res.json({message:'Invalid password'})

          }
          const{password: _, ...rest} = user
          
console.log(user);

            const token =jwt.sign(rest ,process.env.KEY as string,{expiresIn:'3600s'})
          res.json({
            message:'Logged in',
            user: rest,
            token
        })
        
       } catch (error) {
        res.json({error})
       }

}

export const getUsers: RequestHandler = async (req, res) => {
    try {
      const pool = await mssql.connect(sqlConfig)
      const users = await pool.request().execute('getUsers')
      const { recordset } = users
      res.json(recordset)
    } catch (error) {
      res.json({ error })
    }
  }

  export const getadmin: RequestHandler = async (req, res) => {
    try {
      const pool = await mssql.connect(sqlConfig)
      const users = await pool.request().execute('getadmin')
      const { recordset } = users
      res.json(recordset)
    } catch (error) {
      res.json({ error })
    }
  }

export const getHomepage=async(req:Extended, res:Response)=>{
   if(req.info){
     return res.json({message:`Welcome to the Homepage ${req.info.email}`})
   }
}

export const checkUser= async (req:Extended, res:Response)=>{
  if(req.info){
    res.json({name:req.info.username, role:req.info.role})
  }
}