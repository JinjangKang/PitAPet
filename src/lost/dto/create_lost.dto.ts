import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatelostDto {
    @ApiProperty({ description: 'lostNo' })
    lostNo: string;
    @ApiProperty({ description: 'type' })
    type: string;
    @ApiProperty({ description: 'sexCd' })
    sexCd: string;
    @ApiProperty({ description: 'neuterYn' })
    neuterYn: string;
    @ApiProperty({ description: 'age' })
    age: number;
    @ApiProperty({ description: 'weight' })
    weight: number;
    @ApiProperty({ description: 'furColor' })
    furColor: string;
    @ApiProperty({ description: 'feature' })
    feature: string;
    @ApiProperty({ description: 'image' })
    image: string;
    @ApiProperty({ description: 'lostPlace' })
    lostPlace: string;
    @ApiProperty({ description: 'lostDate', example: '2023-09-17' })
    lostDate: Date;
    @ApiProperty({ description: 'tel' })
    tel: string;
    @ApiProperty({ description: 'reward' })
    reward: string;
    @ApiProperty({ description: 'title' })
    title: string;
    @ApiProperty({ description: 'detail' })
    detail: string;
}
