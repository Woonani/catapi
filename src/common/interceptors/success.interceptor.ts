import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before...'); // 미들웨어에서 많이 처리함
    // 인터셉터는 컨트롤러에서 보낸 데이터 가공, 응답에 많이 사용
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
      // front에서 받는 response 형태가 아래와 같이 변화
      // get One Cat cat >> { "success": true, "data": "get One Cat cat"}
    );
  }
}

// export class SuccessInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     console.log('Before...');
//     const now = Date.now();
//     return next.handle().pipe(
//       tap(() => console.log(`After...${Date.now() - now}ms`)),
//       /*
//       Before...
//       123 number
//       After...1ms
//       */
//     );
//   }
// }
