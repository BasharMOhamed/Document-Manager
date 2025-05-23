import { IsNumber, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TagDto {
  @ApiProperty({
    description: 'The ID of the document to tag',
    type: Number
  })
  @IsNumber()
  docId: number;

  @ApiProperty({
    description: 'Array of tags to apply to the document',
    type: [String],
    example: ['important', 'draft', 'reviewed']
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
