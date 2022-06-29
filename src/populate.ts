import { connectToDB } from './config/db'
import { AppDataSource } from './data-source'
import {
  cage_zookeeper,
  cages,
  species,
  specimens,
  zookeepers,
} from './data/zoo.json'
import Cage from './entity/Cage'
import Species from './entity/Species'
import Specimen from './entity/Specimen'
import Zookeeper from './entity/Zookeeper'

const loadInitialData = async () => {
  await connectToDB()

  await AppDataSource.manager.delete(Specimen, {})
  await AppDataSource.manager.delete(Species, {})
  await AppDataSource.manager.delete(Cage, {})
  await AppDataSource.manager.delete(Zookeeper, {})

  for (let s of species) {
    const newSpecies = new Species()
    Object.assign(newSpecies, s)
    await AppDataSource.manager.save(newSpecies)
  }

  for (let c of cages) {
    const newCage = new Cage()
    Object.assign(newCage, c)
    await AppDataSource.manager.save(newCage)
  }

  for (let z of zookeepers) {
    const newZookeeper = new Zookeeper()
    Object.assign(newZookeeper, z)
    await AppDataSource.manager.save(newZookeeper)
  }

  for (let s of specimens) {
    const cage = await AppDataSource.manager.findOne(Cage, {
      where: { code: s.cageId },
    })
    const species = await AppDataSource.manager.findOne(Species, {
      where: { id: s.speciesId },
    })

    const newSpecimen = new Specimen()
    newSpecimen.id = s.id
    newSpecimen.nickName = s.nickName
    newSpecimen.serialNumber = s.serialNumber
    newSpecimen.cage = cage
    newSpecimen.species = species

    await AppDataSource.manager.save(newSpecimen)
  }

  for (let cz of cage_zookeeper) {
    const cage = await AppDataSource.manager.findOne(Cage, {
      where: { code: cz.cageId },
    })
    const zookeeper = await AppDataSource.manager.findOne(Zookeeper, {
      where: { registrationCode: cz.zookeeperId },
    })

    ;(await cage.zookeepers).push(zookeeper)
    await AppDataSource.manager.save(cage)
  }

  console.log('DB populated')
}

loadInitialData()
