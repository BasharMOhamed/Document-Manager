import { IsString, IsNumber, IsOptional } from 'class-validator';

export class FolderDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;
}
