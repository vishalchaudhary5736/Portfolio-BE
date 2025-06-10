import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsMobilePhone, MinLength } from 'class-validator';

@Schema({timestamps:true})
export class Identity extends Document {
  @Prop({
    unique: true,
  })
  @IsMobilePhone('en-IN')
  phoneNumber: string;

  @Prop({
    unique: true,
    lowercase: true,
  })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @Prop({
    required: true,
    minlength: 6,
  })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @Prop({})
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  aboutMe:string

}

export const IdentitySchema = SchemaFactory.createForClass(Identity);
