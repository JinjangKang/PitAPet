import { Injectable } from '@nestjs/common';
import { petHospitalRepository } from './petHospital.repository';
import { CreatepetHospitalDto } from './dto/create_petHospital.dto';
import { UpdatepetHospitalDto } from './dto/update_petHospital.dto';

@Injectable()
export class petHospitalService {
    constructor(private petHospitalRepository: petHospitalRepository) {}

    async reply(username: string, post: CreatepetHospitalDto): Promise<any> {
        return await this.petHospitalRepository.reply(username, post);
    }

    async editReply(id, post: UpdatepetHospitalDto) {
        return await this.petHospitalRepository.editReply(id, post);
    }

    async deleteReply(id) {
        return await this.petHospitalRepository.deleteReply(id);
    }

    async getReplies(LatLng): Promise<any[]> {
        return await this.petHospitalRepository.getReplies(LatLng);
    }
}
