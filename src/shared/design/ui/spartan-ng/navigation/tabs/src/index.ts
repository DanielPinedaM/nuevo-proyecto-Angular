import { HlmTabs } from '@/shared/design/ui/spartan-ng/navigation/tabs/src/lib/hlm-tabs';
import { HlmTabsContent } from '@/shared/design/ui/spartan-ng/navigation/tabs/src/lib/hlm-tabs-content';
import { HlmTabsContentLazy } from '@/shared/design/ui/spartan-ng/navigation/tabs/src/lib/hlm-tabs-content-lazy';
import { HlmTabsList } from '@/shared/design/ui/spartan-ng/navigation/tabs/src/lib/hlm-tabs-list';
import { HlmTabsPaginatedList } from '@/shared/design/ui/spartan-ng/navigation/tabs/src/lib/hlm-tabs-paginated-list';
import { HlmTabsTrigger } from '@/shared/design/ui/spartan-ng/navigation/tabs/src/lib/hlm-tabs-trigger';

export * from '@/shared/design/ui/spartan-ng/navigation/tabs/src/lib/hlm-tabs';
export * from '@/shared/design/ui/spartan-ng/navigation/tabs/src/lib/hlm-tabs-content';
export * from '@/shared/design/ui/spartan-ng/navigation/tabs/src/lib/hlm-tabs-content-lazy';
export * from '@/shared/design/ui/spartan-ng/navigation/tabs/src/lib/hlm-tabs-list';
export * from '@/shared/design/ui/spartan-ng/navigation/tabs/src/lib/hlm-tabs-paginated-list';
export * from '@/shared/design/ui/spartan-ng/navigation/tabs/src/lib/hlm-tabs-trigger';

export const HlmTabsImports = [
	HlmTabs,
	HlmTabsList,
	HlmTabsTrigger,
	HlmTabsContent,
	HlmTabsContentLazy,
	HlmTabsPaginatedList,
] as const;
