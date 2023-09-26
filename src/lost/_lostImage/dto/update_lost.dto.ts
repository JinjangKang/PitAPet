import { PartialType } from '@nestjs/swagger';
import { CreatelostImageDto } from './create_lost.dto';

export class UpdatelostDto extends PartialType(CreatelostImageDto) {}
