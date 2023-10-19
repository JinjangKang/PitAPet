import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { LostImage } from './lostImage.entity';
import { dataSource } from 'src/server';
import { Lost } from '../lost.entity';

@CustomRepository(LostImage)
export class lostImageRepository extends Repository<LostImage> {
    async insertlostImage(lostNo, lostImages): Promise<void> {
        const [image1, image2, image3, image4] = lostImages;

        await this.insert({
            lostNo,
            image1,
            image2,
            image3,
            image4,
        });
    }
}
