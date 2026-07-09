import { HlmCarousel } from '@/shared/design/ui/spartan-ng/data-display/carousel/src/lib/hlm-carousel';
import { HlmCarouselContent } from '@/shared/design/ui/spartan-ng/data-display/carousel/src/lib/hlm-carousel-content';
import { HlmCarouselItem } from '@/shared/design/ui/spartan-ng/data-display/carousel/src/lib/hlm-carousel-item';
import { HlmCarouselNext } from '@/shared/design/ui/spartan-ng/data-display/carousel/src/lib/hlm-carousel-next';
import { HlmCarouselPrevious } from '@/shared/design/ui/spartan-ng/data-display/carousel/src/lib/hlm-carousel-previous';
import { HlmCarouselSlideDisplay } from '@/shared/design/ui/spartan-ng/data-display/carousel/src/lib/hlm-carousel-slide-display';

export * from '@/shared/design/ui/spartan-ng/data-display/carousel/src/lib/hlm-carousel';
export * from '@/shared/design/ui/spartan-ng/data-display/carousel/src/lib/hlm-carousel-content';
export * from '@/shared/design/ui/spartan-ng/data-display/carousel/src/lib/hlm-carousel-item';
export * from '@/shared/design/ui/spartan-ng/data-display/carousel/src/lib/hlm-carousel-next';
export * from '@/shared/design/ui/spartan-ng/data-display/carousel/src/lib/hlm-carousel-previous';
export * from '@/shared/design/ui/spartan-ng/data-display/carousel/src/lib/hlm-carousel-slide-display';

export const HlmCarouselImports = [
	HlmCarousel,
	HlmCarouselContent,
	HlmCarouselItem,
	HlmCarouselPrevious,
	HlmCarouselNext,
	HlmCarouselSlideDisplay,
] as const;
