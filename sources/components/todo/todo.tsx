import type { FC } from 'react';
import { useCallback } from 'react';
import Styles from './todo.module.css';

/**
 * Параметры элемента ToDo
 */
export type TodoProps = {
	/** Идентификатор */
	id: number;
	/** Завершена? */
	completed: boolean;
	/**
	 * Обрабатывает переключения ToDo
	 * @param id Идентификатор ToDo
	 */
	onToggle: ( id: number ) => void;
};

/**
 * Элемент ToDo
 */
export const Todo: FC<TodoProps> = ( { id, children, completed, onToggle } ) =>
{
	/** Обрабатывает нажатие на элемент */
	const handleClick = useCallback(
		() =>
		{
			onToggle( id );
		},
		[id, onToggle],
	);
	
	return (
		<li
			className={[
				Styles.todo,
				completed && Styles.completed,
			].filter(Boolean).join( ' ' )}
			onClick={handleClick}
		>
			<span>
				{completed ? '👌' : '👋'}
			</span>
			<span className={Styles.text}>
				{children}
			</span>
		</li>
	);
};
