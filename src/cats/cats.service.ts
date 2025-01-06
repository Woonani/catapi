import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Cat } from './cats.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catModel.exists({ email });
    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.'); //403에러 발생시키는 메서트
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    // return cat;
    /*
    {
        "success": true,
        "data": {
            "email": "nani3@naver.com",
            "name": "red",
            "password": "$2b$10$Nt7vBNt5x9C4CzpNjhskYOX6Bu9KjNyMcq8UiikKhQQWqbupTD416",
            "_id": "6775b6ce79673ac9f0afa561",
            "createdAt": "2025-01-01T21:42:38.994Z",
            "updatedAt": "2025-01-01T21:42:38.994Z",
            "__v": 0
        }
    }
    */
    return cat.readOnlyData;
    /*
    {
        "success": true,
        "data": {
            "id": "6775b7a41af5ea8c3af939b4",
            "email": "nani4@naver.com",
            "name": "orange"
        }
    }
    */
  }
}
