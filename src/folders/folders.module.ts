import { Module } from '@nestjs/common';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './folders.entity';
import { Document } from 'src/documents/document.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Folder, Document])],
  controllers: [FoldersController],
  providers: [FoldersService],
})
export class FoldersModule {}
