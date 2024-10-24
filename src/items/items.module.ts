// item.module.ts
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([ Item ]),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => (
      { secret: configService.get('JWT_SECRET'), 
        signOptions : {expiresIn:configService.get('JWT_EXPIRES_IN')}
      })
  })],  // ### add
  controllers: [ItemsController],
  providers: [ItemsService,JwtStrategy],
})
export class ItemsModule {}
