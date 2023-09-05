import { DataSource } from 'typeorm';
import { Idle } from './idle/Idle.entity';

export const dataSource = new DataSource({
    type: 'mariadb', //Database 설정
    host: '3.37.127.237',
    port: 3306,
    username: 'jinkang',
    password: '0408',
    database: 'pitapet',
    entities: [Idle],
});

dataSource.initialize();