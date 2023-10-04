import { ApiProperty } from '@nestjs/swagger';

export class CreatelostImageDto {
    @ApiProperty({ description: 'lostNo' })
    lostNo: string;
    @ApiProperty({ description: 'image1' })
    image1: Blob;
    @ApiProperty({ description: 'image2' })
    image2: Blob;
    @ApiProperty({ description: 'image3' })
    image3: Blob;
    @ApiProperty({ description: 'image4' })
    image4: Blob;
}
