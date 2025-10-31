//conect to  database  for blog related operations
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dtos/blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './schemas/blog.schema';
import { Model } from 'mongoose';
import { BlogQueryDto } from './dtos/blog-query.dto';
import { sortFunction } from 'src/shared/utils/sort-utils';

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
    return saved.toObject(); // ✅ convert before returning
  }

  async update(id: string, body: BlogDto) {
    const updated = await this.blogModel
      .findByIdAndUpdate(id, body, { new: true, lean: true }) // ✅ lean
      .exec();
    if (!updated) {
      throw new NotFoundException('Blog not found');
    }
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.blogModel.findByIdAndDelete(id).lean().exec();
    if (!deleted) {
      throw new NotFoundException('Blog not found');
    }
    return deleted;
  }
}
