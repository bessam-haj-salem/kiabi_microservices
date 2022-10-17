import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";



@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>  {
        const req = context.switchToHttp().getRequest()
        console.log('**********req')
        console.log(req)
        const method = req.method
        const url = req.url
        const now = Date.now()
        
        return next.handle().pipe(
            tap(() => {
                Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name)
            })
        )
    }
}