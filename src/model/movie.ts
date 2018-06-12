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

    @Column({nullable: true})
    public description: string;

    @Column({nullable: true})
    public filename: string;

    @Column({nullable:true})
    public views: number;

    @Column({nullable: true})
    public isPublished: boolean;
}