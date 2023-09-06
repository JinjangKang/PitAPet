import { PartialType } from '@nestjs/swagger';
import { CreatelostDto } from './create_lost.dto';

export class UpdatelostDto extends PartialType(CreatelostDto) {}
