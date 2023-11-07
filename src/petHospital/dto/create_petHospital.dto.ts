import { ApiProperty } from '@nestjs/swagger';

export class CreatepetHospitalDto {
    // @ApiProperty({ description: 'username' })
    // username: string;
    @ApiProperty({ description: 'LatLng' })
    LatLng: string;
    @ApiProperty({ description: 'reply' })
    reply: string;
}
