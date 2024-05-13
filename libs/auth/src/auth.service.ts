import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../../../src/modules/users/users.service';
import { comparePassword, encryptPassword } from '../../../src/utils/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../src/modules/users/entities/user.entity';
import { RegisterDto } from '@app/auth/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    // 用户是否存在
    if (!user) {
      return null;
    }
    // 用户密码是否正确
    if (comparePassword(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const { username, id } = user;
    const payload = { username, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;
    const foundUser = await this.usersService.findOneByUsername(username);
    if (foundUser) {
      throw new BadRequestException('User already exists');
    }
    const hashPassword = encryptPassword(password);
    return await this.usersService.save({
      username,
      password: hashPassword,
    });
  }

  async refresh(token: string) {
    const decoded = this.jwtService.decode(token);
    if (!decoded) {
      throw new BadRequestException('Invalid token');
    }
    const { username, sub } = decoded as any;
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new BadRequestException('Invalid token');
    }
    if (user.id !== sub) {
      throw new BadRequestException('Invalid token');
    }
    return {
      access_token: this.jwtService.sign({ username, sub }),
      refresh_token: this.jwtService.sign(
        { username, sub },
        { expiresIn: '7d' },
      ),
    };
  }
}
