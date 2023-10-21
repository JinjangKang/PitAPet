import { PartialType } from '@nestjs/swagger';
import { CreateCommunityDto } from './create_community.dto';

export class UpdateCommunityDto extends PartialType(CreateCommunityDto) {}
