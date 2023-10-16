import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CustomRepository } from 'src/typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    // 사용자 등록 메서드
    async createUser(username: string, password: string): Promise<User> {
        const user = this.create({ username, password });
        return this.save(user);
    }

    // 사용자 이름으로 사용자 찾기
    async findByUsername(username: string): Promise<User | undefined> {
        return this.findOne({ where: { username } });
    }
}
