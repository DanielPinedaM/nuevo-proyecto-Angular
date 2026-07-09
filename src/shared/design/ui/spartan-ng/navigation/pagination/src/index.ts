import { HlmNumberedPagination } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-numbered-pagination';
import { HlmNumberedPaginationQueryParams } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-numbered-pagination-query-params';
import { HlmPagination } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination';
import { HlmPaginationContent } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-content';
import { HlmPaginationEllipsis } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-ellipsis';
import { HlmPaginationItem } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-item';
import { HlmPaginationLink } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-link';
import { HlmPaginationNext } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-next';
import { HlmPaginationPrevious } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-previous';

export * from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-numbered-pagination';
export * from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-numbered-pagination-query-params';
export * from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination';
export * from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-content';
export * from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-ellipsis';
export * from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-item';
export * from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-link';
export * from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-next';
export * from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-previous';

export const HlmPaginationImports = [
	HlmPagination,
	HlmPaginationContent,
	HlmPaginationItem,
	HlmPaginationLink,
	HlmPaginationPrevious,
	HlmPaginationNext,
	HlmPaginationEllipsis,
	HlmNumberedPagination,
	HlmNumberedPaginationQueryParams,
] as const;
