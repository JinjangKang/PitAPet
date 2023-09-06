import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

import axios from 'axios';
import { lostService } from './lost.service';
import { lost } from './lost.entity';
import { CreatelostDto } from './dto/create_lost.dto';

@Controller('lost')
@ApiTags('lost API')
export class lostController {
    constructor(private lostService: lostService) {
        this.lostService = lostService;
    }

    @Post()
    @ApiOperation({ summary: 'lost posting' })
    async create(@Body() lostData: CreatelostDto): Promise<void> {
        return await this.lostService.insert(lostData);
    }

    @Get('data')
    @ApiOperation({ summary: '아이들 데이터 가져오기, page => 페이지 번호, pageSize => 페이지 당 표시할 데이터 수' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'pageSize', required: false, type: Number })
    async getData(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 20,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
        @Query('region') region: string = '서울',
        @Query('isUnderProtection') isUnderProtection: 'Y' | 'N' = 'Y',
        @Query('type') type: string,
    ): Promise<lost[]> {
        const offset = (page - 1) * pageSize;
        return await this.lostService.getData(pageSize, offset, startDate, endDate, region, isUnderProtection, type);
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
    //     return await this.lostService.get(amCode, endUser, client, updateUser, aState, afterDate, beforeDate);
    // }
}
