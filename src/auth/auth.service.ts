import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private userRepository: UserRepository) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findByUsername(username);

        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(username: string, password: string): Promise<void> {
        const user = new User();
        user.username = username;
        user.password = password;

        await this.userRepository.createUser(username, password);
    }
}
