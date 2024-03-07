import { Column, CreateDateColumn, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Address } from "./Address";

import { v4 as uuid } from 'uuid';
import { Items } from "./Items";

type StatusEnum = {
  PAID: 'paid',
  PENDING: 'pending',
  DRAFT: 'draft'
}

export class Invoice {
    @PrimaryColumn()
    id: string;
    
    @Column()
    description: string;

    @Column()
    client_name: string;

    @Column()
    client_email: string;

    @Column()
    status: StatusEnum;

    @Column()
    sender_address_id: string;

    @Column()
    client_address_id: string;

    @Column()
    items_id: string;

    @OneToOne(() => Address)
    @JoinColumn({name: "sender_address_id"})
    sender_address: Address;

    @OneToOne(() => Address)
    @JoinColumn({name: "client_address_id"})
    client_address: Address;

    @OneToMany(() => Items, items => items.id)
    @JoinColumn({name: "items_id"})
    items: Items[];
    
    @CreateDateColumn()
    created_at: Date;
    
    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}