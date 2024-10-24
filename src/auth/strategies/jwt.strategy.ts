// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoggedInDto } from '../dto/logged-in.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(configService: ConfigService) { 
      super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: configService.get('JWT_SECRET'),
      });

      console.log('JwtStrategy initialized');  // เพิ่ม log เพื่อตรวจสอบการเริ่มต้นของ JwtStrategy
  }

  validate(payload: LoggedInDto): LoggedInDto {
      console.log('JwtStrategy: validate called');  // เพิ่ม log เมื่อฟังก์ชัน validate ถูกเรียก
      console.log('Payload received:', payload);  // ดูค่าของ payload ที่ถูกส่งเข้ามา
      return payload;
  }
}
