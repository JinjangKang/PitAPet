import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Between, ILike, Repository } from 'typeorm';
import { LostImage } from './lostImage.entity';
import { CreatelostImageDto } from './dto/create_lost.dto';
import { dataSource } from 'src/server';
import { lostRepository } from '../lost.repository';
import { Lost } from '../lost.entity';

@CustomRepository(LostImage)
export class lostImageRepository extends Repository<LostImage> {
    async insertlostImage(lostImage: Blob[]): Promise<void> {
        const lostNoCol = await dataSource.getRepository(Lost).findOne({
            where: {},
            order: { lostNo: 'DESC' },
            withDeleted: true,
        });
        let lostNo = lostNoCol.lostNo;
        if (!lostNoCol) {
            lostNo = 'L000001';
        }

        const [image1, image2, image3, image4] = lostImage;

        await this.insert({
            lostNo,
            image1,
            image2,
            image3,
            image4,
        });
    }
}
