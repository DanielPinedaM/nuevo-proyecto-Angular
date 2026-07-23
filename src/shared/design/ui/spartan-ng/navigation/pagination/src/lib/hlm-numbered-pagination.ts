import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import {
    ChangeDetectionStrategy,
    Component,
    booleanAttribute,
    computed,
    input,
    model,
    numberAttribute,
    untracked,
} from '@angular/core';
import { HlmSelectImports } from '@spartan-ng/select';
import { HlmPagination } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination';
import { HlmPaginationContent } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-content';
import { HlmPaginationEllipsis } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-ellipsis';
import { HlmPaginationItem } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-item';
import { HlmPaginationLink } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-link';
import { HlmPaginationNext } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-next';
import { HlmPaginationPrevious } from '@/shared/design/ui/spartan-ng/navigation/pagination/src/lib/hlm-pagination-previous';

@Component({
	selector: 'hlm-numbered-pagination',
	imports: [
		HlmPagination,
		HlmPaginationContent,
		HlmPaginationItem,
		HlmPaginationPrevious,
		HlmPaginationNext,
		HlmPaginationLink,
		HlmPaginationEllipsis,
		HlmSelectImports,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex items-center justify-between gap-2 px-4 py-2">
			<div class="flex items-center gap-1 text-sm text-nowrap text-gray-600">
				<b>{{ totalItems() }}</b>
				total items |
				<b>{{ _lastPageNumber() }}</b>
				pages
			</div>

			<nav hlmPagination>
				<ul hlmPaginationContent>
					@if (showEdges() && !_isFirstPageActive()) {
						<li hlmPaginationItem (click)="goToPrevious()">
							<hlm-pagination-previous />
						</li>
					}

					@for (page of _pages(); track page) {
						<li hlmPaginationItem>
							@if (page === '...') {
								<hlm-pagination-ellipsis />
							} @else {
								<a hlmPaginationLink [isActive]="currentPage() === page" (click)="currentPage.set(page)">
									{{ page }}
								</a>
							}
						</li>
					}

					@if (showEdges() && !_isLastPageActive()) {
						<li hlmPaginationItem (click)="goToNext()">
							<hlm-pagination-next />
						</li>
					}
				</ul>
			</nav>

			<!-- Show Page Size selector -->
			<hlm-select [(value)]="itemsPerPage" class="ml-auto">
				<hlm-select-trigger class="w-fit">
					<hlm-select-value />
				</hlm-select-trigger>
				<hlm-select-content *hlmSelectPortal>
					<hlm-select-group>
						@for (pageSize of _pageSizesWithCurrent(); track pageSize) {
							<hlm-select-item [value]="pageSize">{{ pageSize }}</hlm-select-item>
						}
					</hlm-select-group>
				</hlm-select-content>
			</hlm-select>
		</div>
	`,
})
export class HlmNumberedPagination {
	/**
	 * La página actual (activa).
	 */
	public readonly currentPage = model.required<number>();

	/**
	 * El número de elementos por página paginada.
	 */
	public readonly itemsPerPage = model.required<number>();

	/**
	 * El número total de elementos en la colección. Solo es útil cuando
	 * se hace paginación en el servidor, donde el tamaño de la colección
	 * se limita a una sola página retornada por la API del servidor.
	 */
	public readonly totalItems = input.required<number, NumberInput>({
		transform: numberAttribute,
	});

	/**
	 * El número de links de página a mostrar.
	 */
	public readonly maxSize = input<number, NumberInput>(7, {
		transform: numberAttribute,
	});

	/**
	 * Mostrar los botones de primera y última página.
	 */
	public readonly showEdges = input<boolean, BooleanInput>(true, {
		transform: booleanAttribute,
	});

	/**
	 * Los tamaños de página a mostrar.
	 * Por defecto es [10, 20, 50, 100]
	 */
	public readonly pageSizes = input<number[]>([10, 20, 50, 100]);

	protected readonly _pageSizesWithCurrent = computed(() => {
		const pageSizes = this.pageSizes();
		return pageSizes.includes(this.itemsPerPage())
			? pageSizes /** si el tamaño de página actual está incluido, retornar el mismo array */
			: [...pageSizes, this.itemsPerPage()].sort((a, b) => a - b); /** de lo contrario, agregar el tamaño de página actual y ordenar el array */
	});

	protected readonly _isFirstPageActive = computed(() => this.currentPage() === 1);
	protected readonly _isLastPageActive = computed(() => this.currentPage() === this._lastPageNumber());

	protected readonly _lastPageNumber = computed(() => {
		if (this.totalItems() < 1) {
			/**
			 * Cuando hay 0 o menos (un caso de error) elementos, no hay "páginas" como tal,
			 * pero tiene sentido considerar una sola página vacía como la última página.
			 */
			return 1;
		}
		return Math.ceil(this.totalItems() / this.itemsPerPage());
	});

	protected readonly _pages = computed(() => {
		const correctedCurrentPage = outOfBoundCorrection(this.totalItems(), this.itemsPerPage(), this.currentPage());

		if (correctedCurrentPage !== this.currentPage()) {
			/** actualizar la página actual */
			untracked(() => this.currentPage.set(correctedCurrentPage));
		}

		return createPageArray(correctedCurrentPage, this.itemsPerPage(), this.totalItems(), this.maxSize());
	});

	protected goToPrevious(): void {
		this.currentPage.set(this.currentPage() - 1);
	}

	protected goToNext(): void {
		this.currentPage.set(this.currentPage() + 1);
	}

	protected goToFirst(): void {
		this.currentPage.set(1);
	}

	protected goToLast(): void {
		this.currentPage.set(this._lastPageNumber());
	}
}

type Page = number | '...';

/**
 * Verifica que la propiedad instance.currentPage esté dentro de los límites del rango de páginas actual.
 * Si no lo está, retorna un valor correcto para currentPage, o el valor actual si está bien.
 *
 * Copiado del paquete 'ngx-pagination'
 */
export function outOfBoundCorrection(totalItems: number, itemsPerPage: number, currentPage: number): number {
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	if (totalPages < currentPage && 0 < totalPages) {
		return totalPages;
	}

	if (currentPage < 1) {
		return 1;
	}

	return currentPage;
}

/**
 * Retorna un array de objetos Page para usar en los controles de paginación.
 *
 * Copiado del paquete 'ngx-pagination'
 */
export function createPageArray(
	currentPage: number,
	itemsPerPage: number,
	totalItems: number,
	paginationRange: number,
): Page[] {
	/** paginationRange podría ser un string si se pasa desde un atributo, por eso se convierte a number. */
	paginationRange = +paginationRange;
	const pages: Page[] = [];

	/**
	 * Retornar 1 como número de página por defecto.
	 * Tiene sentido mostrar 1 en lugar de vacío cuando no hay elementos.
	 */
	const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
	const halfWay = Math.ceil(paginationRange / 2);

	const isStart = currentPage <= halfWay;
	const isEnd = totalPages - halfWay < currentPage;
	const isMiddle = !isStart && !isEnd;

	const ellipsesNeeded = paginationRange < totalPages;
	let i = 1;

	while (i <= totalPages && i <= paginationRange) {
		let label: number | '...';
		const pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);
		const openingEllipsesNeeded = i === 2 && (isMiddle || isEnd);
		const closingEllipsesNeeded = i === paginationRange - 1 && (isMiddle || isStart);
		if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
			label = '...';
		} else {
			label = pageNumber;
		}
		pages.push(label);
		i++;
	}

	return pages;
}

/**
 * Dada la posición en la secuencia de links de paginación [i],
 * determina qué número de página corresponde a esa posición.
 *
 * Copiado del paquete 'ngx-pagination'
 */
function calculatePageNumber(i: number, currentPage: number, paginationRange: number, totalPages: number) {
	const halfWay = Math.ceil(paginationRange / 2);
	if (i === paginationRange) {
		return totalPages;
	}

	if (i === 1) {
		return i;
	}

	if (paginationRange < totalPages) {
		if (totalPages - halfWay < currentPage) {
			return totalPages - paginationRange + i;
		}
		if (halfWay < currentPage) {
			return currentPage - halfWay + i;
		}
		return i;
	}

	return i;
}
