import { PartialType } from '@nestjs/swagger';
import { CreateReplyDto } from './create_Reply.dto';

export class UpdateReplyDto extends PartialType(CreateReplyDto) {}
