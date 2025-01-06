import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP'); // nestjs에서 사용하는 로거 클래스
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      // response 까지 로깅을 하기 위해 응답완료이벤트 finish를 건다.
      this.logger.log(
        `${req.ip} ${req.method} ${res.statusCode}`,
        req.originalUrl,
      );
    });
    //[Nest] 22684  - 2025. 01. 01. 오후 5:43:42     LOG [HTTP] ::1 GET 200
    //[Nest] 22684  - 2025. 01. 01. 오후 5:43:42     LOG [HTTP] /cats/hello/3377/nani
    next();
  }
}
