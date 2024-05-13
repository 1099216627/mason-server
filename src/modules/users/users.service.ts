import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { generateRandomNickname } from 'src/utils/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userService: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    const foundUser = await this.userService.findOneBy({ id });
    if (foundUser) {
      throw new HttpException('未找到该用户', HttpStatus.BAD_REQUEST);
    }
    return foundUser;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const foundUser = await this.userService.findOneBy({ username });
    if (foundUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    return this.userService.save({
      username,
      password,
      nickname: generateRandomNickname(),
    });
  }
}
