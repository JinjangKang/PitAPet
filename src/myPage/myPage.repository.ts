import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Mypage } from './myPage.entity';
import { CreateMypageDto } from './dto/create_myPage.dto';
import { dataSource } from 'src/server';
import { Idle } from 'src/idle/Idle.entity';

@CustomRepository(Mypage)
export class MypageRepository extends Repository<Mypage> {
    // 사용자 등록 메서드
    async createMypage(user: CreateMypageDto): Promise<void> {
        this.insert(user);
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
