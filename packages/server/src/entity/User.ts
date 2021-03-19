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

  static async checkPassword(email: string, password: string) {
    const user = await this.findOne({ email: email });

    if (!user) {
      // 등록되지않은 유저
      return;
    }

    if (await argon2.verify(user.password, password)) {
      // 비밀 번호 일치
    } else {
      // 비밀 번호 불일치
    }
  }
}
