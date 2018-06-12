import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToOne } from "typeorm";
import { User } from "./user";
import { Movie } from "./movie";

@Entity()
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;
   

    @Column()
    public rentTime: Date;

    @Column()
    public returnTime: Date;

    @Column()
    public totalPrise: number;

    @ManyToOne(type => User, user => user.orders)
    public user: User;

    @OneToOne(type => Movie, movie => movie.id)
    public movie: Movie;
}