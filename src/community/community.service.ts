import { Injectable } from '@nestjs/common';
import { CommunityRepository } from './community.repository';
import { CreateCommunityDto } from './dto/create_community.dto';

@Injectable()
export class CommunityService {
    constructor(private communityRepository: CommunityRepository) {}

    async post(username: string, post: CreateCommunityDto): Promise<any> {
        return await this.communityRepository.posting(username, post);
    }

    // async getall() {
    //     return await this.communityRepository.getall();
    // }

    // async getData(pageSize, offset): Promise<any[]> {
    //     return await this.communityRepository.getData(pageSize, offset);
    // }

    // async getDetail(communityNo): Promise<any> {
    //     return await this.communityRepository.getDetail(communityNo);
    // }

    // async get(
    //     asCode: string,
    //     endUser: string,
    //     client: string,
    //     updateUser: string,
    //     aState: string,
    //     afterDate: string,
    //     beforeDate: string,
    // ): Promise<community[]> {
    //     return this.communityRepository.get(asCode, endUser, client, updateUser, aState, afterDate, beforeDate);
    // }
}
