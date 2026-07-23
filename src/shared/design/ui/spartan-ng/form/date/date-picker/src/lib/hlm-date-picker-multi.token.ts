import { inject, InjectionToken, type ValueProvider } from '@angular/core';

export interface HlmDatePickerMultiConfig<T> {
	/**
	 * Si es true, el date picker se cerrará cuando se alcance la selección máxima de fechas.
	 */
	autoCloseOnMaxSelection: boolean;

	/**
	 * Define cómo debe mostrarse la fecha en la UI.
	 *
	 * @param dates
	 * @returns fecha formateada
	 */
	formatDates: (dates: T[]) => string;

	/**
	 * Define cómo debe transformarse la fecha antes de guardarla en el modelo/formulario.
	 *
	 * @param dates
	 * @returns fecha transformada
	 */
	transformDates: (dates: T[]) => T[];
}

function getDefaultConfig<T>(): HlmDatePickerMultiConfig<T> {
	return {
		formatDates: (dates) => dates.map((date) => (date instanceof Date ? date.toDateString() : `${date}`)).join(', '),
		transformDates: (dates) => dates,
		autoCloseOnMaxSelection: false,
	};
}

const HlmDatePickerMultiConfigToken = new InjectionToken<HlmDatePickerMultiConfig<unknown>>('HlmDatePickerMultiConfig');

export function provideHlmDatePickerMultiConfig<T>(config: Partial<HlmDatePickerMultiConfig<T>>): ValueProvider {
	return { provide: HlmDatePickerMultiConfigToken, useValue: { ...getDefaultConfig(), ...config } };
}

export function injectHlmDatePickerMultiConfig<T>(): HlmDatePickerMultiConfig<T> {
	const injectedConfig = inject(HlmDatePickerMultiConfigToken, { optional: true });
	return injectedConfig ? (injectedConfig as HlmDatePickerMultiConfig<T>) : getDefaultConfig();
}
