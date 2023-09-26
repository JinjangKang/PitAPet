import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { LostImage } from './lostImage.entity';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([LostImage])],
    controllers: [],
    providers: [],
})
export class lostImageModule {}
