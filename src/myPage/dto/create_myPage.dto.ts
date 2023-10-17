import { ApiProperty } from '@nestjs/swagger';

export class CreateMypageDto {
    @ApiProperty({ description: 'username' })
    username: string;
}
