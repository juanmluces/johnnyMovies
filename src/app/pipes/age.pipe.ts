import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(date: string, dateFinish?: string): number {
    if(!dateFinish) return  moment().diff(date, 'years',false);
    const startDate = moment(date, 'YYYY-MM-dd');
    const endDate = moment(dateFinish, 'YYYY-MM-dd');
    return endDate.diff(startDate, 'years', false);
  }
  
}
