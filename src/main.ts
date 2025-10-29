import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform:true , whitelist:true ,
    forbidNonWhitelisted:true,
    transformOptions:{ enableImplicitConversion:true }
    }));

  //define swagger stting
  const config = new DocumentBuilder().setTitle("Nest App").build()
  const document = SwaggerModule.createDocument(app,config)
  //define path setup
  SwaggerModule.setup("/documention" , app , document)
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
