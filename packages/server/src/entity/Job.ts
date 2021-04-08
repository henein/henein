import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Character } from './Character';

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ name: 'code' })
  code!: number;

  @Column({ name: 'detail_code' })
  detailCode!: number;

  @OneToMany(() => Character, (character) => character.job)
  characters!: Character[];
}
