import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { IdleController } from './Idle.controller';
import { IdleService } from './Idle.service';
import { IdleRepository } from './Idle.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([IdleRepository]), HttpModule],
    controllers: [IdleController],
    providers: [IdleService],
})
export class IdleModule {}
