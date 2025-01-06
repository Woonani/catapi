import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
// Class Validator 라이브러리 설치 후 사용 npm i --save class-validator class-transformer
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @Prop({
    required: true, //필수값 등 설정정
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string; // email 컬럼

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string; //name 컬럼럼

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);
// Cat 클래스를 스키마로 만들어줌

// 가상으로 client용 스키마 만듦
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  // this는 데이터 베이스 객체
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
