import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { LostReplyService } from './lostReply.service';
import { CreateLostReplyDto } from './dto/create_lostReply.dto';

@Controller('lostReply')
@ApiTags('lostReply API')
export class LostReplyController {
    constructor(private lostReplyService: LostReplyService) {
        this.lostReplyService = lostReplyService;
    }

    @UseGuards(AuthGuard)
    @Post('post')
    @ApiOperation({ summary: 'Reply posting' })
    async create(@Req() req, @Body() post: CreateLostReplyDto): Promise<void> {
        const username = req.user.username;
        return await this.lostReplyService.post(username, post);
    }

    @UseGuards(AuthGuard)
    @Delete('deleteReply')
    @ApiOperation({ summary: 'Delete Reply' })
    @ApiQuery({ name: 'reply_id', required: true })
    async deleteReply(@Req() req, @Body() reply_id): Promise<any> {
        return await this.lostReplyService.deleteReply(reply_id.reply_id);
    }

    // // @Get('data')
    // async getall() {
    //     return await this.ReplyService.getall();
    // }

    // @Get('data')
    // @ApiOperation({ summary: '아이들 데이터 가져오기, page => 페이지 번호, pageSize => 페이지 당 표시할 데이터 수' })
    // @ApiQuery({ name: 'page', required: false, type: Number })
    // @ApiQuery({ name: 'pageSize', required: false, type: Number })
    // async getData(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<Reply[]> {
    //     const offset = (page - 1) * pageSize;
    //     return await this.ReplyService.getData(pageSize, offset);
    // }

    // @Get('detail')
    // @ApiOperation({ summary: '디테일 가져오기' })
    // @ApiQuery({ name: 'ReplyNo', required: true })
    // async getDetail(@Query('ReplyNo') ReplyNo: string): Promise<Reply> {
    //     return await this.ReplyService.getDetail(ReplyNo);
    // }
}
