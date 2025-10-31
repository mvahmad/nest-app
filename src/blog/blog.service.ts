//conect to  database  for blog related operations
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dtos/blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './schemas/blog.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogService {
    constructor(
        //inject blog model to service
        @InjectModel(Blog.name) private readonly blogModel : Model<Blog>  
    ){}

    async findAll(){
        return await this.blogModel.find().exec();
    }

    async findOne(id:string){
        const blog = await this.blogModel.findOne({_id:id}).exec();
        if(!blog){
            throw new NotFoundException()
        }else{
            return blog;
        }
    }

    async creat(body:BlogDto){
        const newBlog =new this.blogModel(body)
        await newBlog.save();
        return newBlog
    }

    async update(id:string , body:BlogDto){
        const blog = await this.findOne(id);
        blog.title = body.title;
        blog.content = body.content;
        await blog.save();
        return blog;

    }

    async delete(id:string){
        const blog =await this.findOne(id);
        await blog.deleteOne()
    }
}