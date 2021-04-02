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
import jwt from 'jsonwebtoken';
import { User } from './User';
import config from '../configs';

export interface RefreshTokenPayload {
  userId: string;
  tokenId: string;
}

export interface AccessTokenPayload {
  userId: string;
}

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: false })
  disabled!: boolean;

  @ManyToOne((type) => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt!: Date;

  static async generateToken(user: User) {
    const token = new Token();
    token.user = user;
    await token.save();

    const refreshToken = jwt.sign(
      { userId: user.id, tokenId: token.id } as RefreshTokenPayload,
      config.jwtSecret,
      {
        subject: 'refreshToken',
        issuer: 'henein.club',
        expiresIn: '14d',
      }
    );

    const accessToken = jwt.sign(
      { userId: user.id } as AccessTokenPayload,
      config.jwtSecret,
      {
        subject: 'accessToken',
        issuer: 'henein.club',
        expiresIn: '30m',
      }
    );

    return { refreshToken, accessToken };
  }
}
