import { Router } from 'express'
import CagesController from '../controllers/CagesController'


export const cagesRouter = Router()
const cagesCtrl = new CagesController()

cagesRouter.get('/zookeeper/:zookeeperRegistrationCode', async (req, res) => {
  const zookeeperRegistrationCode =  req.params.zookeeperRegistrationCode
  const cages = await cagesCtrl.findByZookeeper(zookeeperRegistrationCode)
  if (cages) {
    return res.json({ cages })
  }

  return res.status(404).json({ message: 'No zookeeper for given id' })
})

