import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { IdleService } from './Idle.service';
import { Idle } from './Idle.entity';
import axios from 'axios';

@Controller('Idle')
@ApiTags('Idle API')
export class IdleController {
    constructor(private IdleService: IdleService) {
        this.IdleService = IdleService;
    }

    @Post()
    @ApiOperation({ summary: 'Idle posting' })
    async create(@Body() settings: any): Promise<void> {
        let s = 2;

        while (s <= 31) {
            const bgnde = `bgnde=202308${s.toString().padStart(2, '0')}&`;
            const endde = `endde=202308${s.toString().padStart(2, '0')}&`;
            console.log(bgnde, endde);
            s++;

            // POST 요청을 보낼 데이터
            const apiUrl = 'https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?';
            // const bgnde = 'bgnde=20211201&';
            // const endde = 'endde=20211231&';
            const pageNo = 'pageNo=1&';
            const numOfRows = 'numOfRows=1000&';
            const type = '_type=json&';
            const serviceKey =
                'serviceKey=Z2WBxekxGTIDegURqOBPHpoD8m6Dr6ojNR8Ridn6G9kUfku1afB2TOLmRsWB%2BMOukK%2FVCLKhxBnq9pWFSNy5kQ%3D%3D';
            try {
                const response = await axios.get(apiUrl + bgnde + endde + pageNo + numOfRows + type + serviceKey);
                const idleData = response.data.response.body.items.item;
                console.log('GET 요청 성공');
                await this.IdleService.insert(idleData);
            } catch (error) {
                console.error('GET 요청 실패:', error);
            }
        }
    }

    @Get('data')
    @ApiOperation({ summary: '아이들 데이터 가져오기, page => 페이지 번호, pageSize => 페이지 당 표시할 데이터 수' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'pageSize', required: false, type: Number })
    @ApiQuery({ name: 'startDate', description: 'YYYY-MM-DD', required: true, type: Date })
    @ApiQuery({ name: 'endDate', description: 'YYYY-MM-DD', required: true, type: Date })
    @ApiQuery({ name: 'region', required: false, type: String })
    @ApiQuery({ name: 'isUnderProtection', description: 'Y or N', required: false, type: String })
    async getData(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 20,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
        @Query('region') region: string = '서울',
        @Query('isUnderProtection') isUnderProtection: 'Y' | 'N' = 'Y',
        @Query('type') type: string,
    ): Promise<Idle[]> {
        const offset = (page - 1) * pageSize;
        return await this.IdleService.getData(pageSize, offset, startDate, endDate, region, isUnderProtection, type);
    }

    // @Get()
    // @ApiOperation({ summary: 'amCode와 일치하는 Sale GET Query ver' })
    // async getQuery(
    //     @Query('amCode') amCode: string,
    //     @Query('endUser') endUser: string,
    //     @Query('client') client: string,
    //     @Query('updateUser') updateUser: string,
    //     @Query('aState') aState: string,
    //     @Query('afterDate') afterDate: string,
    //     @Query('beforeDate') beforeDate: string,
    // ): Promise<any[]> {
    //     return await this.IdleService.get(amCode, endUser, client, updateUser, aState, afterDate, beforeDate);
    // }
}
