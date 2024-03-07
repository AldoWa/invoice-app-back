import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

import { v4 as uuid } from 'uuid';

@Entity("address")
export class Address {
  @PrimaryColumn()
  id: string;
  
  @Column()
  street: string;
  
  @Column()
  city: string;

  @Column()
  post_code: string;

  @Column()
  country: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}