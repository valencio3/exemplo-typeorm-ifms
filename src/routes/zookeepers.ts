import { Router } from 'express'
import SpecimensController from '../controllers/SpecimensController'
export const zookeepersRouter = Router()
const zookeeperCtrl = new SpecimensController()

zookeepersRouter.get('/species/:speciesId', async (req, res) => {
  const id =  req.params.speciesId
  const speciesId = parseInt(id)
 
  const zookeepers = await zookeeperCtrl.findZookeepersBySpecie(speciesId)
  
  if (zookeepers.length > 0) {
    return res.json({ zookeepers })
  }

  return res.status(404).json({ message: 'No zookeepers for given specieId' })
})
