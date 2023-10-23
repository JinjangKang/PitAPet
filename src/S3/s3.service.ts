import { Injectable, NotFoundException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import { LostImage } from 'src/lost/_lostImage/lostImage.entity';
import { lostImageRepository } from 'src/lost/_lostImage/lostImage.repository';
import { dataSource } from 'src/server';
import { Index } from 'typeorm';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
    private s3: AWS.S3;

    constructor(private lostImageRepository: lostImageRepository) {
        this.s3 = new AWS.S3();
    }

    async uploadToS3(lostNo: string, images: Express.Multer.File[]): Promise<any> {
        let urls = [];
        let i = 1;
        for (let image of images) {
            const { originalname, buffer } = image;

            const uploadParams: AWS.S3.PutObjectRequest = {
                Bucket: 'pitapetbucket',
                Key: `${lostNo}-${i}`, // 파일명으로 사용할 수 있지만 고유한 키로 설정하는 것이 좋습니다.
                Body: buffer,
            };

            const uploadResult = await this.s3.upload(uploadParams).promise();

            if (!uploadResult) {
                throw new NotFoundException('Failed to upload to S3');
            }

            urls.push(uploadResult.Location);
            i++;
        }
        return await this.lostImageRepository.insertlostImage(lostNo, urls);
    }
}
