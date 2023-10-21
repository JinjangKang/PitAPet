import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReplyService } from './Reply.service';
import { CreateReplyDto } from './dto/create_Reply.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('Reply')
@ApiTags('Reply API')
export class ReplyController {
    constructor(private ReplyService: ReplyService) {
        this.ReplyService = ReplyService;
    }

    @UseGuards(AuthGuard)
    @Post('post')
    @ApiOperation({ summary: 'Reply posting' })
    async create(@Req() req, @Body() post: CreateReplyDto): Promise<void> {
        const username = req.user.username;
        return await this.ReplyService.post(username, post);
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
