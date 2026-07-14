import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/utils';

@Component({
	selector: 'hlm-dropdown-menu-item-sub-indicator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<span class="material-symbols-outlined text-[length:--spacing(4)] rtl:rotate-180">chevron_right</span>
	`,
})
export class HlmDropdownMenuItemSubIndicator {
	constructor() {
		classes(() => 'ms-auto flex items-center justify-center');
	}
}
