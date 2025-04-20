import {
  ContextType,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GqlAuthGuard {
  constructor(private readonly jwtService: JwtService) {}

  private getRequest(context: ExecutionContext) {
    if (context.getType<ContextType | 'graphql'>() === 'graphql') {
      return GqlExecutionContext.create(context).getContext().req;
    }
    return context.switchToHttp().getRequest();
  }

  private getAuthHeader(headers: Record<string, string | undefined>): string {
    const authHeader = headers?.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token format');
    }
    return authHeader;
  }

  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest(context);
    const authHeader = this.getAuthHeader(request.headers);

    const token = authHeader.split(' ')[1];
    const enhanceUser = (token: string) => {
      try {
        const payload = this.jwtService.verify(token);
        return { userId: payload.sub, email: payload.email };
      } catch {
        throw new UnauthorizedException('Invalid token');
      }
    };

    request.user = enhanceUser(token);

    return true;
  }
}
