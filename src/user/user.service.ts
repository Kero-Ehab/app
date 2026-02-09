import { HttpException, Injectable, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { request } from 'express';
import * as bcrypt from 'bcrypt';
const saltOrRounds =10;
@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>, 
    private jwtService: JwtService
  ){}
  
    async create(createUserDto: CreateUserDto, payload) {
      //bussiness logic before creating user
      
      const userIsExist = await this.userModel.findOne({email: createUserDto.email});

      if(userIsExist){
        throw new HttpException('User already exists', 409);
      }
    
      
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);

    
    
      const user = {
        ...createUserDto,
        password: hashedPassword,
        role:createUserDto.role ?? 'user',
        active: createUserDto.active ?? true,
      }
      
      return {
        status:200, 
        message: 'User created successfully',
        data: await this.userModel.create(user)
      };
  }

  findAll() {
    return this.userModel.find().select('-password -__v') ;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).select('-password -__v');
    if(!user){
      throw new HttpException('User not found', 404);
    }
    return {
      status:200,
      message: 'User found successfully',
      data: user
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateData = {...updateUserDto};
    if(updateUserDto.password){
    updateData.password = await bcrypt.hash(updateUserDto.password, saltOrRounds);
    }
    
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id, 
      updateData, 
      {new:true, runValidators: true}).select('-password -__v');
    if(!updatedUser){
      throw new HttpException('User not found', 404);
    }
    return {
      status:200,
      message: 'User updated successfully',
      data: updatedUser
    };
    // const userExist = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true}).select('-password -__v');
    // if(!userExist){
    //   throw new HttpException('User not found', 404);
    // }
    
    // if(updateUserDto.password){
    //   const hashedPassword = await bcrypt.hash(updateUserDto.password, saltOrRounds);
    //   await this.userModel.findByIdAndUpdate(id, {password: hashedPassword}, {new:true});
      
    // }
    // let user = {
    //   ...updateUserDto,
    //   password: updateUserDto.password ? await bcrypt.hash(updateUserDto.password, saltOrRounds) : userExist.password
    // }
    // return {
    //   status:200,
    //   message: 'User updated successfully',
    //   data: user
    // };
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if(!user){
      throw new HttpException('User not found', 404);
    }
    return {
      status:200,
      message: 'User removed successfully',
      
    };
  }
}
