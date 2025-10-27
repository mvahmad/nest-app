import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//controlers are Task of directing all types of requests
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
