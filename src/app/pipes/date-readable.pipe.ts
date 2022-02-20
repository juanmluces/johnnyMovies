import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateReadable',
  pure: false
})
export class DateReadablePipe implements PipeTransform {

  constructor(private translate: TranslateService){

  }

  transform(date: string, time: boolean = false): string {
    const currentLang = this.translate.currentLang;
    const enFormat = time ? 'MMMM DD YYYY HH:MM' : 'MMMM DD YYYY'
    const esFormat = time ? 'DD MMMM YYYY HH:MM' : 'DD MMMM YYYY'
    return moment(date).locale(currentLang).format(currentLang == 'en' ? enFormat : esFormat)
  }

}
