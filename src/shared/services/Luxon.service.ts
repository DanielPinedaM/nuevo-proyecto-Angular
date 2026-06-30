import { Service } from '@angular/core';
import { DateTime } from 'luxon';
import { Nullable } from 'primeng/ts-helpers';

@Service()
export default class LuxonService {
  /**
  Eliminar espacio en blanco reemplazando:
  - "p. m" por "p.m"
  - "a. m" por "a.m" */
  replaceAmPm = (date: Date | string | any): string | any => {
    if (!date) return date;

    return date
      .replace(/p\.(\s| )m/gi, 'p.m')
      .replace(/a\.(\s| )m/gi, 'a.m')
      .replace(/\.$/, '');
  };

  /**
  formato de fecha y/o hora con formato personalizado */
  formatDate = (
    date: Date | string | Nullable<Date> | DateTime,
    format = 'd-LLL-yyyy'
  ): string | any => {
    let dateTime: DateTime;

    if (date instanceof DateTime) {
      dateTime = date;
    } else if (date instanceof Date) {
      dateTime = DateTime.fromJSDate(date);
    } else if (typeof date === 'string' && String(date)?.trim() !== '') {
      dateTime = DateTime.fromISO(date);
    } else {
      return date;
    }

    if (!dateTime.isValid) return date;

    return this.replaceAmPm(dateTime.setLocale('es').toFormat(format));
  };

  /**
  fecha y hora actual con formato de fecha y hora personalizada */
  currentDateAndTime = (format = 'd-LLL-yyyy hh:mm:ss a'): string => {
    const finalDate: string = DateTime.now()
      .setLocale('es')
      .toFormat(format)
      .replace(/\.$/, '');

    return this.replaceAmPm(finalDate);
  };
}
