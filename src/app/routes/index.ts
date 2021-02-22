import { Router } from 'express'

import { devController } from '../../adapters/controllers/dev'
import { sessionController } from '../../adapters/controllers/session'
import { taskController } from '../../adapters/controllers/task'
import { profileController } from '../../usecases/profile'

export const routes = Router()

routes.get('/', (req, res) => res.send('olá mundoss'))

routes.post('/sessions', sessionController.create)

routes.post('/devs', devController.create)
routes.get('/devs', devController.index)
routes.delete('/devs/:dev_id', devController.delete)

routes.get('/devs/:dev_github', profileController.show)

routes.post('/devs/:dev_id/tasks', taskController.create)
