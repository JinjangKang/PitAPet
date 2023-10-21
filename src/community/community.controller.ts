import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create_community.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('community')
@ApiTags('community API')
export class CommunityController {
    constructor(private communityService: CommunityService) {
        this.communityService = communityService;
    }

    @UseGuards(AuthGuard)
    @Post('post')
    @ApiOperation({ summary: 'community posting' })
    async create(@Req() req, @Body() post: CreateCommunityDto): Promise<void> {
        const username = req.user.username;

        return await this.communityService.post(username, post);
    }

    // // @Get('data')
    // async getall() {
    //     return await this.communityService.getall();
    // }

    // @Get('data')
    // @ApiOperation({ summary: '아이들 데이터 가져오기, page => 페이지 번호, pageSize => 페이지 당 표시할 데이터 수' })
    // @ApiQuery({ name: 'page', required: false, type: Number })
    // @ApiQuery({ name: 'pageSize', required: false, type: Number })
    // async getData(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<community[]> {
    //     const offset = (page - 1) * pageSize;
    //     return await this.communityService.getData(pageSize, offset);
    // }

    // @Get('detail')
    // @ApiOperation({ summary: '디테일 가져오기' })
    // @ApiQuery({ name: 'communityNo', required: true })
    // async getDetail(@Query('communityNo') communityNo: string): Promise<community> {
    //     return await this.communityService.getDetail(communityNo);
    // }
}
