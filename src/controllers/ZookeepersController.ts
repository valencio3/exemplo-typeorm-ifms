import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import Cage from '../entity/Cage'
import Zookeeper from '../entity/Zookeeper'

export default class ZookeepersController {
  private _repo: Repository<Zookeeper>

  constructor() {
    this._repo = AppDataSource.getRepository(Zookeeper)
  }

  async findById(id: string) {
    const zookeeper = await this._repo.find({
      where: {
        registrationCode: id,
        
      }
    })

    return zookeeper
  }


}
