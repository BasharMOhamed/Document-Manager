import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { AccessControlDto } from './dto/access-control.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AccessControl } from './access-control.entity';

@ApiTags('Access Control')
@Controller('access-control')
export class AccessControlController {
  constructor(private readonly accessControlService: AccessControlService) {}

  @ApiOperation({ summary: 'Add a new permission for a user on a document' })
  @ApiResponse({ 
    status: 201, 
    description: 'Permission has been successfully added.',
    type: AccessControl
  })
  @Post()
  addPermission(@Body() accessControlDto: AccessControlDto) {
    return this.accessControlService.addPermission(
      accessControlDto.docId,
      accessControlDto.userId,
      accessControlDto.permission,
    );
  }

  @ApiOperation({ summary: 'Update an existing permission' })
  @ApiResponse({ 
    status: 200, 
    description: 'Permission has been successfully updated.',
    type: AccessControl
  })
  @Put()
  editPermission(@Body() accessControlDto: AccessControlDto) {
    return this.accessControlService.editPermission(
      accessControlDto.docId,
      accessControlDto.userId,
      accessControlDto.permission,
    );
  }

  @ApiOperation({ summary: 'Delete a permission by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'The ID of the permission to delete',
    type: Number
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Permission has been successfully deleted.'
  })
  @Delete(':id')
  deletePermission(@Param('id') id: number) {
    return this.accessControlService.deletePermission(id);
  }
}
