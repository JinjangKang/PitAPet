import { DataSource } from 'typeorm';
import { Idle } from './idle/Idle.entity';
import { Lost } from './lost/lost.entity';
import { LostImage } from './lost/_lostImage/lostImage.entity';
import { User } from './auth/user.entity';
import { Mypage } from './myPage/myPage.entity';
import { Community } from './community/community.entity';
import { Reply } from './reply/Reply.entity';
import { petHospital } from './petHospital/petHospital.entity';
import { LostReply } from './lostReply/lostReply.entity';

export const dataSource = new DataSource({
    type: 'mariadb', //Database 설정
    host: '3.37.127.237',
    port: 20000,
    username: 'jinkang',
    password: '0408',
    database: 'pitapet',
    entities: [Idle, Lost, LostImage, LostReply, User, Mypage, Community, Reply, petHospital],
});

dataSource.initialize();
