import { Exclude } from 'class-transformer';
import { Role } from 'src/modules/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsPreset,
  UserGender,
  UserStatus,
} from '../../../constants/typeorm.constants';

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '用户名',
    nullable: false,
    unique: true,
    length: 30,
  })
  username: string;

  @Exclude()
  @Column({
    comment: '密码',
    nullable: false,
    length: 100,
  })
  password: string;

  @Column({
    comment: '昵称',
    nullable: true,
    length: 50,
  })
  nickname: string;

  @Column({
    comment: '邮箱',
    nullable: true,
    length: 50,
  })
  email: string;

  @Column({
    comment: '手机号码',
    nullable: true,
    length: 20,
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column({
    comment: '头像',
    nullable: true,
    length: 200,
  })
  avatar: string;

  @Column({
    type: 'enum',
    comment: '状态 0禁用 1启用',
    nullable: false,
    enum: UserStatus,
    default: UserStatus.ENABLED,
  })
  status: number;

  @Column({
    type: 'enum',
    comment: '性别 1男 0女',
    nullable: false,
    enum: UserGender,
    default: UserGender.MALE,
  })
  gender: number;

  @Column({
    type: 'enum',
    comment: '是否为预设记录 1是 0否',
    nullable: false,
    enum: IsPreset,
    default: IsPreset.NO,
    name: 'is_preset',
  })
  isPreset: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    comment: '修改时间',
  })
  updatedAt: Date;

  @JoinColumn({
    name: 'role_id',
  })
  @ManyToOne(() => Role)
  role: Role;
}
