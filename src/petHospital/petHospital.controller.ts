import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { petHospitalService } from './petHospital.service';
import { CreatepetHospitalDto } from './dto/create_petHospital.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { petHospital } from './petHospital.entity';

@Controller('petHospital')
@ApiTags('petHospital API')
export class petHospitalController {
    constructor(private petHospitalService: petHospitalService) {
        this.petHospitalService = petHospitalService;
    }

    @UseGuards(AuthGuard)
    @Post('reply')
    @ApiOperation({ summary: 'petHospital posting' })
    async reply(@Req() req, @Body() post: CreatepetHospitalDto): Promise<void> {
        const username = req.user.username;

        return await this.petHospitalService.reply(username, post);
    }

    @UseGuards(AuthGuard)
    @Patch('editReply')
    @ApiOperation({ summary: '위경도 필요없음!' })
    @ApiQuery({ name: 'id', required: true, type: Number })
    async editReply(@Req() req, @Query() id, @Body() post: CreatepetHospitalDto): Promise<any> {
        return await this.petHospitalService.editReply(id, post);
    }

    @UseGuards(AuthGuard)
    @Delete('deleteReply')
    @ApiOperation({ summary: 'Delete post' })
    @ApiQuery({ name: 'id', required: true, type: Number })
    async deleteReply(@Req() req, @Query() id): Promise<any> {
        return await this.petHospitalService.deleteReply(id);
    }

    @Get('Replies')
    @ApiOperation({ summary: 'get replies' })
    @ApiQuery({ name: 'LatLng', required: true, type: String })
    async getData(@Query() LatLng): Promise<petHospital[]> {
        return await this.petHospitalService.getReplies(LatLng);
    }
}
