import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {

  transform(value: Date | string | number, formatType: string): string {
    if (!value) return value.toString();

    const datePipe = new DatePipe('en-US');
    
    switch (formatType) {
      case 'short':
        return datePipe.transform(value, 'MMM dd') || '';
      case 'full':
        return datePipe.transform(value, 'dd MMMM, yyyy')  || '';
      case 'day':
        return datePipe.transform(value, 'dd')  || '';
      case 'month':
        return datePipe.transform(value, 'MMM')  || '';
      case 'day-number':
        return datePipe.transform(value, 'd')  || '';
      case 'time':
        return datePipe.transform(value, 'h:mm a')  || '';
      case 'time-uppercase':
        return datePipe.transform(value, 'h:mm A')  || '';
      case 'dd-MMM-YY-time':
        return datePipe.transform(value, 'dd MMM, yy, h:mm a')  || '';
      case 'day-name':
        return datePipe.transform(value, 'EEEE')  || '';
      case 'MMM-DD-YYYY':
        return datePipe.transform(value, 'MMMM dd yyyy')  || '';
      default:
        return datePipe.transform(value, 'yyyy-MM-dd')  || '';
    }
  }

}
