import { Injectable } from '@nestjs/common';
import { IdleRepository } from './Idle.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Idle } from './Idle.entity';

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

    async getDetail(desertionNo): Promise<Idle> {
        return this.IdleRepository.getDetail(desertionNo);
    }
}
