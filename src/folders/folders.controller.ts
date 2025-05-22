import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FolderDto } from './dtos/folder.dto';

@Controller('folders')
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

  @Post('/create')
  async createFolder(@Body() folder: FolderDto) {
    console.log(folder.name, folder.parentId);
    return this.foldersService.createFolder(folder.name, folder.parentId);
  }

  @Post('/:id')
  async editFolder(@Param('id') id: string, @Body() body: any) {
    return this.foldersService.editFolder(body.name, parseInt(id));
  }

  @Delete('/:id')
  async deleteFolder(@Param('id') id: string) {
    return this.foldersService.deleteFolder(parseInt(id));
  }
}
