import { BaseEntity, Column, Entity, DeleteDateColumn } from 'typeorm';

@Entity('IDLE', { schema: 'pitapet' })
export class Idle extends BaseEntity {
    @Column('varchar', {
        primary: true,
        name: 'desertionNo',
        length: 100,
    })
    desertionNo: string;

    @Column('varchar') filename: string;
    @Column('varchar') happenDt: string;
    @Column('varchar') happenPlace: string;
    @Column('varchar') kindCd: string;
    @Column('varchar') colorCd: string;
    @Column('varchar') age: string;
    @Column('varchar') weight: string;
    @Column('varchar') noticeNo: string;
    @Column('varchar') noticeSdt: string;
    @Column('varchar') noticeEdt: string;
    @Column('varchar') popfile: string;
    @Column('varchar') processState: string;
    @Column('varchar') sexCd: string;
    @Column('varchar') neuterYn: string;
    @Column('varchar') specialMark: string;
    @Column('varchar') careNm: string;
    @Column('varchar') careTel: string;
    @Column('varchar') careAddr: string;
    @Column('varchar') orgNm: string;
    @Column('varchar') chargeNm: string;
    @Column('varchar') officetel: string;
}
