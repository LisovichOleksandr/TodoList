import { v1 } from 'uuid'
import { TasksStateType, todoListId1, todoListId2 } from '../App'
import {
	addTaskAC,
	changeStatusAC,
	changeTaskAC,
	deleteTaskAC,
	taskReducer,
} from './task-reducer'
import { addTodoList, removeTodoList } from './todolists-reducer'

// TEST-1
test('should be add new task in state and make title', () => {
	const value = 'newTaskNameExpect'
	const action = addTaskAC(todoListId1, value)
	const startState: TasksStateType = {
		[todoListId1]: [
			{ id: '1', title: 'HTML', isDone: true },
			{ id: '2', title: 'CSS', isDone: true },
			{ id: '3', title: 'JS', isDone: false },
		],
		[todoListId2]: [
			{ id: '1', title: 'React', isDone: true },
			{ id: '2', title: 'Redux', isDone: true },
			{ id: '3', title: 'Toolkit', isDone: true },
		],
	}
	const endState = taskReducer(startState, action)
	expect(endState[todoListId1].length).toBe(4)
	expect(endState[todoListId2].length).toBe(3)
	expect(endState[todoListId1][0].id).toBeDefined()
	expect(endState[todoListId1][0].title).toBe(value)
	expect(endState[todoListId1][1].title).toBe('HTML')
	expect(endState[todoListId1][0].isDone).toBe(false)
	expect(endState[todoListId2][0].title).toBe('React')
})

// TEST-2
test('should be delete task with state', () => {
	const idAC = v1()
	const action = deleteTaskAC(idAC, todoListId1)
	const startState: TasksStateType = {
		[todoListId1]: [
			{ id: idAC, title: 'HTML', isDone: true },
			{ id: v1(), title: 'CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: false },
			{ id: v1(), title: 'TypeScript', isDone: true },
		],
		[todoListId2]: [
			{ id: v1(), title: 'React', isDone: true },
			{ id: v1(), title: 'Redux', isDone: true },
			{ id: v1(), title: 'Toolkit', isDone: true },
		],
	}
	const endState = taskReducer(startState, action)
	expect(endState[action.todoListId].length).toBe(
		startState[action.todoListId].length - 1
	)
	expect(endState[todoListId2].length).toBe(3)
	expect(endState[todoListId1].every(ts => ts.id != idAC)).toBeTruthy()
})

// TEST-3
test('should be change task title', () => {
	const value = 'newTitleNameExpect'
	const action = changeTaskAC(value, todoListId1, '1')
	const startState: TasksStateType = {
		[todoListId1]: [
			{ id: '1', title: 'HTML', isDone: true },
			{ id: '2', title: 'CSS', isDone: true },
			{ id: '3', title: 'JS', isDone: false },
		],
		[todoListId2]: [
			{ id: '1', title: 'React', isDone: true },
			{ id: '2', title: 'Redux', isDone: true },
			{ id: '3', title: 'Toolkit', isDone: true },
		],
	}
	const endState = taskReducer(startState, action)
	expect(endState[todoListId1][0].title).toBe(value)
	expect(endState[todoListId2][0].title).toBe('React')
})

// TEST-4
test('status of specified task should be changed', () => {
	const action = changeStatusAC('1', false, todoListId1)
	const startState: TasksStateType = {
		[todoListId1]: [
			{ id: '1', title: 'HTML', isDone: true },
			{ id: '2', title: 'CSS', isDone: true },
			{ id: '3', title: 'JS', isDone: false },
		],
		[todoListId2]: [
			{ id: '1', title: 'React', isDone: true },
			{ id: '2', title: 'Redux', isDone: true },
			{ id: '3', title: 'Toolkit', isDone: true },
		],
	}
	const endState = taskReducer(startState, action)
	expect(endState[todoListId1][0].isDone).toBeFalsy()
	expect(endState[todoListId2][0].isDone).toBeTruthy()
})
// TEST-5
test('new property with new array should be added when new todoList is added', () => {
	const action = addTodoList('title no matter')
	const startState: TasksStateType = {
		[todoListId1]: [
			{ id: '1', title: 'HTML', isDone: true },
			{ id: '2', title: 'CSS', isDone: true },
			{ id: '3', title: 'JS', isDone: false },
		],
		[todoListId2]: [
			{ id: '1', title: 'React', isDone: true },
			{ id: '2', title: 'Redux', isDone: true },
			{ id: '3', title: 'Toolkit', isDone: true },
		],
	}

	const endState = taskReducer(startState, action)
	const keys = Object.keys(endState)
	const newKey = keys.find(k => k != todoListId1 && k != todoListId2)
	if (!newKey) {
		throw new Error('new key should be added')
	}
	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})

// TEST-6
test('property width todoList should be deleted', () => {
	const action = removeTodoList(todoListId1)
	const startState: TasksStateType = {
		[todoListId1]: [
			{ id: '1', title: 'HTML', isDone: true },
			{ id: '2', title: 'CSS', isDone: true },
			{ id: '3', title: 'JS', isDone: false },
		],
		[todoListId2]: [
			{ id: '1', title: 'React', isDone: true },
			{ id: '2', title: 'Redux', isDone: true },
			{ id: '3', title: 'Toolkit', isDone: true },
		],
	}

	const endState = taskReducer(startState, action)
	const key = Object.keys(endState)

	expect(key.length).toBe(1)
	expect(endState[todoListId1]).toBeUndefined()
})
