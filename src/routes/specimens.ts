import { Router } from 'express'
import SpecimensController from '../controllers/SpecimensController'


export const specimensRouter = Router()
const specimenCtrl = new SpecimensController()

specimensRouter.get('/species/:speciesId', async (req, res) => {
  const id =  req.params.speciesId
  const speciesId = parseInt(id)
  const specimen = await specimenCtrl.findBySpecie(speciesId)
  if (specimen) {
    return res.json({ specimen })
  }

  return res.status(404).json({ message: 'No species for given habitat' })
})

specimensRouter.get('/cage/:cageCode', async (req, res) => {
  const cageCode =  req.params.cageCode
  const specimen = await specimenCtrl.findSpecimensByCage(cageCode)
  if (specimen.length > 0) {
    return res.json({ specimen })
  }

  return res.status(404).json({ message: 'No species for given habitat' })
})

specimensRouter.get('/zookeeper/:zookeeperRegistrationCode', async (req, res) => {
  const zookeeperRegistrationCode =  req.params.zookeeperRegistrationCode
  const specimen = await specimenCtrl.findSpecimensByZooKeeper(zookeeperRegistrationCode)
  if (specimen.length > 0) {
    return res.json({ specimen })
  }

  return res.status(404).json({ message: 'No species for given habitat' })
})

