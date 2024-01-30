import { TasksStateType, TodoListComponentType } from '../App'
import { taskReducer } from './task-reducer'
import { addTodoList, todoListsReducer } from './todolists-reducer'

test('ids should be equal', () => {
	const startTasksState: TasksStateType = {}
	const startTodoListsState: Array<TodoListComponentType> = []

	const action = addTodoList('new todoList')
	const endTasksState = taskReducer(startTasksState, action)
	const endTodoListsState = todoListsReducer(startTodoListsState, action)

	const keys = Object.keys(endTasksState)
	const idFormTasks = keys[0]
	const idFormTodoLists = endTodoListsState[0].id

	expect(idFormTasks).toBe(action.todoListId)
	expect(idFormTodoLists).toBe(action.todoListId)
})
