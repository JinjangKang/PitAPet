import { Injectable } from '@nestjs/common';
import { lostRepository } from './lost.repository';
import { CreatelostDto } from './dto/create_lost.dto';
import { lostImageRepository } from './_lostImage/lostImage.repository';

@Injectable()
export class lostService {
    constructor(private lostRepository: lostRepository, private lostImageRepository: lostImageRepository) {}

    async insert(lostData: CreatelostDto, images): Promise<any> {
        await this.lostRepository.insertlost(lostData);
        return await this.lostImageRepository.insertlostImage(images);
    }

    async getall() {
        return await this.lostRepository.getall();
    }

    async getData(pageSize, offset): Promise<any[]> {
        return await this.lostRepository.getData(pageSize, offset);
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
