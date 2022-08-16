import express, { json } from 'express'
import router from './Routes/routes'
import routers from './Routes/projectRoute'
import cors from 'cors'

const app= express()

app.use(json())
app.use(cors())
app.use('/user', router)
app.use('/project', routers)


app.listen(5000,()=>{
    console.log("Application Running");
    
})