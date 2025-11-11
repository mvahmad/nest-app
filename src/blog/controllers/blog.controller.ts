import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { BlogDto } from '../dtos/blog.dto';
import { BlogService } from '../services/blog.service';
import { BlogQueryDto } from '../dtos/blog-query.dto';

@ApiTags('Blog')
// @ApiHeader({
//     name:"apiKey",
//     description:"API KEY"
// })
@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ){}


    //get all blogs
    @Get()
    findAll(@Query() queryParams:BlogQueryDto ){
        return this.blogService.findAll(queryParams)
    }

    //create blog
    @Post()
    create(@Body() body:BlogDto){
        //
        return this.blogService.create(body)
    
    }

    //get all categories
    // @Get('category')
    // findAllCategories(){
    //     return "find All Categories"
    // }

    //dynamic rout with id
    @Get(':id')
    findOne(@Param("id") id:string){
        return this.blogService.findOne(id)
    }

    //update blog
    @Put(':id')
    update(@Param('id') id:string , @Body() body:BlogDto ){
        // 
        return this.blogService.update(id,body)
    }

    //delete blog
    @Delete(':id')
    delete(@Param('id') id:string){
        //
        return this.blogService.delete(id)
    }
}
