import { CustomRepository } from 'src/typeorm-ex.decorator';

import { Repository } from 'typeorm';
import { LostReply } from './lostReply.entity';
import { CreateLostReplyDto } from './dto/create_lostReply.dto';

@CustomRepository(LostReply)
export class LostReplyRepository extends Repository<LostReply> {
    async posting(username: string, post: CreateLostReplyDto): Promise<any> {
        const { lostNo, content } = post;
        const created_at = new Date();

        await this.insert({
            lostNo,
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
