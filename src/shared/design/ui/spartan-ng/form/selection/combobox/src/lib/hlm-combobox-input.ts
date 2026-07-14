import { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BrnComboboxAnchor, BrnComboboxImports, BrnComboboxPopoverTrigger } from '@spartan-ng/brain/combobox';
import { HlmInputGroup, HlmInputGroupImports } from '@spartan-ng/input-group';
import { classes } from '@spartan-ng/utils';

@Component({
	selector: 'hlm-combobox-input',
	imports: [HlmInputGroupImports, BrnComboboxImports, BrnComboboxPopoverTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnComboboxAnchor, HlmInputGroup],
	template: `
		<input
			brnComboboxInput
			#comboboxInput="brnComboboxInput"
			brnComboboxPopoverTrigger
			[closeOnTriggerClick]="false"
			hlmInputGroupInput
			[id]="inputId()"
			[placeholder]="placeholder()"
			[forceInvalid]="forceInvalid()"
			[aria-invalid]="ariaInvalidOverride()"
		/>

		<hlm-input-group-addon align="inline-end">
			@if (showTrigger()) {
				<button
					brnComboboxPopoverTrigger
					hlmInputGroupButton
					data-slot="input-group-button"
					[disabled]="comboboxInput.disabled()"
					size="icon-xs"
					variant="ghost"
					class="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
				>
					<span class="material-symbols-outlined">keyboard_arrow_down</span>
				</button>
			}

			@if (showClear()) {
				<button
					*brnComboboxClear
					hlmInputGroupButton
					data-slot="combobox-clear"
					[disabled]="comboboxInput.disabled()"
					size="icon-xs"
					variant="ghost"
				>
					<span class="material-symbols-outlined">close</span>
				</button>
			}
		</hlm-input-group-addon>

		<ng-content />
	`,
})
export class HlmComboboxInput {
	private static _id = 0;

	public readonly inputId = input<string>(`hlm-combobox-input-${HlmComboboxInput._id++}`);
	public readonly placeholder = input<string>('');

	public readonly showTrigger = input<boolean, BooleanInput>(true, { transform: booleanAttribute });
	public readonly showClear = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly forceInvalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	/** Manual override for aria-invalid. When not set, auto-detects from the parent combobox error state. */
	public readonly ariaInvalidOverride = input<boolean | undefined, BooleanInput>(undefined, {
		transform: (v: BooleanInput) => (v === '' || v === undefined ? undefined : booleanAttribute(v)),
		alias: 'aria-invalid',
	});

	constructor() {
		classes(() => 'w-auto');
	}
}
