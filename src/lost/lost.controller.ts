import { Controller, Get, Post, Body, Query, UseInterceptors, UploadedFiles, UploadedFile, Bind } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { lostService } from './lost.service';
import { Lost } from './lost.entity';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { CreatelostDto } from './dto/create_lost.dto';
import { S3Service } from 'src/S3/s3.service';

@Controller('lost')
@ApiTags('lost API')
export class lostController {
    constructor(private lostService: lostService, private s3Service: S3Service) {
        this.lostService = lostService;
    }

    @Post()
    @ApiOperation({ summary: 'lost posting' })
    @UseInterceptors(FilesInterceptor('image'))
    async create(@Body() postData: CreatelostDto, @UploadedFiles() images: Express.Multer.File[]): Promise<void> {
        //S3 서비스로 이미지 전송
        await this.lostService.insert(postData);

        return await this.s3Service.uploadToS3(images);
    }

    // @Get('data')
    async getall() {
        return await this.lostService.getall();
    }

    @Get('data')
    @ApiOperation({ summary: '아이들 데이터 가져오기, page => 페이지 번호, pageSize => 페이지 당 표시할 데이터 수' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'pageSize', required: false, type: Number })
    async getData(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10): Promise<Lost[]> {
        const offset = (page - 1) * pageSize;
        return await this.lostService.getData(pageSize, offset);
    }

    @Get('detail')
    @ApiOperation({ summary: '디테일 가져오기' })
    @ApiQuery({ name: 'lostNo', required: true })
    async getDetail(@Query('lostNo') lostNo: string): Promise<Lost> {
        return await this.lostService.getDetail(lostNo);
    }
}
