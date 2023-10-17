import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Mypage } from './myPage.entity';
import { CreateMypageDto } from './dto/create_myPage.dto';

@CustomRepository(Mypage)
export class MypageRepository extends Repository<Mypage> {
    // 사용자 등록 메서드
    async createMypage(user: CreateMypageDto): Promise<void> {
        this.insert(user);
    }
}
