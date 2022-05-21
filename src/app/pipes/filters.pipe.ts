import { Pipe, PipeTransform } from '@angular/core';

declare var moment:any;

@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {

  transform(value: any, type = "date"): any {

    if (type == "date") {
    return moment(value).format('DD-MM-Y');
    }else{
      return JSON.parse(value);
    }
  }

}
