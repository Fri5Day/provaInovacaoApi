import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/role.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();

    let userRole: string = '';

    userRole = request.user?.role || '';

    if (
      !userRole ||
      !requiredRoles
        .map((r) => r.toUpperCase())
        .includes(userRole.toUpperCase())
    ) {
      throw new ForbiddenException(
        'You do not have permission to access this resource.'
      );
    }

    return true;
  }
}
