import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'firstName', nullable: false, type: 'varchar', length: 50 })
  firstName: string;
  @Column({ name: 'lastName', length: 50, nullable: false })
  lastName: string;
  @Column({ name: 'email', length: 50, nullable: false })
  email: string;
  @Column({ name: 'password', length: 255, nullable: false })
  password: string;
  @Column({ nullable: false })
  salt: string;
  @Column({ nullable: true, type: 'varchar', length: 64 })
  confirmationToken: string;
  @Column({ nullable: true, type: 'varchar', length: 64 })
  recoverToken: string;
  @Column({ nullable: false, type: 'varchar', length: 20 })
  role: string;
  @Column({ nullable: false, default: true })
  status: boolean;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updadedAt: Date;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
