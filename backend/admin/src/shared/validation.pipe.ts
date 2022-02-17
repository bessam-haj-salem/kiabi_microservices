import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any,{metatype}: ArgumentMetadata) {
   
    // const {metatype} = metadata

    if(value instanceof Object && this.isEmpty(value)) {
      console.log("******empty case");
      throw new HttpException('Validation failed: No body submitted', HttpStatus.BAD_REQUEST)
  }
   
    if (!metatype || !this.validateMetaType(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    console.log(object)
    const errors = await validate(object);
   console.log(`errrors of ${typeof object}`);
    console.log(errors)
    if (errors.length > 0) {
      console.log("******error case");

      throw new HttpException(`Validation failed: ${this.formErrors(errors)}`,HttpStatus.BAD_REQUEST );
    }
    return value;
  }

  private validateMetaType(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formErrors(errors:any[]) {
    return errors.map(err => {
      for(let property in err.constraints) {
        return err.constraints[property]
      }
    }).join(', ')
  }

  private isEmpty(value:any) {
    if(value) {
      return false

    }
    return true
  }
      
}
