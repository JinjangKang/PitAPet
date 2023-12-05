import { Body, Controller, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MypageService } from './myPage.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { KakaoAuthGuard } from 'src/auth/kakao-auth.guard';

@Controller('Mypage')
@ApiTags('Mypage API')
export class MypageController {
    constructor(private readonly mypageService: MypageService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getMyPage(@Req() req) {
        const user = req.user;
        return this.mypageService.mypage(user);
    }

    @UseGuards(AuthGuard)
    @Patch('dib')
    @ApiOperation({ summary: '아이들 찜하기' })
    async dibIdle(@Req() req, @Body('desertionNo') desertionNo: string): Promise<any> {
        const username = req.user.username;

        return await this.mypageService.dibIdle(username, desertionNo);
    }

    @UseGuards(AuthGuard)
    @Patch('deleteDib')
    @ApiOperation({ summary: '찜 삭제하기' })
    async deleteDib(@Req() req, @Body('desertionNo') desertionNo: string): Promise<any> {
        const username = req.user.username;

        return await this.mypageService.deleteDib(username, desertionNo);
    }

    @UseGuards(AuthGuard)
    @Patch('like')
    @ApiOperation({ summary: '좋아요' })
    @ApiQuery({ name: 'post_id', required: true, type: String })
    async likePost(@Req() req, @Body('post_id') post_id: string): Promise<any> {
        const username = req.user.username;

        return await this.mypageService.like(username, post_id);
    }
}
