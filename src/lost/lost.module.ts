import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../typeorm-ex.module';

import { HttpModule } from '@nestjs/axios';
import { lostController } from './lost.controller';
import { lostService } from './lost.service';
import { lostRepository } from './lost.repository';
import { lostImageRepository } from './_lostImage/lostImage.repository';
import { S3Service } from 'src/S3/s3.service';
import { UserRepository } from 'src/auth/user.repository';
import { MypageRepository } from 'src/myPage/myPage.repository';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([lostRepository, lostImageRepository, UserRepository, MypageRepository]),
        HttpModule,
        JwtModule.registerAsync({
            imports: [ConfigModule], // ConfigModule 사용을 위한 import 추가
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET_KEY'), // 환경 변수에서 시크릿 키 가져오기
                signOptions: { expiresIn: '12h' },
            }),
            inject: [ConfigService], // ConfigService 주입
        }),
    ],
    controllers: [lostController],
    providers: [lostService, S3Service, AuthService],
})
export class lostModule {}
