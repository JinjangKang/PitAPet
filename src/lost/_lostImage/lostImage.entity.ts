import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('LOSTIMAGE', { schema: 'pitapet' })
export class LostImage extends BaseEntity {
    @Column('varchar', {
        primary: true,
        name: 'lostNo',
        length: 100,
    })
    lostNo: string;

    @Column('varchar') image1: Blob;
    @Column('varchar') image2: Blob;
    @Column('varchar') image3: Blob;
    @Column('varchar') image4: Blob;
}
