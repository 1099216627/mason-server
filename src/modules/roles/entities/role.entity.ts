import { Competence } from 'src/modules/competence/entities/competence.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '角色名',
    unique: true,
    nullable: false,
    length: 20,
  })
  name: string;

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

  @OneToMany(() => User, (user) => user.role, {
    cascade: true,
  })
  users: User[];

  @ManyToMany(() => Competence, (competence) => competence.roles)
  competences: Competence[];
}
