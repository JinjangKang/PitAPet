import { BaseEntity, Column, Entity, DeleteDateColumn } from 'typeorm';

@Entity('LOST', { schema: 'pitapet' })
export class Lost extends BaseEntity {
    @Column('varchar', {
        primary: true,
        name: 'lostNo',
        length: 100,
    })
    lostNo: string;

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
