import { Body, Controller, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MypageService } from './myPage.service';
import { AuthGuard } from 'src/auth/auth.guard';

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

        console.log(desertionNo);

        return await this.mypageService.dibIdle(username, desertionNo);
    }

    @UseGuards(AuthGuard)
    @Patch('deleteDib')
    @ApiOperation({ summary: '찜 삭제하기' })
    async deleteDib(@Req() req, @Query('desertionNo') desertionNo: string): Promise<any> {
        const username = req.user.username;

        return await this.mypageService.deleteDib(username, desertionNo);
    }

    // @UseGuards(AuthGuard)
    // @Get('diblist')
    // @ApiOperation({ summary: '찜 목록 가져오기' })
    // async getDibs(@Req() req): Promise<any> {
    //     const username = req.user.username;
    //     return await this.mypageService.getDibs(username);
    // }
}
