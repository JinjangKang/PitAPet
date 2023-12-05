import { BaseEntity, Column, Entity, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('LOSTREPLY', { schema: 'pitapet' })
export class LostReply extends BaseEntity {
    @PrimaryGeneratedColumn()
    reply_id: number;

    @Column('varchar') lostNo: string;
    @Column('varchar') username: string;
    @Column('varchar') content: string;
    @Column('datetime') created_at: Date;
    @Column('datetime') updated_at: Date;
    @DeleteDateColumn() deleted_at: Date;
}
