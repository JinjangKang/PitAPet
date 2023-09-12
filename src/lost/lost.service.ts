import { Injectable } from '@nestjs/common';
import { lostRepository } from './lost.repository';
import { CreatelostDto } from './dto/create_lost.dto';

@Injectable()
export class lostService {
    constructor(private lostRepository: lostRepository) {}

    async insert(lostData: CreatelostDto): Promise<any> {
        return this.lostRepository.insertlost(lostData);
    }

    async getall() {
        return await this.lostRepository.getall();
    }

    async getData(pageSize, offset, startDate, endDate, region, isUnderProtection, type): Promise<any[]> {
        return await this.lostRepository.getData(pageSize, offset, startDate, endDate, region, isUnderProtection, type);
    }

    // async get(
    //     asCode: string,
    //     endUser: string,
    //     client: string,
    //     updateUser: string,
    //     aState: string,
    //     afterDate: string,
    //     beforeDate: string,
    // ): Promise<lost[]> {
    //     return this.lostRepository.get(asCode, endUser, client, updateUser, aState, afterDate, beforeDate);
    // }
}
