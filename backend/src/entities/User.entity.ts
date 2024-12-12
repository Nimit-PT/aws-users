import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "first_name", length: 100 })
  firstName: string;

  @Column({ name: "last_name", length: 100 })
  lastName: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 255, nullable: true })
  address?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @CreateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
