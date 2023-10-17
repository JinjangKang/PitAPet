import { Injectable } from '@nestjs/common';
import { MypageRepository } from './myPage.repository';

@Injectable()
export class MypageService {
    constructor(private IdleRepository: MypageRepository) {}
}
