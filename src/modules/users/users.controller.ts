import { Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { Competences } from '../../decorators/competence/competences.decorator';
import { PermissionsGuard } from '../../guards/permissions/permissions.guard';
@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard, PermissionsGuard)
  @Competences('新建角色')
  @Post()
  createUser() {
    return 'hello';
  }
}
