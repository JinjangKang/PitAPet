import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Lost } from './lost.entity';
import { CreatelostDto } from './dto/create_lost.dto';
import { LostImage } from './_lostImage/lostImage.entity';
import { dataSource } from 'src/server';

@CustomRepository(Lost)
export class lostRepository extends Repository<Lost> {
    async insertlost(lostData: CreatelostDto): Promise<void> {
        let lostNo: string;
        let date = new Date();
        let createdDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        const lastRow = await this.find({
            order: { lostNo: 'DESC' },
        });

        if (lastRow.length !== 0) {
            let lastRowNo = lastRow[0].lostNo;
            lostNo = 'L' + (Number(lastRowNo.slice(-6)) + 1).toString().padStart(6, '0');
        } else lostNo = 'L000001';
        const {
            type,
            sexCd,
            neuterYn,
            age,
            weight,
            furColor,
            feature,
            lostPlace,
            lostDate,
            tel,
            reward,
            title,
            detail,
        } = lostData;

        await this.insert({
            lostNo,
            type,
            sexCd,
            neuterYn,
            age,
            weight,
            furColor,
            feature,
            lostPlace,
            lostDate,
            tel,
            reward,
            title,
            detail,
            createdDate,
        });
    }

    async getall() {
        return await this.find();
    }

    async getData(pageSize, offset): Promise<any> {
        let lost: any[] = await this.find({
            take: pageSize,
            skip: offset,
        });

        for (let e of lost) {
            e.images = await dataSource.getRepository(LostImage).findOne({
                where: { lostNo: e.lostNo },
            });
        }

        let lostPageCnt = await this.count({
            take: pageSize,
            skip: offset,
        });

        const losts = {
            data: lost,
            pageCount: Math.ceil(lostPageCnt / pageSize),
        };

        return losts;
    }

    // async get(
    //     amCode: string,
    //     endUser: string,
    //     client: string,
    //     updateUser: string,
    //     aState: string,
    //     afterDate: string,
    //     beforeDate: string,
    // ): Promise<any[]> {
    //     let aYear = 2000;
    //     let aMonth = 1;
    //     let aDate = 1;
    //     let bYear = 2099;
    //     let bMonth = 12;
    //     let bDate = 31;
    //     if (afterDate != null) {
    //         aYear = parseInt(afterDate.slice(0, 4));
    //         aMonth = parseInt(afterDate.slice(5, 6));
    //         aDate = parseInt(afterDate.slice(-2));
    //     }

    //     if (beforeDate != null) {
    //         bYear = parseInt(beforeDate.slice(0, 4));
    //         bMonth = parseInt(beforeDate.slice(5, 6));
    //         bDate = parseInt(beforeDate.slice(-2));
    //     }

    //     const where: any = {};

    //     if (amCode) {
    //         where.amCode = ILike(`%${amCode}%`);
    //     }
    //     if (endUser) {
    //         where.endUser = ILike(`%${endUser}%`);
    //     }
    //     if (client) {
    //         where.client = ILike(`%${client}%`);
    //     }
    //     if (updateUser) {
    //         where.updateUser = ILike(`%${updateUser}%`);
    //     }
    //     if (aState) {
    //         where.aState = ILike(`%${aState}%`);
    //     }

    //     where.updateDate = Between(new Date(aYear, aMonth - 1, aDate), new Date(bYear, bMonth - 1, bDate));

    //     const lost = await this.find({
    //         where,
    //     });

    //     if (!lost) {
    //         throw new NotFoundException('Approval을 찾을 수 없습니다.');
    //     }

    //     return lost;
    // }
}
