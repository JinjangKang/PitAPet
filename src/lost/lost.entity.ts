import { BaseEntity, Column, Entity, DeleteDateColumn } from 'typeorm';

@Entity('LOST', { schema: 'pitapet' })
export class Lost extends BaseEntity {
    @Column('varchar', {
        primary: true,
        name: 'lostNo',
        length: 100,
    })
    lostNo: string;

    @Column('varchar') type: string;
    @Column('varchar') sexCd: string;
    @Column('varchar') neuterYn: string;
    @Column('varchar') age: string;
    @Column('varchar') weight: string;
    @Column('varchar') furColor: string;
    @Column('varchar') feature: string;
    @Column('varchar') lostPlace: string;
    @Column('varchar') lostDate: string;
    @Column('varchar') tel: string;
    @Column('varchar') reward: string;
    @Column('varchar') title: string;
    @Column('varchar') detail: string;
    @Column('varchar') createdDate: Date;
    @Column('varchar') petName: string;
}
