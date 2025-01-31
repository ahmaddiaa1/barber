import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateComplainDto {
    // @IsNotEmpty()
    // userId: string;

    @IsString()
    message: string;
}
