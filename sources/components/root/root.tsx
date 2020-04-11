import React, { FC, useState, useCallback, useMemo } from 'react';
import { AddTodo } from '../add-todo/add-todo';
import { TodoList, Todo } from '../todo-list/todo-list';
import { VisibilityFilters } from '../visibility-filters/visibility-filters';
import { VISIBILITY_FILTERS } from '../../constants';
import Styles from './root.module.css';

/**
 * Параметры корневого элемента
 */
export type RootProps = {
	[key: string]: never;
};

/**
 * Корневой элемент приложения
 */
export const Root: FC<RootProps> = () =>
{
	/** Хранилище списка ToDo */
	const [todos, setTodos] = useState( [] as Todo[] );
	/** Хранилище значения фильтра */
	const [filter, setFilter] = useState( 'ALL' as keyof typeof VISIBILITY_FILTERS );
	
	/** Обрабатывает добавление нового ToDo */
	const handleAddTodo = useCallback(
		( content: string ) =>
		{
			const todo: Todo = {
				id: Date.now(),
				completed: false,
				content,
			};
			
			setTodos( [...todos, todo] );
		},
		[todos, setTodos],
	);
	/** Обрабатывает переключение состояния ToDo */
	const handleTodoToggle = useCallback(
		( id: number ) =>
		{
			const newTodos: Todo[] = [];
			
			for ( const todo of todos )
			{
				if ( todo.id === id )
				{
					newTodos.push( {
						id,
						completed: !todo.completed,
						content: todo.content,
					} );
				}
				else
				{
					newTodos.push( todo );
				}
			}
			
			setTodos( newTodos );
		},
		[todos, setTodos],
	);
	/** Обрабатывает изменение фильтра */
	const handleFilterChange = useCallback(
		( selectedFilter: typeof filter ) =>
		{
			setFilter( selectedFilter );
		},
		[],
	);
	/** Отфильтрованные ToDo */
	const filteredTodos = useMemo(
		() => filterTodos( todos, filter ),
		[todos, filter],
	);
	
	return (
		<main className={Styles.root}>
			<h1>Todo List</h1>
			<AddTodo onAddTodo={handleAddTodo} />
			<TodoList
				todos={filteredTodos}
				onTodoToggle={handleTodoToggle}
			/>
			<VisibilityFilters
				activeFilter={filter}
				onChange={handleFilterChange}
			/>
		</main>
	);
};

/**
 * Фильтрует список ToDo
 * 
 * @param todos Список ToDo
 * @param filter Текущее значение фильтра
 */
function filterTodos( todos: Todo[], filter: keyof typeof VISIBILITY_FILTERS ): Todo[]
{
	if ( filter === 'ALL' )
	{
		return todos;
	}
	
	return todos.filter(
		( { completed } ) => completed === ( filter === 'COMPLETED' )
	);
}
