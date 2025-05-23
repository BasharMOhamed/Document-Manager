import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { TaggingService } from './tagging.service';
import { TagDto } from './dtos/tag.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TaggingController {
  constructor(private readonly taggingService: TaggingService) {}

  @ApiOperation({ summary: 'Add tags to a document' })
  @ApiParam({
    name: 'docId',
    description: 'The ID of the document to add tags to',
    type: Number
  })
  @ApiBody({
    type: TagDto,
    description: 'The tags to add to the document'
  })
  @ApiResponse({
    status: 201,
    description: 'Tags have been successfully added to the document'
  })
  @Post(':docId')
  addTags(@Param('docId') docId: number, @Body() tagsDto: TagDto) {
    return this.taggingService.addTags(docId, tagsDto.tags);
  }

  @ApiOperation({ summary: 'Update tags for a document' })
  @ApiParam({
    name: 'docId',
    description: 'The ID of the document to update tags for',
    type: Number
  })
  @ApiBody({
    type: TagDto,
    description: 'The new tags for the document'
  })
  @ApiResponse({
    status: 200,
    description: 'Tags have been successfully updated'
  })
  @Put(':docId')
  editTags(@Param('docId') docId: number, @Body() tagsDto: TagDto) {
    return this.taggingService.editTags(docId, tagsDto.tags);
  }

  @ApiOperation({ summary: 'Delete a specific tag from a document' })
  @ApiParam({
    name: 'docId',
    description: 'The ID of the document to remove the tag from',
    type: Number
  })
  @ApiParam({
    name: 'tag',
    description: 'The tag to remove from the document',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Tag has been successfully removed from the document'
  })
  @Delete(':docId/:tag')
  deleteTag(@Param('docId') docId: number, @Param('tag') tag: string) {
    return this.taggingService.deleteTag(docId, tag);
  }
} 