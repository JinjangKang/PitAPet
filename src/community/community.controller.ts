import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create_community.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Community } from './community.entity';
import { title } from 'process';

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

    @UseGuards(AuthGuard)
    @Patch('editPost')
    @ApiOperation({ summary: 'Editing community post' })
    async editPost(@Req() req, @Query() post_id, @Body() post: CreateCommunityDto): Promise<any> {
        post_id = post_id.post_id;
        return await this.communityService.editPost(post_id, post);
    }

    @UseGuards(AuthGuard)
    @Delete('deletePost')
    @ApiOperation({ summary: 'Delete post' })
    @ApiQuery({ name: 'post_id', required: true })
    async deletePost(@Req() req, @Body() post_id): Promise<any> {
        return await this.communityService.deletePost(post_id.post_id);
    }

    @Get('data')
    @ApiOperation({ summary: '커뮤니티 게시글 가져오기, page => 페이지 번호, pageSize => 페이지 당 표시할 데이터 수' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'pageSize', required: false, type: Number })
    @ApiQuery({ name: 'hot', required: false, type: Number, description: '1 넣으면 인기순 정렬, 안넣으면 최신순' })
    async getData(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
        @Query('hot') hot: number = 0,
        @Query('title') title: string,
    ): Promise<Community[]> {
        const offset = (page - 1) * pageSize;
        return await this.communityService.getData(pageSize, offset, hot, title);
    }

    @Get('detail')
    @ApiOperation({ summary: '디테일 가져오기' })
    @ApiQuery({ name: 'post_id', required: true })
    async getDetail(@Query('post_id') post_id: number): Promise<Community> {
        return await this.communityService.getDetail(post_id);
    }
}
