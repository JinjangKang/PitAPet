import { BaseEntity, Column, Entity, DeleteDateColumn } from 'typeorm';

@Entity('MYPAGE', { schema: 'pitapet' })
export class Mypage extends BaseEntity {
    @Column('varchar', {
        primary: true,
        name: 'username',
        length: 100,
    })
    username: string;

    @Column('varchar') dibList: string;
    @Column('varchar') likeList: string;
}
