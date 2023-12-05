import { Injectable } from '@nestjs/common';
import { CreateLostReplyDto } from './dto/create_lostReply.dto';
import { LostReplyRepository } from './lostReply.repository';

@Injectable()
export class LostReplyService {
    constructor(private lostReplyRepository: LostReplyRepository) {}

    async post(username: string, post: CreateLostReplyDto): Promise<any> {
        return await this.lostReplyRepository.posting(username, post);
    }

    async deleteReply(reply_id: number) {
        return await this.lostReplyRepository.deleteReply(reply_id);
    }

    // async getall() {
    //     return await this.ReplyRepository.getall();
    // }

    // async getData(pageSize, offset): Promise<any[]> {
    //     return await this.ReplyRepository.getData(pageSize, offset);
    // }

    // async getDetail(ReplyNo): Promise<any> {
    //     return await this.ReplyRepository.getDetail(ReplyNo);
    // }

    // async get(
    //     asCode: string,
    //     endUser: string,
    //     client: string,
    //     updateUser: string,
    //     aState: string,
    //     afterDate: string,
    //     beforeDate: string,
    // ): Promise<Reply[]> {
    //     return this.ReplyRepository.get(asCode, endUser, client, updateUser, aState, afterDate, beforeDate);
    // }
}
