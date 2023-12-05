import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './util/swagger';
import * as multer from 'multer';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import path from 'path';
import * as dotenv from 'dotenv';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    setupSwagger(app);
    dotenv.config();

    const corsOptions: CorsOptions = {
        origin: '*', // 프론트엔드 도메인
        credentials: true, // 인증 정보 (쿠키 등)를 허용하려면 true로 설정
    };
    app.enableCors(corsOptions);

    await app.listen(8080);
}
bootstrap();
