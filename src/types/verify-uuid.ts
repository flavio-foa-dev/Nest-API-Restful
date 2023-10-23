import { IsString, Matches } from 'class-validator';

export class UuidNumberDto {
  @IsString({ message: 'O ID deve ser uma string.' })
  @Matches(/^[0-9A-Fa-f]{32}$/, {
    message: 'O ID deve ser um número UUID válido.',
  })
  id: string;
}
