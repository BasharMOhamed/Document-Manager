import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '../documents/document.entity';
import { TaggingController } from './tagging.controller';
import { TaggingService } from './tagging.service';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  controllers: [TaggingController],
  providers: [TaggingService],
})
export class TaggingModule {}
