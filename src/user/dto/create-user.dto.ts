import { IsString, MinLength, MaxLength, IsEmail, Min, IsEnum, IsUrl, IsNumber, IsPhoneNumber, IsBoolean, Length, IsOptional,  } from 'class-validator';


export class CreateUserDto {
    //name
    @IsString()
    @MinLength(3, { message: 'Name must be at least 3 characters' })
    @MaxLength(30, { message: 'Name must be at most 30 characters' })
    name: string;
    //email
    @IsString({message: 'Email must be a string'})
    @IsEmail({}, {message: 'Email must be a valid email address'})
    @MinLength(5, { message: 'Email must be required' })
    email: string;
    //password
    @IsString({message: 'Password must be a string'})
    @MinLength(3, { message: 'Password must be at least 3 characters' })
    @MaxLength(20, { message: 'Password must be at most 20 characters' })
    password: string;
    //role
    @IsEnum(['user', 'admin'], { message: 'Role must be either user or admin' })
    @MinLength(0, { message: 'Thie role Must be Required' })
    @IsOptional()
    role: string;
    //avatar
    @IsString({message: 'Avatar must be a string'}) 
    @IsUrl({}, {message: 'Avatar must be a valid URL'}) 
    @IsOptional()
    avatar?: string;
    //age   
    @IsNumber({}, {message: 'Age must be a number'})
    @Min(0, {message: 'Age must be a positive number'})
    age: number;
    //phoneNumber
    @IsString({message: 'Phone number must be a string'})   
    @IsPhoneNumber('EG', {message: 'Phone number must be a valid phone number'})
    phoneNumber: string;
    //address
    @IsString({message: 'Address must be a string'})        
    address: string;
    //active
    @IsBoolean({message: 'Active must be a boolean'})
    @IsEnum([false, true], { message: 'Active must be either true or false' })
    active: boolean;
    //verificationCode
    @IsString({message: 'Verification code must be a string'})  
    @IsOptional()
    @Length(6, 6, {message: 'Verification code must be exactly 6 characters'})
    verificationCode: string;
    //gender
    @IsEnum(['male', 'female'], { message: 'Gender must be either male or female' })
    gender: string;
    
}
