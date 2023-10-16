import { DataSource } from 'typeorm';
import { Idle } from './idle/Idle.entity';
import { Lost } from './lost/lost.entity';
import { LostImage } from './lost/_lostImage/lostImage.entity';
import { User } from './auth/user.entity';

export const dataSource = new DataSource({
    type: 'mariadb', //Database 설정
    host: '3.37.127.237',
    port: 20000,
    username: 'jinkang',
    password: '0408',
    database: 'pitapet',
    entities: [Idle, Lost, LostImage, User],
});

dataSource.initialize();
