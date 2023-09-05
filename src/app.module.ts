import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { IdleModule } from './idle/Idle.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig), // TypeORM 설정 파일 연결
        IdleModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
