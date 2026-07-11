import { Service } from '@angular/core';
import { DateTime } from 'luxon';

@Service()
export default class LuxonService {
  /**
  formato de fecha y/o hora con formato personalizado */
  formatDate = (
    rawDate: string | Date | DateTime,
    format: string = "yyyy-MM-dd'T'HH:mm:ss'Z'",
  ): DateTime | null => {
    let convertedDateTime: DateTime;

    if (rawDate instanceof DateTime) {
      convertedDateTime = rawDate;
    } else if (rawDate instanceof Date) {
      convertedDateTime = DateTime.fromJSDate(rawDate);
    } else if (typeof rawDate === 'string' && String(rawDate).trim() !== '') {
      convertedDateTime = DateTime.fromISO(rawDate);
    } else {
      return rawDate;
    }

    if (!convertedDateTime.isValid) return null;

    return convertedDateTime.toUTC().setLocale('es').toFormat(format);
  };

  /**
  fecha y hora actual con formato de fecha y hora personalizada */
  currentDateAndTime = (format = 'd-LLL-yyyy hh:mm:ss a'): string => {
    return DateTime.now().setLocale('es').toFormat(format).replace(/\.$/, '');
  };
}
