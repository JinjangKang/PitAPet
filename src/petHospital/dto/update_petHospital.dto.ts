import { PartialType } from '@nestjs/swagger';
import { CreatepetHospitalDto } from './create_petHospital.dto';

export class UpdatepetHospitalDto extends PartialType(CreatepetHospitalDto) {}
