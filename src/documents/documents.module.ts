import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { Document } from './document.entity';
import { Folder } from 'src/folders/folders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Folder])],
  providers: [DocumentsService],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
