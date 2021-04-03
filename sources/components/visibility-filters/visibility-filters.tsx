import React, { FC, useCallback } from 'react';
import { VISIBILITY_FILTERS } from '../../constants';
import Styles from './visibility-filters.module.css';

/**
 * Ключ из VISIBILITY_FILTERS
 */
type VisibilityFilterKey = keyof typeof VISIBILITY_FILTERS;

/**
 * Параметры фильтра видимости
 */
export type VisibilityFiltersProps = {
	/** Выбранный фильтр */
	activeFilter: string;
	/**
	 * Обрабатывает изменение фильтра
	 * @param filter Новое значение фильтра
	 */
	onChange: ( filter: VisibilityFilterKey ) => void;
};

/**
 * Множество ключей VISIBILITY_FILTERS
 */
const visibilityFilterKeys = new Set( Object.keys( VISIBILITY_FILTERS ) );

/**
 * Проверяет, является ли значение ключом из VISIBILITY_FILTERS
 */
const isVisibilityFilterKey = ( value: string | undefined ): value is VisibilityFilterKey => (
	value != null
	&& visibilityFilterKeys.has( value )
);

/**
 * Фильтр видимости
 */
export const VisibilityFilters: FC<VisibilityFiltersProps> = ( { activeFilter, onChange } ) =>
{
	/** Обрабатывает нажатие на пункт фильтра */
	const handleClick = useCallback(
		( event: React.MouseEvent<HTMLSpanElement> ) =>
		{
			const item = event.target;
			
			if ( !(item instanceof HTMLElement) )
			{
				return;
			}
			
			const filter = item.dataset.filter;
			
			onChange(
				isVisibilityFilterKey( filter )
				? filter
				: 'ALL'
			);
		},
		[onChange],
	);
	
	return (
		<div className={Styles.panel}>
			{Object.entries( VISIBILITY_FILTERS ).map(
				( [key, filter] ) => (
					<span
						key={`visibility-filter-${key}`}
						className={[
							Styles.filter,
							activeFilter === key && Styles.active,
						].filter(Boolean).join( ' ' )}
						data-filter={key}
						onClick={handleClick}
					>
						{filter}
					</span>
				),
			)}
		</div>
	)
};
