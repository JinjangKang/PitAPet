import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Mypage } from './myPage.entity';
import { CreateMypageDto } from './dto/create_myPage.dto';
import { dataSource } from 'src/server';
import { Idle } from 'src/idle/Idle.entity';
import { Community } from 'src/community/community.entity';

@CustomRepository(Mypage)
export class MypageRepository extends Repository<Mypage> {
    // 사용자 등록 메서드
    async createMypage(user: CreateMypageDto): Promise<void> {
        this.insert(user);
    }

    //사용자 마이페이지 가져오기. 유저정보, 찜 목록
    async getmypage(user): Promise<any> {
        return {
            user: user,
            dibList: await this.getDibs(user.username),
            myPosting: await dataSource
                .getRepository(Community)
                .find({ where: { username: user.username }, order: { post_id: 'desc' } }),
        };
    }

    //찜 리스트 등록
    async dibIdle(username: string, desertionNo: string): Promise<any> {
        let dibListString = (await this.findOne({ where: { username } })).dibList;

        if (dibListString) {
            let dibList = JSON.parse(dibListString);

            if (!(dibList.indexOf(desertionNo) >= 0)) {
                await this.update({ username: username }, { dibList: JSON.stringify([...dibList, desertionNo]) });
                return '찜 완료 ~';
            } else {
                return '이미 찜 되어잇음';
            }
        } else {
            await this.update({ username: username }, { dibList: JSON.stringify([desertionNo]) });
            return '찜 완료 ~';
        }
    }

    async deleteDib(username: string, desertionNo: string): Promise<any> {
        let dibListString = (await this.findOne({ where: { username } })).dibList;

        let dibList = JSON.parse(dibListString);
        dibList = dibList.filter((v) => {
            return v != desertionNo;
        });

        await this.update({ username: username }, { dibList: JSON.stringify(dibList) });
        return '찜 삭제 완료 ~';
    }

    //찜 리스트 등록
    async like(username: string, post_id: string): Promise<any> {
        let likeListString = (await this.findOne({ where: { username } })).likeList;
        let message;
        let like = (await dataSource.getRepository(Community).findOne({ where: { post_id: Number(post_id) } })).like;

        if (likeListString) {
            let likeList = JSON.parse(likeListString);

            if (!(likeList.indexOf(post_id) >= 0)) {
                likeList = [...likeList, post_id];

                message = '좋아요 완료';
                await dataSource.getRepository(Community).update({ post_id: Number(post_id) }, { like: like + 1 });
            } else {
                likeList = likeList.filter((v) => {
                    return v != post_id;
                });
                message = '좋아요 취소';
                await dataSource.getRepository(Community).update({ post_id: Number(post_id) }, { like: like - 1 });
            }

            await this.update({ username: username }, { likeList: JSON.stringify(likeList) });
            return message;
        } else {
            await dataSource.getRepository(Community).update({ post_id: Number(post_id) }, { like: like++ });

            await this.update({ username: username }, { likeList: JSON.stringify([post_id]) });
            return '좋아요 완료';
        }
    }

    //찜리스트 가져오기
    async getDibs(username: string): Promise<any> {
        const dibList = JSON.parse((await this.findOne({ where: { username: username } })).dibList);

        let list = [];

        for (let desertionNo of dibList) {
            let dib = await dataSource.getRepository(Idle).findOne({ where: { desertionNo: desertionNo } });
            list.push(dib);
        }

        return list;
    }
}
