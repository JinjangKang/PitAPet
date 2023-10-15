import { Injectable } from '@nestjs/common';
import { IdleRepository } from './Idle.repository';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class IdleService {
    constructor(private IdleRepository: IdleRepository) {}

    @Cron(CronExpression.EVERY_HOUR)
    async insert(): Promise<any> {
        return this.IdleRepository.insertIdle();
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
