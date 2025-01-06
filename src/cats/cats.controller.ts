import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  //   @UseFilters(HttpExceptionFilter)
  getAllCat() {
    /*
      throw new HttpException({ success: false, message: 'api is broken' }, 401);
    {
        "success": false,
        "message": "api is broken"
    }
    */
    throw new HttpException('api is broken', 401);
    /*
    {
    {
        "success": false,
        "timestamp": "2025-01-01T20:16:29.751Z",
        "message": "api is broken"
    }
    }
    */
    console.log('hello controller');
    return { cats: 'get all cat api' };
  }

  @Get(':id') // * http://localhost:8000/cats/123
  //   getOneCat(@Param() param) {//{ id: '123' }
  //   getOneCat(@Param('id') param) {
  getOneCat(@Param('id', ParseIntPipe) param: number) {
    console.log(param, typeof param); // 123 string >> pipes를 이용하여 number로 타입 변환환 시 : 123 number
    // ParseIntPipe 설정 후 param:number 으로 타입 지정까지 해주면 > int 변환 및 유효성 검사까지 수행 하여 validation error를 냄
    /*
    *http://localhost:8000/cats/123b
    {
        "success": false,
        "timestamp": "2025-01-01T20:35:16.098Z",
        "message": "Validation failed (numeric string is expected)",
        "error": "Bad Request",
        "statusCode": 400
    }
    */
    return 'get One Cat cat';
  }

  @Get('')
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  //   async signUp(){
  async signUp(@Body() body: CatRequestDto) {
    // dto 기준으로 데이터 유효성 검사
    // return this.catsService.signUp(body); Promise를 return 하므로 await을 붙여줘야 함
    return await this.catsService.signUp(body);
  }

  @Post('login')
  logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
