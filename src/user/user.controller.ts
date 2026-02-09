import { 
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
  Query
} from '@nestjs/common';import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './guard/Auth.guard';
import { Roles } from './decorator/user.decorator';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  // @docs Admin can create User
  // @Route POST /api/v1/user
  // @access Private [Admin]

  @Post()
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  create(
    @Body(new ValidationPipe({forbidNonWhitelisted:true})) 
      createUserDto: CreateUserDto,
      @Req() req,
  ) {
    return this.userService.create(createUserDto, req.user);
  }

  // @docs Admin can get all Users
  // @Route GET /api/v1/user
  // @access Private [Admin]

  @Get()
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findAll(@Query() query) {
    return this.userService.findAll(query);
  }

  
  // @docs Admin can get single User
  // @Route GET /api/v1/user/:id
  // @access Private [Admin]
  @Get(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  
  // @docs Admin can get single User
  // @Route UPDATE /api/v1/user/:id
  // @access Private [Admin]
  @Patch(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({forbidNonWhitelisted:true}))  
    updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
