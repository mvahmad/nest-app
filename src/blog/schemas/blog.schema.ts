import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Blog extends Document {
    @Prop()
    titel:string;
    @Prop()
    content:string;
}

export const BlogSchema =  SchemaFactory.createForClass(Blog);