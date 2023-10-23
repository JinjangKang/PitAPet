import { Injectable, NotFoundException } from '@nestjs/common';

import { lostImageRepository } from 'src/lost/_lostImage/lostImage.repository';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
    private s3: S3Client;

    constructor(private lostImageRepository: lostImageRepository) {
        this.s3 = new S3Client({ region: 'ap-northeast-2' });
    }

    async uploadToS3(lostNo: string, images: Express.Multer.File[]): Promise<any> {
        let urls = [];
        let i = 1;

        for (let image of images) {
            const { originalname, buffer } = image;

            const uploadParams = {
                Bucket: 'pitapetbucket',
                Key: `${lostNo}-${i}`,
                Body: buffer,
            };

            try {
                const command = new PutObjectCommand(uploadParams);
                await this.s3.send(command);

                // 업로드된 객체의 URL 직접 생성
                const url = `https://pitapetbucket.s3.ap-northeast-2.amazonaws.com/${lostNo}-${i}`;
                urls.push(url);
                i++;
            } catch (error) {
                console.error('Error uploading to S3:', error);
                throw new NotFoundException('Failed to upload to S3');
            }
        }

        return await this.lostImageRepository.insertlostImage(lostNo, urls);
    }

    // async uploadToS3(lostNo: string, images: Express.Multer.File[]): Promise<any> {
    //     let urls = [];
    //     let i = 1;
    //     for (let image of images) {
    //         const { originalname, buffer } = image;

    //         const uploadParams: AWS.S3.PutObjectRequest = {
    //             Bucket: 'pitapetbucket',
    //             Key: `${lostNo}-${i}`, // 파일명으로 사용할 수 있지만 고유한 키로 설정하는 것이 좋습니다.
    //             Body: buffer,
    //         };

    //         const uploadResult = await this.s3.upload(uploadParams).promise();

    //         if (!uploadResult) {
    //             throw new NotFoundException('Failed to upload to S3');
    //         }

    //         urls.push(uploadResult.Location);
    //         i++;
    //     }
    //     return await this.lostImageRepository.insertlostImage(lostNo, urls);
    // }
}
