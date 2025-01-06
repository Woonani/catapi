import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { LoggerMiddleware } from './logger/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // 전체 endpoint에 대해 로거 미들웨어가 실행됨
    // consumer.apply(LoggerMiddleware).forRoutes('cats'); // cats endpoint에 대해 로거 미들웨어가 실행됨
    mongoose.set('debug', this.isDev); // production 배포 시에는 false 여야함 -> 개발환경과 구분을 위해 env 설정
    //위 설정으로 아래처럼 콘솔 데버그확인 가능
    // Mongoose: cats.createIndex({ email: 1 }, { unique: true, background: true })
  }
}
