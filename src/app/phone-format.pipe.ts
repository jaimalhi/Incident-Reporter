import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {
  transform(phone: string): string {
    if (!phone) {
      return '';
    }
    const value = phone.toString().trim().replace(/^\+/, '');
    if (value.match(/[^0-9]/)) {
      return phone;
    }
    const country = value.slice(0, 3);
    const area = value.slice(3, 6);
    const number = value.slice(6, 10);
    return `(${country}) ${area}-${number}`;
  }
}
