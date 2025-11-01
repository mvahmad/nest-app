//conect to  database  for blog related operations
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogCategoryDto } from '../dtos/blog-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sortFunction } from 'src/shared/utils/sort-utils';
import { BlogCategory } from '../schemas/blog-category.schema';
import { BlogCategoryQueryDto } from '../dtos/blog-category-query.dto';

@Injectable()
export class BlogCategoryService {
  constructor(
    @InjectModel(BlogCategory.name) private readonly categoryModel: Model<BlogCategory>,
  ) {}

  async findAll(queryParams: BlogCategoryQueryDto) {
    const selectObject = {__v:0};
    const { limit = 5, page = 1, title, sort } = queryParams;
    
    const filter = title ? { title: new RegExp(title, 'i') } : {};

    const sortobj = sort ? sortFunction(sort) : {}
   

    const categoryis = await this.categoryModel
      .find(filter)
      .skip((page - 1) * limit)
      .sort(sortobj)
      .select(selectObject) 
      .limit(limit)
      .lean() 
      .exec();

    const count = await this.categoryModel.countDocuments(filter);

    return { categoryis, count };
  }

  async findOne(id: string,selectObject:any = {__v:0}) {
    const category = await this.categoryModel
        .findOne({_id:id})
        .select(selectObject)
        .lean()
        .exec();
    if (!category) {
      throw new NotFoundException('category not found');
    }
    return category;
  }

  async create(body: BlogCategoryDto) {
    const newCategory = new this.categoryModel(body);
    const saved = await newCategory.save();
    return saved.toObject(); 
  }

  async update(id: string, body: BlogCategoryDto) {
    const updated = await this.categoryModel
      .findByIdAndUpdate(id, body, { new: true, lean: true }) 
      .exec();
    if (!updated) {
      throw new NotFoundException('Blog not found');
    }
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.categoryModel.findByIdAndDelete(id).lean().exec();
    if (!deleted) {
      throw new NotFoundException('Blog not found');
    }
    return deleted;
  }
}
