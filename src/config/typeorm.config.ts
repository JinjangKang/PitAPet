import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Idle } from 'src/idle/Idle.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'mariadb', //Database 설정
    host: '3.37.127.237',
    port: 3306,
    username: 'jinkang',
    password: '0408',
    database: 'pitapet',
    entities: [Idle], // Entity 연결
    synchronize: false, //true 값을 설정하면 어플리케이션을 다시 실행할 때 엔티티안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성해준다.
};
