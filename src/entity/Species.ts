import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class Species {
  @PrimaryColumn()
  id: number

  @Column()
  scientificName: string

  @Column()
  commonName: string

  @Column()
  order: string

  @Column()
  family: string

  @Column()
  habitat: string
}
