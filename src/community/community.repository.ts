import { CustomRepository } from 'src/typeorm-ex.decorator';

import { Repository } from 'typeorm';
import { CreateCommunityDto } from './dto/create_community.dto';
import { Community } from './community.entity';

@CustomRepository(Community)
export class CommunityRepository extends Repository<Community> {
    async posting(username: string, post: CreateCommunityDto): Promise<any> {
        const { title, content } = post;
        const created_at = new Date();

        await this.insert({
            username,
            title,
            content,
            created_at,
        });
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
