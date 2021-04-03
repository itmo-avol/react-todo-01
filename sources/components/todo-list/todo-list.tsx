import { FC } from 'react';
import { Todo } from '../todo/todo';
import Styles from './todo-list.module.css';

/**
 * Запись в ToDo
 */
export type Todo = {
	/** Идентификатор */
	id: number;
	/** Текст ToDo */
	content: string;
	/** Завершена? */
	completed: boolean;
};

/**
 * Параметры списка ToDo
 */
export type TodoListProps = {
	todos: Todo[];
	onTodoToggle: ( id: number ) => void;
};

/**
 * Список ToDo
 */
export const TodoList: FC<TodoListProps> = ( { todos, onTodoToggle } ) => (
	<ul className={Styles.list}>
		{
			todos.length !== 0
			? (
				todos.map(
					( todo ) => (
						<Todo
							key={`todo-${todo.id}`}
							id={todo.id}
							completed={todo.completed}
							onToggle={onTodoToggle}
						>
							{todo.content}
						</Todo>
					),
				)
			)
			: 'No todos, yay!'
		}
	</ul>
);
