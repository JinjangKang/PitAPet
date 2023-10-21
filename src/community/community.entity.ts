import { BaseEntity, Column, Entity, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('COMMUNITY', { schema: 'pitapet' })
export class Community extends BaseEntity {
    @PrimaryGeneratedColumn()
    post_id: number;

    @Column('varchar') username: string;
    @Column('varchar') title: string;
    @Column('varchar') content: string;
    @Column('varchar') created_at: Date;
    @Column('varchar') updated_at: Date;
}
