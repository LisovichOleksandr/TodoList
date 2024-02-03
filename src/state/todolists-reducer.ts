import { v1 } from 'uuid'
import { FilterValuesType, TodoListComponentType } from '../App'

export type ActionAddTodoType = {
	type: 'ADD-TODO'
	title: string
	todoListId: string
}
export type ActionRemoveTodoType = {
	type: 'REMOVE-TODO'
	id: string
}
export type ActionRemoveNameType = {
	type: 'REMOVE-NAME'
	id: string
	name: string
}
export type ActionChangeFilterType = {
	type: 'CHANGE-FILTER'
	todoListId: string
	value: FilterValuesType
}

type ActionsType =
	| ActionAddTodoType
	| ActionRemoveTodoType
	| ActionRemoveNameType
	| ActionChangeFilterType

export const todoListsReducer = (
	state: Array<TodoListComponentType>,
	action: ActionsType
): Array<TodoListComponentType> => {
	switch (action.type) {
		case 'ADD-TODO':
			// const newTodoList: TodoListComponentType = {
			// 	id: action.todoListId,
			// 	title: action.title,
			// 	filter: 'all',
			// }
			// let d = [...state, newTodoList]
			return [
				{ id: action.todoListId, filter: 'all', title: action.title },
				...state,
			]
		case 'REMOVE-TODO':
			return state.filter(todo => todo.id != action.id)
		case 'REMOVE-NAME':
			let findTodo = state.filter(tl => tl.id === action.id)
			if (findTodo) {
				findTodo[0].title = action.name
			}
			return [...state, ...findTodo]
		case 'CHANGE-FILTER': {
			const copyState = [...state]
			let findTodo = copyState.find(tl => tl.id === action.todoListId)
			if (findTodo) {
				findTodo.filter = action.value
			}
			return copyState
		}
		default:
			throw new Error('I don`t understand this action type')
	}
}
export const addTodoListAC = (title: string): ActionAddTodoType => {
	return {
		type: 'ADD-TODO',
		title,
		todoListId: v1(),
	}
}
export const removeTodoListAC = (id: string): ActionRemoveTodoType => {
	return {
		type: 'REMOVE-TODO',
		id,
	}
}
export const removeNameAC = (
	id: string,
	name: string
): ActionRemoveNameType => {
	return {
		type: 'REMOVE-NAME',
		id: '2suites',
		name,
	}
}
export const changeFilterAC = (
	todoListId: string,
	value: FilterValuesType
): ActionChangeFilterType => {
	return {
		type: 'CHANGE-FILTER',
		todoListId,
		value,
	}
}
