import {
    Controller,
    Get,
    Post,
    Body,
    Query,
    UseInterceptors,
    UploadedFiles,
    UploadedFile,
    Bind,
    Delete,
    UseGuards,
    Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { lostService } from './lost.service';
import { Lost } from './lost.entity';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { CreatelostDto } from './dto/create_lost.dto';
import { S3Service } from 'src/S3/s3.service';
import { dataSource } from 'src/server';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('lost')
@ApiTags('lost API')
export class lostController {
    constructor(private lostService: lostService, private s3Service: S3Service) {
        this.lostService = lostService;
    }

    @UseGuards(AuthGuard)
    @Post()
    @ApiOperation({ summary: 'lost posting' })
    @UseInterceptors(FilesInterceptor('image'))
    async create(
        @Req() req,
        @Body() postData: CreatelostDto,
        @UploadedFiles() images: Express.Multer.File[],
    ): Promise<void> {
        const username = req.user.username;
        let lostNo;
        const lastRow = await dataSource.getRepository(Lost).find({
            order: { lostNo: 'DESC' },
        });

        if (lastRow.length !== 0) {
            let lastRowNo = lastRow[0].lostNo;
            lostNo = 'L' + (Number(lastRowNo.slice(-6)) + 1).toString().padStart(6, '0');
        } else lostNo = 'L000001';

        //S3 서비스로 이미지 전송
        await this.lostService.insert(username, lostNo, postData);

        return await this.s3Service.uploadToS3(lostNo, images);
    }

    // @Get('data')
    async getall() {
        return await this.lostService.getall();
    }

    @Get('data')
    @ApiOperation({ summary: '아이들 데이터 가져오기, page => 페이지 번호, pageSize => 페이지 당 표시할 데이터 수' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'pageSize', required: false, type: Number })
    @ApiQuery({ name: 'type', required: false, type: String })
    @ApiQuery({ name: 'region', required: false, type: String })
    @ApiQuery({ name: 'name', required: false, type: String })
    async getData(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
        @Query('type') type: string = '',
        @Query('region') region: string = '',
        @Query('name') name: string = '',
    ): Promise<Lost[]> {
        const offset = (page - 1) * pageSize;

        return await this.lostService.getData(pageSize, offset, type, region, name);
    }

    @Get('detail')
    @ApiOperation({ summary: '디테일 가져오기' })
    @ApiQuery({ name: 'lostNo', required: true })
    async getDetail(@Query('lostNo') lostNo: string): Promise<Lost> {
        return await this.lostService.getDetail(lostNo);
    }
}
