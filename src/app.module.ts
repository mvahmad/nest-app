import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { BlogController } from './blog/blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    BlogModule,
    MongooseModule.forRoot("mongodb://localhost:27017/nest-app")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
