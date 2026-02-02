import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'; 
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {  
    @Prop({
        required:true,
        type:String,
        min:[3,'Name must be at least 3 characters'],
        max:[30,'Name must be at most 3 characters'],
    })
    name: string;

    @Prop({
        required:true,
        type:String,
        unique:true,
    })
    email: string;

    @Prop({
        required:true,
        type:String,
        min:[3,'Password must be at least 3 characters'],
        max:[30,'Password must be at most 3 characters'],
    })
    password: string;

    @Prop({
        type:String,
        required:true,
        enum:['user', 'admin'],
    })
    role: string;

    @Prop({
        type:String,
        required: false 
    })
    avatar?: string;

    @Prop({
        type:Number,
    })
    age: string;

    @Prop({
        type:Number,
    })
    phoneNumber: string;

    @Prop({
        type:String,
    })
    address: string;

    @Prop({
        type:String,
        enum:[false, true]
    })
    active: string;

    @Prop({
        type:String,
    })
    verificationCode: string;

    @Prop({
        type:String,
        enum:['male', 'female']
    })
    gender: string;


}

export const UserSchema = SchemaFactory.createForClass(User)