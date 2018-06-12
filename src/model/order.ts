import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user";
import { Movie } from "./movie";

@Entity()
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    // @Column()
    // public rentTime: Date;

    // @Column()
    // public returnTime: Date;

    @Column()
    public totalPrise: number;

    @ManyToOne(type => User, user => user.orders, {
        cascade: true
    })
    public user: User;

    @ManyToOne(type => Movie)
    @JoinColumn()
    public movie: Movie;
}