import { Module } from '@nestjs/common';
import { BlogController } from './controllers/blog.controller';
import { BlogService } from './services/blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schemas/blog.schema';
import { BlogCategoryController } from './controllers/blog-category.controller';
import { BlogCategoryService } from './services/blog-category.service';
import { BlogCategory, BlogCategorySchema } from './schemas/blog-category.schema';

@Module({
    imports: [MongooseModule.forFeature([
        {name:Blog.name, schema:BlogSchema},
        {name:BlogCategory.name, schema:BlogCategorySchema}
    ])],
    controllers: [BlogController,BlogCategoryController],
    providers: [BlogService,BlogCategoryService],
})
export class BlogModule {}
