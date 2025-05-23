// import { IsArray, IsString } from 'class-validator';

// export class DocumentsDto {
//   @IsString()
//   title: string;

//   @IsString()
//   description: string;

//   @IsArray()
//   tags: string[];
// }

import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UploadDocumentDto {
  @ApiProperty({ description: 'The title of the document' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Optional description of the document' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ 
    description: 'Optional array of tags for the document',
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ 
    description: 'Optional ID of the parent folder',
    type: Number
  })
  @IsOptional()
  @IsString()
  parentId?: number;
}
