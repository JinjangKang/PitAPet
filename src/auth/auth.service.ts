import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { MypageRepository } from 'src/myPage/myPage.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private userRepository: UserRepository,
        private myPageRepository: MypageRepository,
    ) {}

    // 유저 확인
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findByUsername(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    //토큰 확인
    async validateToken(token: string): Promise<any> {
        try {
            const decoded = this.jwtService.verify(token);
            return decoded;
        } catch (error) {
            // 토큰이 유효하지 않은 경우 예외를 처리할 수 있습니다.
            return null;
        }
    }

    //로그인
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    //아이디 중복확인
    async checkRedundancy(username: string): Promise<string> {
        // 아이디 중복확인 -> true: 중복, false: 중복되지 않음
        if (await this.userRepository.checkRedundancy(username)) {
            return '아이디가 중복 되었습니다.';
        } else {
            return '사용 가능한 아이디입니다.';
        }
    }
    // 회원가입
    async register(username: string, password: string): Promise<any> {
        // 아이디 중복확인 -> true: 중복, false: 중복되지 않음
        if (await this.userRepository.checkRedundancy(username)) {
            return '아이디가 중복 되었습니다.';
        } else {
            // 비밀번호를 해시화하여 저장
            const hashedPassword = await this.hashPassword(password);

            // 엔터티 인스턴스 생성
            const user = new User();
            user.username = username;
            user.password = hashedPassword;

            // 데이터베이스에 사용자 저장
            await this.userRepository.createUser(user);
            await this.myPageRepository.createMypage(user);

            return '회원가입이 완료되었습니다.';
        }
    }

    //비밀번호 해싱
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
}
