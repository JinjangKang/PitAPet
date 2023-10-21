import { ApiProperty } from '@nestjs/swagger';

export class CreateReplyDto {
    @ApiProperty({ description: 'post_id' })
    post_id: number;
    @ApiProperty({ description: 'content' })
    content: string;
}
