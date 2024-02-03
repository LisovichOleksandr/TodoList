import { TodoListComponentType } from '../../App'
import {
	addTodoListToolkitAC,
	changeNameTodoListToolkitAC,
	filterTodoListToolkitAC,
	removerTodoListToolkitAC,
	todoListsSlice,
} from './todoLists-slice'

// TEST-1
test('add new todo list in state', () => {
	const startState: Array<TodoListComponentType> = [
		{ id: '1suites', title: 'one', filter: 'all' },
		{ id: '2suites', title: 'two', filter: 'all' },
	]
	const endState: Array<TodoListComponentType> = todoListsSlice.reducer(
		startState,
		addTodoListToolkitAC({ id: '3suites', title: 'three' })
	)
	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe('three')
	expect(endState[2].filter).toBe('all')
})

// TEST-2
test('todo list should be remove', () => {
	const startState: Array<TodoListComponentType> = [
		{ id: '1suites', title: 'one', filter: 'all' },
		{ id: '2suites', title: 'two', filter: 'all' },
	]

	const endState = todoListsSlice.reducer(
		startState,
		removerTodoListToolkitAC('2suites')
	)
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

	const endState = todoListsSlice.reducer(
		startState,
		changeNameTodoListToolkitAC({ todoListId: '1suites', title: 'changedName' })
	)
	expect(endState[0].title).toBe('changedName')
	expect(endState[1].title).toBe('two')
})

// TEST-4
test('correct filter of TodoList should be changed ', () => {
	const startState: Array<TodoListComponentType> = [
		{ id: '1suites', title: 'one', filter: 'all' },
		{ id: '2suites', title: 'two', filter: 'all' },
	]

	const endState = todoListsSlice.reducer(
		startState,
		filterTodoListToolkitAC({ todoListId: '2suites', value: 'active' })
	)
	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe('active')
})
