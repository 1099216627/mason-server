import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const competences = this.reflector.get<string[]>(
      'competences',
      context.getHandler(),
    );
    if (!competences) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findOneByUsername(
      request.user.username,
    );
    const competencesList = user.role.competences.map((item) => item.name);
    return this.matchPermissions(competences, competencesList);
  }

  matchPermissions(permissions: string[], userPermissions: string[]): boolean {
    // 在这里，你可以实现你的权限验证逻辑
    // 例如，你可以检查用户的权限是否包含所需的权限
    return permissions.some((permission) =>
      userPermissions.includes(permission),
    );
  }
}
