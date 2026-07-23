import { type BooleanInput } from '@angular/cdk/coercion';
import { CdkMenuItem, CdkMenuItemCheckbox, CdkMenuItemSelectable } from '@angular/cdk/menu';
import { Directive, booleanAttribute, inject, input } from '@angular/core';
import { classes } from '@spartan-ng/utils';
import { HlmDropdownMenuFocusOnHover } from '@/shared/design/ui/spartan-ng/overlay/dropdown-menu/src/lib/hlm-dropdown-menu-focus-on-hover';

/** @internal. Usar HlmDropdownMenuCheckbox en su lugar. */
@Directive({
	selector: '[hlmDropdownMenuCheckboxCdk]',
	providers: [
		{ provide: CdkMenuItemCheckbox, useExisting: HlmDropdownMenuCheckboxCdk },
		{ provide: CdkMenuItemSelectable, useExisting: HlmDropdownMenuCheckboxCdk },
		{ provide: CdkMenuItem, useExisting: CdkMenuItemSelectable },
	],
})
export class HlmDropdownMenuCheckboxCdk extends CdkMenuItemCheckbox {
	public readonly keepOpen = input<boolean, BooleanInput>(true, { transform: booleanAttribute });

	public override trigger(options?: { keepOpen: boolean }) {
		super.trigger({ ...options, keepOpen: this.keepOpen() });
	}
}

@Directive({
	selector: '[hlmDropdownMenuCheckbox],[hlmDropdownMenuCheckboxItem]',
	hostDirectives: [
		{
			directive: HlmDropdownMenuCheckboxCdk,
			inputs: ['cdkMenuItemDisabled: disabled', 'cdkMenuItemChecked: checked', 'keepOpen'],
			outputs: ['cdkMenuItemTriggered: triggered'],
		},
		HlmDropdownMenuFocusOnHover,
	],
	host: {
		'data-slot': 'dropdown-menu-checkbox-item',
		'[attr.data-disabled]': '_cdkMenuItem.disabled ? "" : null',
		'[attr.data-checked]': '_cdkMenuItem.checked ? "" : null',
		'[attr.data-inset]': 'inset() ? "" : null',
	},
})
export class HlmDropdownMenuCheckbox {
	protected readonly _cdkMenuItem = inject(HlmDropdownMenuCheckboxCdk);

	public readonly inset = input<boolean, BooleanInput>(false, {
		transform: booleanAttribute,
	});

	constructor() {
		classes(
			() =>
				'hover:bg-accent focus:bg-accent hover:text-accent-foreground focus:text-accent-foreground hover:**:text-accent-foreground focus:**:text-accent-foreground gap-1.5 rounded-md py-1 ps-1.5 pe-8 text-sm data-inset:ps-7 [&_.material-symbols-outlined:not([class*=\'text-\'])]:text-[length:--spacing(4)] group/dropdown-menu-checkbox relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_.material-symbols-outlined]:pointer-events-none [&_.material-symbols-outlined]:shrink-0',
		);
	}
}
