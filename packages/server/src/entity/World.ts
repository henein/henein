import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Character } from './Character';

@Entity()
export class World extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: number;

  @Column()
  name!: string;

  @OneToMany(() => Character, (character) => character.world)
  characters!: Character[];
}
