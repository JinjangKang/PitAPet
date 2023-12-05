import { PartialType } from '@nestjs/swagger';
import { CreateLostReplyDto } from './create_lostReply.dto';

export class UpdateLostReplyDto extends PartialType(CreateLostReplyDto) {}
