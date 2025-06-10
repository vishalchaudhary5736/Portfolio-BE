import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Identity, IdentitySchema } from './identity.modal/identity.schema';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:Identity.name,schema:IdentitySchema}
    ]),
    SharedModule
  ],
  controllers: [IdentityController],
  providers: [IdentityService]
})
export class IdentityModule {}
