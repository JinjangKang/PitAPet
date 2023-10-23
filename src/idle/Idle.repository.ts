import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Idle } from './Idle.entity';
import { Between, ILike, Index, Repository } from 'typeorm';
import axios from 'axios';
import { dataSource } from 'src/server';
import { formatDate } from 'src/util/util';

@CustomRepository(Idle)
export class IdleRepository extends Repository<Idle> {
    async insertIdle(): Promise<void> {
        // POST 요청을 보낼 데이터
        const apiUrl = 'https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?';
        const pageNo = 'pageNo=1&';
        const numOfRows = 'numOfRows=1000&';
        const type = '_type=json&';
        const serviceKey =
            'serviceKey=Z2WBxekxGTIDegURqOBPHpoD8m6Dr6ojNR8Ridn6G9kUfku1afB2TOLmRsWB%2BMOukK%2FVCLKhxBnq9pWFSNy5kQ%3D%3D';

        // 자동 포스팅 시
        let startDateRow = await dataSource
            .getRepository(Idle)
            .createQueryBuilder('IDLE')
            .select('IDLE.happenDt')
            .orderBy('IDLE.happenDt', 'DESC')
            .getOne();
        let postDataDate = new Date(formatDate(startDateRow.happenDt)['yyyy.mm.dd']);
        let today = new Date(formatDate(new Date())['yyyy.mm.dd']);
        let dateDiff = (today.getTime() - postDataDate.getTime()) / (1000 * 60 * 60 * 24);
        console.log(dateDiff);

        //수동 소급 포스팅 시
        // let postDataDate = new Date('2023.08.01');
        // let today = new Date(formatDate(new Date())['yyyy.mm.dd']);
        // let dateDiff = (today.getTime() - postDataDate.getTime()) / (1000 * 60 * 60 * 24);
        // console.log(dateDiff);

        for (let i = 0; i <= dateDiff; i++) {
            let formattedDate =
                postDataDate.getFullYear().toString() +
                (postDataDate.getMonth() + 1).toString().padStart(2, '0') +
                postDataDate.getDate().toString().padStart(2, '0');

            console.log(`${formattedDate}의 데이터 포스팅을 시작합니다.`);

            const bgnde = `bgnde=${formattedDate}&`;
            const endde = `endde=${formattedDate}&`;

            try {
                const fullAPIUrl = apiUrl + bgnde + endde + pageNo + numOfRows + type + serviceKey;
                const response = await axios.get(fullAPIUrl);
                const idleData = response.data.response.body.items.item;
                console.log('GET 요청 성공');

                let apiDataCount = idleData.length;
                let dbFileCount = await this.count({ where: { happenDt: postDataDate } });

                if (apiDataCount !== dbFileCount) {
                    for (let j = 0; j < idleData.length; j++) {
                        console.log(`${formatDate(postDataDate)['yyyy.mm.dd']}`);
                        console.log(`API = ${apiDataCount}, DataBase = ${dbFileCount}`);
                        console.log(``);
                        console.log(``);
                        console.log(``);
                        console.log(``);
                        console.log(``);
                        console.log(``);
                        console.log(`${j}/${idleData.length}행 포스팅 중 . . .`);
                        console.log(`${((j / idleData.length) * 100).toFixed(2)}% / 100%`);
                        console.log(`---------------------------------------------------`);

                        await this.dataSave(idleData[j]);
                    }
                } else {
                    console.log(``);
                    console.log(``);
                    console.log(`${formatDate(postDataDate)['yyyy.mm.dd']}의 데이터는 모두 저장되어 있습니다.`);
                    console.log(``);
                    console.log(``);
                    console.log(``);
                }
            } catch (error) {
                console.error('GET 요청 실패:', error);
                console.error(`${today}`);
            }
            console.log(`---------------------------------------------------`);
            console.log(``);
            console.log(``);
            console.log(``);
            console.log(`${new Date().getHours()}시 ${new Date().getMinutes()}분`);
            console.log(``);
            console.log(
                `${formattedDate.slice(0, 4)}년${formattedDate.slice(4, 6)}월${formattedDate.slice(
                    -2,
                )}일의 데이터 포스팅을 완료했습니다.`,
            );
            console.log(``);
            console.log(``);
            console.log(``);
            console.log(``);
            console.log(`---------------------------------------------------`);

            postDataDate.setDate(postDataDate.getDate() + 1);
        }
    }

    async dataSave(data) {
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

    async getDetail(desertionNo: string): Promise<Idle> {
        return await this.findOne({
            where: { desertionNo: desertionNo },
        });
    }
}
