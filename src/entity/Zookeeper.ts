import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm'
import Cage from './Cage'

@Entity()
export default class Zookeeper {
  @PrimaryColumn()
  registrationCode: string

  @Column()
  name: string

  @Column()
  birthday: Date

  @ManyToMany(() => Cage, { cascade: true })
  cages: Promise<Cage[]>
}
