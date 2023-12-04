import { Injectable } from '@nestjs/common';
import { ReplyRepository } from './Reply.repository';
import { CreateReplyDto } from './dto/create_Reply.dto';

@Injectable()
export class ReplyService {
    constructor(private ReplyRepository: ReplyRepository) {}

    async post(username: string, post: CreateReplyDto): Promise<any> {
        return await this.ReplyRepository.posting(username, post);
    }

    async deleteReply(reply_id: number) {
        return await this.ReplyRepository.deleteReply(reply_id);
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
