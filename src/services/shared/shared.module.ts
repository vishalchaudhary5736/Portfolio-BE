import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentityModule } from '../identity/identity.module';
import { Identity, IdentitySchema } from '../identity/identity.modal/identity.schema';
import { SharedService } from './shared.service';

@Module({
  imports: [
    JwtModule.register({global:true,secret:process.env.JWT_SECRET,signOptions: { expiresIn: '1h' } }),
    MongooseModule.forFeature([
      {name:Identity.name,schema:IdentitySchema}
    ]),
  ],
  providers: [SharedService],
  exports: [SharedService, MongooseModule],
})
export class SharedModule {}
