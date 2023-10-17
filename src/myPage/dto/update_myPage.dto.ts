import { PartialType } from '@nestjs/swagger';
import { CreateMypageDto } from './create_myPage.dto';

export class UpdateIdleDto extends PartialType(CreateMypageDto) {}
