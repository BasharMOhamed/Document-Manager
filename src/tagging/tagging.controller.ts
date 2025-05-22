import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { TaggingService } from './tagging.service';
import { TagDto } from './dtos/tag.dto';

@Controller('tags')
export class TaggingController {
  constructor(private readonly taggingService: TaggingService) {}

  @Post(':docId')
  addTags(@Param('docId') docId: number, @Body() tagsDto: TagDto) {
    return this.taggingService.addTags(docId, tagsDto.tags);
  }

  @Put(':docId')
  editTags(@Param('docId') docId: number, @Body() tagsDto: TagDto) {
    return this.taggingService.editTags(docId, tagsDto.tags);
  }

  @Delete(':docId/:tag')
  deleteTag(@Param('docId') docId: number, @Param('tag') tag: string) {
    return this.taggingService.deleteTag(docId, tag);
  }
} 