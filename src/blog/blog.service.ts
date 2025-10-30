//conect to  database  for blog related operations
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dtos/blog.dto';

@Injectable()
export class BlogService {
    private blogs =[ {
        _id:"1",
        title:"blog 1",
        content:"blog testi 1"
    },{
        _id:"2",
        title:"blog 2",
        content:"blog testi 2"
}]
    findAll(){
        return this.blogs;
    }

    findOne(id:string){
        const blog = this.blogs.find(b => b._id === id);
        if(!blog){
            throw new NotFoundException()
        }else{
            return blog;
        }
    }

    creat(body:BlogDto){
        const id = String(Math.random())
        const newBlog = {...body, _id:id}

        this.blogs.push(newBlog)
        return newBlog
    }

    update(id:string , body:BlogDto){
        const blog = this.findOne(id);
        blog.title = body.title;
        blog.content = body.content;
        return blog;

    }

    delete(id:string){
        const blog = this.findOne(id);
        const newBlogs = this.blogs.filter((item)=> item._id !== blog._id )
        this.blogs = newBlogs
    }
}