import { Router } from 'express'

import { devController } from '../../adapters/controllers/dev'

export const routes = Router()

routes.get('/', (req, res) => res.send('olá mundoss'))

routes.post('/devs', devController.create)
routes.get('/devs', devController.index)
routes.delete('/devs/:dev_id', devController.delete)
