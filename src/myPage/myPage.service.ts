import { Injectable } from '@nestjs/common';
import { MypageRepository } from './myPage.repository';

@Injectable()
export class MypageService {
    constructor(private mypageRepository: MypageRepository) {}

    async dibIdle(username: string, desertionNo: string): Promise<string> {
        return this.mypageRepository.dibIdle(username, desertionNo);
    }

    async getDibs(username: string): Promise<any> {
        return this.mypageRepository.getDibs(username);
    }
}
