import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Properties } from "./properties";
import { Users } from "./users";

@Entity("schedules_user_properties")
export class Schedules_user_properties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Properties)
  property: Properties;

  @ManyToOne(() => Users)
  user: Users;
}
