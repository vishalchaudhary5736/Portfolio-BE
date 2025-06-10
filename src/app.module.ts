import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedController } from './services/shared/shared.controller';
import { SharedService } from './services/shared/shared.service';
import { SharedModule } from './services/shared/shared.module';
import { IdentityModule } from './services/identity/identity.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DB_CONNECTION || 'mongodb://localhost:27017/mydatabase',
    ),
    SharedModule,
    IdentityModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'ecosystem.config.js',
    }),
  ],
  controllers: [AppController, SharedController],
  providers: [AppService, SharedService],
})
export class AppModule {}
