import 'reflect-metadata'
import { DataSource } from 'typeorm'
import Cage from './entity/Cage'
import Species from './entity/Species'
import Specimen from './entity/Specimen'
import Zookeeper from './entity/Zookeeper'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'zoo',
  synchronize: true,
  logging: false,
  entities: [Species, Specimen, Zookeeper, Cage],
  migrations: [],
  subscribers: [],
})
