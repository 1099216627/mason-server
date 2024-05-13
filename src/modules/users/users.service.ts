import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { generateRandomNickname } from 'src/utils/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '@app/auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  async findOneByUsername(username: string) {
    return await this.userRepository.findOne({
      where: { username },
      relations: {
        role: {
          competences: true,
        },
      },
    });
  }
  async save(registerDto: RegisterDto) {
    return await this.userRepository.save({
      ...registerDto,
    });
  }
}
