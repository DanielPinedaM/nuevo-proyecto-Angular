import { HlmAccordion } from '@/shared/design/ui/spartan-ng/navigation/accordion/src/lib/hlm-accordion';
import { HlmAccordionContent } from '@/shared/design/ui/spartan-ng/navigation/accordion/src/lib/hlm-accordion-content';
import { HlmAccordionItem } from '@/shared/design/ui/spartan-ng/navigation/accordion/src/lib/hlm-accordion-item';
import { HlmAccordionTrigger } from '@/shared/design/ui/spartan-ng/navigation/accordion/src/lib/hlm-accordion-trigger';

export * from '@/shared/design/ui/spartan-ng/navigation/accordion/src/lib/hlm-accordion';
export * from '@/shared/design/ui/spartan-ng/navigation/accordion/src/lib/hlm-accordion-content';
export * from '@/shared/design/ui/spartan-ng/navigation/accordion/src/lib/hlm-accordion-item';
export * from '@/shared/design/ui/spartan-ng/navigation/accordion/src/lib/hlm-accordion-trigger';

export const HlmAccordionImports = [HlmAccordion, HlmAccordionItem, HlmAccordionContent, HlmAccordionTrigger] as const;
