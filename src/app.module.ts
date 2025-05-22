import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoldersModule } from './folders/folders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './folders/folders.entity';
import { TaggingModule } from './tagging/tagging.module';
import { UserModule } from './user/user.module';
import { AccessControlModule } from './access-control/access-control.module';
import { AccessControl } from './access-control/access-control.entity';
import { User } from './user/user.entity';
import { DocumentsModule } from './documents/documents.module';
import { Document } from './documents/document.entity';

@Module({
  imports: [
    FoldersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Folder, AccessControl, User, Document],
      synchronize: true,
    }),
    TaggingModule,
    UserModule,
    AccessControlModule,
    DocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
