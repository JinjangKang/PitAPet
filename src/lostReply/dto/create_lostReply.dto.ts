import { ApiProperty } from '@nestjs/swagger';

export class CreateLostReplyDto {
    @ApiProperty({ description: 'lostNo' })
    lostNo: string;
    @ApiProperty({ description: 'content' })
    content: string;
}
