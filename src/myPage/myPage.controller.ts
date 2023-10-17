import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MypageService } from './myPage.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('Mypage')
@ApiTags('Mypage API')
export class MypageController {
    constructor(private readonly mypageService: MypageService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getMyPage(@Req() req) {
        return { user: req.user };
    }
}
