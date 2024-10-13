import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const getCreateTodoDto = (ApiPropertySwagger?: typeof ApiProperty) => {
  const ApiPropertyFunction = ApiPropertySwagger ||  ApiProperty;

  class BaseCreateTodoDto {
    @IsNotEmpty()
    @IsString()
    @ApiPropertyFunction({
      description: "This is required and must be a valid title",
      type: String,
    })
    title!: string;

    @IsOptional()
    @IsString()
    @ApiPropertyFunction({
      description: "Optional description of the todo",
      type: String,
    })
    description?: string;

    @IsOptional()
    @ApiPropertyFunction({
      description: "Optional due date",
      type: String,
    })
    dueDate?: string;
  }

  return BaseCreateTodoDto;
};

export class CreateTodoDtoBack extends getCreateTodoDto(ApiProperty) {}
export class CreateTodoDtoFront extends getCreateTodoDto() {}
