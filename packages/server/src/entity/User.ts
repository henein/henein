import { IsEmail } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import argon2 from 'argon2';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  password!: string;

  // @Column()
  // @IsDate()
  // birthday!: Date;

  async verifyPassword(password: string) {
    return await argon2.verify(this.password, password);
  }
}
