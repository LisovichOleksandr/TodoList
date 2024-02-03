import { TodoListComponentType } from '../App'
import {
	ActionChangeFilterType,
	ActionRemoveNameType,
	addTodoListAC,
	changeFilterAC,
	removeNameAC,
	removeTodoListAC,
	todoListsReducer,
} from './todolists-reducer'
// TEST-1
test('add new todo list in state', () => {
	const newTitle = 'two'

	const startState: Array<TodoListComponentType> = [
		{
			id: '1suites',
			title: 'one',
			filter: 'all',
		},
	]
	const endState: Array<TodoListComponentType> = todoListsReducer(
		startState,
		addTodoListAC(newTitle)
	)
	expect(endState.length).toBe(2)
	expect(endState[0].title).toBe(newTitle)
	expect(endState[0].filter).toBe('all')
})

// TEST-2
test('todo list should be remove', () => {
	const startState: Array<TodoListComponentType> = [
		{ id: '1suites', title: 'one', filter: 'all' },
		{ id: '2suites', title: 'two', filter: 'all' },
	]

	const endState = todoListsReducer(startState, removeTodoListAC('2suites'))
	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe('1suites')
})

// TEST-3
test('change todo list name', () => {
	const newName = 'changedName'

	const startState: Array<TodoListComponentType> = [
		{ id: '1suites', title: 'one', filter: 'all' },
		{ id: '2suites', title: 'two', filter: 'all' },
	]
	const action: ActionRemoveNameType = {
		type: 'REMOVE-NAME',
		id: '2suites',
		name: newName,
	}
	const endState = todoListsReducer(startState, removeNameAC('suites', newName))
	expect(endState[0].title).toBe('one')
	expect(endState[1].title).toBe(action.name)
})

// TEST-4
test('correct filter of TodoList should be changed ', () => {
	const startState: Array<TodoListComponentType> = [
		{ id: '1suites', title: 'one', filter: 'all' },
		{ id: '2suites', title: 'two', filter: 'all' },
	]
	const action: ActionChangeFilterType = {
		type: 'CHANGE-FILTER',
		todoListId: '2suites',
		value: 'active',
	}
	const endState = todoListsReducer(
		startState,
		changeFilterAC('2suites', 'active')
	)
	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe('active')
})
