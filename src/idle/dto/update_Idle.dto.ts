import { PartialType } from '@nestjs/swagger';
import { CreateIdleDto } from './create_Idle.dto';

export class UpdateIdleDto extends PartialType(CreateIdleDto) {}
