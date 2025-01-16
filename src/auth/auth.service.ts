import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  signup(createAuthDto: User) {
    return 'This action adds a new auth';
  }
  login(createAuthDto: User) {
    return 'This action adds a new auth';
  }
  logout(createAuthDto: User) {
    return 'This action adds a new auth';
  }
}
