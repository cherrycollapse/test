import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 }                from 'uuid';

@Schema()
export class User {

@Prop({ type: String, default: function genUUID() {
    return uuidv4()
}})
_id: string;

  @Prop()
  login: string;

  @Prop()
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);