import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Addresses } from "./addresses";
import { Categories } from "./categories";
import { Schedules_user_properties } from "./schedules_user_properties";

@Entity("properties")
export class Properties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  sold: boolean;

  @Column("decimal", { precision: 12, scale: 2 })
  value: number;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Addresses)
  @JoinColumn()
  address: Addresses;

  @ManyToOne(() => Categories, (categories) => categories.properties)
  category: Categories;

  @OneToMany(() => Schedules_user_properties, (schedules_user_properties) => schedules_user_properties.property)
  schedules: Schedules_user_properties[];
}
