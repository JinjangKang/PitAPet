import {
    BaseEntity,
    Column,
    Entity,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('COMMUNITY', { schema: 'pitapet' })
export class Community extends BaseEntity {
    @PrimaryGeneratedColumn()
    post_id: number;

    @Column('varchar') username: string;
    @Column('varchar') title: string;
    @Column('varchar') content: string;
    @Column('varchar') created_at: Date;
    @UpdateDateColumn() updated_at: Date;
    @DeleteDateColumn() deleted_at: Date;
    @Column('int') like: number;
    @Column('int') view: number;
}
