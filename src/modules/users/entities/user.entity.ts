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
    nullable: false,
    length: 30,
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
