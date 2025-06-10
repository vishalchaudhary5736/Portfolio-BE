import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Identity } from '../identity/identity.modal/identity.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../identity/identity.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SharedService {
  constructor(
    @InjectModel(Identity.name) private readonly IdentityModel: Model<Identity>,private readonly jwtService:JwtService
  ) {}

  fetchModel(params:string):Model<any> {
    const models = {
        Identity :this.IdentityModel
    }
    return models[params];
  }


 
}
