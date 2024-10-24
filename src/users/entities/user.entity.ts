import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  GOD = 'GOD'  
}

@Entity('bg_user')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    username: string;

    // @Column({
    //   nullable: true
    // })
    // description: string; // add

    @Column()
    password: string;
    
    @Column({
      type: 'enum',
      enum: Role, 
      default: Role.USER
    })
    
    role: Role;

    @Column()
    displayname: string;



}

