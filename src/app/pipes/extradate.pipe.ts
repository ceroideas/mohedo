import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
declare var moment:any;

@Pipe({
  name: 'extradate'
})
export class ExtradatePipe implements PipeTransform {

  constructor(public translate: TranslateService){

  }

  transform(value: any, format = 'dd-MM-y'): any {
  	let h = moment().format(format);
  	let date = moment(value).format(format);
    return h == date ? this.translate.instant("RESULTS.today") : date;
  }

}
