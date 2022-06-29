import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import Specimen from '../entity/Specimen'

export default class SpecimensController {
  private _repo: Repository<Specimen>

  constructor() {
    this._repo = AppDataSource.getRepository(Specimen)
  }

  async findBySpecie(id: number) {
    const species = await this._repo.find({
      where: {
        species: {
          id: id,
        }
      }
    })

    return species
  }

  async findSpecimensByCage(cageCode: string) {
    const species = await this._repo.find({
      where: {
        cage: {
          code: cageCode,
        }
      }
    })

    return species
  }

  async findSpecimensByZooKeeper(zooKepperCode: string) {
    const species = await this._repo.find({
      where: {
        cage: {
          zookeepers: {
            registrationCode: zooKepperCode
          },
        }
      }
    })
    return species
  }

  async findZookeepersBySpecie(specieId: number) {
    const species = await this._repo.find({
      relations: {
        cage: { zookeepers: true, },
      },

      where: {
        species: {
          id: specieId
        },
      },
    })


    const result = await Promise.all(
      species.map(
        async (species) => species.cage.zookeepers))
    const zookeepers = []
    result.map(species => zookeepers.push(species)).flat(Infinity)
    const zookeepersFlat = zookeepers.flat(Infinity)
    return zookeepersFlat.filter((v, i, a) => a.findIndex(v2 => (JSON.stringify(v2) === JSON.stringify(v))) === i)
  }



}
