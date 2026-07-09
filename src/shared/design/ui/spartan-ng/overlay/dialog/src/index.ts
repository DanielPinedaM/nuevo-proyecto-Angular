import { HlmDialog } from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog';
import { HlmDialogClose } from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-close';
import { HlmDialogContent } from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-content';
import { HlmDialogDescription } from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-description';
import { HlmDialogFooter } from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-footer';
import { HlmDialogHeader } from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-header';
import { HlmDialogOverlay } from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-overlay';
import { HlmDialogPortal } from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-portal';
import { HlmDialogTitle } from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-title';
import { HlmDialogTrigger } from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-trigger';

export * from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog';
export * from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-close';
export * from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-content';
export * from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-description';
export * from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-footer';
export * from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-header';
export * from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-overlay';
export * from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-portal';
export * from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-title';
export * from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog-trigger';
export * from '@/shared/design/ui/spartan-ng/overlay/dialog/src/lib/hlm-dialog.service';

export const HlmDialogImports = [
	HlmDialog,
	HlmDialogContent,
	HlmDialogDescription,
	HlmDialogFooter,
	HlmDialogHeader,
	HlmDialogOverlay,
	HlmDialogPortal,
	HlmDialogTitle,
	HlmDialogTrigger,
	HlmDialogClose,
] as const;
