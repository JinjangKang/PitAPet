import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { ReplyRepository } from './Reply.repository';
import { ReplyController } from './Reply.controller';
import { ReplyService } from './Reply.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { UserRepository } from 'src/auth/user.repository';
import { MypageRepository } from 'src/myPage/myPage.repository';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([ReplyRepository, UserRepository, MypageRepository]),
        JwtModule.registerAsync({
            imports: [ConfigModule], // ConfigModule 사용을 위한 import 추가
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET_KEY'), // 환경 변수에서 시크릿 키 가져오기
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService], // ConfigService 주입
        }),
    ],
    controllers: [ReplyController],
    providers: [ReplyService, AuthService],
})
export class ReplyModule {}
