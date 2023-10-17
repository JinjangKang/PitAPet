import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

// LocalAuthGuard 기본 포맷. 추가적인 코드 없이도 실행 됨.
