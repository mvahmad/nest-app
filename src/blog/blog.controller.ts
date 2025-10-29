import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogDto } from './dtos/blog.dto';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
    //get all blogs
    @Get()
    findAll(@Query() queryParams ){
        return "find All"
    }

    //create blog
    @Post()
    create(@Body() body:BlogDto){
        console.log(body);
        
        return "create a blog"
    }

    //get all categories
    @Get('category')
    findAllCategories(){
        return "find All Categories"
    }

    //dynamic rout with id
    @Get(':id')
    findOne(@Param("id") id:string){
        return `find One blog with id : ${id}` 
    }

    //update blog
    @Put(':id')
    update(@Param('id') id:string , @Body() body:BlogDto ){
        console.log(id);
        console.log(body);
        return "update blog"
    }

    //delete blog
    @Delete(':id')
    delete(@Param('id') id:string){
        console.log(id);
        return `delete blog `
    }
}
