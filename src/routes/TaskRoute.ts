import { Router } from 'express'
import Task from '../controllers/TaskController'

const routes = Router()

routes.get('/', Task.readAll)
routes.get('/:id', Task.readById)
routes.post('/', Task.create)
routes.put('/:id', Task.update)
routes.delete('/:id', Task.delete)

export default routes