import { Directive, inject } from '@angular/core';
import { classes } from '@spartan-ng/utils';
import { HlmCarousel } from '@/shared/design/ui/spartan-ng/data-display/carousel/src/lib/hlm-carousel';

@Directive({
	selector: '[hlmCarouselContent],hlm-carousel-content',
	host: {
		'data-slot': 'carousel-content',
	},
})
export class HlmCarouselContent {
	private readonly _orientation = inject(HlmCarousel).orientation;

	constructor() {
		classes(() => ['flex', this._orientation() === 'horizontal' ? '-ml-4' : '-mt-4 flex-col']);
	}
}
