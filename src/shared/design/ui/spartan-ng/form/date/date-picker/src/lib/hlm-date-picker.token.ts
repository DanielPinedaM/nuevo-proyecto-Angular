import {
	type ExistingProvider,
	inject,
	InjectionToken,
	type Signal,
	type Type,
	type ValueProvider,
} from '@angular/core';
import type { BrnPopover } from '@spartan-ng/brain/popover';

export interface HlmDatePickerBase<T> {
	popover: Signal<BrnPopover>;
	disabledState: Signal<boolean>;
	formattedDate: Signal<string | undefined>;
	hasDate: Signal<boolean>;
	/** Confirmar una fecha al picker (p. ej. desde un input parseado). Pasar `undefined` para limpiar. Opcional. */
	updateDate?(value: T | undefined): void;
	/** usado para ControlValueAccessor */
	touched?(): void;
}

export const HlmDatePickerToken = new InjectionToken<HlmDatePickerBase<unknown>>('HlmDatePickerToken');

export function provideHlmDatePicker(instance: Type<HlmDatePickerBase<unknown>>): ExistingProvider {
	return { provide: HlmDatePickerToken, useExisting: instance };
}

/**
 * Inyecta el componente date picker.
 */
export function injectHlmDatePicker<T>(): HlmDatePickerBase<T> {
	return inject(HlmDatePickerToken) as HlmDatePickerBase<T>;
}

export interface HlmDatePickerConfig<T> {
	/**
	 * Si es true, el date picker se cerrará cuando se seleccione una fecha.
	 */
	autoCloseOnSelect: boolean;

	/**
	 * Define cómo debe mostrarse la fecha en la UI.
	 *
	 * @param date
	 * @returns fecha formateada
	 */
	formatDate: (date: T) => string;

	/**
	 * Define cómo debe transformarse la fecha antes de guardarla en el modelo/formulario.
	 *
	 * @param date
	 * @returns fecha transformada
	 */
	transformDate: (date: T) => T;

	/**
	 * Parsea un string ingresado por el usuario a una fecha.
	 *
	 * @param value el string crudo del input
	 * @returns la fecha parseada, o `undefined` cuando el valor no puede parsearse
	 */
	parseDate: (value: string) => T | undefined;
}

function getDefaultConfig<T>(): HlmDatePickerConfig<T> {
	return {
		formatDate: (date) => (date instanceof Date ? date.toDateString() : `${date}`),
		transformDate: (date) => date,
		parseDate: (value) => {
			const date = new Date(value);
			return isNaN(date.getTime()) ? undefined : (date as T);
		},
		autoCloseOnSelect: false,
	};
}

const HlmDatePickerConfigToken = new InjectionToken<HlmDatePickerConfig<unknown>>('HlmDatePickerConfig');

export function provideHlmDatePickerConfig<T>(config: Partial<HlmDatePickerConfig<T>>): ValueProvider {
	return { provide: HlmDatePickerConfigToken, useValue: { ...getDefaultConfig(), ...config } };
}

export function injectHlmDatePickerConfig<T>(): HlmDatePickerConfig<T> {
	const injectedConfig = inject(HlmDatePickerConfigToken, { optional: true });
	return injectedConfig ? (injectedConfig as HlmDatePickerConfig<T>) : getDefaultConfig();
}
