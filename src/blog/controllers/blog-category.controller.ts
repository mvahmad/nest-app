import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogCategoryService } from '../services/blog-category.service';
import { BlogCategoryQueryDto } from '../dtos/blog-category-query.dto';
import { BlogCategoryDto } from '../dtos/blog-category.dto';
@ApiTags('BlogCatrgory')
@Controller('blog-category')
export class BlogCategoryController {
    constructor(
        private readonly blogCategoryService: BlogCategoryService
    ){} 
    //get all categories
    @Get()
    findAll(@Query() queryParams:BlogCategoryQueryDto ){
        return this.blogCategoryService.findAll(queryParams)
    }
    //dynamic rout with id
    @Get(':id')
    findOne(@Param("id") id:string){
        return this.blogCategoryService.findOne(id)
    }
    //create category
    @Post()
    create(@Body() body:BlogCategoryDto ){
        //
        return this.blogCategoryService.create(body)
    }
    //update category
    @Put(':id')
    update(@Param('id') id:string , @Body() body:BlogCategoryDto ){ 
        return this.blogCategoryService.update(id,body)
    }
    //delete category
    @Delete(':id')
    delete(@Param('id') id:string){
        //
        return this.blogCategoryService.delete(id)
    }
}