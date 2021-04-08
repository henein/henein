import { IsEmail } from 'class-validator';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import argon2 from 'argon2';
import { Token } from './Token';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Token, (token) => token.user)
  tokens!: Token[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt!: Date;

  async verifyPassword(password: string) {
    return await argon2.verify(this.password, password);
  }

  static async noUserVerify() {
    await argon2.verify(
      '$argon2id$v=19$m=4096,t=4,p=4$PFnuLvBGYirDsO8RvPNRQw$P5zvy0l+VtZpEt15exZa0uU5Lv/gq5YxZklFM2GrU9M',
      'DummyPassword'
    );

    return false;
  }
}
