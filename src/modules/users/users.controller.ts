import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse } from './../../common/dto/api-success-response.dto';
import { UserResponseDto } from './../../common/dto/user-response.dto';
import { EmailAlreadyExistsError } from './../../common/errors/email-already-exists-error';
import { CreateUserDto } from './../../common/dto/user-request.dto';
import { PrismaError } from './../../common/interface/prisma-type.interface';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post('create')
  async createUser(@Body() userData: CreateUserDto): Promise<ApiResponse<UserResponseDto>> {
    try {
      const { name, id } = await this.usersService.createUser(userData);

      return new ApiResponse<UserResponseDto>(
        'success',
        'User created successfully',
        { name, id },
      );
    } catch (error: unknown) {

      const { code, meta } = error as PrismaError;

      if (code === 'P2002' && meta?.target?.includes('email')) {
        throw new EmailAlreadyExistsError();
      }

      throw error;
    }
  }
}
