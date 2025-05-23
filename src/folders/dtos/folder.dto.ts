import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FolderDto {
  @ApiProperty({
    description: 'The name of the folder',
    example: 'Documents'
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'The ID of the parent folder. If not provided, folder will be created at root level',
    type: Number,
    example: 1
  })
  @IsOptional()
  @IsNumber()
  parentId?: number;
}
