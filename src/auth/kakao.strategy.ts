// kakao.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import axios from 'axios';
import { Strategy } from 'passport-kakao';
import { AuthService } from './auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: 'a903a9d92bef0296414af88784809cce',
            clientSecret: 'QHONQs2FiVQgbCBppHgHsEtGf6PZz3ER',
            callbackURL: 'http://localhost:3000',
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
        let kakaoId = profile.id;
        let username = profile.username;

        return await this.authService.checkKaKao(username);
    }

    // async authorize(clientID: string, clientSecret: string, code: string): Promise<any> {
    //     const tokenEndpoint = 'https://kauth.kakao.com/oauth/token';
    //     const redirectUri = 'http://localhost:3000';

    //     const response = await axios.post(tokenEndpoint, null, {
    //         params: {
    //             grant_type: 'authorization_code',
    //             client_id: clientID,
    //             client_secret: clientSecret,
    //             redirect_uri: redirectUri,
    //             code: code,
    //         },
    //     });

    //     return response.data;
    // }
}
