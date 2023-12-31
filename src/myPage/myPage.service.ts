import { Injectable } from '@nestjs/common';
import { MypageRepository } from './myPage.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class MypageService {
    constructor(private mypageRepository: MypageRepository) {}

    async mypage(user) {
        return this.mypageRepository.getmypage(user);
    }

    async dibIdle(username: string, desertionNo: string): Promise<string> {
        return this.mypageRepository.dibIdle(username, desertionNo);
    }

    async deleteDib(username: string, desertionNo: string): Promise<string> {
        return this.mypageRepository.deleteDib(username, desertionNo);
    }

    async like(username: string, post_id: string): Promise<string> {
        return this.mypageRepository.like(username, post_id);
    }

    async getDibs(username: string): Promise<any> {
        return this.mypageRepository.getDibs(username);
    }
}
