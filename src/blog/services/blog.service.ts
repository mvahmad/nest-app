//conect to  database  for blog related operations
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from '../dtos/blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from '../schemas/blog.schema';
import { Model } from 'mongoose';
import { BlogQueryDto } from '../dtos/blog-query.dto';
import { sortFunction } from 'src/shared/utils/sort-utils';
import { deleteImage } from 'src/shared/utils/file-utils';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  async findAll(queryParams: BlogQueryDto , selectObject:any = {__v:0}) {
    const { limit = 5, page = 1, title, sort } = queryParams;
    
    const filter = title ? { title: new RegExp(title, 'i') } : {};

    const sortobj = sort ? sortFunction(sort) : {}
   

    const blogs = await this.blogModel
      .find(filter)
      .populate("category",{title:1})
      .skip((page - 1) * limit)
      .sort(sortobj)
      .select(selectObject) // Exclude __v field
      .limit(limit)
      .lean() // ✅ convert to plain JS objects
      .exec();

    const count = await this.blogModel.countDocuments(filter);

    return { blogs, count };
  }

  async findOne(id: string,selectObject:any = {__v:0}) {
    const blog = await this.blogModel
        .findOne({_id:id})
        .populate("category",{title:1})
        .select(selectObject)
        .lean()
        .exec(); // ✅ .lean()
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  async create(body: BlogDto) {
    const newBlog = new this.blogModel(body);
    const saved = await newBlog.save();
    return saved.toObject(); 
  }

  async update(id: string, body: BlogDto) {
    const blog = await this.blogModel.findById(id).select('_id image').exec();
    if (!blog) {
    throw new NotFoundException('Blog not found');
  }
    if (blog.image !== body.image ){
      try {
      await deleteImage(blog.image, 'blog');
    } catch (error) {
      console.error('❌ Failed to delete image files:', error);
    }
    }
    return await this.blogModel.findByIdAndUpdate(id,body,{
      new:true
    })
 
  }

  async delete(id: string) {
  const blog = await this.blogModel.findById(id).select('_id image').exec();
  if (!blog) {
    throw new NotFoundException('Blog not found');
  }
   if (blog.image) {
    try {
      await deleteImage(blog.image, 'blog');
    } catch (error) {
      console.error('❌ Failed to delete image files:', error);
    }
  }
  await blog.deleteOne();
  return { message: 'Blog deleted successfully', id };
  }
}

