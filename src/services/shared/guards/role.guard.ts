import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { RESPONSE_MESSAGE, USER_ROLES } from '../utility/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (request.path.startsWith('/api/admin')) {
      if (user.userType !== USER_ROLES.ADMIN) {
        throw new UnauthorizedException(RESPONSE_MESSAGE.UNAUTHORIZED_USER);
      }
    }
    return true;
  }
}