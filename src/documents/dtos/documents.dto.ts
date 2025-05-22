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

export class UploadDocumentDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  parentId?: number;
}
