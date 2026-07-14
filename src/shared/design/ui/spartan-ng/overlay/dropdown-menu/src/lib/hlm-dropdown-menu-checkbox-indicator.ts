import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/utils';

@Component({
	selector: 'hlm-dropdown-menu-checkbox-indicator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'dropdown-menu-checkbox-item-indicator' },
	template: `
		<span class="material-symbols-outlined">check</span>
	`,
})
export class HlmDropdownMenuCheckboxIndicator {
	constructor() {
		classes(
			() =>
				'absolute end-2 flex items-center justify-center [&_.material-symbols-outlined]:text-[length:--spacing(4)] pointer-events-none opacity-0 group-data-checked/dropdown-menu-checkbox:opacity-100',
		);
	}
}
