import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { CreateAboutMeDto, CreateUserDto, LoginUserDto } from './identity.dto';
import { AuthGuard as AU } from '../shared/guards/auth.guard';
import { RolesGuard } from '../shared/guards/role.guard';
import { Public } from '../shared/guards/no.auth.guard';

@UseGuards(AU,RolesGuard)
@Controller('identity')
export class IdentityController {
    constructor(private readonly IdentityService:IdentityService){}

    @Public()
    @Post('register')
    create(@Body() createUserDto:CreateUserDto){
        return this.IdentityService.createUser(createUserDto)
    }

    @Public()
    @Post('auth/login')
    loginIdentity(@Body() loginUserDto:LoginUserDto){
        return this.IdentityService.loginIdentity(loginUserDto)
    }

    @Post('create-intro')
    createAboutMe(@Body() createAboutMeDto:CreateAboutMeDto,@Req() req:Request){
        return this.IdentityService.createAboutmeContent(createAboutMeDto,req['user'].userId)
    }



}
