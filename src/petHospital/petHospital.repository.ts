import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { CreatepetHospitalDto } from './dto/create_petHospital.dto';
import { petHospital } from './petHospital.entity';
import { UpdatepetHospitalDto } from './dto/update_petHospital.dto';

@CustomRepository(petHospital)
export class petHospitalRepository extends Repository<petHospital> {
    async reply(username: string, post: CreatepetHospitalDto): Promise<any> {
        const { LatLng, reply } = post;
        const created_at = new Date();
        try {
            await this.insert({
                username,
                LatLng,
                reply,
                created_at,
            });
            return '댓글 잘 달렷졍';
        } catch (error) {
            console.log(username, post, created_at);
            return '오류낫졍';
        }
    }

    async editReply(id, post: UpdatepetHospitalDto) {
        const { reply } = post;

        try {
            await this.update({ ID: id.ID }, { reply });
            return '수정 잘 됐졍';
        } catch (error) {
            return '오류낫졍';
        }
    }

    async deleteReply(id) {
        try {
            await this.softDelete({ ID: id.ID });
            return '삭제 잘 됐졍';
        } catch (error) {
            return '오류낫졍';
        }
    }

    async getReplies(LatLng): Promise<any> {
        let replies = await this.find({ where: { LatLng: LatLng.LatLng } });
        if (replies) {
            return replies;
        } else {
            return '댓글이 아직 없졍';
        }
    }
}
