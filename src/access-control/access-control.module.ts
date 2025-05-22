import { Module } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { AccessControlController } from './access-control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControl } from './access-control.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessControl])],
  providers: [AccessControlService],
  controllers: [AccessControlController],
})
export class AccessControlModule {}
