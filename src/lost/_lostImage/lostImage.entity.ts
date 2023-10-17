import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('LOSTIMAGE', { schema: 'pitapet' })
export class LostImage extends BaseEntity {
    @Column('varchar', {
        primary: true,
        name: 'lostNo',
        length: 100,
    })
    lostNo: string;

    @Column({ type: 'varchar' }) image1: string;
    @Column({ type: 'varchar' }) image2: string;
    @Column({ type: 'varchar' }) image3: string;
    @Column({ type: 'varchar' }) image4: string;
}
