import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";

import { v4 as uuid } from 'uuid';

import { Invoice } from "./Invoice";

@Entity("items")
export class Items {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    invoice_id: string;
    
    @ManyToOne(() => Invoice, invoice => invoice.id, {
        cascade: true,
    })
    @JoinColumn({name: "invoice_id"})
    invoices: Invoice;

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