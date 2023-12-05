import { Injectable } from '@nestjs/common';
import { CommunityRepository } from './community.repository';
import { CreateCommunityDto } from './dto/create_community.dto';
import { UpdateCommunityDto } from './dto/update_community.dto';

@Injectable()
export class CommunityService {
    constructor(private communityRepository: CommunityRepository) {}

    async post(username: string, post: CreateCommunityDto): Promise<any> {
        return await this.communityRepository.posting(username, post);
    }

    async editPost(post_id: number, post: UpdateCommunityDto) {
        return await this.communityRepository.editPost(post_id, post);
    }

    async deletePost(post_id: number) {
        return await this.communityRepository.deletePost(post_id);
    }

    async getData(pageSize, offset): Promise<any[]> {
        return await this.communityRepository.getData(pageSize, offset);
    }

    async getDetail(post_id): Promise<any> {
        return await this.communityRepository.getDetail(post_id);
    }

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
