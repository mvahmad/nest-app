import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
 

    const request = context.switchToHttp().getRequest();
    const apiKey = request.header.apiKey

       console.log("ApiKeyGuard" , process.env.API_KEY)
       console.log("frontend" , apiKey)
    if(apiKey === process.env.API_KEY){
      return true
    }else{
      return false
    }

  }
}
