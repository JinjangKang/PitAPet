import { Injectable } from '@nestjs/common';
import { CreateIdleDto } from './dto/create_Idle.dto';
import { UpdateIdleDto } from './dto/update_Idle.dto';
import { IdleRepository } from './Idle.repository';
import { Idle } from './Idle.entity';

@Injectable()
export class IdleService {
    constructor(private IdleRepository: IdleRepository) {}

    async insert(idleData: any[]): Promise<any> {
        return this.IdleRepository.insertIdle(idleData);
    }

    async getData(pageSize, offset, startDate, endDate, region, isUnderProtection, type): Promise<any[]> {
        return await this.IdleRepository.getData(pageSize, offset, startDate, endDate, region, isUnderProtection, type);
    }

    // async get(
    //     asCode: string,
    //     endUser: string,
    //     client: string,
    //     updateUser: string,
    //     aState: string,
    //     afterDate: string,
    //     beforeDate: string,
    // ): Promise<Idle[]> {
    //     return this.IdleRepository.get(asCode, endUser, client, updateUser, aState, afterDate, beforeDate);
    // }
}
