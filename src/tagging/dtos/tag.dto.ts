import { IsNumber, IsString, IsArray } from 'class-validator';
export class TagDto {
  @IsNumber()
  docId: number;

  @IsArray()
  @IsString()
  tags: string[];
}
