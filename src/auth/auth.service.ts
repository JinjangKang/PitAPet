import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { MypageRepository } from 'src/myPage/myPage.repository';
import axios from 'axios';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private userRepository: UserRepository,
        private myPageRepository: MypageRepository,
    ) {}
    private readonly kakaoTokenVerifyUrl = 'https://kapi.kakao.com/v1/user/access_token_info';
    private readonly kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';

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

    async checkKaKao(username) {
        await this.userRepository.checkKaKao(username);
    }

    async verifyKakaoToken(token: string): Promise<boolean> {
        try {
            // 카카오 토큰 검증
            const response = await axios.get(this.kakaoTokenVerifyUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.code !== 0) {
                console.error('Kakao token verification failed:', response.data);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Kakao token verification failed:', error);
            return false;
        }
    }

    async getUserInfoFromKakao(token: string): Promise<string | null> {
        try {
            // 카카오 API를 사용하여 사용자 정보 조회
            const response = await axios.get(this.kakaoUserInfoUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // 여기에서 response.data에는 사용자 정보가 들어 있음
            const userName = response.data.properties.nickname;
            return userName;
        } catch (error) {
            console.error('Failed to get user info from Kakao:', error);
            return null;
        }
    }
}
