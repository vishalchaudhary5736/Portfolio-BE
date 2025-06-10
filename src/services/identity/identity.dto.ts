// create-user.dto.ts
import {
  IsEmail,
  MinLength,
  IsMobilePhone,
  IsNotEmpty,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
  message: 'Email format is invalid'})
  email: string;

  @IsOptional()
  @IsMobilePhone('en-IN',undefined, { message: 'Invalid mobile number' })
  phoneNumber: string;
  
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,{message:"Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"})
  password: string;

}

export class CreateAboutMeDto {

  @IsNotEmpty({message:"aboutMe key is required"})
  @MinLength(8,{ message: 'Content must be at least 8 characters' })
  aboutMe:string

}


export class LoginUserDto {

  @IsNotEmpty({message:"Identity is required field"})
  identifier: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,{message:"Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"})
  password: string;

}
