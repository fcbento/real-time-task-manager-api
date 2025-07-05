import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../common/services/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) { }

  async createUser(userData: Prisma.UserUncheckedCreateInput): Promise<User> {
    
    const passwordHash = await bcrypt.hash(userData.password, 6);
    userData.password = passwordHash;

    const result = await this.prisma.user.create({
      data: userData
    });
    return result;
  }
}
