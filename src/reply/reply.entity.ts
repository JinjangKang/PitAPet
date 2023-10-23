import { BaseEntity, Column, Entity, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('REPLY', { schema: 'pitapet' })
export class Reply extends BaseEntity {
    @PrimaryGeneratedColumn()
    reply_id: number;

    @Column('varchar') post_id: number;
    @Column('varchar') username: string;
    @Column('varchar') content: string;
    @Column('varchar') created_at: Date;
    @Column('varchar') updated_at: Date;
}