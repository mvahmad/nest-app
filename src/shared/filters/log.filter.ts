import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from 'src/app.service';
import { LogType } from '../schemas/log.schema';
@Catch(HttpException)
export class LogFilter<T> implements ExceptionFilter {
  constructor(
    private readonly appService:AppService
  ){}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    const status  = exception.getStatus()

    if (status === 404){
      response.status(404).send({statusCode:status , messge:"یافت نشد"})
    }else{
      response.send(exception.getResponse())
    }
    await this.appService.log({
      type:LogType.Error,
      content:JSON.stringify(exception.getResponse())
    })
    
  }
}
