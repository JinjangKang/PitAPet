import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { get } from 'http';

@Controller('auth')
@ApiTags('USER API')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: 'Login' })
    @ApiBody({
        schema: {
            properties: {
                username: { type: 'string' },
                password: { type: 'string' },
            },
        },
    })
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register' })
    @ApiBody({
        schema: {
            properties: {
                username: { type: 'string' },
                password: { type: 'string' },
            },
        },
    })
    async register(@Request() req) {
        const { username, password } = req.body;
        return await this.authService.register(username, password);
    }

    @Post('checkRedundancy')
    @ApiOperation({ summary: '아이디 중복 확인' })
    @ApiBody({
        schema: {
            properties: {
                username: { type: 'string' },
            },
        },
    })
    async checkRedundancy(@Request() req) {
        const { username } = req.body;
        return await this.authService.checkRedundancy(username);
    }
}
