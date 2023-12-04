import { CustomRepository } from 'src/typeorm-ex.decorator';

import { Repository } from 'typeorm';
import { CreateReplyDto } from './dto/create_Reply.dto';
import { Reply } from './Reply.entity';

@CustomRepository(Reply)
export class ReplyRepository extends Repository<Reply> {
    async posting(username: string, post: CreateReplyDto): Promise<any> {
        const { post_id, content } = post;
        const created_at = new Date();
        console.log(created_at);
        await this.insert({
            post_id,
            username,
            content,
            created_at,
        });
    }

    async deleteReply(reply_id: number) {
        await this.softDelete({ reply_id: reply_id });
    }

    // async getData(pageSize, offset): Promise<any> {
    //     let lost: any[] = await this.find({
    //         take: pageSize,
    //         skip: offset,
    //     });

    //     for (let e of lost) {
    //         e.images = await dataSource.getRepository(LostImage).findOne({
    //             where: { lostNo: e.lostNo },
    //         });
    //     }

    //     let lostPageCnt = await this.count({
    //         take: pageSize,
    //         skip: offset,
    //     });

    //     const losts = {
    //         data: lost,
    //         pageCount: Math.ceil(lostPageCnt / pageSize),
    //     };

    //     return losts;
    // }

    // async getDetail(lostNo): Promise<any> {
    //     const main = await this.findOne({ where: { lostNo: lostNo } });
    //     const images = await dataSource.getRepository(LostImage).findOne({ where: { lostNo: lostNo } });

    //     return { ...main, images };
    // }
}
