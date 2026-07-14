import { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { BrnFieldControl, BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { ButtonVariants, HlmButtonImports } from '@spartan-ng/button';
import { HlmPopoverTrigger } from '@spartan-ng/popover';
import { hlm } from '@spartan-ng/utils';
import { ClassValue } from 'clsx';
import { HlmDatePickerTriggerBase, provideHlmDatePickerTrigger } from '@/shared/design/ui/spartan-ng/form/date/date-picker/src/lib/hlm-date-picker-trigger.token';
import { injectHlmDatePicker } from '@/shared/design/ui/spartan-ng/form/date/date-picker/src/lib/hlm-date-picker.token';

@Component({
	selector: 'hlm-date-picker-trigger',
	imports: [HlmButtonImports, HlmPopoverTrigger, BrnFieldControlDescribedBy],
	providers: [provideHlmDatePickerTrigger(HlmDatePickerTrigger)],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'date-picker-trigger' },
	template: `
		<button
			[id]="buttonId()"
			type="button"
			[class]="_computedClass()"
			[disabled]="_disabled()"
			[attr.aria-invalid]="_ariaInvalid()"
			[attr.data-invalid]="_ariaInvalid()"
			[attr.data-touched]="_touched?.() ? 'true' : null"
			[attr.data-dirty]="_dirty?.() ? 'true' : null"
			[attr.data-matches-spartan-invalid]="_spartanInvalid() ? 'true' : null"
			hlmBtn
			[variant]="variant()"
			hlmPopoverTrigger
			[hlmPopoverTriggerFor]="_popover()"
			brnFieldControlDescribedBy
			[attr.data-placeholder]="_isPlaceholder() ? '' : null"
		>
			<span class="truncate">
				@if (_formattedDate(); as formattedDate) {
					{{ formattedDate }}
				} @else {
					<ng-content />
				}
			</span>

			@if (showTrigger()) {
				<span class="material-symbols-outlined">keyboard_arrow_down</span>
			}
		</button>
	`,
})
export class HlmDatePickerTrigger implements HlmDatePickerTriggerBase {
	private static _nextId = 0;

	private readonly _fieldControl = inject(BrnFieldControl, { optional: true });
	private readonly _datePicker = injectHlmDatePicker();

	private readonly _invalid = this._fieldControl?.invalid;
	protected readonly _spartanInvalid = computed(() => this.forceInvalid() || this._fieldControl?.spartanInvalid());
	protected readonly _dirty = this._fieldControl?.dirty;
	protected readonly _touched = this._fieldControl?.touched;

	protected readonly _ariaInvalid = computed(() => (this._invalid?.() ? 'true' : null));

	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() =>
		hlm('data-placeholder:text-muted-foreground justify-between', this.userClass()),
	);

	protected readonly _isPlaceholder = computed(() => !this._datePicker.hasDate());

	/** The id of the button that opens the date picker. */
	public readonly buttonId = input<string>(`hlm-date-picker-${++HlmDatePickerTrigger._nextId}`);

	/** @internal The id of the button that opens the date picker, used for labeling. */
	public readonly triggerId = this.buttonId;

	/** Forces the invalid state visually, regardless of form control state. */
	public readonly forceInvalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	public readonly variant = input<ButtonVariants['variant']>('outline');

	public readonly showTrigger = input<boolean, BooleanInput>(true, { transform: booleanAttribute });

	protected readonly _popover = this._datePicker.popover;
	protected readonly _disabled = this._datePicker.disabledState;
	protected readonly _formattedDate = this._datePicker.formattedDate;
}
