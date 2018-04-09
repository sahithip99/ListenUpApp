import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objtoArray',
})
export class ObjtoArrayPipe implements PipeTransform {

  transform(obj:any) {
    var result = [];
    for(var i in obj){
    	result.push(obj[i]);
    }
    return result;
  }
}
