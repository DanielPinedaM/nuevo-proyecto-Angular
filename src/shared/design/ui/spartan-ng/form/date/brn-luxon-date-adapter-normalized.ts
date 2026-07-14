import type { BrnDateUnits } from '@spartan-ng/brain/date-time';
import { BrnLuxonDateAdapter } from '@spartan-ng/brain/date-time-luxon';
import type { DateTime } from 'luxon';

/**
 * Luxon expone el mes 1-based (enero=1), pero `@spartan-ng/brain` asume 0-based (enero=0).
 * Sin normalizar, seleccionar enero en el calendario retrocede al diciembre anterior y
 * deja el select del mes en blanco */
export class BrnLuxonDateAdapterNormalized extends BrnLuxonDateAdapter {
	override getMonth(date: DateTime): number {
		return super.getMonth(date) - 1;
	}

	override set(date: DateTime, values: BrnDateUnits): DateTime {
		return super.set(date, {
			...values,
			month: values.month !== undefined ? values.month + 1 : undefined,
		});
	}

	override create(values: BrnDateUnits) {
		return super.create({
			...values,
			month: values.month !== undefined ? values.month + 1 : undefined,
		});
	}
}
