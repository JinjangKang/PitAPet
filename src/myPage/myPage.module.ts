import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { MypageRepository } from './myPage.repository';
import { MypageService } from './myPage.service';
import { MypageController } from './myPage.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/auth/user.repository';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([MypageRepository, UserRepository]),
        JwtModule.registerAsync({
            imports: [ConfigModule], // ConfigModule 사용을 위한 import 추가
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET_KEY'), // 환경 변수에서 시크릿 키 가져오기
                signOptions: { expiresIn: '12h' },
            }),
            inject: [ConfigService], // ConfigService 주입
        }),
    ],
    controllers: [MypageController],
    providers: [MypageService, AuthService],
})
export class MypageModule {}
