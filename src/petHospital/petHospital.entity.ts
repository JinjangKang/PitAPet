import {
    BaseEntity,
    Column,
    Entity,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('PetHospital', { schema: 'pitapet' })
export class petHospital extends BaseEntity {
    @PrimaryGeneratedColumn()
    ID: number;
    @Column('varchar') LatLng: string;
    @Column('varchar') username: string;
    @Column('varchar') reply: string;
    @Column('varchar') created_at: Date;
    @UpdateDateColumn() updated_at: Date;
    @DeleteDateColumn() deleted_at: Date;
}
