import { Like, ILike, Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import Species from '../entity/Species'

export default class SpeciesController {
  private _repo: Repository<Species>

  constructor() {
    this._repo = AppDataSource.getRepository(Species)
  }

  async save(species: Species) {
    const savedSpecies = await this._repo.save(species)
    return savedSpecies
  }

  async findAll() {
    const species = await this._repo.find()
    return species
  }

  async findById(id: number) {
    const species = await this._repo.findOneBy({ id })
    return species
  }

  async findByHabitat(param: string) {
    const species = await this._repo.find({
      where: {
        habitat: ILike(`%${param}%`)
      }
    })
    return species
  }
  
  async findByScientificName(param: string) {
    const species = await this._repo.find({
     where: {
      scientificName: ILike(`${param}`)
    }
    })
 
    return species
  }

  
}
