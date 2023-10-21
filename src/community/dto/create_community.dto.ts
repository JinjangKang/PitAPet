import { ApiProperty } from '@nestjs/swagger';

export class CreateCommunityDto {
    // @ApiProperty({ description: 'username' })
    // username: string;
    @ApiProperty({ description: 'title' })
    title: string;
    @ApiProperty({ description: 'content' })
    content: string;
}
