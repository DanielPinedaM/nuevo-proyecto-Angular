import { inject, InjectionToken, type ValueProvider } from '@angular/core';

export interface HlmDateRangePickerConfig<T> {
	/**
	 * Si es true, el date picker se cerrará cuando se alcance la selección máxima de fechas.
	 */
	autoCloseOnEndSelection: boolean;

	/**
	 * Define cómo debe mostrarse la fecha en la UI.
	 *
	 * @param dates
	 * @returns fecha formateada
	 */
	formatDates: (dates: [T | undefined, T | undefined]) => string;

	/**
	 * Define cómo debe transformarse la fecha antes de guardarla en el modelo/formulario.
	 *
	 * @param dates
	 * @returns fecha transformada
	 */
	transformDates: (dates: [T, T]) => [T, T];
}

function getDefaultConfig<T>(): HlmDateRangePickerConfig<T> {
	return {
		formatDates: (dates) =>
			dates
				.filter(Boolean)
				.map((date) => (date instanceof Date ? date.toDateString() : `${date}`))
				.join(' - '),
		transformDates: (dates) => dates,
		autoCloseOnEndSelection: false,
	};
}

const HlmDateRangePickerConfigToken = new InjectionToken<HlmDateRangePickerConfig<unknown>>('HlmDateRangePickerConfig');

export function provideHlmDateRangePickerConfig<T>(config: Partial<HlmDateRangePickerConfig<T>>): ValueProvider {
	return { provide: HlmDateRangePickerConfigToken, useValue: { ...getDefaultConfig(), ...config } };
}

export function injectHlmDateRangePickerConfig<T>(): HlmDateRangePickerConfig<T> {
	const injectedConfig = inject(HlmDateRangePickerConfigToken, { optional: true });
	return injectedConfig ? (injectedConfig as HlmDateRangePickerConfig<T>) : getDefaultConfig();
}
