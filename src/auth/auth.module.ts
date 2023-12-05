import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { UserRepository } from './user.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MypageRepository } from 'src/myPage/myPage.repository';
import { KakaoStrategy } from './kakao.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([UserRepository, MypageRepository]),
        JwtModule.registerAsync({
            imports: [ConfigModule], // ConfigModule 사용을 위한 import 추가
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET_KEY'), // 환경 변수에서 시크릿 키 가져오기
                signOptions: { expiresIn: '12h' },
            }),
            inject: [ConfigService], // ConfigService 주입
        }),
        PassportModule.register({ defaultStrategy: 'kakao' }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, KakaoStrategy],
    exports: [AuthService],
})
export class AuthModule {}
