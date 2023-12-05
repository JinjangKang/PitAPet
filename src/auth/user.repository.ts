import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CustomRepository } from 'src/typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    // 사용자 등록 메서드
    async createUser(user: User): Promise<User> {
        return this.save(user);
    }

    // 아이디 중복확인
    async checkRedundancy(username: string): Promise<Boolean> {
        return (await this.findOne({
            where: { username: username },
        }))
            ? true
            : false;
    }

    // 사용자 이름으로 사용자 찾기
    async findByUsername(username: string): Promise<User | undefined> {
        return this.findOne({ where: { username } });
    }

    async checkKaKao(username) {
        let isin = await this.findOne({ where: { username } });
        console.log(isin);

        if (!isin) {
            await this.save({ username });
        }
        return isin;
    }
}
