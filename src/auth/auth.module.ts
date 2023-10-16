import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([UserRepository]),
        JwtModule.register({
            secret: 'your-secret-key', // JWT 시크릿 키
            signOptions: { expiresIn: '1h' }, // 토큰 만료 시간 설정
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService],
})
export class AuthModule {}
