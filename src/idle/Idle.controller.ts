import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { IdleService } from './Idle.service';
import { Idle } from './Idle.entity';

@Controller('Idle')
@ApiTags('Idle API')
export class IdleController {
    constructor(private IdleService: IdleService) {
        this.IdleService = IdleService;
    }

    @Post()
    @ApiOperation({ summary: 'Idle posting' })
    async create(@Body() settings: any): Promise<void> {
        await this.IdleService.insert();
    }

    @Get('data')
    @ApiOperation({ summary: '아이들 데이터 가져오기, page => 페이지 번호, pageSize => 페이지 당 표시할 데이터 수' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'pageSize', required: false, type: Number })
    @ApiQuery({ name: 'startDate', description: 'YYYY-MM-DD', required: true, type: Date })
    @ApiQuery({ name: 'endDate', description: 'YYYY-MM-DD', required: true, type: Date })
    @ApiQuery({ name: 'region', required: false, type: String })
    @ApiQuery({ name: 'isUnderProtection', description: 'Y or N', required: false, type: String })
    @ApiQuery({ name: 'type', description: '개, 고양이, 기타', required: false, type: String })
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

    @Get('detail')
    @ApiOperation({ summary: '아이들 세부정보' })
    async getDetail(@Query('desertionNo') desertionNo: string): Promise<Idle> {
        return await this.IdleService.getDetail(desertionNo);
    }
}
