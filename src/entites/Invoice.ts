import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Address } from "./Address";

import { v4 as uuid } from 'uuid';
import { Items } from "./Items";
import { StatusEnum } from "../types/invoice";

@Entity("invoice")
export class Invoice {
    @PrimaryColumn()
    id: string;
    
    @Column()
    description: string;

    @Column()
    client_name: string;

    @Column()
    client_email: string;

    @Column({
      type: "enum",
      enum: StatusEnum,
    })
    status: StatusEnum;

    @Column()
    sender_address_id: string;

    @Column()
    client_address_id: string;

    @OneToOne(() => Address, {
      cascade: true,
    })
    @JoinColumn({name: "sender_address_id"})
    sender_address: Address;

    @OneToOne(() => Address, {
      cascade: true,
    })
    @JoinColumn({name: "client_address_id"})
    client_address: Address;
    
    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}