import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import Cage from '../entity/Cage'

export default class CagesController {
  private _repo: Repository<Cage>

  constructor() {
    this._repo = AppDataSource.getRepository(Cage)
  }

  async findByZookeeper(id: string) {
    const zookeeper = await this._repo.find({
      relations: {
        zookeepers: true
      },
      where: {
        zookeepers:{
          registrationCode: id
        },
        
      }
    })

    return zookeeper
  }
  
}
