import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Idle } from './Idle.entity';
import { Between, ILike, Repository } from 'typeorm';

@CustomRepository(Idle)
export class IdleRepository extends Repository<Idle> {
    async insertIdle(idleData: any[]): Promise<void> {
        for (let data of idleData) {
            const {
                desertionNo,
                filename,
                happenDt,
                happenPlace,
                kindCd,
                colorCd,
                age,
                weight,
                noticeNo,
                noticeSdt,
                noticeEdt,
                popfile,
                processState,
                sexCd,
                neuterYn,
                specialMark,
                careNm,
                careTel,
                careAddr,
                orgNm,
                chargeNm,
                officetel,
            } = data;

            await this.save({
                desertionNo,
                filename,
                happenDt,
                happenPlace,
                kindCd,
                colorCd,
                age,
                weight,
                noticeNo,
                noticeSdt,
                noticeEdt,
                popfile,
                processState,
                sexCd,
                neuterYn,
                specialMark,
                careNm,
                careTel,
                careAddr,
                orgNm,
                chargeNm,
                officetel,
            });
        }
    }

    async getData(pageSize, offset, startDate, endDate, region, isUnderProtection, type): Promise<any> {
        const where: any = {};

        where.happenDt = Between(startDate, endDate);

        where.careAddr = ILike(`%${region}%`);
        if (type) where.kindCd = ILike(`%${type}%`);

        if (isUnderProtection == 'Y') {
            where.processState = ILike(`%보호%`);
        } else if (isUnderProtection == 'N') {
            where.processState = ILike(`%종료%`);
        }

        let idle: Idle[] = await this.find({
            take: pageSize,
            skip: offset,
            where: where,
            order: { happenDt: 'desc' },
        });
        let idlePageCnt = await this.count({
            where: where,
            order: { happenDt: 'desc' },
        });
        const idles = {
            data: idle,
            pageCount: Math.ceil(idlePageCnt / pageSize),
        };

        return idles;
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

    //     const Idle = await this.find({
    //         where,
    //     });

    //     if (!Idle) {
    //         throw new NotFoundException('Approval을 찾을 수 없습니다.');
    //     }

    //     return Idle;
    // }
}
