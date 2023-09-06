import { CustomRepository } from 'src/typeorm-ex.decorator';

import { Between, ILike, Like, Repository } from 'typeorm';

import { NotFoundException } from '@nestjs/common';

import { dataSource } from 'src/server';
import { lost } from './lost.entity';
import { CreatelostDto } from './dto/create_lost.dto';

@CustomRepository(lost)
export class lostRepository extends Repository<lost> {
    async insertlost(lostData: CreatelostDto): Promise<void> {
        let lostNo: string;
        let date = new Date();
        let createdDate = date.getFullYear() + (date.getMonth() + 1) + date.getDate();

        const lastRowNo = await this.find({
            order: { lostNo: 'DESC' },
        });
        if (lastRowNo) lostNo = 'L' + (Number(lastRowNo.slice(-6)) + 1).toString().padStart(6, '0');
        else lostNo = 'L000001';
        const { lostPlace, lostDate, title, description, image, tel, reward, type } = lostData;

        await this.insert({
            lostNo,
            lostPlace,
            lostDate,
            title,
            description,
            image,
            tel,
            reward,
            type,
            createdDate,
        });
    }

    async getData(pageSize, offset, startDate, endDate, region, isUnderProtection, type): Promise<lost[]> {
        const where: any = {};

        where.happenDt = Between(startDate, endDate);

        where.careAddr = ILike(`%${region}%`);
        if (type) where.kindCd = ILike(`%${type}%`);

        if (isUnderProtection == 'Y') {
            where.processState = ILike(`%보호%`);
        } else if (isUnderProtection == 'N') {
            where.processState = ILike(`%종료%`);
        }

        let lost: lost[] = await this.find({
            take: pageSize,
            skip: offset,
            where: where,
        });

        return lost;
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
