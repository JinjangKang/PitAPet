import { BaseEntity, Column, Entity, DeleteDateColumn } from 'typeorm';

@Entity('lost', { schema: 'pitapet' })
export class lost extends BaseEntity {
    @Column('varchar', {
        primary: true,
        name: 'desertionNo',
        length: 100,
    })
    desertionNo: string;

    @Column('varchar') lostNo: string;
    @Column('varchar') lostPlace: string;
    @Column('varchar') lostDate: Date;
    @Column('varchar') title: string;
    @Column('varchar') description: string;
    @Column('varchar') image: string;
    @Column('varchar') tel: string;
    @Column('varchar') reward: string;
    @Column('varchar') type: string;
    @Column('varchar') createdDate: Date;
}
