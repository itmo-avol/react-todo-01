import React, { FC, useCallback } from 'react';
import { VISIBILITY_FILTERS } from '../../constants';
import Styles from './visibility-filters.module.css';

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
	onChange: ( filter: keyof typeof VISIBILITY_FILTERS ) => void;
};

/**
 * Фильтр видимости
 */
export const VisibilityFilters: FC<VisibilityFiltersProps> = ( { activeFilter, onChange } ) =>
{
	/** Обрабатывает нажатие на пункт фильтра */
	const handleClick = useCallback(
		( event: React.MouseEvent<HTMLSpanElement> ) =>
		{
			const item = event.target as HTMLElement;
			
			onChange( item.dataset.filter as keyof typeof VISIBILITY_FILTERS || 'ALL' );
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
				)
			)}
		</div>
	)
};
