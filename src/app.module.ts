import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { IdleModule } from './idle/Idle.module';
import { lostModule } from './lost/lost.module';
import { lostImageModule } from './lost/_lostImage/lostImage.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MypageModule } from './myPage/myPage.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommunityModule } from './community/community.module';
import { ReplyModule } from './reply/reply.module';
import { petHospital } from './petHospital/petHospital.entity';
import { petHospitalModule } from './petHospital/petHospital.module';
import { LostReplyModule } from './lostReply/lostReply.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig), // TypeORM 설정 파일 연결
        ConfigModule.forRoot(),
        MulterModule.register({
            dest: './uploads', // 임시로 파일을 저장할 디렉토리
        }),
        AuthModule,
        IdleModule,
        lostModule,
        lostImageModule,
        MypageModule,
        CommunityModule,
        ReplyModule,
        petHospitalModule,
        LostReplyModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
