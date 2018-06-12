import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Order } from "./order";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column({nullable: true})
    public firstName: string;

    @Column({nullable: true})
    public lastName: string;

    @Column({nullable: true})
    public age: number;

    @OneToMany(type => Order, order => order.user)
    public orders: Order[];
}