import { CustomRepository } from 'src/typeorm-ex.decorator';

import { Repository } from 'typeorm';
import { CreateCommunityDto } from './dto/create_community.dto';
import { Community } from './community.entity';
import { dataSource } from 'src/server';
import { Reply } from 'src/reply/Reply.entity';
import { Update } from 'aws-sdk/clients/dynamodb';
import { UpdateCommunityDto } from './dto/update_community.dto';

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

        let posting = await this.createQueryBuilder('COMMUNITY')
            .select('COMMUNITY.post_id')
            .orderBy('COMMUNITY.post_id', 'DESC')
            .getOne();

        return posting.post_id;
    }

    async editPost(post_id: number, post: UpdateCommunityDto) {
        const { title, content } = post;

        await this.update({ post_id: post_id }, { title, content });
    }

    async deletePost(post_id: number) {
        await this.softDelete({ post_id: post_id });
    }

    async getData(pageSize, offset): Promise<any> {
        let post: any[] = await this.find({
            take: pageSize,
            skip: offset,
            order: { post_id: 'desc' },
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
        const replies = await dataSource
            .getRepository(Reply)
            .find({ where: { post_id: post_id }, order: { reply_id: 'DESC' } });
        const view = post.view + 1;

        await this.update({ post_id: post_id }, { view: view });
        return { post, replies };
    }

    async likePost(post_id): Promise<any> {
        const post = await this.findOne({ where: { post_id: post_id } });
        const like = post.like + 1;

        await this.update({ post_id: post_id }, { like: like });
    }

    async hatePost(post_id): Promise<any> {
        const post = await this.findOne({ where: { post_id: post_id } });
        const like = post.like - 1;

        await this.update({ post_id: post_id }, { like: like });
    }
}
