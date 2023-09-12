import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatelostDto {
    @ApiProperty({ description: 'lostPlace' })
    lostPlace: string;
    @ApiProperty({ description: 'lostDate' })
    lostDate: Date;
    @ApiProperty({ description: 'title' })
    title: string;
    @ApiProperty({ description: 'description' })
    description: string;
    @ApiProperty({ description: 'image' })
    image: string;
    @ApiProperty({ description: 'tel' })
    tel: string;
    @ApiProperty({ description: 'reward' })
    reward: string;
    @ApiProperty({ description: 'type' })
    type: string;
}
