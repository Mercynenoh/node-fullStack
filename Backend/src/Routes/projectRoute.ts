import {Router} from 'express'
import{addProject, getProjects, getProject,deleteProject, getuserProject, updateComplete} from '../Controllers/projectController'

 const routers = Router()

 routers.post('/', addProject)
 routers.get('/get', getProjects)
 routers.get('/:email', getuserProject)
 routers.put('/:ProjectsId', updateComplete)
 routers.delete('/:ProjectsId', deleteProject)
 routers.get('/:ProjectsId', getProject)

 export  default routers
