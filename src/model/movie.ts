import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import { Order } from "./order";

@Entity()
export class Movie extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        length: 100
    })
    public name: string;

    @Column()
    public description: string;

    @Column()
    public filename: string;

    @Column()
    public views: number;

    @Column()
    public isPublished: boolean;

    @OneToOne( type => Order, order => order.movie )
    @JoinColumn()
    public movie: Movie;
}