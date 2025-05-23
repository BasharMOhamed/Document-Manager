import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FolderDto } from './dtos/folder.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Folder } from './folders.entity';

@ApiTags('Folders')
@Controller('folders')
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

  @ApiOperation({ summary: 'Create a new folder' })
  @ApiBody({
    type: FolderDto,
    description: 'The folder to create'
  })
  @ApiResponse({
    status: 201,
    description: 'Folder has been successfully created',
    type: Folder
  })
  @Post('/create')
  async createFolder(@Body() folder: FolderDto) {
    console.log(folder.name, folder.parentId);
    return this.foldersService.createFolder(folder.name, folder.parentId);
  }

  @ApiOperation({ summary: 'Edit a folder name' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the folder to edit',
    type: Number
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The new name for the folder',
          example: 'New Folder Name'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Folder has been successfully updated',
    type: Folder
  })
  @Post('/:id')
  async editFolder(@Param('id') id: string, @Body() body: any) {
    return this.foldersService.editFolder(body.name, parseInt(id));
  }

  @ApiOperation({ summary: 'Delete a folder' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the folder to delete',
    type: Number
  })
  @ApiResponse({
    status: 200,
    description: 'Folder has been successfully deleted'
  })
  @Delete('/:id')
  async deleteFolder(@Param('id') id: string) {
    return this.foldersService.deleteFolder(parseInt(id));
  }
}
