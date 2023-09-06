import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../typeorm-ex.module';

import { HttpModule } from '@nestjs/axios';
import { lostController } from './lost.controller';
import { lostService } from './lost.service';
import { lostRepository } from './lost.repository';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([lostRepository]), HttpModule],
    controllers: [lostController],
    providers: [lostService],
})
export class lostModule {}
