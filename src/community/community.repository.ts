import { CustomRepository } from 'src/typeorm-ex.decorator';

import { Repository } from 'typeorm';
import { CreateCommunityDto } from './dto/create_community.dto';
import { Community } from './community.entity';
import { dataSource } from 'src/server';
import { Reply } from 'src/reply/Reply.entity';

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

    async getData(pageSize, offset): Promise<any> {
        let post: any[] = await this.find({
            take: pageSize,
            skip: offset,
        });

        for (let p of post) {
            delete p.content;
        }

        let postPageCnt = await this.count({
            take: pageSize,
            skip: offset,
        });

        const posts = {
            data: post,
            pageCount: Math.ceil(postPageCnt / pageSize),
        };

        return posts;
    }

    async getDetail(post_id): Promise<any> {
        const post = await this.findOne({ where: { post_id: post_id } });
        const replies = await dataSource.getRepository(Reply).find({ where: { post_id: post_id } });

        return { post, replies };
    }
}
