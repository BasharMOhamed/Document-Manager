import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { AccessControlDto } from './dto/access-control.dto';

@Controller('access-control')
export class AccessControlController {
  constructor(private readonly accessControlService: AccessControlService) {}

  @Post()
  addPermission(@Body() accessControlDto: AccessControlDto) {
    return this.accessControlService.addPermission(
      accessControlDto.docId,
      accessControlDto.userId,
      accessControlDto.permission,
    );
  }

  @Put()
  editPermission(@Body() accessControlDto: AccessControlDto) {
    return this.accessControlService.editPermission(
      accessControlDto.docId,
      accessControlDto.userId,
      accessControlDto.permission,
    );
  }

  @Delete(':id')
  deletePermission(@Param('id') id: number) {
    return this.accessControlService.deletePermission(id);
  }
}
