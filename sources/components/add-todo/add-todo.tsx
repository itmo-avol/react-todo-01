import type { FC, ChangeEvent, FormEvent } from 'react';
import { useState, useCallback } from 'react';
import Styles from './add-todo.module.css';

/**
 * Параметры формы добавления ToDo
 */
export type AddTodoProps = {
	/**
	 * Обрабатывает добавление ToDo
	 * @param text Текст добавляемого ToDo
	 */
	onAddTodo: ( text: string ) => void;
};

/**
 * Форма добавления ToDo
 */
export const AddTodo: FC<AddTodoProps> = ( { onAddTodo } ) =>
{
	/** Хранилище значения поля ввода */
	const [value, setValue] = useState( '' );
	/** Обрабатывает изменение поля ввода */
	const handleChange = useCallback(
		( event: ChangeEvent<HTMLInputElement> ) =>
		{
			const input = event.target;
			
			setValue( input.value );
		},
		[setValue],
	);
	/** Обрабатывает отправку формы */
	const handleSubmit = useCallback(
		( event: FormEvent<HTMLFormElement> ) =>
		{
			event.preventDefault();
			
			onAddTodo( value );
			setValue( '' );
		},
		[value, setValue, onAddTodo],
	);
	/** ID поля формы */
	const id = 'text' + Styles.form;
	
	return (
		<form
			className={Styles.form}
			onSubmit={handleSubmit}
		>
			<label htmlFor={id}>Todo</label>
			<input
				id={id}
				name="text"
				autoComplete="off"
				value={value}
				onChange={handleChange}
			/>
			<button
				type="submit"
			>
				Add
			</button>
		</form>
	);
};
