import { DateTime } from 'luxon';
import { Nullable } from 'primeng/ts-helpers';

export default class LuxonClass {
  /**
   Eliminar espacio en blanco reemplazando:
  - "p. m" por "p.m"
  - "a. m" por "a.m" */
  public static replaceAmPm = (date: Date | string | any): string | any => {
    if (!date) return date;

    return date
      .replace(/p\.(\s| )m/gi, 'p.m')
      .replace(/a\.(\s| )m/gi, 'a.m')
      .replace(/\.$/, '');
  };

  /**
  formato de hora */
  public static formatHour = (
    date: Date | string | Nullable<Date> | any,
    format: string = 'd-LLL-yyyy'
  ): string | any => {
    let dateTime: DateTime;

    if (date instanceof Date) {
      dateTime = DateTime.fromJSDate(date);
    } else if (typeof date === 'string' && String(date)?.trim() !== '') {
      dateTime = DateTime.fromISO(date);
    } else {
      return date;
    }

    if (!dateTime.isValid) return date;

    const finalDate: string = dateTime.setLocale('es').toFormat(format);

    return this.replaceAmPm(finalDate);
  };

  /**
  formato de fecha */
  public static formatDate = (
    date: Date | string | Nullable<Date> | DateTime,
    format: string = 'd-LLL-yyyy'
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

    return dateTime.setLocale('es').toFormat(format);
  };

  /**
  formato de fecha y hora con a.m y p.m */
  public static dateAndTimeFormat = (
    date: Date | string | Nullable<Date>,
    format: string = 'd-LLL-yyyy hh:mm a'
  ): string | any => {
    let dateTime: DateTime;

    if (date instanceof Date) {
      dateTime = DateTime.fromJSDate(date);
    } else if (typeof date === 'string' && String(date)?.trim() !== '') {
      dateTime = DateTime.fromISO(date);
    } else {
      return date;
    }

    if (!dateTime.isValid) return date;

    const finalDate: string = dateTime
      .setLocale('es')
      .toFormat(format);

    return this.replaceAmPm(finalDate);
  };

  /**
  fecha y hora actual con a.m y p.m  */
  public static currentDateAndTime = (format: string = 'd-LLL-yyyy hh:mm:ss a'): string => {
    const finalDate: string = DateTime.now()
      .setLocale('es')
      .toFormat(format)
      .replace(/\.$/, '');

    return this.replaceAmPm(finalDate);
  };
}
