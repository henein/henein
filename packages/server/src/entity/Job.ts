import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatType } from '../constants/jobs';
import { Character } from './Character';

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    name: 'main_stat_type',
    type: 'enum',
    enum: StatType,
    default: StatType.NULL,
  })
  mainStatType!: StatType;

  @OneToMany(() => Character, (character) => character.job)
  characters!: Character[];
}
