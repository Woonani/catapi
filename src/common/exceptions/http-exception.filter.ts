import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as  // exception 안에 getResponse 매서드는 HttpException의 message 인자를 받을 수 있음
      | string
      | { error: string; statusCode: number; message: string | string[] };
    /*  아래와 같은 경우 때문에 분기처리 추가
        "success": false,
        "timestamp": "2025-01-01T20:25:18.147Z",
        "path": "/ca",
        "error": {
            "message": "Cannot GET /ca",
            "error": "Not Found",
            "statusCode": 404
        }
    */
    if (typeof error === 'string') {
      // 인자값을 넣어서 에러가 string일 경우
      // response.status(status).send({ 'express 에서'})
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {
      response.status(status).json({
        // nest 자체 에러일 경우
        success: false,
        timestamp: new Date().toISOString(),
        ...error,
      });
    }
  }
}
