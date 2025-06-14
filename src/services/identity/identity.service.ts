import {
  Injectable,
  ConflictException,
  HttpException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SharedService } from '../shared/shared.service';
import { RESPONSE_MESSAGE, SCHEMA_NAME } from '../shared/utility/constants';
import { AddProjectDto, CreateAboutMeDto, CreateUserDto, LoginUserDto } from './identity.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class IdentityService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sharedService: SharedService,
  ) {}

  private readonly IdentityModel = () =>
    this.sharedService.fetchModel(SCHEMA_NAME.IDENTITY);

  async createUser(createUser: CreateUserDto): Promise<any> {
    try {
      let isUserExist: any;
      if (createUser.email && createUser.phoneNumber) {
        isUserExist = await this.IdentityModel().findOne({
          email: createUser.email,
          phoneNumber: createUser.phoneNumber,
        });
        if (isUserExist)
          throw new ConflictException(
            RESPONSE_MESSAGE.EMAIL_MOBILE_ALREADY_REGISTERED,
          );
        return this.createCommonHashFunction(createUser);
      }
      const identity = createUser?.email
        ? createUser?.email
        : createUser?.phoneNumber;
      isUserExist = await this.IdentityModel().findOne({
        $or: [{ email: identity }, { phoneNumber: identity }],
      });
      if (isUserExist)
        throw new ConflictException(
          RESPONSE_MESSAGE.EMAIL__OR_MOBILE_ALREADY_REGISTERED,
        );
      return this.createCommonHashFunction(createUser);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        'Unexprected server error:',
        error,
      );
    }
  }

  async createCommonHashFunction(createUser: CreateUserDto) {
    try {
      const hashPassword = await bcrypt.hash(createUser.password, 10);
      let createIdentity = await this.IdentityModel().create({
        ...createUser,
        password: hashPassword,
      });
      createIdentity = createIdentity.toObject();
      delete createIdentity.password;
      const jwtPayload = {
        userId: createIdentity._id,
        createdAt: createIdentity?.createdAt,
      };
      const accessToken = await this.jwtService.signAsync(jwtPayload);
      return { token: accessToken, ...createIdentity };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        'Unexprected server error:',
        error,
      );
    }
  }

  async createAboutmeContent(
    createAboutMeDto: CreateAboutMeDto,
    userId: string,
  ): Promise<any> {
    try {
      const updateAboutme = await this.IdentityModel().findByIdAndUpdate(
        userId,
        createAboutMeDto,
        { new: true, returnDocument: 'after' },
      );
      delete updateAboutme.password;
      return { ...updateAboutme };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        'Unexprected server error:',
        error,
      );
    }
  }

  async loginIdentity(loginUserDto: LoginUserDto): Promise<any> {
    try {
      let isExistUser = await this.IdentityModel().findOne({
        $or: [
          { email: loginUserDto.identifier },
          { phoneNumber: loginUserDto.identifier },
        ],
      });
      isExistUser = isExistUser.toObject();
      if (!isExistUser)
        throw new UnauthorizedException(RESPONSE_MESSAGE.INVALID_USER);
      const isValidPassword = await bcrypt.compare(
        loginUserDto.password,
        isExistUser.password,
      );
      if (!isValidPassword)
        throw new UnauthorizedException(RESPONSE_MESSAGE.INVALID_PASSWORD);
      const jwtPayload = {
        userId: isExistUser._id,
        createdAt: isExistUser?.createdAt,
      };
      delete isExistUser.password;
      const accessToken = await this.jwtService.signAsync(jwtPayload);
      return {accessToken,...isExistUser}
    } catch (error) {
      console.log('data:',error)
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(error,
      );
    }
  }

  async addProject(addProjectDto:AddProjectDto):Promise<any>{
    /** {
      title: 'Vedichom.com',
      description: 'An online platform for vedic astrology services and consultations. Built with a modern tech stack for a seamless user experience.',
      tech: ['React.js', 'Node.js', 'MongoDB', 'Payment Gateway'],
      gradient: 'gradient-bg',
      liveLink: 'https://vedichom.com',
      codeLink: '#' 
    }, */
    try {
       const isAleadyExist = await this.IdentityModel().findOne({$or:[{title:addProjectDto.title},{liveLink:addProjectDto.liveLink}]})
    } catch (error) {
      console.log('data:',error)
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(error,
      );
    }
  }
}
