import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty() @IsNumber() PointsPercentage: number;
  @IsNotEmpty() @IsNumber() referralPoints: number;
  @IsNotEmpty() @IsNumber() pointLimit: number;
  @IsNotEmpty() @IsNumber() canceledOrder: number;
  @IsNotEmpty() @IsNumber() slotDuration: number;
}
