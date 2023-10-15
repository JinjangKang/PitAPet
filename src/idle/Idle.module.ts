import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { IdleController } from './Idle.controller';
import { IdleService } from './Idle.service';
import { IdleRepository } from './Idle.repository';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([IdleRepository]), HttpModule, ScheduleModule.forRoot()],
    controllers: [IdleController],
    providers: [IdleService],
})
export class IdleModule {}
