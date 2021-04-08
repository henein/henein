import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Job } from './Job';
import { World } from './World';

@Entity()
export class Character extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 12, unique: true })
  nickname!: string;

  @Column()
  level!: number;

  @ManyToOne(() => Job, (job) => job.characters)
  @JoinColumn({ name: 'job_id' })
  job!: Job;

  @Column()
  dojang!: number;

  @Column({ name: 'main_stat' })
  mainStat!: number;

  @ManyToOne(() => World, (world) => world.characters)
  @JoinColumn({ name: 'world_id' })
  world!: World;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt!: Date;
}
