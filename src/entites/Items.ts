import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

import { v4 as uuid } from 'uuid';

@Entity("items")
export class Items {
    @PrimaryColumn()
    id: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    total: number;

    @CreateDateColumn()
    created_at: Date;
    
    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}