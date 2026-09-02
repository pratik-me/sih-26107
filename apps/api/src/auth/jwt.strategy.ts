import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../common/prisma.service';
import { JwtPayload } from '@bis/shared-types';
import { SEED_USERS } from '../common/seed-data';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'bis_intelliguide_jwt_secret_key_super_secure_2026_x99a'
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub }
      });
      if (user) {
        return {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          organization: user.organization,
          preferredLanguage: user.preferredLanguage
        };
      }
    } catch {
      // fallback to mock seed user matching email
    }

    const seedUser = SEED_USERS.find(u => u.email === payload.email);
    if (seedUser) {
      return {
        id: payload.sub || 'seed-user-id',
        email: seedUser.email,
        fullName: seedUser.fullName,
        role: seedUser.role,
        organization: seedUser.organization,
        preferredLanguage: seedUser.preferredLanguage
      };
    }

    throw new UnauthorizedException('User account no longer active');
  }
}
