import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { BlogController } from './blog/blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_FILTER } from '@nestjs/core';
import { LogFilter } from './shared/filters/log.filter';
import { Log, LogSchema } from './shared/schemas/log.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }),
    BlogModule,
    MongooseModule.forRoot("mongodb://localhost:27017/nest-app"),
    ServeStaticModule.forRoot({
      rootPath:join(__dirname , '..' ,"files"),
      serveRoot : '/files'
    }),
    MongooseModule.forFeature([{
      name:Log.name,
      schema:LogSchema
    }])

  ],
  controllers: [AppController],
  providers: [AppService , {
    provide:APP_FILTER,
    useClass:LogFilter
  }],
})
export class AppModule {}
