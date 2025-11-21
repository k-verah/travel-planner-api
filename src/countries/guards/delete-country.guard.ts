import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class DeleteCountryGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-auth-token'];

    const EXPECTED_TOKEN = 'admin123'; 

    if (!token || token !== EXPECTED_TOKEN) {
      throw new UnauthorizedException('Invalid or missing authorization token');
    }

    return true;
  }
}
