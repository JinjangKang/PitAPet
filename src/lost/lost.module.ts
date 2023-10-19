import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../typeorm-ex.module';

import { HttpModule } from '@nestjs/axios';
import { lostController } from './lost.controller';
import { lostService } from './lost.service';
import { lostRepository } from './lost.repository';
import { lostImageRepository } from './_lostImage/lostImage.repository';
import { S3Service } from 'src/S3/s3.service';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([lostRepository, lostImageRepository]), HttpModule],
    controllers: [lostController],
    providers: [lostService, S3Service],
})
export class lostModule {}
