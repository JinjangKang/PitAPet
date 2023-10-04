import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('LOSTIMAGE', { schema: 'pitapet' })
export class LostImage extends BaseEntity {
    @Column('varchar', {
        primary: true,
        name: 'lostNo',
        length: 100,
    })
    lostNo: string;

    @Column({ type: 'longblob' }) image1: Blob;
    @Column({ type: 'longblob' }) image2: Blob;
    @Column({ type: 'longblob' }) image3: Blob;
    @Column({ type: 'longblob' }) image4: Blob;
}
